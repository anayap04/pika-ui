// Setup for the `unit` Vitest project (jsdom + Testing Library).
// - jest-dom matchers
// - Testing Library DOM teardown between tests
// - sa11y `toBeAccessible` accessibility matcher (axe-core under jsdom)
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setup as setupSa11y } from '@sa11y/vitest';

setupSa11y();

afterEach(() => {
  cleanup();
});
