// Authoring API (mounted at /api). DM-only, owner-scoped editing of the
// normalized content: scalar fields, the 1:M child collections (replace-all),
// and the M:N links (characters<->locations, location<->location).
//
// The seeded adventure ships unowned; the first DM to `POST /adventure/claim`
// becomes its owner and unlocks editing.
import { Hono } from 'hono';
import type { Context } from 'hono';
import type { AppEnv, Adventure } from './types';
import { ensureSchema, getDefaultAdventure, getCharacter, getLocation } from './db';
import { requireAuth } from './session';

// NOTE: auth is applied per-route (below), NOT via a blanket `cms.use('*')`.
// A wildcard middleware here would, once mounted at /api, intercept sibling
// sub-apps (content, the PUBLIC /api/play view) and 401 them.
export const cms = new Hono<AppEnv>();

/** Resolve the adventure and ensure the caller may edit it (owner, or claim if unowned). */
async function editable(
  c: Context<AppEnv>,
): Promise<{ adv: Adventure } | { error: Response }> {
  await ensureSchema(c.env.DB);
  const adv = await getDefaultAdventure(c.env.DB);
  if (!adv) return { error: c.json({ error: 'not_seeded' }, 404) };
  const me = c.get('user').id;
  if (adv.ownerId && adv.ownerId !== me) return { error: c.json({ error: 'forbidden' }, 403) };
  return { adv };
}

// Claim the (unowned) adventure to become its DM.
cms.post('/adventure/claim', requireAuth, async (c) => {
  await ensureSchema(c.env.DB);
  const adv = await getDefaultAdventure(c.env.DB);
  if (!adv) return c.json({ error: 'not_seeded' }, 404);
  const me = c.get('user').id;
  if (adv.ownerId && adv.ownerId !== me) return c.json({ error: 'forbidden' }, 403);
  await c.env.DB.prepare(`UPDATE adventures SET owner_id = ?1 WHERE id = ?2`).bind(me, adv.id).run();
  return c.json({ ok: true, adventureId: adv.id });
});

// --- column whitelists (camelCase API field -> snake_case column) ----------
const CHARACTER_COLS: Record<string, string> = {
  name: 'name', title: 'title', age: 'age', race: 'race', alignment: 'alignment', detailOne: 'detail_one',
  strength: 'strength', dexterity: 'dexterity', constitution: 'constitution',
  intelligence: 'intelligence', wisdom: 'wisdom', charisma: 'charisma',
  challengeRating: 'challenge_rating', armorClass: 'armor_class', hitPoints: 'hit_points',
  speed: 'speed', passivePerception: 'passive_perception', proficiencyBonus: 'proficiency_bonus',
  roleplayInspiration: 'roleplay_inspiration', motivation: 'motivation', dmNotes: 'dm_notes',
  visualDescription: 'visual_description', image: 'image',
};
const LOCATION_COLS: Record<string, string> = {
  name: 'name', inspiration: 'inspiration', exterior: 'exterior', interior: 'interior',
  detailOne: 'detail_one', detailTwo: 'detail_two', crowd: 'crowd', dmNotes: 'dm_notes', image: 'image',
};

/** Build a parameterized UPDATE from a whitelist; returns null if nothing to set. */
function buildUpdate(
  table: string, cols: Record<string, string>, body: Record<string, unknown>, id: number, advId: string,
): { sql: string; binds: unknown[] } | null {
  const sets: string[] = [];
  const binds: unknown[] = [];
  for (const [field, col] of Object.entries(cols)) {
    if (field in body) { sets.push(`${col} = ?${sets.length + 1}`); binds.push(body[field] as unknown); }
  }
  if (!sets.length) return null;
  const idP = `?${binds.length + 1}`;
  const advP = `?${binds.length + 2}`;
  binds.push(id, advId);
  return { sql: `UPDATE ${table} SET ${sets.join(', ')} WHERE id = ${idP} AND adventure_id = ${advP}`, binds };
}

/** Replace a 1:M child collection in one shot (delete + re-insert). */
async function replaceChildren(
  db: D1Database, table: string, fk: string, parentId: number,
  rows: Record<string, unknown>[], cols: string[],
): Promise<void> {
  const stmts: D1PreparedStatement[] = [
    db.prepare(`DELETE FROM ${table} WHERE ${fk} = ?1`).bind(parentId),
  ];
  rows.forEach((row, ord) => {
    const placeholders = [`?1`, ...cols.map((_, i) => `?${i + 2}`), `?${cols.length + 2}`];
    stmts.push(
      db.prepare(
        `INSERT INTO ${table} (${fk}, ${cols.join(', ')}, ord) VALUES (${placeholders.join(', ')})`,
      ).bind(parentId, ...cols.map((cc) => (row[cc] ?? null) as unknown), ord),
    );
  });
  await db.batch(stmts);
}

// --- characters -------------------------------------------------------------
cms.put('/characters/:id', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  const id = Number(c.req.param('id'));
  const body = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const upd = buildUpdate('characters', CHARACTER_COLS, body, id, e.adv.id);
  if (upd) await c.env.DB.prepare(upd.sql).bind(...upd.binds).run();
  // JSON-backed scalar arrays.
  if (Array.isArray(body.skills))
    await c.env.DB.prepare(`UPDATE characters SET skills_json = ?1 WHERE id = ?2 AND adventure_id = ?3`)
      .bind(JSON.stringify(body.skills), id, e.adv.id).run();
  if (Array.isArray(body.spells))
    await c.env.DB.prepare(`UPDATE characters SET spells_json = ?1 WHERE id = ?2 AND adventure_id = ?3`)
      .bind(JSON.stringify(body.spells), id, e.adv.id).run();
  if (body.attack !== undefined)
    await c.env.DB.prepare(`UPDATE characters SET attack_json = ?1 WHERE id = ?2 AND adventure_id = ?3`)
      .bind(body.attack ? JSON.stringify(body.attack) : null, id, e.adv.id).run();
  // 1:M children (replace-all when present).
  if (Array.isArray(body.dialogue))
    await replaceChildren(c.env.DB, 'character_dialogue', 'character_id', id, body.dialogue as any[], ['type', 'text']);
  if (Array.isArray(body.quests))
    await replaceChildren(c.env.DB, 'character_quests', 'character_id', id, body.quests as any[], ['prompt', 'reward']);
  if (Array.isArray(body.misc))
    await replaceChildren(c.env.DB, 'character_misc', 'character_id', id, body.misc as any[], ['key', 'value']);
  const character = await getCharacter(c.env.DB, e.adv.id, id);
  return character ? c.json({ character }) : c.json({ error: 'not_found' }, 404);
});

// --- locations --------------------------------------------------------------
cms.put('/locations/:id', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  const id = Number(c.req.param('id'));
  const body = (await c.req.json().catch(() => ({}))) as Record<string, unknown>;
  const upd = buildUpdate('locations', LOCATION_COLS, body, id, e.adv.id);
  if (upd) await c.env.DB.prepare(upd.sql).bind(...upd.binds).run();
  if (Array.isArray(body.events))
    await replaceChildren(c.env.DB, 'location_events', 'location_id', id,
      (body.events as string[]).map((text) => ({ text })), ['text']);
  if (Array.isArray(body.randomNpcs))
    await replaceChildren(c.env.DB, 'location_random_npcs', 'location_id', id, body.randomNpcs as any[],
      ['name', 'race', 'job', 'description', 'dialogue']);
  const location = await getLocation(c.env.DB, e.adv.id, id);
  return location ? c.json({ location }) : c.json({ error: 'not_found' }, 404);
});

// --- M:N: a named character appears at a location --------------------------
cms.post('/locations/:id/characters', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  const locationId = Number(c.req.param('id'));
  const b = (await c.req.json().catch(() => ({}))) as { characterId?: number; description?: string };
  if (typeof b.characterId !== 'number') return c.json({ error: 'bad_request' }, 400);
  const ord = await c.env.DB.prepare(`SELECT COUNT(*) AS n FROM location_characters WHERE location_id = ?1`)
    .bind(locationId).first<{ n: number }>();
  await c.env.DB.prepare(
    `INSERT OR REPLACE INTO location_characters (location_id, character_id, description, ord) VALUES (?1, ?2, ?3, ?4)`,
  ).bind(locationId, b.characterId, b.description ?? '', ord?.n ?? 0).run();
  return c.json({ ok: true });
});

cms.delete('/locations/:id/characters/:characterId', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  await c.env.DB.prepare(`DELETE FROM location_characters WHERE location_id = ?1 AND character_id = ?2`)
    .bind(Number(c.req.param('id')), Number(c.req.param('characterId'))).run();
  return c.json({ ok: true });
});

// --- M:N: a location connects to another location --------------------------
cms.post('/locations/:id/connections', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  const locationId = Number(c.req.param('id'));
  const b = (await c.req.json().catch(() => ({}))) as { connectedId?: number; bidirectional?: boolean };
  if (typeof b.connectedId !== 'number') return c.json({ error: 'bad_request' }, 400);
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO location_connections (location_id, connected_location_id) VALUES (?1, ?2)`,
  ).bind(locationId, b.connectedId).run();
  if (b.bidirectional)
    await c.env.DB.prepare(
      `INSERT OR IGNORE INTO location_connections (location_id, connected_location_id) VALUES (?1, ?2)`,
    ).bind(b.connectedId, locationId).run();
  return c.json({ ok: true });
});

cms.delete('/locations/:id/connections/:connectedId', requireAuth, async (c) => {
  const e = await editable(c);
  if ('error' in e) return e.error;
  await c.env.DB.prepare(`DELETE FROM location_connections WHERE location_id = ?1 AND connected_location_id = ?2`)
    .bind(Number(c.req.param('id')), Number(c.req.param('connectedId'))).run();
  return c.json({ ok: true });
});
