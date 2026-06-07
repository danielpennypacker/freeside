// freeside Worker entrypoint.
// Handles /api/* and /auth/*. Everything else (HTML, JS, CSS, /img/*) is served
// as a static asset from ./public by the [assets] binding; unknown non-asset
// paths fall through to the SPA shell so the client router can handle them.
import { Hono } from 'hono';
import type { AppEnv } from './types';
import { auth } from './auth';
import { content } from './content';
import { cms } from './cms';
import { games, play } from './games';
import { currentUser } from './session';

const app = new Hono<AppEnv>();

// Liveness probe — confirms the Worker (not just static assets) is running.
app.get('/api/health', (c) => c.json({ ok: true, service: 'freeside', ts: Date.now() }));

// Auth (Google + Discord OAuth + dev-login).
app.route('/auth', auth);

// Current user (null when logged out) — the frontend gates the DM tools on this.
app.get('/api/me', async (c) =>
  c.json({ user: await currentUser(c), devLogin: c.env.ALLOW_DEV_LOGIN === 'true' }),
);

// Read-only content (full DM/authoring view), authoring (CMS), and game state.
app.route('/api', content);
app.route('/api', cms);
app.route('/api', games);
// Public minimal player view.
app.route('/api', play);

// Shareable player page: /play/<sessionId> is a real path, not a static asset,
// so it falls through here — serve the app shell and let the client render the
// minimal revealed-content view from /api/play/:id.
app.get('/play/:id', (c) => c.env.ASSETS.fetch(new URL('/', c.req.url)));

// Anything else under /api that didn't match is a real 404 (don't serve HTML).
app.all('/api/*', (c) => c.json({ error: 'not_found' }, 404));

export default app;
