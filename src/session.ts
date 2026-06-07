// Session + auth helpers. Sessions and users live in D1 (`sessions`, `users`),
// the session referenced by an HttpOnly cookie. Expiry is enforced on read via
// the `expires_at` column.
import type { Context, MiddlewareHandler } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import type { AppEnv, User } from './types';
import { ensureSchema, upsertUser, createSessionRow, getSessionUser, deleteSessionRow } from './db';

export const SESSION_COOKIE = 'freeside_session';
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days (seconds)

/** Secure cookies only over HTTPS, so they still work on http://localhost. */
export const isHttps = (c: Context<AppEnv>) => new URL(c.req.url).protocol === 'https:';

const cookieOpts = (c: Context<AppEnv>, maxAge: number) =>
  ({ httpOnly: true, secure: isHttps(c), sameSite: 'Lax', path: '/', maxAge }) as const;

/** Persist a user record (upsert). */
export async function saveUser(c: Context<AppEnv>, user: User): Promise<void> {
  await ensureSchema(c.env.DB);
  await upsertUser(c.env.DB, user);
}

/** Create a session for a user and set the cookie. */
export async function createSession(c: Context<AppEnv>, userId: string): Promise<void> {
  await ensureSchema(c.env.DB);
  const sid = crypto.randomUUID();
  const now = Date.now();
  await createSessionRow(c.env.DB, sid, userId, now, now + SESSION_TTL * 1000);
  setCookie(c, SESSION_COOKIE, sid, cookieOpts(c, SESSION_TTL));
}

/** Destroy the current session and clear the cookie. */
export async function destroySession(c: Context<AppEnv>): Promise<void> {
  const sid = getCookie(c, SESSION_COOKIE);
  if (sid) {
    await ensureSchema(c.env.DB);
    await deleteSessionRow(c.env.DB, sid);
  }
  deleteCookie(c, SESSION_COOKIE, { path: '/' });
}

/** Resolve the logged-in user from the session cookie, or null. */
export async function currentUser(c: Context<AppEnv>): Promise<User | null> {
  const sid = getCookie(c, SESSION_COOKIE);
  if (!sid) return null;
  await ensureSchema(c.env.DB);
  return getSessionUser(c.env.DB, sid, Date.now());
}

/** Middleware: 401 unless logged in; otherwise stashes the user on the context. */
export const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  const user = await currentUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  c.set('user', user);
  await next();
};
