// Auth routes, mounted at /auth. Supports Google and Discord OAuth (same flow),
// plus a dev-only login for local/E2E.
import { Hono } from 'hono';
import type { Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import type { AppEnv, User } from './types';
import * as google from './google';
import * as discord from './discord';
import { createSession, destroySession, saveUser, isHttps } from './session';

const STATE_COOKIE = 'oauth_state';

type BuildUrl = (c: Context<AppEnv>, state: string) => string;
type Exchange = (c: Context<AppEnv>, code: string) => Promise<User>;

/** Begin an OAuth flow: set a CSRF state cookie and redirect to the provider. */
function start(c: Context<AppEnv>, buildUrl: BuildUrl) {
  const state = crypto.randomUUID();
  setCookie(c, STATE_COOKIE, state, {
    httpOnly: true, secure: isHttps(c), sameSite: 'Lax', path: '/', maxAge: 600,
  });
  return c.redirect(buildUrl(c, state));
}

/** Finish an OAuth flow: verify state, exchange the code, upsert user, start a session. */
async function finish(c: Context<AppEnv>, exchange: Exchange) {
  const code = c.req.query('code');
  const state = c.req.query('state');
  if (!code || !state || state !== getCookie(c, STATE_COOKIE)) return c.redirect('/?error=auth');
  deleteCookie(c, STATE_COOKIE, { path: '/' });
  try {
    const user = await exchange(c, code);
    await saveUser(c, user);
    await createSession(c, user.id);
  } catch {
    return c.redirect('/?error=auth');
  }
  return c.redirect('/');
}

export const auth = new Hono<AppEnv>();

auth.get('/google/login', (c) => start(c, google.buildAuthUrl));
auth.get('/google/callback', (c) => finish(c, google.exchangeCode));
auth.get('/discord/login', (c) => start(c, discord.buildAuthUrl));
auth.get('/discord/callback', (c) => finish(c, discord.exchangeCode));

// Dev/E2E-only login (no provider). Gated by ALLOW_DEV_LOGIN; 404 in production.
auth.post('/dev-login', async (c) => {
  if (c.env.ALLOW_DEV_LOGIN !== 'true') return c.json({ error: 'not_found' }, 404);
  const body = (await c.req.json().catch(() => ({}))) as { email?: string; name?: string };
  const email = body.email ?? 'dm@example.com';
  const user = { id: `dev:${email}`, email, name: body.name ?? 'Dev DM' };
  await saveUser(c, user);
  await createSession(c, user.id);
  return c.json({ user });
});

auth.post('/logout', async (c) => {
  await destroySession(c);
  return c.json({ ok: true });
});
