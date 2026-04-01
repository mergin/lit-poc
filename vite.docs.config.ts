import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    sourcemap: false,
    target: 'es2021',
    lib: {
      entry: {
        'mu-avatar.bundled': resolve(__dirname, 'src/avatar/mu-avatar.ts'),
        'mu-button.bundled': resolve(__dirname, 'src/button/mu-button.ts'),
        'mu-card.bundled': resolve(__dirname, 'src/card/mu-card.ts'),
        'mu-icon.bundled': resolve(__dirname, 'src/icon/mu-icon.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
