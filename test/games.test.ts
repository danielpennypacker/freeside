import { SELF } from 'cloudflare:test';
import { describe, it, expect, beforeEach } from 'vitest';
import { seedAdventure, loginAs, postJson, expectStatus } from './helpers';

describe('game sessions + player view', () => {
  beforeEach(async () => { await seedAdventure(); });

  it('requires auth to manage sessions', async () => {
    expectStatus(await SELF.fetch('https://x/api/games', postJson({ name: 'x' })), 401);
  });

  it('DM creates a session, reveals content, and the PUBLIC player view shows name + image only', async () => {
    const cookie = await loginAs();
    const created = await SELF.fetch('https://x/api/games', postJson({ name: 'Tuesday' }, cookie));
    expectStatus(created, 201);
    const { session } = (await created.json()) as any;

    // Reveal a location and a character.
    await SELF.fetch(`https://x/api/games/${session.id}/reveal`, postJson({ kind: 'location', refId: 1 }, cookie));
    await SELF.fetch(`https://x/api/games/${session.id}/reveal`, postJson({ kind: 'character', refId: 1 }, cookie));

    // Player view is PUBLIC (no cookie) and minimal.
    const res = await SELF.fetch(`https://x/api/play/${session.id}`);
    expectStatus(res, 200);
    const body = (await res.json()) as any;
    expect(body.adventureTitle).toBe('Freeside');
    const keys = body.reveals.map((r: any) => Object.keys(r).sort().join(','));
    // Each revealed entity exposes ONLY kind/id/name/image — no stats, dialogue, dmNotes.
    keys.forEach((k: string) => expect(k).toBe('id,image,kind,name'));
    expect(body.reveals.map((r: any) => r.name).sort()).toEqual(['Boz', 'Theives Port']);
  });

  it('hides un-revealed content and supports un-revealing', async () => {
    const cookie = await loginAs();
    const { session } = (await (await SELF.fetch('https://x/api/games', postJson({ name: 'g' }, cookie))).json()) as any;
    await SELF.fetch(`https://x/api/games/${session.id}/reveal`, postJson({ kind: 'location', refId: 1 }, cookie));
    await SELF.fetch(`https://x/api/games/${session.id}/unreveal`, postJson({ kind: 'location', refId: 1 }, cookie));
    const body = (await (await SELF.fetch(`https://x/api/play/${session.id}`)).json()) as any;
    expect(body.reveals).toEqual([]);
  });

  it("forbids a different DM from touching someone else's session", async () => {
    const dmA = await loginAs('dm-a');
    const dmB = await loginAs('dm-b');
    const { session } = (await (await SELF.fetch('https://x/api/games', postJson({ name: 'a' }, dmA))).json()) as any;
    expectStatus(await SELF.fetch(`https://x/api/games/${session.id}`, { headers: { cookie: dmB } }), 403);
  });

  it('tracks party members and HP', async () => {
    const cookie = await loginAs();
    const { session } = (await (await SELF.fetch('https://x/api/games', postJson({ name: 'p' }, cookie))).json()) as any;
    const add = await SELF.fetch(`https://x/api/games/${session.id}/party`, postJson({ playerName: 'Rogue', maxHp: 20, currentHp: 20 }, cookie));
    expectStatus(add, 201);
    const { id } = (await add.json()) as any;
    await SELF.fetch(`https://x/api/games/${session.id}/party/${id}`, { ...postJson({ currentHp: 7 }, cookie), method: 'PUT' });
    const detail = (await (await SELF.fetch(`https://x/api/games/${session.id}`, { headers: { cookie } })).json()) as any;
    expect(detail.party[0]).toMatchObject({ playerName: 'Rogue', currentHp: 7, maxHp: 20 });
  });
});
