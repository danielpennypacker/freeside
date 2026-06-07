import { SELF } from 'cloudflare:test';
import { describe, it, expect, beforeEach } from 'vitest';
import { seedAdventure, loginAs, postJson, expectStatus } from './helpers';

describe('CMS authoring (owner-scoped)', () => {
  beforeEach(async () => { await seedAdventure(); });

  it('requires auth', async () => {
    expectStatus(await SELF.fetch('https://x/api/locations/1', { ...postJson({ name: 'x' }), method: 'PUT' }), 401);
  });

  it('a claimed DM can edit scalar fields and 1:M children', async () => {
    const cookie = await loginAs();
    await SELF.fetch('https://x/api/adventure/claim', postJson({}, cookie));
    const res = await SELF.fetch('https://x/api/locations/1', {
      ...postJson({ crowd: 'now bustling', events: ['new event A', 'new event B'] }, cookie),
      method: 'PUT',
    });
    expectStatus(res, 200);
    const { location } = (await res.json()) as any;
    expect(location.crowd).toBe('now bustling');
    expect(location.events).toEqual(['new event A', 'new event B']);
  });

  it('a DM can add and remove the M:N character<->location link', async () => {
    const cookie = await loginAs();
    await SELF.fetch('https://x/api/adventure/claim', postJson({}, cookie));
    // Link character 2 to location 2 (it wasn't there in the fixture).
    await SELF.fetch('https://x/api/locations/2/characters', postJson({ characterId: 2, description: 'newly arrived' }, cookie));
    let { location } = (await (await SELF.fetch('https://x/api/locations/2')).json()) as any;
    expect(location.characters.map((c: any) => c.id).sort()).toEqual([1, 2]);
    // Inverse side reflects it too.
    const { character } = (await (await SELF.fetch('https://x/api/characters/2')).json()) as any;
    expect(character.locations.map((l: any) => l.id).sort()).toEqual([1, 2]);
    // Remove it.
    await SELF.fetch('https://x/api/locations/2/characters/2', { method: 'DELETE', headers: { cookie } });
    ({ location } = (await (await SELF.fetch('https://x/api/locations/2')).json()) as any);
    expect(location.characters.map((c: any) => c.id)).toEqual([1]);
  });

  it("forbids editing once another DM owns the adventure", async () => {
    const owner = await loginAs('owner');
    await SELF.fetch('https://x/api/adventure/claim', postJson({}, owner));
    const intruder = await loginAs('intruder');
    expectStatus(
      await SELF.fetch('https://x/api/locations/1', { ...postJson({ crowd: 'hax' }, intruder), method: 'PUT' }),
      403,
    );
  });
});
