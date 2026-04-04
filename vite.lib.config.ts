import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2021',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        avatar: resolve(__dirname, 'src/avatar/mu-avatar.ts'),
        badge: resolve(__dirname, 'src/badge/mu-badge.ts'),
        button: resolve(__dirname, 'src/button/mu-button.ts'),
        card: resolve(__dirname, 'src/card/mu-card.ts'),
        chip: resolve(__dirname, 'src/chip/mu-chip.ts'),
        divider: resolve(__dirname, 'src/divider/mu-divider.ts'),
        icon: resolve(__dirname, 'src/icon/mu-icon.ts'),
        list: resolve(__dirname, 'src/list/mu-list.ts'),
        'list-item': resolve(__dirname, 'src/list/mu-list-item.ts'),
        typography: resolve(__dirname, 'src/typography/mu-typography.ts'),
        'theme-provider': resolve(__dirname, 'src/theme/mu-theme-provider.ts'),
        checkbox: resolve(__dirname, 'src/checkbox/mu-checkbox.ts'),
        radio: resolve(__dirname, 'src/radio/mu-radio.ts'),
        'radio-group': resolve(__dirname, 'src/radio/mu-radio-group.ts'),
        switch: resolve(__dirname, 'src/switch/mu-switch.ts'),
        'text-field': resolve(__dirname, 'src/text-field/mu-text-field.ts'),
        select: resolve(__dirname, 'src/select/mu-select.ts'),
        dialog: resolve(__dirname, 'src/dialog/mu-dialog.ts'),
        tooltip: resolve(__dirname, 'src/tooltip/mu-tooltip.ts'),
        snackbar: resolve(__dirname, 'src/snackbar/mu-snackbar.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\//],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        preserveModules: false,
      },
    },
  },
});
