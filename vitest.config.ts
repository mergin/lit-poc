import {defineConfig} from 'vitest/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
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
        extends: true,
        test: {
          include: ['src/**/_tests/*.unit.test.ts', 'src/**/_tests/*.render.test.ts'],
          exclude: ['src/**/_tests/*.e2e.test.ts'],
          environment: 'happy-dom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          testTimeout: 60000,
        },
      },
    ],
  },
});
