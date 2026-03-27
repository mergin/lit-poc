import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

export default {
  input: [
    'src/avatar/_tests/mu-avatar.unit.test.ts',
    'src/avatar/_tests/mu-avatar.render.test.ts',
    'src/avatar/_tests/mu-avatar.e2e.test.ts',
    'src/button/_tests/mu-button.unit.test.ts',
    'src/button/_tests/mu-button.render.test.ts',
    'src/button/_tests/mu-button.e2e.test.ts',
    'src/card/_tests/mu-card.unit.test.ts',
    'src/card/_tests/mu-card.render.test.ts',
    'src/card/_tests/mu-card.e2e.test.ts',
    'src/icon/_tests/mu-icon.unit.test.ts',
    'src/icon/_tests/mu-icon.render.test.ts',
    'src/icon/_tests/mu-icon.e2e.test.ts',
  ],
  output: {
    dir: 'dist/test-bundle',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    sourcemap: true,
  },
  plugins: [resolve(), typescript({tsconfig: './tsconfig.json'}), summary()],
};
