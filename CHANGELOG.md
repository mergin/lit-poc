# @lit/lit-starter-ts

## Unreleased — Phase 14: Source Structure Reorganization

### Refactoring

- Completed a full 8-phase source migration per `MIGRATION_PLAN.md`:
  - **Phase 1** — Created domain folders (`core/`, `adapters/`, `platform/`, `tokens/`, `internal/`).
  - **Phase 2** — Moved framework adapters: `src/react` → `src/adapters/react`, `src/angular` → `src/adapters/angular`, `src/vue` → `src/adapters/vue`, `src/svelte` → `src/adapters/svelte`.
  - **Phase 3** — Moved `src/ssr` → `src/platform/ssr`; moved design token files into `src/tokens/`.
  - **Phase 4** — Moved `src/i18n` → `src/core/i18n`; consolidated shared styles under `src/core/styles/`.
  - **Phase 5** — Moved all component folders into `src/core/components/` in five batches (A–E).
  - **Phase 6** — Updated all primary barrel files and Vite build entry points to reference the new paths.
  - **Phase 7** — Introduced `src/internal/` as the private module boundary (`utils/` and `types/` sub-folders); removed public exports of internal helpers.
  - **Phase 8** — Removed all compatibility re-export shims; the repository now resolves directly from the new structure.
- All public package subpath exports in `package.json` are preserved throughout the migration.
- Tests, stories, and `README` files remain colocated with their component folders.

---

## Unreleased — Phase 13: Server-Side Rendering (SSR)

### New Features

- **`lit-poc/ssr` package export** — New subpath entry point that re-exports the full component library alongside `@lit-labs/ssr` utilities (`render`, `collectResult`), enabling HTML string generation on the server without dual imports.
- Added `@lit-labs/ssr` dependency and externalised it in the Vite rollup build.
- Added SSR smoke test to the test suite and fixed Vitest config to support the SSR environment.
- Added CSS `::part()` documentation and CSS custom property listings to all component `README` files.
- Integrated Semantic Release for automated versioning and changelog publishing.

---

## Unreleased — Phase 12: Design Tokens & Dark Mode

### New Features

- **Design token system** — Introduced `src/tokens/tokens.ts` exporting `lightTokens` and `darkTokens` (`TokenMap`) objects that map CSS custom property names to their values.
- **`lit-poc/tokens` package export** — New subpath entry point giving consumers direct access to token maps for custom theming.
- **`mu-theme-provider` dark mode** — The existing theme provider now accepts a `theme` property (`'light' | 'dark'`) and applies the corresponding token map as CSS custom properties on its host element.

---

## Unreleased — Phase 11: Framework Adapters

### New Packages

- **`lit-poc/react`** — React wrapper components for every Mu element, generated with `createComponent` from `@lit/react`. Bridges Web Component properties and custom events to idiomatic React props. Requires React ≥ 16.8 as a peer dependency.
- **`lit-poc/angular`** — Angular integration module (`MuFormsModule`) with `ControlValueAccessor` directives for all form components:
  - `MuCheckboxDirective`
  - `MuRadioGroupDirective`
  - `MuSelectDirective`
  - `MuSwitchDirective`
  - `MuTextFieldDirective` (includes an `NgControl`-aware control directive supporting both template-driven and reactive forms)
- **`lit-poc/vue`** — Vue 3 wrapper package exposing typed component wrappers for all Mu elements.
- **`lit-poc/svelte`** — Svelte wrapper package with typed bindings for all Mu elements.

### New Features

- Added `@lit/react` dependency and externalised it in the Vite rollup build.
- Added framework-specific unit and accessibility tests for all adapter packages.

---

## Unreleased — Phase 10: Additional Interactive Components

### New Components

- **`mu-rating`** — Star rating form component with configurable `max`, `precision` (whole or half stars), `readonly`, and `disabled` modes; participates natively in HTML forms via `ElementInternals`; fires `change` event; exposes `::part(star)`, `::part(star--filled)`, `::part(star--empty)`, `::part(star--partial)`.
- **`mu-slider`** — Range slider with pointer-drag and keyboard navigation; participates natively in HTML forms; exposes `::part(track)`, `::part(fill)`, `::part(thumb)`; fires `change` event.
- **`mu-stepper` / `mu-step`** — Step-by-step progress indicator accepting `mu-step` children; supports `activeStep` control and fires `step-change`; exposes `::part(connector)`.
- **`mu-autocomplete`** — Combobox/autocomplete with client-side option filtering, keyboard navigation, `minChars` threshold, and native form participation; fires `change`; exposes `::part(input)`, `::part(listbox)`, `::part(option)`.
- **`mu-data-table`** — Feature-rich data table with sortable columns, skeleton loading state, and a `renderCell` customisation hook; fires `sort` event; accepts typed `DataTableColumn[]` and generic row data.
- **`mu-file-upload`** — Drag-and-drop file upload zone with click-to-browse fallback, `accept` and `multiple` attributes, and native form participation; fires `mu-change`; exposes `::part(dropzone)`, `::part(dropzone--active)`, `::part(label)`, `::part(hint)`.

### Enhancements

- Improved accessibility (ARIA attributes, keyboard navigation) across all interactive components.
- Added CSS `::part()` exposure to components introduced in Phase 8 for external styling.

---

## Unreleased — Phase 9: Internationalization (i18n)

### New Components

- **`mu-locale-provider`** — Context provider (`@lit/context`) that distributes a `MuLocale` object to all descendant components. Ships with a built-in English `defaultLocale`; components work without a provider in the DOM.

### New Features

- **i18n support in `mu-chip`** — delete button `aria-label` is now driven by `MuLocale.chip.deleteLabel(label)`.
- **i18n support in `mu-badge`** — visually-hidden accessible label now uses `MuLocale.badge.defaultLabel(content)`.
- **i18n support in `mu-snackbar`** — dismiss button `aria-label` is now driven by `MuLocale.snackbar.closeLabel`.
- Added `@lit/context` dependency and externalised it in the Vite rollup build.
- Added `./locale-provider` package export subpath.

---

## Phase 8: Additional Components

### New Components

- **`mu-skeleton`** — Loading placeholder with `text`, `circular`, and `rectangular` variants and optional `pulse`/`wave` animation.
- **`mu-spinner`** — SVG-based circular progress indicator with determinate and indeterminate modes.
- **`mu-linear-progress`** — Horizontal progress bar (determinate/indeterminate); fires `mu-complete` when value reaches 100.
- **`mu-alert`** — Contextual feedback banner with `success`, `info`, `warning`, and `error` severity levels; optional close button.
- **`mu-tabs` / `mu-tab` / `mu-tab-panel`** — ARIA-compliant tabbed interface with roving tabindex keyboard navigation.
- **`mu-accordion` / `mu-accordion-item`** — Expandable/collapsible sections with optional single-expansion enforcement.
- **`mu-breadcrumb` / `mu-breadcrumb-item`** — Accessible navigation trail using `<nav aria-label>` and `<ol>` structure.
- **`mu-pagination`** — Page navigation control with ellipsis support and `page-change` event.
- **`mu-app-bar`** — Sticky application header rendering `<header role="banner">` with `start`, default, and `end` slots.
- **`mu-drawer`** — Side panel using a native `<dialog>` for focus trapping; supports `left` and `right` placement.

---

### Patch Changes

- [#4984](https://github.com/lit/lit/pull/4984) [`ad23f26ae908a160d30ed2a939b322fe9cc2ee83`](https://github.com/lit/lit/commit/ad23f26ae908a160d30ed2a939b322fe9cc2ee83) Thanks [@kyubisation](https://github.com/kyubisation)! - Update TypeScript dependencies to version 5.8 with related ARIAMixin changes (ariaColIndexText, ariaRelevant and ariaRowIndexText)

## 2.0.2

### Patch Changes

- [#4682](https://github.com/lit/lit/pull/4682) [`290a608a`](https://github.com/lit/lit/commit/290a608aa2297e8b99a5424dc90632b97c66386c) - Update typescript to 5.5.0

- [#4681](https://github.com/lit/lit/pull/4681) [`5463b104`](https://github.com/lit/lit/commit/5463b1046e0589c9ce7041e67cd539ddfba2e5a7) - Update Rollup and Terser dependencies

- Updated dependencies [[`feccc1ba`](https://github.com/lit/lit/commit/feccc1ba8e82b36d07a0e2576381bf2819926b98)]:
  - lit@3.2.0

## 2.0.1

### Patch Changes

- [#4451](https://github.com/lit/lit/pull/4451) [`7852e130`](https://github.com/lit/lit/commit/7852e13022c9dcfcff5ed54a215c93420349e318) - Minor security fixes.

## 2.0.0

### Major Changes

- [#4141](https://github.com/lit/lit/pull/4141) [`6b515e43`](https://github.com/lit/lit/commit/6b515e43c3a24cc8a593247d3aa72d81bcc724d5) - Update TypeScript to ~5.2.0

- [#3756](https://github.com/lit/lit/pull/3756) [`f06f7972`](https://github.com/lit/lit/commit/f06f7972a027d2937fe2c68ab5af0274dec57cf4) - Drop IE11 support

### Patch Changes

- [#3814](https://github.com/lit/lit/pull/3814) [`23326c6b`](https://github.com/lit/lit/commit/23326c6b9a6abdf01998dadf5d0f20a643e457aa) - Update to TypeScript v5.0

- Updated dependencies [[`dfd747cf`](https://github.com/lit/lit/commit/dfd747cf4f7239e0c3bb7134f8acb967d0157654), [`6b515e43`](https://github.com/lit/lit/commit/6b515e43c3a24cc8a593247d3aa72d81bcc724d5), [`23c404fd`](https://github.com/lit/lit/commit/23c404fdec0cd7be834221b6ddf9b659c24ca8a2), [`1040f758`](https://github.com/lit/lit/commit/1040f75861b029527538b4ec36b2cfedcc32988a), [`0f6878dc`](https://github.com/lit/lit/commit/0f6878dc45fd95bbeb8750f277349c1392e2b3ad), [`1db01376`](https://github.com/lit/lit/commit/1db0137699b35d7e7bfac9b2ab274af4100fd7cf), [`2a01471a`](https://github.com/lit/lit/commit/2a01471a5f65fe34bad11e1099281811b8d0f79b), [`6f2833fd`](https://github.com/lit/lit/commit/6f2833fd05f2ecde5386f72d291dafc9dbae0cf7), [`c3e473b4`](https://github.com/lit/lit/commit/c3e473b499ff029b5e1aff01ca8799daf1ca1bbe), [`2eba6997`](https://github.com/lit/lit/commit/2eba69974c9e130e7483f44f9daca308345497d5), [`92cedaa2`](https://github.com/lit/lit/commit/92cedaa2c8cd8a306be3fe25d52e0e47bb044020), [`d27a77ec`](https://github.com/lit/lit/commit/d27a77ec3d3999e872df9218a2b07f90f22eb417), [`7e8491d4`](https://github.com/lit/lit/commit/7e8491d4ed9f0c39d974616c4678552ef50b81df), [`6470807f`](https://github.com/lit/lit/commit/6470807f3a0981f9d418cb26f05969912455d148), [`23326c6b`](https://github.com/lit/lit/commit/23326c6b9a6abdf01998dadf5d0f20a643e457aa), [`09949234`](https://github.com/lit/lit/commit/09949234445388d51bfb4ee24ff28a4c9f82fe17), [`f06f7972`](https://github.com/lit/lit/commit/f06f7972a027d2937fe2c68ab5af0274dec57cf4)]:
  - lit@3.0.0

## 2.0.0-pre.1

### Major Changes

- [#4141](https://github.com/lit/lit/pull/4141) [`6b515e43`](https://github.com/lit/lit/commit/6b515e43c3a24cc8a593247d3aa72d81bcc724d5) - Update TypeScript to ~5.2.0

### Patch Changes

- Updated dependencies [[`6b515e43`](https://github.com/lit/lit/commit/6b515e43c3a24cc8a593247d3aa72d81bcc724d5), [`0f6878dc`](https://github.com/lit/lit/commit/0f6878dc45fd95bbeb8750f277349c1392e2b3ad), [`2a01471a`](https://github.com/lit/lit/commit/2a01471a5f65fe34bad11e1099281811b8d0f79b), [`2eba6997`](https://github.com/lit/lit/commit/2eba69974c9e130e7483f44f9daca308345497d5), [`d27a77ec`](https://github.com/lit/lit/commit/d27a77ec3d3999e872df9218a2b07f90f22eb417), [`6470807f`](https://github.com/lit/lit/commit/6470807f3a0981f9d418cb26f05969912455d148), [`09949234`](https://github.com/lit/lit/commit/09949234445388d51bfb4ee24ff28a4c9f82fe17)]:
  - lit@3.0.0-pre.1

## 2.0.0-pre.0

### Major Changes

- [#3756](https://github.com/lit/lit/pull/3756) [`f06f7972`](https://github.com/lit/lit/commit/f06f7972a027d2937fe2c68ab5af0274dec57cf4) - Drop IE11 support

### Patch Changes

- [#3814](https://github.com/lit/lit/pull/3814) [`23326c6b`](https://github.com/lit/lit/commit/23326c6b9a6abdf01998dadf5d0f20a643e457aa) - Update to TypeScript v5.0

- Updated dependencies [[`dfd747cf`](https://github.com/lit/lit/commit/dfd747cf4f7239e0c3bb7134f8acb967d0157654), [`23c404fd`](https://github.com/lit/lit/commit/23c404fdec0cd7be834221b6ddf9b659c24ca8a2), [`1db01376`](https://github.com/lit/lit/commit/1db0137699b35d7e7bfac9b2ab274af4100fd7cf), [`c3e473b4`](https://github.com/lit/lit/commit/c3e473b499ff029b5e1aff01ca8799daf1ca1bbe), [`92cedaa2`](https://github.com/lit/lit/commit/92cedaa2c8cd8a306be3fe25d52e0e47bb044020), [`23326c6b`](https://github.com/lit/lit/commit/23326c6b9a6abdf01998dadf5d0f20a643e457aa), [`f06f7972`](https://github.com/lit/lit/commit/f06f7972a027d2937fe2c68ab5af0274dec57cf4)]:
  - lit@3.0.0-pre.0

## 1.0.6

### Patch Changes

- [#4157](https://github.com/lit/lit/pull/4157) [`da32db2e`](https://github.com/lit/lit/commit/da32db2e67547e0f17b7132065559eba2b1d3513) Thanks [@welingtonms](https://github.com/welingtonms)! - Improve bundling and minification recommendations.

## 1.0.5

### Patch Changes

- [#3561](https://github.com/lit/lit/pull/3561) [`e5c254e9`](https://github.com/lit/lit/commit/e5c254e96cb5d0f770ec616332e231559325c5c5) - Update dependency `@rollup/plugin-replace`

## 1.0.4

### Patch Changes

- [#2922](https://github.com/lit/lit/pull/2922) [`da9db86a`](https://github.com/lit/lit/commit/da9db86a33cba710d439e254df2492f9f6dcbbee) - Update dependencies and remove unused dependencies

## 1.0.3

### Patch Changes

- [#2757](https://github.com/lit/lit/pull/2757) [`55841c14`](https://github.com/lit/lit/commit/55841c14f52891357dd93680d3bc5b1da6c89c8a) - Update Rollup and Rollup plugins

## 1.0.2

### Patch Changes

- [#2535](https://github.com/lit/lit/pull/2535) [`d1359856`](https://github.com/lit/lit/commit/d1359856698d1af381b335fb757f9282574690b0) - Update the README to indicate that issues and PRs should be filed on the main Lit repo.

## 1.0.1

### Patch Changes

- [#2300](https://github.com/lit/lit/pull/2300) [`8b9dcb4d`](https://github.com/lit/lit/commit/8b9dcb4d10e4161083146ae40d0b12174a63d31d) - Fix starter kits so `npm run serve` serves the root directory, and add a link to the `/dev/index.html` component example from `/`.

- Updated dependencies [[`fcc2b3d0`](https://github.com/lit/lit/commit/fcc2b3d0054e69e6f76588ea9f440117b6d0deed), [`49ecf623`](https://github.com/lit/lit/commit/49ecf6239033e9578184d46116e6b89676d091db), [`1d563e83`](https://github.com/lit/lit/commit/1d563e830c02a2d1a22e1e939f1ace971b1d1ae7)]:
  - lit@2.1.0

## 1.0.0

### Patch Changes

- [#2113](https://github.com/lit/lit/pull/2113) [`5b2f3642`](https://github.com/lit/lit/commit/5b2f3642ff91931b5b01f8bdd2ed98aba24f1047) - Dependency upgrades including TypeScript 4.4.2

- [#2103](https://github.com/lit/lit/pull/2103) [`15a8356d`](https://github.com/lit/lit/commit/15a8356ddd59a1e80880a93acd21fadc9c24e14b) - Added Lit dev mode to test and serve commands, controlled via the MODE=dev or MODE=prod environment variables.

- [#2117](https://github.com/lit/lit/pull/2117) [`eff2fbc7`](https://github.com/lit/lit/commit/eff2fbc7e45cfc2a7b8df21e18c84619dfbcb277) - Updated starter templates to use open-wc analyzer for generating custom-elements.json, and updated basic API docs generater included in the template to the new manifest format.

- Updated dependencies [[`15a8356d`](https://github.com/lit/lit/commit/15a8356ddd59a1e80880a93acd21fadc9c24e14b), [`5fabe2b5`](https://github.com/lit/lit/commit/5fabe2b5ae4ab8fba9dc2d23a69105d32e4c0705), [`5b2f3642`](https://github.com/lit/lit/commit/5b2f3642ff91931b5b01f8bdd2ed98aba24f1047), [`5fabe2b5`](https://github.com/lit/lit/commit/5fabe2b5ae4ab8fba9dc2d23a69105d32e4c0705), [`5fabe2b5`](https://github.com/lit/lit/commit/5fabe2b5ae4ab8fba9dc2d23a69105d32e4c0705), [`0312f3e5`](https://github.com/lit/lit/commit/0312f3e533611eb3f4f9381594485a33ad003b74)]:
  - lit@2.0.0
