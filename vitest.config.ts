import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/_tests/*.unit.test.ts', 'src/**/_tests/*.render.test.ts'],
    exclude: ['src/**/_tests/*.e2e.test.ts'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 60000,
  },
});
