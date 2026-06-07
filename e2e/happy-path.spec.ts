import { test, expect } from '@playwright/test';

// The local E2E DB is seeded once (see global-setup) with the real adventure.

test('DM books the adventure, reveals a location, player sees a minimal card', async ({ page, context }) => {
  // Sign in as the DM (dev-login is enabled on the E2E server).
  await page.request.post('/auth/dev-login', { data: { name: 'Game Master', email: 'dm@e2e.test' } });

  // 1. The adventure book renders location + character pages (full detail).
  await page.goto('/');
  const firstLocation = page.locator('freeside-book')
    .locator('freeside-location').first();
  await expect(firstLocation).toBeVisible();
  // Web Component selectors pierce open shadow DOM.
  await expect(firstLocation.locator('[data-testid="location"]')).toBeVisible();
  // The M:N "Named NPC's" + "Connected Locations" sections appear on populated
  // locations somewhere in the book. (getByText pierces open shadow DOM.)
  await expect(page.getByText("Named NPC's").first()).toBeVisible();
  await expect(page.getByText('Connected Locations').first()).toBeVisible();

  // 2. Create a game session and reveal the first location via the API.
  const created = await page.request.post('/api/games', { data: { name: 'E2E session' } });
  const { session } = await created.json();
  await page.request.post(`/api/games/${session.id}/reveal`, { data: { kind: 'location', refId: 1 } });

  // 3. The PUBLIC player view (no auth) shows the revealed entity as name + image.
  const player = await context.newPage();
  await player.goto(`/play/${session.id}`);
  const card = player.locator('freeside-play').locator('figure.card').first();
  await expect(card).toBeVisible();
  await expect(card.locator('figcaption')).toHaveText(/.+/); // a name is shown
  await expect(card.locator('img')).toHaveAttribute('src', /\/img\/locations\//);
});
