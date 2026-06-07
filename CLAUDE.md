# CLAUDE.md — working in freeside

Freeside is an original homebrew D&D adventure delivered as a web app. It began
as a static Create-React-App page driven by one big `data.ts`; it is now a
Cloudflare Worker with a normalized D1 datastore and a native-Web-Components
frontend, modeled on the `edhzero` paradigm. This file is the development
playbook: **how we build here.** See `README.md` for the product overview.

## Stack (at a glance)

- **Worker**: Hono (`src/`). Handles `/api/*` + `/auth/*`; everything else is a
  static asset served from `./public`. Entry: `src/index.ts`.
- **D1** (`DB` binding): the single datastore — adventure content, identity
  (`users`/`sessions`), and live per-game-session state. Schema + queries in
  `src/db.ts` (`SCHEMA`, `ensureSchema`).
- **Frontend**: native Web Components + `fetch()` (`public/app.js`). No
  framework, **no build step**.
- **Seed**: the original hand-authored content lives in
  `scripts/adventure-source.ts` (the old React `data.ts`). `npm run
  build:adventure` turns it into `db/adventure.sql` (self-contained: schema +
  data); `npm run db:load:local` imports it.
- **Tests**: Vitest + `@cloudflare/vitest-pool-workers` (in-runtime, real D1)
  and Playwright (UI).

## The data model (this is the point)

The adventure is **normalized**, not a JSON blob:

- **1:M** — a `location` owns many `location_events` / `location_random_npcs`;
  a `character` owns many `character_dialogue` / `character_quests` /
  `character_misc`; a `dungeon` owns many `dungeon_rooms` / `dungeon_monsters`.
- **M:N** — `location_characters` joins characters ↔ locations (named-NPC
  appearances, each row carrying a `description` blurb). A character appears at
  many locations; a location hosts many characters.
- **M:N (self-join)** — `location_connections` joins locations ↔ locations
  ("connected areas").
- `pages` holds the reading order (`kind` + `ref_id`).

The Worker hydrates these into the rich shapes in `src/types.ts`; `app.js`
renders them. **Never collapse a relation back into a JSON column** — the
normalized tables ARE the feature.

## DM vs player

- **DM** (signed in via Google/Discord, or dev-login): sees the full book
  (`/api/adventure`, `/api/characters|locations|dungeons/:id`), can edit
  (owner-scoped CMS in `src/cms.ts`), and runs game sessions (`src/games.ts`).
  The first DM to `POST /api/adventure/claim` owns the seeded adventure.
- **Player**: visits `/play/<sessionId>` — a PUBLIC, auth-free, **minimal** view
  (`GET /api/play/:id`) that returns only the DM-revealed entities as
  `{ kind, id, name, image }`. No stats, dialogue, or DM notes ever cross to it.

## Development workflow — TDD

1. **Red** — write/extend a test that describes the behavior; watch it fail.
   - API / D1 logic → `test/*.test.ts` (Vitest, real `DB`; seed with
     `seedAdventure()` from `test/helpers.ts`).
   - User-facing flows → `e2e/*.spec.ts` (Playwright against `wrangler dev`;
     `e2e/global-setup.ts` seeds the isolated E2E D1).
2. **Green** — smallest change to pass.
3. **Refactor** — clean up with tests green.
4. `npm run check` before declaring done.

## Commands

```bash
npm run dev            # wrangler dev → http://localhost:8787 (D1 simulated, dev-login on)
npm run build:adventure  # scripts/adventure-source.ts -> db/adventure.sql
npm run db:load:local  # import db/adventure.sql into local D1
npm run db:seed:local  # build:adventure + db:load:local in one shot
npm test               # Vitest (fast inner loop)
npm run test:e2e       # Playwright happy-path (boots its own wrangler dev on 8788)
npm run typecheck      # tsc --noEmit (src only)
npm run check          # typecheck + unit + e2e
npm run deploy         # wrangler deploy (needs real D1 id + OAuth secrets)
```

## Conventions & invariants

- **D1 is the single datastore.** Schema is created lazily by `ensureSchema`
  (memoized per isolate) and is also emitted into `db/adventure.sql` so the seed
  is self-contained. Keep both in sync — `build:adventure` imports `SCHEMA` from
  `src/db.ts`, so there's one source of truth.
- **Web Components**: one custom element per concern, open shadow DOM, styles via
  the shared `baseStyles` constructable stylesheet. Add `data-testid` /
  `data-name` hooks for Playwright (its selectors pierce open shadow DOM).
- **Book layouts mirror the original React components** (`Character`/`Location`/
  `Dungeon`/`StatBlock`). Everything on `/#book` is rendered from D1 — there is no
  hard-coded content. Note the React `Dungeon` deliberately did **not** render
  `room.events`, so the Web Component doesn't either (the data is still stored).
- **Entity ids match the original React `addId` reading-order numbering**: the
  migration reuses the `.id`/`.page` that `adventure-source.ts` stamps onto each
  entity (locations 1,2,3…; characters 1,2,3…; **dungeons 1,3,5…**). Entities not
  in the reading order (e.g. the unplaced character `cloaked`) get a trailing id.
  Don't renumber by array index — it desyncs the displayed L#/C#/D# from the book.
- **Auth is per-route, never blanket.** A `app.use('*', requireAuth)` on a
  sub-app mounted at `/api` will intercept sibling sub-apps — including the
  PUBLIC `/api/play` view. Apply `requireAuth` as a per-route middleware
  (see `src/cms.ts`).
- **Images are static** under `public/img/{characters,locations,dungeons,monsters}/<code>.png`
  and referenced by stored path. The player view shows name + image only.
- **Sessions** are HttpOnly cookies (`freeside_session`) backed by the `sessions`
  table; OAuth shares one flow in `src/auth.ts` (provider modules `google.ts` /
  `discord.ts`). Discord ids are namespaced `discord:<id>`.

## Gotchas

- `@cloudflare/vitest-pool-workers` v4 exposes config as a Vite **plugin**
  (`cloudflareTest(...)` in `plugins:`), not the old `defineWorkersConfig`.
- The pool no longer isolates storage per test, so `loginAs()` mints a unique
  user by default and `seedAdventure()` is idempotent (delete-then-insert).
- `scripts/adventure-source.ts` still contains a couple of stray `console.log`s
  from the original `d()` helper — harmless build-time noise.
- `wrangler.toml` ships a placeholder `database_id` — fine for local/test; must
  be a real id before deploy.

## Status

1. ✅ Scaffold — Worker + static assets + dev-login.
2. ✅ Normalized D1 schema + `build:adventure` seed (1:M + M:N relations).
3. ✅ Content read API (full hydrated DM view).
4. ✅ Web Components frontend (book, session console, player view) — no build.
5. ✅ Google + Discord OAuth + sessions; owner-scoped CMS editing.
6. ✅ Per-game-session state — reveals + party tracker; minimal player view.
7. ✅ Vitest + Playwright suites green.
8. ⬜ Production deploy (create real D1, set OAuth secrets, `db:load`).
9. ⬜ CI/CD.
