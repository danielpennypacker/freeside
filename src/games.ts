// Game-session API: live state for a table of play.
//
//   /api/games*       — DM-only (requireAuth + ownership): create sessions,
//                       reveal/hide content, track party HP & position.
//   /api/play/:id     — PUBLIC, minimal player view: only the content the DM has
//                       revealed, and only as name + image (per the design).
import { Hono } from 'hono';
import type { Context } from 'hono';
import type { AppEnv, MinimalEntity, PageKind } from './types';
import {
  ensureSchema, getDefaultAdventure, getGameSession, listGameSessionsForDm,
  createGameSession, getReveals, addReveal, removeReveal, getMinimal,
  getParty, addPartyMember, updatePartyMember, removePartyMember,
} from './db';
import { requireAuth } from './session';

const KINDS: PageKind[] = ['location', 'character', 'dungeon'];
const isKind = (s: unknown): s is PageKind => typeof s === 'string' && (KINDS as string[]).includes(s);

export const games = new Hono<AppEnv>();

// ---- DM-only session management -------------------------------------------
games.use('/games', requireAuth);
games.use('/games/*', requireAuth);

games.post('/games', async (c) => {
  await ensureSchema(c.env.DB);
  const adv = await getDefaultAdventure(c.env.DB);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const body = (await c.req.json().catch(() => ({}))) as { name?: string };
  const id = crypto.randomUUID();
  await createGameSession(c.env.DB, id, adv.id, c.get('user').id, body.name?.trim() || 'Untitled session', Date.now());
  const session = await getGameSession(c.env.DB, id);
  return c.json({ session }, 201);
});

games.get('/games', async (c) => {
  await ensureSchema(c.env.DB);
  return c.json({ sessions: await listGameSessionsForDm(c.env.DB, c.get('user').id) });
});

/** Load a session and 403 unless the caller is its DM. */
async function ownedSession(c: Context<AppEnv>) {
  const session = await getGameSession(c.env.DB, c.req.param('id') ?? '');
  if (!session) return { error: c.json({ error: 'not_found' }, 404) };
  if (session.dmId !== c.get('user').id) return { error: c.json({ error: 'forbidden' }, 403) };
  return { session };
}

games.get('/games/:id', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  const [reveals, party] = await Promise.all([
    getReveals(c.env.DB, session!.id),
    getParty(c.env.DB, session!.id),
  ]);
  return c.json({ session, reveals, party });
});

games.post('/games/:id/reveal', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  const { kind, refId } = (await c.req.json().catch(() => ({}))) as { kind?: string; refId?: number };
  if (!isKind(kind) || typeof refId !== 'number') return c.json({ error: 'bad_request' }, 400);
  await addReveal(c.env.DB, session!.id, kind, refId);
  return c.json({ ok: true });
});

games.post('/games/:id/unreveal', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  const { kind, refId } = (await c.req.json().catch(() => ({}))) as { kind?: string; refId?: number };
  if (!isKind(kind) || typeof refId !== 'number') return c.json({ error: 'bad_request' }, 400);
  await removeReveal(c.env.DB, session!.id, kind, refId);
  return c.json({ ok: true });
});

// ---- party tracking --------------------------------------------------------
games.post('/games/:id/party', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  const b = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const playerName = typeof b.playerName === 'string' ? b.playerName.trim() : '';
  if (!playerName) return c.json({ error: 'bad_request' }, 400);
  const existing = await getParty(c.env.DB, session!.id);
  const id = await addPartyMember(c.env.DB, session!.id, {
    playerName,
    currentHp: typeof b.currentHp === 'number' ? b.currentHp : null,
    maxHp: typeof b.maxHp === 'number' ? b.maxHp : null,
    locationId: typeof b.locationId === 'number' ? b.locationId : null,
    notes: typeof b.notes === 'string' ? b.notes : '',
  }, existing.length);
  return c.json({ id }, 201);
});

games.put('/games/:id/party/:pid', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  const b = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  await updatePartyMember(c.env.DB, session!.id, Number(c.req.param('pid')), {
    ...(typeof b.playerName === 'string' ? { playerName: b.playerName } : {}),
    ...(typeof b.currentHp === 'number' ? { currentHp: b.currentHp } : {}),
    ...(typeof b.maxHp === 'number' ? { maxHp: b.maxHp } : {}),
    ...(typeof b.locationId === 'number' ? { locationId: b.locationId } : {}),
    ...(typeof b.notes === 'string' ? { notes: b.notes } : {}),
  });
  return c.json({ ok: true });
});

games.delete('/games/:id/party/:pid', async (c) => {
  await ensureSchema(c.env.DB);
  const { session, error } = await ownedSession(c);
  if (error) return error;
  await removePartyMember(c.env.DB, session!.id, Number(c.req.param('pid')));
  return c.json({ ok: true });
});

// ---- PUBLIC minimal player view -------------------------------------------
// No auth: anyone with the link sees only what's revealed, as name + image.
export const play = new Hono<AppEnv>();
play.get('/play/:id', async (c) => {
  await ensureSchema(c.env.DB);
  const session = await getGameSession(c.env.DB, c.req.param('id') ?? '');
  if (!session) return c.json({ error: 'not_found' }, 404);
  const adv = await getDefaultAdventure(c.env.DB);
  const reveals = await getReveals(c.env.DB, session.id);
  const entities = await Promise.all(
    reveals.map((r) => getMinimal(c.env.DB, session.adventureId, r.kind, r.refId)),
  );
  const minimal = entities.filter((e): e is MinimalEntity => !!e);
  return c.json({
    session: { id: session.id, name: session.name },
    adventureTitle: adv?.title ?? '',
    reveals: minimal,
  });
});
