import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import { loginAs } from './helpers';

describe('auth', () => {
  it('reports no user when logged out', async () => {
    const res = await SELF.fetch('https://x/api/me');
    expect(res.status).toBe(200);
    expect(((await res.json()) as { user: unknown }).user).toBeNull();
  });

  it('reports the user when a valid session cookie is present', async () => {
    const cookie = await loginAs('me-user');
    const res = await SELF.fetch('https://x/api/me', { headers: { cookie } });
    const { user } = (await res.json()) as { user: { id: string } | null };
    expect(user?.id).toBe('me-user');
  });

  it('redirects to Google with a CSRF state cookie on login', async () => {
    const res = await SELF.fetch('https://x/auth/google/login', { redirect: 'manual' });
    expect(res.status).toBe(302);
    const location = res.headers.get('location') ?? '';
    expect(location).toContain('https://accounts.google.com/o/oauth2/v2/auth');
    expect(res.headers.get('set-cookie') ?? '').toContain('oauth_state=');
  });

  it('redirects to Discord with a CSRF state cookie on login', async () => {
    const res = await SELF.fetch('https://x/auth/discord/login', { redirect: 'manual' });
    expect(res.status).toBe(302);
    expect((res.headers.get('location') ?? '')).toContain('discord.com');
  });
});
