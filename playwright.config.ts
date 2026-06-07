import { defineConfig, devices } from '@playwright/test';

// E2E against the real app served by `wrangler dev` (D1 simulated locally).
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:8788',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // Dedicated E2E server: a separate port (8788) + isolated `--persist-to`
    // storage so the specs never touch a `npm run dev` app on the default 8787.
    // `--var ALLOW_DEV_LOGIN:true` lets E2E authenticate without a real provider.
    command:
      'npm run dev -- --port 8788 --ip 127.0.0.1 --var ALLOW_DEV_LOGIN:true --persist-to .wrangler/e2e-state',
    url: 'http://127.0.0.1:8788/api/health',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
