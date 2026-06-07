import { env } from 'cloudflare:test';
import { expect } from 'vitest';
import { createSchema, upsertUser, createSessionRow } from '../src/db';

export const SESSION_COOKIE = 'freeside_session';

/**
 * Seed a user + session directly in D1 and return the matching cookie header.
 * Defaults to a UNIQUE user per call (the pool no longer isolates storage between
 * tests). The session never expires (expires_at = null) for the test run.
 */
export async function loginAs(userId = `dm-${crypto.randomUUID()}`): Promise<string> {
  await createSchema(env.DB);
  const sid = crypto.randomUUID();
  await upsertUser(env.DB, { id: userId, email: `${userId}@test.dev`, name: 'Tester' });
  await createSessionRow(env.DB, sid, userId, Date.now(), null);
  return `${SESSION_COOKIE}=${sid}`;
}

export function postJson(body: unknown, cookie?: string) {
  return {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(body),
  };
}

export function expectStatus(res: Response, status: number) {
  expect(res.status, `expected ${status} but got ${res.status}`).toBe(status);
}

/**
 * Seed a tiny adventure fixture exercising every relation kind:
 *   - 1:M  : location 1 owns an event; character 1 owns a dialogue line
 *   - M:N  : character 1 appears at locations 1 AND 2 (and so location 1 has
 *            characters 1 AND 2) — a true many-to-many
 *   - M:N  : location 1 <-> location 2 connected areas
 *   - pages: location 1, character 1, location 2
 * Idempotent.
 */
export async function seedAdventure(slug = 'freeside'): Promise<void> {
  await createSchema(env.DB);
  const sql: string[] = [
    `DELETE FROM adventures WHERE id = '${slug}'`,
    `DELETE FROM pages WHERE adventure_id = '${slug}'`,
    `DELETE FROM characters WHERE adventure_id = '${slug}'`,
    `DELETE FROM locations WHERE adventure_id = '${slug}'`,
    `DELETE FROM location_characters`,
    `DELETE FROM location_connections`,
    `DELETE FROM character_dialogue`,
    `DELETE FROM location_events`,
    `INSERT INTO adventures (id, owner_id, slug, title, overview, created_at) VALUES ('${slug}', NULL, '${slug}', 'Freeside', 'test', 0)`,
    `INSERT INTO characters (id, adventure_id, code, name, title, strength, dexterity, constitution, intelligence, wisdom, charisma, challenge_rating, armor_class, hit_points, speed, passive_perception, proficiency_bonus, image, page) VALUES (1, '${slug}', 'boz', 'Boz', 'Pirate', 16, 12, 14, 10, 10, 14, 2, 14, 30, 30, 11, 2, '/img/characters/boz.png', 2)`,
    `INSERT INTO characters (id, adventure_id, code, name, image, page) VALUES (2, '${slug}', 'ann', 'Ann', '/img/characters/ann.png', 4)`,
    `INSERT INTO character_dialogue (character_id, type, text, ord) VALUES (1, 'flavor', 'Ahoy.', 0)`,
    `INSERT INTO locations (id, adventure_id, code, name, crowd, image, page) VALUES (1, '${slug}', 'land', 'Theives Port', 'shabby', '/img/locations/land.png', 1)`,
    `INSERT INTO locations (id, adventure_id, code, name, image, page) VALUES (2, '${slug}', 'pcafe', 'Pirate Cafe', '/img/locations/pcafe.png', 3)`,
    `INSERT INTO location_events (location_id, text, ord) VALUES (1, 'A fight breaks out.', 0)`,
    // M:N — character 1 appears at BOTH locations; location 1 also hosts character 2.
    `INSERT INTO location_characters (location_id, character_id, description, ord) VALUES (1, 1, 'pointing at a map', 0)`,
    `INSERT INTO location_characters (location_id, character_id, description, ord) VALUES (2, 1, 'still here', 0)`,
    `INSERT INTO location_characters (location_id, character_id, description, ord) VALUES (1, 2, 'timid', 1)`,
    // M:N — connected areas.
    `INSERT INTO location_connections (location_id, connected_location_id) VALUES (1, 2)`,
    `INSERT INTO location_connections (location_id, connected_location_id) VALUES (2, 1)`,
    `INSERT INTO pages (adventure_id, position, kind, ref_id) VALUES ('${slug}', 0, 'location', 1)`,
    `INSERT INTO pages (adventure_id, position, kind, ref_id) VALUES ('${slug}', 1, 'character', 1)`,
    `INSERT INTO pages (adventure_id, position, kind, ref_id) VALUES ('${slug}', 2, 'location', 2)`,
  ];
  await env.DB.batch(sql.map((s) => env.DB.prepare(s)));
}
