import type { Bindings } from '../src/types';

// Give `env` from 'cloudflare:test' our binding types (DB, ASSETS).
declare module 'cloudflare:test' {
  interface ProvidedEnv extends Bindings {}
}
