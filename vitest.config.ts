import { defineConfig } from 'vitest/config';
import { cloudflareTest } from '@cloudflare/vitest-pool-workers';

// Runs unit/integration tests INSIDE the Workers runtime (workerd) with a real
// D1 binding, using the same wrangler.toml the app deploys with.
// (vitest-pool-workers v4 exposes config as a Vite plugin.)
export default defineConfig({
  plugins: [cloudflareTest({ wrangler: { configPath: './wrangler.toml' } })],
  test: {
    include: ['test/**/*.test.ts'],
  },
});
