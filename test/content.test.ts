import { SELF } from 'cloudflare:test';
import { describe, it, expect, beforeEach } from 'vitest';
import { seedAdventure, expectStatus } from './helpers';

describe('content API', () => {
  beforeEach(async () => { await seedAdventure(); });

  it('serves the adventure index with ordered pages', async () => {
    const res = await SELF.fetch('https://x/api/adventure');
    expectStatus(res, 200);
    const { adventure, pages } = (await res.json()) as any;
    expect(adventure.title).toBe('Freeside');
    expect(pages.map((p: any) => `${p.kind}:${p.refId}`)).toEqual(['location:1', 'character:1', 'location:2']);
  });

  it('hydrates a location with its 1:M children and BOTH M:N relations', async () => {
    const res = await SELF.fetch('https://x/api/locations/1');
    expectStatus(res, 200);
    const { location } = (await res.json()) as any;
    expect(location.name).toBe('Theives Port');
    // 1:M owned children
    expect(location.events).toEqual(['A fight breaks out.']);
    // M:N — named characters at this location (a location has MANY characters)
    expect(location.characters.map((c: any) => c.name).sort()).toEqual(['Ann', 'Boz']);
    expect(location.characters.find((c: any) => c.name === 'Boz').description).toBe('pointing at a map');
    // M:N — connected areas
    expect(location.connections.map((c: any) => c.id)).toEqual([2]);
  });

  it('hydrates a character with the M:N inverse (a character appears at MANY locations)', async () => {
    const res = await SELF.fetch('https://x/api/characters/1');
    expectStatus(res, 200);
    const { character } = (await res.json()) as any;
    expect(character.name).toBe('Boz');
    expect(character.dialogue).toEqual([{ type: 'introduction', text: 'Ahoy.' }]);
    // Boz appears at both locations — the inverse side of the join.
    expect(character.locations.map((l: any) => l.id).sort()).toEqual([1, 2]);
  });

  it('404s unknown ids', async () => {
    expectStatus(await SELF.fetch('https://x/api/characters/999'), 404);
    expectStatus(await SELF.fetch('https://x/api/locations/999'), 404);
  });
});
