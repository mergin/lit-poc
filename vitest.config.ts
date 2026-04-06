import {defineConfig} from 'vitest/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {svelte} from '@sveltejs/vite-plugin-svelte';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    benchmark: {
      include: ['src/**/_tests/*.perf.test.ts'],
    },
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.stories.ts',
        'src/**/_tests/**',
        'src/test/**',
        'src/stories/**',
        'src/index.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    projects: [
      {
        // ── Main project ─────────────────────────────────────────────────
        // Covers all unit / render / integration tests except the Svelte
        // wrapper suite which needs its own browser-mode resolution.
        extends: true,
        test: {
          include: [
            'src/**/_tests/*.unit.test.ts',
            'src/**/_tests/*.render.test.ts',
            'src/**/_tests/*.integration.test.ts',
          ],
          exclude: [
            'src/**/_tests/*.e2e.test.ts',
            // Svelte wrapper tests are handled by the Svelte project below
            // so they don't inherit the wrong module-resolution conditions.
            'src/svelte/_tests/**',
          ],
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          testTimeout: 60000,
        },
      },
      {
        // ── Svelte wrapper project ────────────────────────────────────────
        // Uses the Svelte 5 Vite plugin and the `browser` resolve condition
        // so that `import {mount} from 'svelte'` resolves to the client-side
        // entry instead of the server-side SSR entry.
        plugins: [svelte({hot: false})],
        resolve: {
          conditions: ['browser', 'svelte', 'import', 'module', 'default'],
        },
        test: {
          name: 'svelte',
          include: ['src/svelte/_tests/**/*.test.ts'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          testTimeout: 60000,
        },
      },
      {
        // ── SSR / Node project ────────────────────────────────────────────
        // Runs tests that require a real Node environment (no DOM) such as
        // the @lit-labs/ssr smoke test. No DOM setup file is applied.
        test: {
          name: 'node',
          include: ['src/test/*.test.ts'],
          environment: 'node',
          globals: true,
          testTimeout: 60000,
        },
      },
    ],
  },
});
