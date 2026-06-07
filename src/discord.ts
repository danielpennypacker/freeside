// Discord OAuth 2.0 (Authorization Code flow) — same shape as google.ts.
// Register the redirect URI in the Discord Developer Portal (OAuth2 settings).
import type { Context } from 'hono';
import type { AppEnv, User } from './types';

const AUTH_ENDPOINT = 'https://discord.com/oauth2/authorize';
const TOKEN_ENDPOINT = 'https://discord.com/api/oauth2/token';
const USER_ENDPOINT = 'https://discord.com/api/users/@me';

export const redirectUri = (c: Context<AppEnv>) =>
  new URL('/auth/discord/callback', c.req.url).toString();

export function buildAuthUrl(c: Context<AppEnv>, state: string): string {
  const params = new URLSearchParams({
    client_id: c.env.DISCORD_CLIENT_ID ?? '',
    redirect_uri: redirectUri(c),
    response_type: 'code',
    scope: 'identify email',
    state,
    prompt: 'consent',
  });
  return `${AUTH_ENDPOINT}?${params}`;
}

export async function exchangeCode(c: Context<AppEnv>, code: string): Promise<User> {
  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: c.env.DISCORD_CLIENT_ID ?? '',
      client_secret: c.env.DISCORD_CLIENT_SECRET ?? '',
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri(c),
    }),
  });
  if (!tokenRes.ok) throw new Error(`discord token exchange failed: ${tokenRes.status}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const infoRes = await fetch(USER_ENDPOINT, {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!infoRes.ok) throw new Error(`discord userinfo failed: ${infoRes.status}`);
  const info = (await infoRes.json()) as {
    id: string;
    username: string;
    global_name?: string | null;
    email?: string | null;
    avatar?: string | null;
  };

  // Namespace the id so Discord and Google users can never collide.
  return {
    id: `discord:${info.id}`,
    email: info.email ?? '',
    name: info.global_name || info.username,
    picture: info.avatar ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png` : undefined,
  };
}
