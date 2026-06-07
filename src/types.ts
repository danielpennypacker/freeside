// Shared types for the Worker.

export interface Bindings {
  /** Static assets binding (serves ./public). */
  ASSETS: Fetcher;
  /** Everything: adventure content, users, sessions, game-session state. */
  DB: D1Database;
  /** Google OAuth credentials (secrets; absent in tests). */
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  /** Discord OAuth credentials (secrets; absent in tests). */
  DISCORD_CLIENT_ID?: string;
  DISCORD_CLIENT_SECRET?: string;
  /** When "true", enables the dev-only /auth/dev-login endpoint (local + E2E). */
  ALLOW_DEV_LOGIN?: string;
}

/** Hono environment: bindings + per-request variables. */
export interface AppEnv {
  Bindings: Bindings;
  Variables: { user: User };
}

export interface User {
  /** Google `sub`, `discord:<id>`, or `dev:<email>` for dev-login. */
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// ---------------------------------------------------------------------------
// Adventure content
// ---------------------------------------------------------------------------

/** A single adventure (the parent record; owner = the DM who may edit it). */
export interface Adventure {
  id: string;
  ownerId: string | null;
  slug: string;
  title: string;
  overview: string;
  createdAt: number;
}

/** An ordered page in the adventure — points at one content entity. */
export type PageKind = 'location' | 'character' | 'dungeon';
export interface Page {
  position: number;
  kind: PageKind;
  refId: number;
}

/** A combat attack line, kept as a small structured blob. */
export interface Attack {
  description?: string;
  damage: string;
  bonus: number;
  range: number;
  multi?: number;
}

/** D&D ability/derived stats shared by characters and monsters. */
export interface StatBlock {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  challengeRating: number;
  armorClass: number;
  hitPoints: number;
  speed: number;
  passivePerception: number;
  proficiencyBonus: number;
  attack?: Attack | null;
  skills: string[];
}

/** A character/NPC, fully hydrated with its 1:M children and M:N locations. */
export interface Character extends StatBlock {
  id: number;
  code: string;
  name: string;
  title: string;
  age: number | null;
  race: string;
  alignment: string;
  detailOne: string;
  spells: string[];
  roleplayInspiration: string;
  motivation: string;
  dmNotes: string;
  visualDescription: string;
  image: string | null;
  page: number | null;
  /** 1:M owned children. */
  dialogue: { type: string; text: string }[];
  quests: { prompt: string; reward: string }[];
  misc: { key: string; value: string }[];
  /** M:N — locations this character appears at (with the per-appearance blurb). */
  locations: { id: number; name: string; description: string }[];
}

/** A random (flavour) NPC owned by a location. */
export interface RandomNpc {
  name: string;
  race: string;
  job: string;
  description: string;
  dialogue: string;
}

/** A location, fully hydrated with its 1:M children and both M:N relations. */
export interface Location {
  id: number;
  code: string;
  name: string;
  inspiration: string;
  exterior: string;
  interior: string;
  detailOne: string;
  detailTwo: string;
  crowd: string;
  dmNotes: string;
  image: string | null;
  page: number | null;
  /** 1:M owned children. */
  events: string[];
  randomNpcs: RandomNpc[];
  /** M:N — named characters appearing here (with the per-appearance blurb). */
  characters: { id: number; name: string; title: string; code: string; description: string }[];
  /** M:N — connected locations (self-join). */
  connections: { id: number; name: string; code: string; exterior: string }[];
}

export interface DungeonRoom {
  num: number;
  title: string;
  description: string;
  events: string[];
}

export interface Monster extends StatBlock {
  code: string;
  name: string;
  race: string;
  alignment: string;
  /** Avatar path derived from the code (/img/monsters/<code>.png). */
  image: string | null;
}

export interface Dungeon {
  id: number;
  code: string;
  title: string;
  dmNotes: string;
  image: string | null;
  page: number | null;
  rooms: DungeonRoom[];
  monsters: Monster[];
  /** 1:M misc key/value notes (the React "Misc." table). */
  misc: { key: string; value: string }[];
}

/** Minimal player-facing record — just enough to show a name + image. */
export interface MinimalEntity {
  kind: PageKind;
  id: number;
  name: string;
  image: string | null;
}

// ---------------------------------------------------------------------------
// Per-game-session state (a live table of play)
// ---------------------------------------------------------------------------

export interface GameSession {
  id: string;
  adventureId: string;
  dmId: string;
  name: string;
  createdAt: number;
}

export interface PartyMember {
  id: number;
  playerName: string;
  currentHp: number | null;
  maxHp: number | null;
  locationId: number | null;
  notes: string;
}
