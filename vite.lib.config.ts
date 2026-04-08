/**
 * vite.lib.config.ts
 *
 * Builds the publishable component library into `dist/`.
 * Run with: `npm run build`  (i.e. `vite build --config vite.lib.config.ts`)
 *
 * ## Output structure
 *
 * Each entry point compiles to its own flat ES-module file:
 *
 *   dist/
 *   ├── index.js          ← full barrel re-export of every component
 *   ├── button.js         ← individual component (tree-shakeable subpath import)
 *   ├── data-table.js
 *   ├── ...               ← one file per entry below
 *   └── chunks/
 *       └── shared-*.js   ← Rollup-extracted shared code (styles, utilities)
 *
 * Consumers can import the whole library or individual components:
 *
 *   // Full library
 *   import { MuButton } from 'lit-poc';
 *
 *   // Subpath import (smaller bundle — only ships the requested component)
 *   import 'lit-poc/button';
 *
 * ## Peer dependencies
 *
 * Lit, React, Angular and related packages are listed as `external` so they
 * are NEVER bundled.  The consuming application is expected to provide them.
 * This keeps individual component bundles tiny (< 10 kB gzip each).
 *
 * ## TypeScript declarations
 *
 * `vite build` handles the JS output only.  Type declarations (`.d.ts`) are
 * emitted by a separate `tsc --project tsconfig.build.json --emitDeclarationOnly`
 * call that runs immediately after Vite in the `build` npm script.
 */
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    /**
     * Compiles `.svelte` files for the `svelte` entry.  The plugin is applied
     * globally but only activates on `.svelte` imports — all other entries are
     * unaffected.
     */
    svelte(),
  ],
  build: {
    /** All compiled files land here. Wiped clean before every build. */
    outDir: 'dist',
    /**
     * Always start with an empty dist/ so stale artefacts from renamed or
     * deleted components do not accumulate across builds.
     */
    emptyOutDir: true,
    /**
     * Inline source maps let consumers debug directly into TypeScript source
     * when using the library in a development environment.
     */
    sourcemap: true,
    /**
     * Target modern browsers / Node ≥ 18.  ES2021 gives us logical-assignment
     * operators, `Promise.any`, `WeakRef`, and other features used by Lit 3
     * without requiring extra transforms.
     */
    target: 'es2021',
    lib: {
      /**
       * Multi-entry build: every key in this object becomes a separate
       * top-level JS file in dist/, enabling subpath imports in package.json
       * exports map and perfect per-component tree-shaking.
       *
       * Naming convention:
       *   - `index`       → dist/index.js   (full barrel re-export)
       *   - component key → dist/<key>.js   (e.g. `button` → dist/button.js)
       *   - compound keys → dist/<key>.js   (e.g. `list-item` → dist/list-item.js)
       *
       * Adding a new component requires:
       *   1. A new entry here.
       *   2. A matching export in src/index.ts.
       *   3. A matching subpath export in package.json `exports`.
       */
      entry: {
        // ── Barrel ──────────────────────────────────────────────────────────
        /** Re-exports every public symbol; consumed as `import {} from 'lit-poc'`. */
        index: resolve(__dirname, 'src/index.ts'),

        // ── Primitive / display ─────────────────────────────────────────────
        avatar: resolve(__dirname, 'src/core/components/avatar/mu-avatar.ts'),
        badge: resolve(__dirname, 'src/core/components/badge/mu-badge.ts'),
        button: resolve(__dirname, 'src/core/components/button/mu-button.ts'),
        card: resolve(__dirname, 'src/core/components/card/mu-card.ts'),
        chip: resolve(__dirname, 'src/core/components/chip/mu-chip.ts'),
        'chip-input': resolve(__dirname, 'src/core/components/chip/mu-chip-input.ts'),
        divider: resolve(__dirname, 'src/core/components/divider/mu-divider.ts'),
        icon: resolve(__dirname, 'src/core/components/icon/mu-icon.ts'),
        list: resolve(__dirname, 'src/list/mu-list.ts'),
        /** mu-list-item is a separate entry so it can be imported independently. */
        'list-item': resolve(__dirname, 'src/list/mu-list-item.ts'),
        typography: resolve(__dirname, 'src/core/components/typography/mu-typography.ts'),

        // ── Theme / internationalisation ─────────────────────────────────────
        /**
         * Exposes CSS custom-property tokens and applies the default colour
         * scheme.  Should be loaded once at the application root.
         */
        'theme-provider': resolve(__dirname, 'src/theme/mu-theme-provider.ts'),
        /**
         * Context-based locale provider.  Wrap the app root to supply
         * translated strings to all child components.
         */
        'locale-provider': resolve(__dirname, 'src/core/i18n/mu-locale-provider.ts'),

        // ── Form controls ────────────────────────────────────────────────────
        /**
         * All form controls use the `formAssociated = true` pattern so they
         *  participate natively in HTML forms and constraint-validation APIs.
         */
        checkbox: resolve(__dirname, 'src/core/components/checkbox/mu-checkbox.ts'),
        radio: resolve(__dirname, 'src/core/components/radio/mu-radio.ts'),
        /**
         * Radio group manages roving tabindex and single-selection across
         * slotted `mu-radio` children.
         */
        'radio-group': resolve(__dirname, 'src/core/components/radio/mu-radio-group.ts'),
        switch: resolve(__dirname, 'src/core/components/switch/mu-switch.ts'),
        'text-field': resolve(__dirname, 'src/core/components/text-field/mu-text-field.ts'),
        select: resolve(__dirname, 'src/core/components/select/mu-select.ts'),
        slider: resolve(__dirname, 'src/core/components/slider/mu-slider.ts'),
        autocomplete: resolve(__dirname, 'src/core/components/autocomplete/mu-autocomplete.ts'),
        'file-upload': resolve(__dirname, 'src/core/components/file-upload/mu-file-upload.ts'),
        rating: resolve(__dirname, 'src/core/components/rating/mu-rating.ts'),

        // ── Overlay / feedback ───────────────────────────────────────────────
        dialog: resolve(__dirname, 'src/core/components/dialog/mu-dialog.ts'),
        tooltip: resolve(__dirname, 'src/core/components/tooltip/mu-tooltip.ts'),
        snackbar: resolve(__dirname, 'src/core/components/snackbar/mu-snackbar.ts'),
        popover: resolve(__dirname, 'src/core/components/popover/mu-popover.ts'),

        // ── Status / progress ────────────────────────────────────────────────
        skeleton: resolve(__dirname, 'src/core/components/skeleton/mu-skeleton.ts'),
        spinner: resolve(__dirname, 'src/core/components/spinner/mu-spinner.ts'),
        'linear-progress': resolve(
          __dirname,
          'src/core/components/linear-progress/mu-linear-progress.ts'
        ),
        alert: resolve(__dirname, 'src/core/components/alert/mu-alert.ts'),

        // ── Navigation ───────────────────────────────────────────────────────
        tabs: resolve(__dirname, 'src/core/components/tabs/mu-tabs.ts'),
        tab: resolve(__dirname, 'src/core/components/tabs/mu-tab.ts'),
        'tab-panel': resolve(__dirname, 'src/core/components/tabs/mu-tab-panel.ts'),
        accordion: resolve(__dirname, 'src/core/components/accordion/mu-accordion.ts'),
        'accordion-item': resolve(__dirname, 'src/core/components/accordion/mu-accordion-item.ts'),
        breadcrumb: resolve(__dirname, 'src/core/components/breadcrumb/mu-breadcrumb.ts'),
        'breadcrumb-item': resolve(
          __dirname,
          'src/core/components/breadcrumb/mu-breadcrumb-item.ts'
        ),
        pagination: resolve(__dirname, 'src/core/components/pagination/mu-pagination.ts'),
        'app-bar': resolve(__dirname, 'src/core/components/app-bar/mu-app-bar.ts'),
        drawer: resolve(__dirname, 'src/core/components/drawer/mu-drawer.ts'),
        menu: resolve(__dirname, 'src/core/components/menu/mu-menu.ts'),
        /** mu-menu-item is a separate entry so it can be used outside a mu-menu. */
        'menu-item': resolve(__dirname, 'src/core/components/menu/mu-menu-item.ts'),

        // ── Complex / composite ──────────────────────────────────────────────
        stepper: resolve(__dirname, 'src/core/components/stepper/mu-stepper.ts'),
        /** mu-step is a separate entry used as slotted children inside mu-stepper. */
        step: resolve(__dirname, 'src/core/components/stepper/mu-step.ts'),
        'data-table': resolve(__dirname, 'src/core/components/data-table/mu-data-table.ts'),

        // ── Framework adapters ───────────────────────────────────────────────
        /**
         * React wrappers generated with `@lit/react`.  Each web component is
         * wrapped in a typed React component so consumers avoid manual event
         * wiring and ref forwarding.
         */
        react: resolve(__dirname, 'src/adapters/react/index.ts'),
        /**
         * Angular Control Value Accessor directives for all form controls.
         * Re-exports `MuFormsModule` for easy import in Angular modules.
         */
        angular: resolve(__dirname, 'src/adapters/angular/index.ts'),
        /**
         * Vue 3 wrappers generated with `defineComponent`.  Each web component
         * is wrapped in a typed Vue component so consumers get typed props and
         * can use Vue template event shorthands (e.g. `@mu-close`).
         */
        vue: resolve(__dirname, 'src/adapters/vue/index.ts'),
        /**
         * Svelte 5 wrappers.  Each web component is wrapped in a `.svelte`
         * component with typed `$props()` and rest-prop forwarding so consumers
         * get typed props and native Svelte event attribute forwarding.
         */
        svelte: resolve(__dirname, 'src/adapters/svelte/index.ts'),

        // ── Design tokens ────────────────────────────────────────────────────
        /**
         * Exposes all token maps (spacing, elevation, motion, shape) as a
         * JavaScript module.  Consumers can use these values for dynamic
         * theming or documentation tooling.  For static CSS consumption use
         * the `tokens.css` subpath export produced by `npm run build:tokens`.
         */
        tokens: resolve(__dirname, 'src/tokens/index.ts'),

        // ── SSR ──────────────────────────────────────────────────────────────
        /**
         * Server-side rendering entry point.  Re-exports the full library
         * alongside `@lit-labs/ssr` utilities so consumers can render
         * component HTML strings on the server without a separate import.
         */
        ssr: resolve(__dirname, 'src/platform/ssr/index.ts'),
      },
      /**
       * Only ES module output.  CJS and UMD are intentionally omitted:
       * - Modern bundlers (Vite, webpack 5, Rollup) consume ES modules natively.
       * - Dropping CJS halves the dist size and avoids dual-package hazards.
       * - If CJS interop is ever required, consumers can use a bundler transform.
       */
      formats: ['es'],
    },
    rollupOptions: {
      /**
       * Packages listed here are treated as peer dependencies: they will NOT
       * be inlined into any dist bundle.  The host application must provide
       * compatible versions at runtime.
       *
       * - `lit` + `/^lit\//`   Lit 3 core and sub-packages (directives, decorators…)
       * - `@lit/context`       Lit context protocol used by mu-locale-provider
       * - `@lit/react`         React wrapper utility (only relevant for the react entry)
       * - `react` / `react-dom` Standard React peer deps for the react entry
       * - `@angular/core`      Angular DI / component model for the angular entry
       * - `@angular/forms`     Angular `ControlValueAccessor` interface
       */
      external: [
        'lit',
        /^lit\//,
        '@lit/context',
        '@lit/react',
        '@lit-labs/ssr',
        /^@lit-labs\/ssr\//,
        'react',
        'react-dom',
        '@angular/core',
        '@angular/forms',
        'vue',
        'svelte',
        /^svelte\//,
      ],

      output: {
        /**
         * Each entry key maps directly to a file name, e.g.
         * `button` → `dist/button.js`.  This flat layout matches the
         * `exports` subpath map in package.json.
         */
        entryFileNames: '[name].js',
        /**
         * Shared code that Rollup extracts into a chunk (e.g. shared-styles,
         * utility helpers) is placed in dist/chunks/ with a content hash to
         * enable long-lived HTTP cache headers.
         */
        chunkFileNames: 'chunks/[name]-[hash].js',
        /**
         * Rollup merges modules into optimised per-entry bundles rather than
         * preserving the source directory tree.  This keeps the dist flat and
         * reduces the number of HTTP requests when entries are loaded directly.
         */
        preserveModules: false,
      },
    },
  },
});
