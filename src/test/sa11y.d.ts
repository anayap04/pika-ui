// Type augmentation for the sa11y `toBeAccessible` matcher registered in
// src/test/setup.ts. `@sa11y/vitest` ships the runtime matcher but no global
// type, so we extend Vitest's assertion interfaces here.
import 'vitest';

/** Optional axe ruleset preset (`base` | `extended` | `full` from `@sa11y/preset-rules`). */
type Sa11yConfig = Record<string, unknown>;

declare module 'vitest' {
  interface Assertion {
    toBeAccessible(config?: Sa11yConfig): Promise<void>;
  }
  interface AsymmetricMatchersContaining {
    toBeAccessible(config?: Sa11yConfig): Promise<void>;
  }
}
