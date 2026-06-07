# Freeside

A run-from-the-page homebrew D&D adventure, delivered as a web app.

Freeside started life as a static [Create React App](https://create-react-app.dev/)
page that rendered a single hand-authored `data.ts`. It is now a **Cloudflare
Worker** (Hono) backed by a **normalized D1 database**, with a **native
Web-Components** frontend and **no build step** — modeled on the `edhzero`
architecture.

## What it does

- **DM view** — the full "book": every location, NPC, and dungeon with stat
  blocks, dialogue, quests, events, and the relationships between them. Sign in
  (Google / Discord) to edit content in the browser.
- **Game sessions** — the DM creates a session and **reveals** locations and
  faces as the party discovers them, and tracks party HP.
- **Player view** — a shareable `/play/<session>` link showing **only** what the
  DM has revealed, as a **minimal name + image** gallery. No spoilers, no stats.

## The data model

The adventure is stored relationally (the headline change from the static app):

| Relationship | Tables |
| --- | --- |
| Location → events / random NPCs (1:M) | `location_events`, `location_random_npcs` |
| Character → dialogue / quests / misc (1:M) | `character_dialogue`, `character_quests`, `character_misc` |
| Dungeon → rooms / monsters (1:M) | `dungeon_rooms`, `dungeon_monsters` |
| **Characters ↔ Locations (M:N)** — named-NPC appearances | `location_characters` |
| **Locations ↔ Locations (M:N)** — connected areas | `location_connections` |
| Reading order | `pages` |

## Quick start

```bash
npm install
npm run db:seed:local   # build the adventure SQL from the source + load local D1
npm run dev             # http://localhost:8787  (dev-login enabled)
```

Open the app, click **Dev login** (or sign in), browse the **Adventure**, then
create a **Game session**, reveal a few entities, and open the **player link**
in another tab.

## Tests

```bash
npm test          # Vitest API/D1 tests (real D1 in the Workers runtime)
npm run test:e2e  # Playwright happy-path (boots its own wrangler dev)
npm run check     # typecheck + unit + e2e
```

## Deploying

1. Create the database and paste its id into `wrangler.toml`:
   ```bash
   npx wrangler d1 create freeside-adventure
   ```
2. Set OAuth secrets (register `https://<your-domain>/auth/{google,discord}/callback`):
   ```bash
   npx wrangler secret put GOOGLE_CLIENT_ID
   npx wrangler secret put GOOGLE_CLIENT_SECRET
   npx wrangler secret put DISCORD_CLIENT_ID
   npx wrangler secret put DISCORD_CLIENT_SECRET
   ```
3. Deploy and seed the remote DB:
   ```bash
   npm run deploy
   npm run build:adventure && npm run db:load   # loads db/adventure.sql into remote D1
   ```

Do **not** set `ALLOW_DEV_LOGIN` in production — it gates a passwordless login
used only for local dev and E2E.

## Editing the adventure content

Two ways:

- **In the browser** (DM, signed in): edit location/character fields and the
  character↔location links live; changes persist to D1.
- **At the source**: edit `scripts/adventure-source.ts`, then
  `npm run db:seed:local` to regenerate and reload.

See `CLAUDE.md` for the full development playbook.
