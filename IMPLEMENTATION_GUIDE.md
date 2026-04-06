# Implementation Guide

A step-by-step guide to completing this component library. Each phase is self-contained and testable before moving to the next. Follow steps in order within each phase.

---

## Phase 1 — Bundle Output, Exports & Barrel File (Critical)

### Context

The library currently has `"build": "tsc --noEmit"` — it type-checks but produces no output. There is no `dist/`, no `exports` map, and no barrel file. The library cannot be installed and consumed by another project.

---

### Step 1.1 — Add a build-optimized `tsconfig.build.json`

Create `tsconfig.build.json` at the project root. This extends the base config but enables output and decorators metadata:

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/_tests/**", "src/**/*.stories.ts", "src/test/**", "src/stories/**"]
}
```

---

### Step 1.2 — Add a Vite library build config

Create `vite.lib.config.ts` at the project root. Every component gets its own entry so tree-shaking works at the component level:

```ts
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
        typography: resolve(__dirname, 'src/typography/mu-typography.ts'),
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
```

---

### Step 1.3 — Create the barrel file

Create `src/index.ts`. Export every public component and type:

```ts
export {MuAvatar} from './avatar/mu-avatar.js';
export {MuBadge} from './badge/mu-badge.js';
export {MuButton} from './button/mu-button.js';
export {MuCard, MuCardHeader, MuCardContent, MuCardActions} from './card/mu-card.js';
export {MuChip} from './chip/mu-chip.js';
export {MuDivider} from './divider/mu-divider.js';
export {MuIcon} from './icon/mu-icon.js';
export {MuList, MuListItem} from './list/mu-list.js';
export {MuTypography} from './typography/mu-typography.js';
export type {TypographyVariant} from './typography/mu-typography.js';
```

> **Note for Copilot:** `MuList` and `MuListItem` are currently in separate files (`mu-list.ts` and `mu-list-item.ts`). Adjust the export path to whichever file re-exports both, or export from both files directly.

---

### Step 1.4 — Update `package.json`

Replace the `build` script and add `exports`, `files`, and `sideEffects`:

```jsonc
{
  "private": false,
  "sideEffects": false,
  "files": ["dist", "src"],
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./avatar": {
      "import": "./dist/avatar.js",
      "types": "./dist/avatar.d.ts"
    },
    "./badge": {
      "import": "./dist/badge.js",
      "types": "./dist/badge.d.ts"
    },
    "./button": {
      "import": "./dist/button.js",
      "types": "./dist/button.d.ts"
    },
    "./card": {
      "import": "./dist/card.js",
      "types": "./dist/card.d.ts"
    },
    "./chip": {
      "import": "./dist/chip.js",
      "types": "./dist/chip.d.ts"
    },
    "./divider": {
      "import": "./dist/divider.js",
      "types": "./dist/divider.d.ts"
    },
    "./icon": {
      "import": "./dist/icon.js",
      "types": "./dist/icon.d.ts"
    },
    "./list": {
      "import": "./dist/list.js",
      "types": "./dist/list.d.ts"
    },
    "./typography": {
      "import": "./dist/typography.js",
      "types": "./dist/typography.d.ts"
    }
  },
  "scripts": {
    "build": "vite build --config vite.lib.config.ts && tsc --project tsconfig.build.json --emitDeclarationOnly"
  }
}
```

---

### Step 1.5 — Verify

```bash
npm run build
ls dist/
# Expected: index.js, avatar.js, button.js ... and matching .d.ts files
```

---

## Phase 2 — CI Pipeline (High)

### Context

No automated checks run on pull requests. Any contributor can push broken code. This phase adds GitHub Actions workflows.

---

### Step 2.1 — Create the CI workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [22.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Unit tests with coverage
        run: npx vitest run --coverage

      - name: Upload coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7

      - name: Build library
        run: npm run build

  e2e:
    runs-on: ubuntu-latest
    needs: build-and-test

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npm run test:e2e:install

      - name: Build for e2e preview
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

---

### Step 2.2 — Add a release workflow

Create `.github/workflows/release.yml`. This runs only on pushes to `main` and publishes to npm if the version in `package.json` has changed:

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> **Note for Copilot:** Set `NPM_TOKEN` as a repository secret in GitHub → Settings → Secrets and Variables → Actions. Remove `"private": true` from `package.json` first (done in Phase 1).

---

### Step 2.3 — Protect the main branch

In GitHub → Settings → Branches, add a branch protection rule for `main`:

- ✅ Require status checks to pass before merging → select `build-and-test` and `e2e`
- ✅ Require branches to be up to date before merging
- ✅ Require linear history

---

## Phase 3 — Visual Regression with Chromatic (High)

### Context

`@chromatic-com/storybook` is already installed. This phase wires it up so every PR gets screenshot diffing against a baseline.

---

### Step 3.1 — Add Chromatic to CI

Add to `.github/workflows/ci.yml` as a new job after `build-and-test`:

```yaml
chromatic:
  runs-on: ubuntu-latest
  needs: build-and-test

  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22.x
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Publish to Chromatic
      uses: chromaui/action@latest
      with:
        projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
        exitZeroOnChanges: true
        autoAcceptChanges: main
```

> **Note for Copilot:** Create a project at [chromatic.com](https://www.chromatic.com), copy the project token, and add it as `CHROMATIC_PROJECT_TOKEN` in GitHub repository secrets.

---

### Step 3.2 — Add a `chromatic` npm script

In `package.json` scripts:

```json
"chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN"
```

---

## Phase 4 — VSCode & JetBrains IDE Integration (Medium)

### Context

The custom elements manifest is already generated (`npm run analyze`). This phase derives IDE integration files from it so HTML editing gets attribute autocomplete.

---

### Step 4.1 — Install the transformer

```bash
npm install --save-dev @custom-elements-manifest/to-vscode-custom-data
```

---

### Step 4.2 — Add the transform script

In `package.json` scripts:

```json
"ide:vscode": "cem-to-vscode-custom-data --manifest custom-elements.json --outDir .",
"analyze": "cem analyze --litelement --globs \"src/**/*.ts\" && npm run ide:vscode"
```

This regenerates `vscode.html-custom-data.json` every time the manifest is rebuilt.

---

### Step 4.3 — Register the custom data file in VS Code settings

Create `.vscode/settings.json` (or add to it if it exists):

```json
{
  "html.customData": ["./.vscode/vscode.html-custom-data.json"],
  "css.customData": []
}
```

> **Note for Copilot:** After running `npm run analyze`, move or copy `vscode.html-custom-data.json` into `.vscode/`. Adjust the `ide:vscode` script `--outDir` to `.vscode` to do this automatically.

---

## Phase 5 — Dark Mode & Theming API (Medium)

### Context

Token values are hardcoded in `src/styles/shared-styles.ts`. This phase externalises them into a proper theming system with light and dark modes.

---

### Step 5.1 — Create a token file

Create `src/styles/tokens.ts`. Each token is a CSS custom property definition:

```ts
/**
 * Design token definitions for light mode (default).
 */
export const lightTokens = `
  --mu-primary: #1976d2;
  --mu-primary-light: #42a5f5;
  --mu-primary-dark: #1565c0;
  --mu-primary-contrast: #fff;
  --mu-secondary: #9c27b0;
  --mu-secondary-light: #ba68c8;
  --mu-secondary-dark: #7b1fa2;
  --mu-secondary-contrast: #fff;
  --mu-error: #d32f2f;
  --mu-warning: #ed6c02;
  --mu-info: #0288d1;
  --mu-success: #2e7d32;
  --mu-bg-default: #f9fafb;
  --mu-bg-paper: #fff;
  --mu-divider: #e0e0e0;
  --mu-text-primary: #212b36;
  --mu-text-secondary: #637381;
  --mu-text-disabled: #919eab;
`;

/**
 * Design token overrides for dark mode.
 */
export const darkTokens = `
  --mu-primary: #90caf9;
  --mu-primary-light: #e3f2fd;
  --mu-primary-dark: #42a5f5;
  --mu-primary-contrast: #000;
  --mu-secondary: #ce93d8;
  --mu-secondary-contrast: #000;
  --mu-bg-default: #121212;
  --mu-bg-paper: #1e1e1e;
  --mu-divider: #333;
  --mu-text-primary: #fff;
  --mu-text-secondary: #aaa;
  --mu-text-disabled: #555;
`;
```

---

### Step 5.2 — Create `mu-theme-provider` component

Create `src/theme/mu-theme-provider.ts`:

```ts
import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {lightTokens, darkTokens} from '../styles/tokens.js';

/**
 * Theme provider that injects design tokens into the DOM subtree.
 * Wrap your application root with this element.
 */
@customElement('mu-theme-provider')
export class MuThemeProvider extends LitElement {
  /** Active color scheme. */
  @property({type: String, reflect: true}) mode: 'light' | 'dark' = 'light';

  static override styles = css`
    :host {
      display: contents;
    }
  `;

  override render(): TemplateResult {
    const tokens = this.mode === 'dark' ? darkTokens : lightTokens;

    return html`
      <style>
        :host {
          ${tokens}
        }
      </style>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-theme-provider': MuThemeProvider;
  }
}
```

---

### Step 5.3 — Update `shared-styles.ts`

Remove the hardcoded color token block from `sharedStyles` (leave only spacing, typography, and shadows). Token values now come from `mu-theme-provider` or from the consumer's own `:root` block. This avoids specificity conflicts.

---

### Step 5.4 — Add a CSS utility for consumers

Create `src/styles/theme.css`. Consumers who do not use `mu-theme-provider` can import this file to apply light tokens at `:root`:

```css
:root {
  --mu-primary: #1976d2;
  --mu-primary-light: #42a5f5;
  --mu-primary-dark: #1565c0;
  --mu-primary-contrast: #fff;
  --mu-secondary: #9c27b0;
  --mu-bg-default: #f9fafb;
  --mu-bg-paper: #fff;
  --mu-divider: #e0e0e0;
  --mu-text-primary: #212b36;
  --mu-text-secondary: #637381;
  --mu-text-disabled: #919eab;
  --mu-error: #d32f2f;
  --mu-warning: #ed6c02;
  --mu-info: #0288d1;
  --mu-success: #2e7d32;
}

@media (prefers-color-scheme: dark) {
  :root {
    --mu-primary: #90caf9;
    --mu-bg-default: #121212;
    --mu-bg-paper: #1e1e1e;
    --mu-divider: #333;
    --mu-text-primary: #fff;
    --mu-text-secondary: #aaa;
    --mu-text-disabled: #555;
  }
}
```

---

### Step 5.5 — Export from barrel and add story

Add `'./theme-provider': './dist/theme-provider.js'` to the `exports` map in `package.json`.

Create `src/theme/mu-theme-provider.stories.ts` with a `LightMode` and a `DarkMode` story.

Add unit, render, and e2e tests in `src/theme/_tests/`.

---

## Phase 6 — Form Input Components (Critical)

Each form component follows the same file pattern established by existing components:

- `src/<name>/mu-<name>.ts`
- `src/<name>/mu-<name>.stories.ts`
- `src/<name>/README.md`
- `src/<name>/_tests/mu-<name>.unit.test.ts`
- `src/<name>/_tests/mu-<name>.render.test.ts`
- `src/<name>/_tests/mu-<name>.e2e.test.ts`
- `src/<name>/_tests/mu-<name>.perf.test.ts`

All form components must use the [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) to participate in native forms.

---

### Step 6.1 — `mu-checkbox`

**File:** `src/checkbox/mu-checkbox.ts`

Key implementation details:

- `static formAssociated = true;`
- `internals = this.attachInternals();`
- `@property({type: Boolean, reflect: true}) checked = false;`
- `@property({type: Boolean, reflect: true}) indeterminate = false;`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: String}) name = '';`
- `@property({type: String}) value = 'on';`
- On change: call `this.internals.setFormValue(this.checked ? this.value : null)`.
- Render a visually-hidden `<input type="checkbox">` inside shadow DOM OR draw the checkbox entirely in shadow DOM and sync state to `internals`.
- `aria-checked` must reflect `indeterminate` state.
- Keyboard: `Space` toggles checked state.

---

### Step 6.2 — `mu-radio`

**File:** `src/radio/mu-radio.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: Boolean, reflect: true}) checked = false;`
- `@property({type: String}) name = '';`
- `@property({type: String}) value = '';`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- On selection, dispatch a `change` event and call `this.internals.setFormValue(this.value)`.
- Sibling deselection: query all `mu-radio` elements with the same `name` in the same form and uncheck them — use `this.internals.form?.querySelectorAll('mu-radio')`.
- `role="radio"`, `aria-checked`, tab index management (roving tabindex within a radio group).

Create a companion `mu-radio-group` wrapper (`src/radio/mu-radio-group.ts`) with `role="radiogroup"` and an `aria-labelledby` wired to a `label` property.

---

### Step 6.3 — `mu-switch`

**File:** `src/switch/mu-switch.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: Boolean, reflect: true}) checked = false;`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: String}) name = '';`
- `@property({type: String}) value = 'on';`
- `role="switch"`, `aria-checked` reflects `checked`.
- Keyboard: `Space` or `Enter` toggles state.
- Render a sliding track and thumb using shadow DOM CSS.

---

### Step 6.4 — `mu-text-field`

**File:** `src/text-field/mu-text-field.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: String}) value = '';`
- `@property({type: String}) label = '';`
- `@property({type: String}) placeholder = '';`
- `@property({type: String}) type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' = 'text';`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: Boolean, reflect: true}) readonly = false;`
- `@property({type: Boolean, reflect: true}) required = false;`
- `@property({type: String}) error = '';` — when non-empty, renders below input and sets `aria-describedby`.
- `@property({type: String}) helperText = '';`
- Render a native `<input>` inside shadow DOM. Forward `value` changes to `this.internals.setFormValue(value)`.
- On native `invalid` event, set `this.error` to `this.internals.validationMessage`.
- The `<label>` must be associated to the `<input>` via `id` inside the shadow root (not `for` — that does not cross shadow boundaries). Use `aria-labelledby` if a label slot is preferred.

---

### Step 6.5 — `mu-select`

**File:** `src/select/mu-select.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: String}) value = '';`
- `@property({type: String}) label = '';`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: Boolean, reflect: true}) required = false;`
- `@property({type: String}) error = '';`
- Use a native `<select>` inside shadow DOM to get OS-native accessibility for free (keyboard navigation, screen reader options list). Style it via `appearance: none` and a custom chevron icon.
- Alternatively, implement a custom listbox using `role="combobox"`, `role="listbox"`, and `role="option"` — but this requires significant accessible keyboard and ARIA work (see [ARIA Authoring Practices: Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)).
- **Recommendation:** Use native `<select>` for v1.

---

### Step 6.6 — Add all new form entries to barrel and exports

After each form component is created:

1. Add its export to `src/index.ts`.
2. Add its entry to `vite.lib.config.ts`.
3. Add its subpath to the `exports` map in `package.json`.
4. Run `npm run analyze` to regenerate `custom-elements.json`.

---

## Phase 7 — Overlay Components (High)

All overlays share the same structural requirements:

- Must render in a `<dialog>` or a top-layer portal.
- Must manage focus on open (move focus inside) and on close (restore focus to trigger).
- Must trap focus inside while open.
- Must close on `Escape`.

---

### Step 7.1 — `mu-dialog`

**File:** `src/dialog/mu-dialog.ts`

Key implementation details:

- `@property({type: Boolean, reflect: true}) open = false;`
- `@property({type: String}) headline = '';`
- Use the native `<dialog>` element inside shadow DOM: `this.shadowRoot.querySelector('dialog').showModal()`.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the headline element id.
- Slots: `(default)` for body content, `actions` for footer buttons.
- On open: call `dialog.showModal()`, dispatch `mu-open` custom event.
- On close: call `dialog.close()`, restore focus to `this._triggerElement`, dispatch `mu-close` custom event.
- Store `document.activeElement` as `_triggerElement` before opening.
- The native `<dialog>` handles focus trap and `Escape` natively in modern browsers. Add a polyfill note in README for older browser support if needed.

---

### Step 7.2 — `mu-tooltip`

**File:** `src/tooltip/mu-tooltip.ts`

Key implementation details:

- `@property({type: String}) label = '';`
- `@property({type: String}) placement: 'top' | 'bottom' | 'left' | 'right' = 'top';`
- Renders a slot for the trigger and a visually-hidden tooltip.
- Shows on `mouseenter`/`focusin`, hides on `mouseleave`/`focusout`.
- Use the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) (`popover` attribute + `showPopover()`/`hidePopover()`) instead of `position: absolute` — top-layer rendering avoids z-index wars.
- `role="tooltip"` on the tooltip content element, referenced by `aria-describedby` on the trigger.
- Delay show by ~300 ms to avoid flickering on fast mouse moves.

---

### Step 7.3 — `mu-snackbar`

**File:** `src/snackbar/mu-snackbar.ts`

Key implementation details:

- `@property({type: String}) message = '';`
- `@property({type: String}) variant: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default';`
- `@property({type: Number}) duration = 5000;` — 0 means persistent.
- `@property({type: Boolean, reflect: true}) open = false;`
- `@property({type: String}) actionLabel = '';`
- `@fires mu-action` — dispatched when the action button is clicked.
- Render in a fixed position (bottom-center) using a `<div role="status" aria-live="polite">` for non-critical notifications or `aria-live="assertive"` for errors.
- Auto-dismiss via `setTimeout`; clear/reset timer when `message` changes.

---

## Phase 8 — Additional Components (Low)

These follow the exact same file structure used in Phase 6. Listed from simplest to most complex.

---

### Step 8.1 — `mu-skeleton`

Single component. Props: `variant: 'text' | 'circular' | 'rectangular'`, `width`, `height`, `animation: 'pulse' | 'wave' | false`. Pure CSS animation, no logic.

---

### Step 8.2 — `mu-spinner` (CircularProgress)

Single component. Props: `size: 'small' | 'medium' | 'large'`, `color`, `value` (0–100 for determinate), `determinate: boolean`. Render a styled `<svg>` circle with a stroke-dashoffset animation.

---

### Step 8.3 — `mu-linear-progress`

Single component. Props: `value` (0–100), `color`, `indeterminate: boolean`. Pure CSS keyframe animation in indeterminate mode.

---

### Step 8.4 — `mu-alert`

Single component. Props: `severity: 'success' | 'info' | 'warning' | 'error'`, `onClose` optional. Slots: `(default)` for message, `icon`. Renders with `role="alert"` or `role="status"` depending on severity.

---

### Step 8.5 — `mu-tabs` + `mu-tab` + `mu-tab-panel`

Three cooperating components. Requirements:

- `mu-tabs` manages `selectedIndex` state and keyboard navigation (arrow keys, roving tabindex).
- `mu-tab`: `role="tab"`, `aria-selected`, `aria-controls="panel-id"`.
- `mu-tab-panel`: `role="tabpanel"`, `aria-labelledby="tab-id"`, hidden when not selected.
- Use `@queryAssignedElements` to discover slotted `mu-tab` children.
- Follow [ARIA Authoring Practices: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

---

### Step 8.6 — `mu-accordion` + `mu-accordion-item`

Two cooperating components. Requirements:

- `mu-accordion-item`: `@property expanded: boolean`. Toggle on header click. Animate height using `max-height` transition.
- `mu-accordion`: `@property allowMultiple: boolean`. If false, collapse siblings when one opens.
- `role="region"`, `aria-expanded`, `aria-controls`.

---

### Step 8.7 — Navigation components

Implement in this order (simplest to most complex):

1. `mu-breadcrumb` + `mu-breadcrumb-item` — `nav[aria-label="breadcrumb"]` + `ol/li` with `aria-current="page"` on last item.
2. `mu-pagination` — emit `page-change` events; full keyboard support.
3. `mu-app-bar` — sticky header; slots for `start`, `(default)`, `end`.
4. `mu-drawer` — uses `<dialog>` (same as `mu-dialog`); `placement: 'left' | 'right'`.

---

## Phase 9 — i18n (Low)

### Context

Hardcoded user-visible strings exist in components:

- `mu-chip`: `"Delete ${this.label}"` (aria-label on delete button)
- `mu-badge`: `"Badge content: ${this.content || 'new'}"` (auto-generated label fallback)
- `mu-dialog`: close button aria-label (when added)

---

### Step 9.1 — Create a locale map

Create `src/i18n/default-locale.ts`:

```ts
/**
 * Default locale strings used by components for accessible labels.
 * Override by providing a custom locale object to MuLocaleProvider.
 */
export const defaultLocale = {
  chip: {
    deleteLabel: (label: string) => `Delete ${label}`,
  },
  badge: {
    defaultLabel: (content: string | number) => `Badge content: ${content || 'new'}`,
  },
  dialog: {
    closeLabel: 'Close',
  },
  snackbar: {
    closeLabel: 'Dismiss',
  },
} as const;

export type MuLocale = typeof defaultLocale;
```

---

### Step 9.2 — Create `mu-locale-provider`

Create `src/i18n/mu-locale-provider.ts`. Expose the locale through a reactive context (using the Lit [Context API](https://lit.dev/docs/data/context/)):

```ts
import {createContext} from '@lit/context';
import type {MuLocale} from './default-locale.js';

export const localeContext = createContext<MuLocale>('mu-locale');
```

`mu-locale-provider` provides the context; each component that has hardcoded strings consumes it with `@consume({context: localeContext, subscribe: true})`. Install `@lit/context` first:

```bash
npm install @lit/context
```

---

### Step 9.3 — Update each affected component

For `mu-chip`:

```ts
// Before
aria-label="Delete ${this.label}"

// After
aria-label="${this._locale.chip.deleteLabel(this.label)}"
```

Where `_locale` is the consumed context value, falling back to `defaultLocale` when no provider is present.

---

## Completion Checklist

After all phases:

- [x] `npm run build` produces a `dist/` with `.js` and `.d.ts` for all components ✅
- [x] `npm run lint` passes with zero errors ✅
- [x] `npm run test:unit` passes at ≥ 80% coverage across all new components ✅ (100%)
- [x] `npm run test:e2e` covers at least one critical user flow per new interactive component ✅ (9 files, 20 tests)
- [x] CI workflow runs on every PR and blocks merges on failures ✅ (`.github/workflows/ci.yml`)
- [x] Each new component has a colocated `README.md` and `*.stories.ts` ✅
- [x] `npm run analyze` regenerates `custom-elements.json` and `vscode.html-custom-data.json` ✅ (all 38 elements including `mu-locale-provider`)
- [x] `src/index.ts` exports every public class and type ✅
- [x] Dark mode renders correctly in the `mu-theme-provider` `DarkMode` story ✅ (`mu-theme-provider` + token maps + stories + 20 tests, 100% coverage)
- [x] i18n support via `mu-locale-provider` ✅ (`src/i18n/`; `mu-chip`, `mu-badge`, `mu-snackbar` consume locale context; 14 tests; stories; README)
  - **Note:** `MuLocale` is implemented as an `interface` (not `typeof defaultLocale as const`) to allow consumers to supply objects with explicit return-type annotations on locale functions — a deliberate improvement over the spec.
