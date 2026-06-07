// D1 (SQLite) layer — the single datastore for everything: the adventure content
// (characters, locations, dungeons + their children), the ordering (`pages`),
// identity (`users`, `sessions`), and live per-game-session state.
//
// The content schema is NORMALIZED:
//   - 1:M  — a location owns many events / random NPCs; a character owns many
//            dialogue lines / quests; a dungeon owns many rooms / monsters.
//   - M:N  — characters <-> locations (named-NPC appearances, each carrying a
//            blurb) via `location_characters`; and location <-> location
//            ("connected areas") via the self-join `location_connections`.
import type {
  Adventure, Attack, Character, Dungeon, GameSession, Location, MinimalEntity,
  Page, PageKind, PartyMember, User,
} from './types';

export const SCHEMA: string[] = [
  // --- identity (mirrors edhzero) ---
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT, name TEXT, picture TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY, user_id TEXT NOT NULL,
    created_at INTEGER, expires_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,

  // --- the adventure (parent; owner = the DM who may edit it) ---
  `CREATE TABLE IF NOT EXISTS adventures (
    id TEXT PRIMARY KEY,
    owner_id TEXT,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    overview TEXT NOT NULL DEFAULT '',
    created_at INTEGER
  )`,

  // --- characters (NPCs) ---
  `CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY,
    adventure_id TEXT NOT NULL,
    code TEXT,
    name TEXT NOT NULL,
    title TEXT,
    age INTEGER,
    race TEXT,
    alignment TEXT,
    detail_one TEXT,
    strength INTEGER, dexterity INTEGER, constitution INTEGER,
    intelligence INTEGER, wisdom INTEGER, charisma INTEGER,
    challenge_rating REAL, armor_class INTEGER, hit_points INTEGER,
    speed INTEGER, passive_perception INTEGER, proficiency_bonus INTEGER,
    attack_json TEXT, spells_json TEXT, skills_json TEXT,
    roleplay_inspiration TEXT, motivation TEXT, dm_notes TEXT, visual_description TEXT,
    image TEXT, page INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_characters_adventure ON characters(adventure_id)`,
  `CREATE TABLE IF NOT EXISTS character_dialogue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL, type TEXT, text TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_dialogue_character ON character_dialogue(character_id)`,
  `CREATE TABLE IF NOT EXISTS character_quests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL, prompt TEXT, reward TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_quests_character ON character_quests(character_id)`,
  `CREATE TABLE IF NOT EXISTS character_misc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER NOT NULL, key TEXT, value TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_misc_character ON character_misc(character_id)`,

  // --- locations ---
  `CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY,
    adventure_id TEXT NOT NULL,
    code TEXT,
    name TEXT NOT NULL,
    inspiration TEXT,
    exterior TEXT, interior TEXT, detail_one TEXT, detail_two TEXT,
    crowd TEXT, dm_notes TEXT, image TEXT, page INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_locations_adventure ON locations(adventure_id)`,
  `CREATE TABLE IF NOT EXISTS location_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL, text TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_events_location ON location_events(location_id)`,
  `CREATE TABLE IF NOT EXISTS location_random_npcs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    name TEXT, race TEXT, job TEXT, description TEXT, dialogue TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_randomnpcs_location ON location_random_npcs(location_id)`,

  // --- M:N — characters <-> locations (named-NPC appearances, with a blurb) ---
  `CREATE TABLE IF NOT EXISTS location_characters (
    location_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    description TEXT,
    ord INTEGER,
    PRIMARY KEY (location_id, character_id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_loc_chars_char ON location_characters(character_id)`,

  // --- M:N — location <-> location ("connected areas", self-join) ---
  `CREATE TABLE IF NOT EXISTS location_connections (
    location_id INTEGER NOT NULL,
    connected_location_id INTEGER NOT NULL,
    PRIMARY KEY (location_id, connected_location_id)
  )`,

  // --- dungeons ---
  `CREATE TABLE IF NOT EXISTS dungeons (
    id INTEGER PRIMARY KEY,
    adventure_id TEXT NOT NULL,
    code TEXT, title TEXT, dm_notes TEXT, image TEXT, page INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_dungeons_adventure ON dungeons(adventure_id)`,
  `CREATE TABLE IF NOT EXISTS dungeon_rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dungeon_id INTEGER NOT NULL, num INTEGER, title TEXT, description TEXT,
    events_json TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_rooms_dungeon ON dungeon_rooms(dungeon_id)`,
  `CREATE TABLE IF NOT EXISTS dungeon_monsters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dungeon_id INTEGER NOT NULL,
    code TEXT, name TEXT, race TEXT, alignment TEXT,
    strength INTEGER, dexterity INTEGER, constitution INTEGER,
    intelligence INTEGER, wisdom INTEGER, charisma INTEGER,
    challenge_rating REAL, armor_class INTEGER, hit_points INTEGER,
    speed INTEGER, passive_perception INTEGER, proficiency_bonus INTEGER,
    attack_json TEXT, skills_json TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_monsters_dungeon ON dungeon_monsters(dungeon_id)`,
  `CREATE TABLE IF NOT EXISTS dungeon_misc (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dungeon_id INTEGER NOT NULL, key TEXT, value TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_misc_dungeon ON dungeon_misc(dungeon_id)`,

  // --- ordering: the reading sequence of the adventure ---
  `CREATE TABLE IF NOT EXISTS pages (
    adventure_id TEXT NOT NULL,
    position INTEGER NOT NULL,
    kind TEXT NOT NULL,
    ref_id INTEGER NOT NULL,
    PRIMARY KEY (adventure_id, position)
  )`,

  // --- live per-game-session state ---
  `CREATE TABLE IF NOT EXISTS game_sessions (
    id TEXT PRIMARY KEY,
    adventure_id TEXT NOT NULL,
    dm_id TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    created_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_game_sessions_dm ON game_sessions(dm_id)`,
  `CREATE TABLE IF NOT EXISTS session_reveals (
    game_session_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    ref_id INTEGER NOT NULL,
    PRIMARY KEY (game_session_id, kind, ref_id)
  )`,
  `CREATE TABLE IF NOT EXISTS session_party (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_session_id TEXT NOT NULL,
    player_name TEXT NOT NULL,
    current_hp INTEGER, max_hp INTEGER, location_id INTEGER, notes TEXT, ord INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS idx_party_session ON session_party(game_session_id)`,
];

export async function createSchema(db: D1Database): Promise<void> {
  for (const stmt of SCHEMA) await db.prepare(stmt).run();
}

let schemaReady: Promise<void> | null = null;
/** Memoized schema creation for the request path. */
export function ensureSchema(db: D1Database): Promise<void> {
  return (schemaReady ??= createSchema(db));
}

// --- small helpers ----------------------------------------------------------
const u = <T>(v: T | null): T | undefined => (v == null ? undefined : v);
const parseJson = <T>(s: string | null, fallback: T): T => {
  if (!s) return fallback;
  try { return JSON.parse(s) as T; } catch { return fallback; }
};

// ---------------------------------------------------------------------------
// Identity (mirrors edhzero)
// ---------------------------------------------------------------------------
interface UserRow { id: string; email: string | null; name: string | null; picture: string | null }
const rowToUser = (r: UserRow): User =>
  ({ id: r.id, email: r.email ?? '', name: r.name ?? r.email ?? r.id, picture: u(r.picture) });

export async function upsertUser(db: D1Database, user: User): Promise<void> {
  await db
    .prepare(`INSERT OR REPLACE INTO users (id, email, name, picture) VALUES (?1, ?2, ?3, ?4)`)
    .bind(user.id, user.email ?? null, user.name ?? null, user.picture ?? null)
    .run();
}

export async function createSessionRow(
  db: D1Database, sid: string, userId: string, createdAt: number, expiresAt: number | null,
): Promise<void> {
  await db
    .prepare(`INSERT INTO sessions (sid, user_id, created_at, expires_at) VALUES (?1, ?2, ?3, ?4)`)
    .bind(sid, userId, createdAt, expiresAt)
    .run();
}

export async function getSessionUser(db: D1Database, sid: string, now: number): Promise<User | null> {
  const row = await db
    .prepare(
      `SELECT u.id, u.email, u.name, u.picture FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.sid = ?1 AND (s.expires_at IS NULL OR s.expires_at > ?2)`,
    )
    .bind(sid, now)
    .first<UserRow>();
  return row ? rowToUser(row) : null;
}

export async function deleteSessionRow(db: D1Database, sid: string): Promise<void> {
  await db.prepare(`DELETE FROM sessions WHERE sid = ?1`).bind(sid).run();
}

// ---------------------------------------------------------------------------
// Adventures
// ---------------------------------------------------------------------------
interface AdventureRow {
  id: string; owner_id: string | null; slug: string; title: string;
  overview: string; created_at: number | null;
}
const rowToAdventure = (r: AdventureRow): Adventure => ({
  id: r.id, ownerId: r.owner_id, slug: r.slug, title: r.title,
  overview: r.overview, createdAt: r.created_at ?? 0,
});

export async function getAdventureBySlug(db: D1Database, slug: string): Promise<Adventure | null> {
  const row = await db.prepare(`SELECT * FROM adventures WHERE slug = ?1`).bind(slug).first<AdventureRow>();
  return row ? rowToAdventure(row) : null;
}

export async function getAdventure(db: D1Database, id: string): Promise<Adventure | null> {
  const row = await db.prepare(`SELECT * FROM adventures WHERE id = ?1`).bind(id).first<AdventureRow>();
  return row ? rowToAdventure(row) : null;
}

/** The default/sample adventure (first by creation), used when no slug is given. */
export async function getDefaultAdventure(db: D1Database): Promise<Adventure | null> {
  const row = await db
    .prepare(`SELECT * FROM adventures ORDER BY created_at, slug LIMIT 1`)
    .first<AdventureRow>();
  return row ? rowToAdventure(row) : null;
}

// ---------------------------------------------------------------------------
// Pages (ordering)
// ---------------------------------------------------------------------------
export async function getPages(db: D1Database, adventureId: string): Promise<Page[]> {
  const { results } = await db
    .prepare(`SELECT position, kind, ref_id FROM pages WHERE adventure_id = ?1 ORDER BY position`)
    .bind(adventureId)
    .all<{ position: number; kind: PageKind; ref_id: number }>();
  return results.map((r) => ({ position: r.position, kind: r.kind, refId: r.ref_id }));
}

// ---------------------------------------------------------------------------
// Characters (with 1:M children + M:N locations)
// ---------------------------------------------------------------------------
interface CharacterRow {
  id: number; code: string | null; name: string; title: string | null;
  age: number | null; race: string | null; alignment: string | null; detail_one: string | null;
  strength: number; dexterity: number; constitution: number;
  intelligence: number; wisdom: number; charisma: number;
  challenge_rating: number; armor_class: number; hit_points: number;
  speed: number; passive_perception: number; proficiency_bonus: number;
  attack_json: string | null; spells_json: string | null; skills_json: string | null;
  roleplay_inspiration: string | null; motivation: string | null; dm_notes: string | null;
  visual_description: string | null; image: string | null; page: number | null;
}

async function hydrateCharacter(db: D1Database, r: CharacterRow): Promise<Character> {
  const [dialogue, quests, misc, locations] = await Promise.all([
    db.prepare(`SELECT type, text FROM character_dialogue WHERE character_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ type: string; text: string }>(),
    db.prepare(`SELECT prompt, reward FROM character_quests WHERE character_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ prompt: string; reward: string }>(),
    db.prepare(`SELECT key, value FROM character_misc WHERE character_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ key: string; value: string }>(),
    db.prepare(
      `SELECT l.id, l.name, lc.description FROM location_characters lc
       JOIN locations l ON l.id = lc.location_id
       WHERE lc.character_id = ?1 ORDER BY lc.ord`,
    ).bind(r.id).all<{ id: number; name: string; description: string }>(),
  ]);
  return {
    id: r.id, code: r.code ?? '', name: r.name, title: r.title ?? '',
    age: r.age, race: r.race ?? '', alignment: r.alignment ?? '', detailOne: r.detail_one ?? '',
    strength: r.strength, dexterity: r.dexterity, constitution: r.constitution,
    intelligence: r.intelligence, wisdom: r.wisdom, charisma: r.charisma,
    challengeRating: r.challenge_rating, armorClass: r.armor_class, hitPoints: r.hit_points,
    speed: r.speed, passivePerception: r.passive_perception, proficiencyBonus: r.proficiency_bonus,
    attack: parseJson<Attack | null>(r.attack_json, null),
    skills: parseJson<string[]>(r.skills_json, []),
    spells: parseJson<string[]>(r.spells_json, []),
    roleplayInspiration: r.roleplay_inspiration ?? '', motivation: r.motivation ?? '',
    dmNotes: r.dm_notes ?? '', visualDescription: r.visual_description ?? '',
    image: r.image, page: r.page,
    dialogue: dialogue.results, quests: quests.results, misc: misc.results,
    locations: locations.results,
  };
}

export async function getCharacter(db: D1Database, adventureId: string, id: number): Promise<Character | null> {
  const r = await db
    .prepare(`SELECT * FROM characters WHERE adventure_id = ?1 AND id = ?2`)
    .bind(adventureId, id).first<CharacterRow>();
  return r ? hydrateCharacter(db, r) : null;
}

// ---------------------------------------------------------------------------
// Locations (with 1:M children + M:N characters + M:N connections)
// ---------------------------------------------------------------------------
interface LocationRow {
  id: number; code: string | null; name: string; inspiration: string | null;
  exterior: string | null; interior: string | null; detail_one: string | null;
  detail_two: string | null; crowd: string | null; dm_notes: string | null;
  image: string | null; page: number | null;
}

async function hydrateLocation(db: D1Database, r: LocationRow): Promise<Location> {
  const [events, randomNpcs, characters, connections] = await Promise.all([
    db.prepare(`SELECT text FROM location_events WHERE location_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ text: string }>(),
    db.prepare(
      `SELECT name, race, job, description, dialogue FROM location_random_npcs
       WHERE location_id = ?1 ORDER BY ord`,
    ).bind(r.id).all<{ name: string; race: string; job: string; description: string; dialogue: string }>(),
    db.prepare(
      `SELECT c.id, c.name, c.title, c.code, lc.description FROM location_characters lc
       JOIN characters c ON c.id = lc.character_id
       WHERE lc.location_id = ?1 ORDER BY lc.ord`,
    ).bind(r.id).all<{ id: number; name: string; title: string; code: string; description: string }>(),
    db.prepare(
      `SELECT l.id, l.name, l.code, l.exterior FROM location_connections lc
       JOIN locations l ON l.id = lc.connected_location_id
       WHERE lc.location_id = ?1 ORDER BY l.id`,
    ).bind(r.id).all<{ id: number; name: string; code: string; exterior: string }>(),
  ]);
  return {
    id: r.id, code: r.code ?? '', name: r.name, inspiration: r.inspiration ?? '',
    exterior: r.exterior ?? '', interior: r.interior ?? '', detailOne: r.detail_one ?? '',
    detailTwo: r.detail_two ?? '', crowd: r.crowd ?? '', dmNotes: r.dm_notes ?? '',
    image: r.image, page: r.page,
    events: events.results.map((e) => e.text),
    randomNpcs: randomNpcs.results,
    characters: characters.results,
    connections: connections.results,
  };
}

export async function getLocation(db: D1Database, adventureId: string, id: number): Promise<Location | null> {
  const r = await db
    .prepare(`SELECT * FROM locations WHERE adventure_id = ?1 AND id = ?2`)
    .bind(adventureId, id).first<LocationRow>();
  return r ? hydrateLocation(db, r) : null;
}

// ---------------------------------------------------------------------------
// Dungeons (with 1:M rooms + monsters)
// ---------------------------------------------------------------------------
interface DungeonRow {
  id: number; code: string | null; title: string | null; dm_notes: string | null;
  image: string | null; page: number | null;
}
interface MonsterRow {
  code: string | null; name: string | null; race: string | null; alignment: string | null;
  strength: number; dexterity: number; constitution: number;
  intelligence: number; wisdom: number; charisma: number;
  challenge_rating: number; armor_class: number; hit_points: number;
  speed: number; passive_perception: number; proficiency_bonus: number;
  attack_json: string | null; skills_json: string | null;
}

async function hydrateDungeon(db: D1Database, r: DungeonRow): Promise<Dungeon> {
  const [rooms, monsters, misc] = await Promise.all([
    db.prepare(`SELECT num, title, description, events_json FROM dungeon_rooms WHERE dungeon_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ num: number; title: string; description: string; events_json: string | null }>(),
    db.prepare(`SELECT * FROM dungeon_monsters WHERE dungeon_id = ?1 ORDER BY ord`)
      .bind(r.id).all<MonsterRow>(),
    db.prepare(`SELECT key, value FROM dungeon_misc WHERE dungeon_id = ?1 ORDER BY ord`)
      .bind(r.id).all<{ key: string; value: string }>(),
  ]);
  return {
    id: r.id, code: r.code ?? '', title: r.title ?? '', dmNotes: r.dm_notes ?? '',
    image: r.image, page: r.page,
    rooms: rooms.results.map((rm) => ({
      num: rm.num, title: rm.title, description: rm.description,
      events: parseJson<string[]>(rm.events_json, []),
    })),
    monsters: monsters.results.map((m) => ({
      code: m.code ?? '', name: m.name ?? '', race: m.race ?? '', alignment: m.alignment ?? '',
      strength: m.strength, dexterity: m.dexterity, constitution: m.constitution,
      intelligence: m.intelligence, wisdom: m.wisdom, charisma: m.charisma,
      challengeRating: m.challenge_rating, armorClass: m.armor_class, hitPoints: m.hit_points,
      speed: m.speed, passivePerception: m.passive_perception, proficiencyBonus: m.proficiency_bonus,
      attack: parseJson<Attack | null>(m.attack_json, null),
      skills: parseJson<string[]>(m.skills_json, []),
      // Avatar derived from the code, mirroring the original React StatBlock.
      image: m.code ? `/img/monsters/${m.code}.png` : null,
    })),
    misc: misc.results,
  };
}

export async function getDungeon(db: D1Database, adventureId: string, id: number): Promise<Dungeon | null> {
  const r = await db
    .prepare(`SELECT * FROM dungeons WHERE adventure_id = ?1 AND id = ?2`)
    .bind(adventureId, id).first<DungeonRow>();
  return r ? hydrateDungeon(db, r) : null;
}

// ---------------------------------------------------------------------------
// Minimal (player-view) lookups — just name + image
// ---------------------------------------------------------------------------
const MINIMAL_TABLE: Record<PageKind, string> = {
  location: 'locations',
  character: 'characters',
  dungeon: 'dungeons',
};

/** Resolve one entity to the player-facing minimum: name + image. */
export async function getMinimal(
  db: D1Database, adventureId: string, kind: PageKind, id: number,
): Promise<MinimalEntity | null> {
  const nameCol = kind === 'dungeon' ? 'title' : 'name';
  const row = await db
    .prepare(`SELECT ${nameCol} AS name, image FROM ${MINIMAL_TABLE[kind]} WHERE adventure_id = ?1 AND id = ?2`)
    .bind(adventureId, id)
    .first<{ name: string; image: string | null }>();
  return row ? { kind, id, name: row.name ?? '', image: row.image } : null;
}

// ---------------------------------------------------------------------------
// Game sessions (live state) — Phase 5
// ---------------------------------------------------------------------------
interface GameSessionRow {
  id: string; adventure_id: string; dm_id: string; name: string; created_at: number | null;
}
const rowToGameSession = (r: GameSessionRow): GameSession => ({
  id: r.id, adventureId: r.adventure_id, dmId: r.dm_id, name: r.name, createdAt: r.created_at ?? 0,
});

export async function createGameSession(
  db: D1Database, id: string, adventureId: string, dmId: string, name: string, now: number,
): Promise<void> {
  await db
    .prepare(`INSERT INTO game_sessions (id, adventure_id, dm_id, name, created_at) VALUES (?1, ?2, ?3, ?4, ?5)`)
    .bind(id, adventureId, dmId, name, now)
    .run();
}

export async function getGameSession(db: D1Database, id: string): Promise<GameSession | null> {
  const row = await db.prepare(`SELECT * FROM game_sessions WHERE id = ?1`).bind(id).first<GameSessionRow>();
  return row ? rowToGameSession(row) : null;
}

export async function listGameSessionsForDm(db: D1Database, dmId: string): Promise<GameSession[]> {
  const { results } = await db
    .prepare(`SELECT * FROM game_sessions WHERE dm_id = ?1 ORDER BY created_at DESC`)
    .bind(dmId).all<GameSessionRow>();
  return results.map(rowToGameSession);
}

export async function getReveals(db: D1Database, gameSessionId: string): Promise<Page[]> {
  const { results } = await db
    .prepare(`SELECT kind, ref_id FROM session_reveals WHERE game_session_id = ?1`)
    .bind(gameSessionId).all<{ kind: PageKind; ref_id: number }>();
  return results.map((r, i) => ({ position: i, kind: r.kind, refId: r.ref_id }));
}

export async function isRevealed(
  db: D1Database, gameSessionId: string, kind: PageKind, refId: number,
): Promise<boolean> {
  const row = await db
    .prepare(`SELECT 1 AS hit FROM session_reveals WHERE game_session_id = ?1 AND kind = ?2 AND ref_id = ?3`)
    .bind(gameSessionId, kind, refId).first<{ hit: number }>();
  return !!row;
}

export async function addReveal(db: D1Database, gameSessionId: string, kind: PageKind, refId: number): Promise<void> {
  await db
    .prepare(`INSERT OR IGNORE INTO session_reveals (game_session_id, kind, ref_id) VALUES (?1, ?2, ?3)`)
    .bind(gameSessionId, kind, refId).run();
}

export async function removeReveal(db: D1Database, gameSessionId: string, kind: PageKind, refId: number): Promise<void> {
  await db
    .prepare(`DELETE FROM session_reveals WHERE game_session_id = ?1 AND kind = ?2 AND ref_id = ?3`)
    .bind(gameSessionId, kind, refId).run();
}

interface PartyRow {
  id: number; player_name: string; current_hp: number | null; max_hp: number | null;
  location_id: number | null; notes: string | null;
}
const rowToParty = (r: PartyRow): PartyMember => ({
  id: r.id, playerName: r.player_name, currentHp: r.current_hp, maxHp: r.max_hp,
  locationId: r.location_id, notes: r.notes ?? '',
});

export async function getParty(db: D1Database, gameSessionId: string): Promise<PartyMember[]> {
  const { results } = await db
    .prepare(`SELECT * FROM session_party WHERE game_session_id = ?1 ORDER BY ord, id`)
    .bind(gameSessionId).all<PartyRow>();
  return results.map(rowToParty);
}

export async function addPartyMember(
  db: D1Database, gameSessionId: string, m: Omit<PartyMember, 'id'>, ord: number,
): Promise<number> {
  const res = await db
    .prepare(
      `INSERT INTO session_party (game_session_id, player_name, current_hp, max_hp, location_id, notes, ord)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
    )
    .bind(gameSessionId, m.playerName, m.currentHp, m.maxHp, m.locationId, m.notes, ord)
    .run();
  return Number(res.meta.last_row_id ?? 0);
}

export async function updatePartyMember(
  db: D1Database, gameSessionId: string, id: number, patch: Partial<Omit<PartyMember, 'id'>>,
): Promise<void> {
  const cur = await db
    .prepare(`SELECT * FROM session_party WHERE game_session_id = ?1 AND id = ?2`)
    .bind(gameSessionId, id).first<PartyRow>();
  if (!cur) return;
  const m = rowToParty(cur);
  await db
    .prepare(
      `UPDATE session_party SET player_name = ?3, current_hp = ?4, max_hp = ?5, location_id = ?6, notes = ?7
       WHERE game_session_id = ?1 AND id = ?2`,
    )
    .bind(
      gameSessionId, id,
      patch.playerName ?? m.playerName,
      patch.currentHp ?? m.currentHp,
      patch.maxHp ?? m.maxHp,
      patch.locationId ?? m.locationId,
      patch.notes ?? m.notes,
    )
    .run();
}

export async function removePartyMember(db: D1Database, gameSessionId: string, id: number): Promise<void> {
  await db.prepare(`DELETE FROM session_party WHERE game_session_id = ?1 AND id = ?2`)
    .bind(gameSessionId, id).run();
}
