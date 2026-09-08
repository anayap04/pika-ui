/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Library build entry point
const libEntry = path.resolve(dirname, 'src/components/index.ts');

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: libEntry,
      name: 'PikaUI',
      fileName: (format) => {
        if (format === 'es') return 'index.js';
        if (format === 'cjs') return 'index.cjs';
        return 'index.umd.js';
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    copyPublicDir: false,
    sourcemap: true,
    minify: 'terser'
  },
  test: {
    // Coverage is measured over the `unit` project (jsdom). The `storybook`
    // project is a browser smoke suite and is excluded from the coverage gate.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/tokens/**/*.ts',
        'src/utils/**/*.ts',
      ],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.{ts,tsx}',
        // Barrel files — re-exports only, no logic. `src/tokens/index.ts` is a
        // real source module and is intentionally NOT matched here.
        'src/components/**/index.ts',
        'src/utils/index.ts',
        // Deprecated re-export shims — superseded by the atoms/ barrel.
        'src/components/{Button,Card,Input}.tsx',
      ],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: ['./src/test/setup.ts'],
        },
      },
    ],
  },
});