// Read-only content API (mounted at /api). This is the DM / authoring view:
// the full, hydrated adventure — every relation expanded. The minimal
// player-facing view lives in games.ts (/api/play/:id).
import { Hono } from 'hono';
import type { AppEnv, Adventure } from './types';
import {
  ensureSchema, getDefaultAdventure, getPages,
  getCharacter, getLocation, getDungeon,
} from './db';

export const content = new Hono<AppEnv>();

/** The single seeded adventure (this app ships one; the schema supports many). */
async function resolveAdventure(env: AppEnv['Bindings']): Promise<Adventure | null> {
  await ensureSchema(env.DB);
  return getDefaultAdventure(env.DB);
}

// The adventure index: metadata + the ordered page list (kind + ref id).
content.get('/adventure', async (c) => {
  const adv = await resolveAdventure(c.env);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const pages = await getPages(c.env.DB, adv.id);
  return c.json({ adventure: adv, pages });
});

content.get('/characters/:id', async (c) => {
  const adv = await resolveAdventure(c.env);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const character = await getCharacter(c.env.DB, adv.id, Number(c.req.param('id')));
  if (!character) return c.json({ error: 'not_found' }, 404);
  return c.json({ character });
});

content.get('/locations/:id', async (c) => {
  const adv = await resolveAdventure(c.env);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const location = await getLocation(c.env.DB, adv.id, Number(c.req.param('id')));
  if (!location) return c.json({ error: 'not_found' }, 404);
  return c.json({ location });
});

content.get('/dungeons/:id', async (c) => {
  const adv = await resolveAdventure(c.env);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const dungeon = await getDungeon(c.env.DB, adv.id, Number(c.req.param('id')));
  if (!dungeon) return c.json({ error: 'not_found' }, 404);
  return c.json({ dungeon });
});
