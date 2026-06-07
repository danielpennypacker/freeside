import { execSync } from 'node:child_process';

// Seed the isolated E2E D1 (the same --persist-to dir the webServer uses) with
// the real adventure before any spec runs. adventure.sql is self-contained
// (CREATE TABLE IF NOT EXISTS + data), so this is safe to re-run.
export default function globalSetup() {
  execSync('npm run build:adventure', { stdio: 'inherit' });
  execSync(
    'npx wrangler d1 execute freeside-adventure --local --persist-to .wrangler/e2e-state --file=db/adventure.sql',
    { stdio: 'inherit' },
  );
}
