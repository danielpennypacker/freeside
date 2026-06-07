// Google OAuth 2.0 (Authorization Code flow). No SDK — just the documented endpoints.
// The redirect URI is derived from the incoming request, so it works for both
// http://localhost:8787 and the deployed origin (register BOTH in Google Console).
import type { Context } from 'hono';
import type { AppEnv, User } from './types';

const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';

export const redirectUri = (c: Context<AppEnv>) =>
  new URL('/auth/google/callback', c.req.url).toString();

/** URL to send the user to in order to sign in. */
export function buildAuthUrl(c: Context<AppEnv>, state: string): string {
  const params = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID ?? '',
    redirect_uri: redirectUri(c),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account',
  });
  return `${AUTH_ENDPOINT}?${params}`;
}

/** Exchange an auth code for tokens, then fetch the user's profile. */
export async function exchangeCode(c: Context<AppEnv>, code: string): Promise<User> {
  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: c.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: c.env.GOOGLE_CLIENT_SECRET ?? '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri(c),
    }),
  });
  if (!tokenRes.ok) throw new Error(`token exchange failed: ${tokenRes.status}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const infoRes = await fetch(USERINFO_ENDPOINT, {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!infoRes.ok) throw new Error(`userinfo failed: ${infoRes.status}`);
  const info = (await infoRes.json()) as {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
  };

  return { id: info.sub, email: info.email, name: info.name ?? info.email, picture: info.picture };
}
