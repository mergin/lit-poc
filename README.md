# Lit POC Component Library

A modern, accessible, and compositional web component library built with Lit 3 and TypeScript, following Minimal/MUI design principles.

## Table of Contents

- [Features](#features)
- [Components](#components)
- [Framework Compatibility](#framework-compatibility)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Build](#build)
  - [Development Server](#development-server)
  - [Testing](#testing)
    - [Unit & Render Tests](#unit--render-tests)
    - [End-to-End Tests](#end-to-end-tests)
    - [Performance Tests](#performance-tests)
  - [Linting & Formatting](#linting--formatting)
  - [Static Docs Site](#static-docs-site)
- [Commit Rules](#commit-rules)
- [Project Structure](#project-structure)
- [Vite Configuration](#vite-configuration)
  - [vite.lib.config.ts — Library build](#vitelibconfigts--library-build)
  - [vite.docs.config.ts — Docs site build](#vitedocsconfigts--docs-site-build)
  - [Adding a new component](#adding-a-new-component-to-the-build)
  - [Key differences at a glance](#key-differences-at-a-glance)
- [Tooling](#tooling)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Lit 3 + TypeScript 5**: Strict, maintainable, and type-safe.
- **Minimal/MUI-inspired UI**: Shared styles, tokens, and typography for a consistent look.
- **Compositional Components**: Build complex UIs from small, reusable parts (e.g., `<mu-card>`, `<mu-card-header>`, etc.).
- **Strict Linting & Formatting**: ESLint, Prettier, and lit-analyzer for code quality.
- **Automated Testing**: Uses Vitest (unit, render, and performance benchmarks) and Playwright (E2E tests).
- **Component Explorer**: Storybook for viewing and interacting with components.
- **Static Docs Site**: Built with Eleventy and Vite for demos and API docs.
- **Commit Message Linting**: Enforces Conventional Commits via commitlint and Husky.

---

## Components

All components are available as individual subpath imports (`lit-poc/<component>`) or via the main entry point.

### Layout & Display

| Component        | Tag                           | Description                                                   |
| ---------------- | ----------------------------- | ------------------------------------------------------------- |
| Avatar           | `<mu-avatar>`                 | User avatar with image or initials fallback.                  |
| Badge            | `<mu-badge>`                  | Small status indicator overlaid on content.                   |
| Card             | `<mu-card>`                   | Content container with header, body, and actions slots.       |
| Chip             | `<mu-chip>`                   | Compact element for tags, filters, or actions.                |
| Chip Input       | `<mu-chip-input>`             | Text input that creates and manages removable chip values.    |
| Divider          | `<mu-divider>`                | Horizontal or vertical separator line.                        |
| Icon             | `<mu-icon>`                   | Inline SVG icon wrapper.                                      |
| List / List Item | `<mu-list>`, `<mu-list-item>` | Vertical list container with optional leading/trailing slots. |
| Typography       | `<mu-typography>`             | Semantic text elements (h1–h6, body, caption, overline).      |

### Data Display

| Component  | Tag               | Description                                                       |
| ---------- | ----------------- | ----------------------------------------------------------------- |
| Data Table | `<mu-data-table>` | Sortable data table with row selection, loading state, and slots. |

### Feedback & Status

| Component       | Tag                    | Description                                                 |
| --------------- | ---------------------- | ----------------------------------------------------------- |
| Alert           | `<mu-alert>`           | Contextual feedback banner (success, info, warning, error). |
| Linear Progress | `<mu-linear-progress>` | Horizontal progress bar (determinate or indeterminate).     |
| Skeleton        | `<mu-skeleton>`        | Animated placeholder for loading states.                    |
| Snackbar        | `<mu-snackbar>`        | Brief notification toasts with optional action.             |
| Spinner         | `<mu-spinner>`         | Circular progress indicator (determinate or indeterminate). |

### Form Inputs

| Component           | Tag                              | Description                                                  |
| ------------------- | -------------------------------- | ------------------------------------------------------------ |
| Button              | `<mu-button>`                    | Interactive button with variants and states.                 |
| Checkbox            | `<mu-checkbox>`                  | Binary toggle with indeterminate support.                    |
| File Upload         | `<mu-file-upload>`               | Native form-associated file picker with drag-and-drop UI.    |
| Radio / Radio Group | `<mu-radio>`, `<mu-radio-group>` | Single-choice radio controls with group management.          |
| Rating              | `<mu-rating>`                    | Star rating input with keyboard support and read-only mode.  |
| Select              | `<mu-select>`                    | Native-backed dropdown with validation support.              |
| Slider              | `<mu-slider>`                    | Range slider with keyboard and pointer interaction.          |
| Switch              | `<mu-switch>`                    | Toggle switch for boolean settings.                          |
| Text Field          | `<mu-text-field>`                | Single-line text input with label, hint, and error states.   |
| Autocomplete        | `<mu-autocomplete>`              | Combobox with filtering, keyboard navigation, and selection. |

### Navigation

| Component  | Tag                                       | Description                                                        |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------ |
| App Bar    | `<mu-app-bar>`                            | Sticky application header with leading, title, and trailing slots. |
| Breadcrumb | `<mu-breadcrumb>`, `<mu-breadcrumb-item>` | Hierarchical navigation trail.                                     |
| Menu       | `<mu-menu>`, `<mu-menu-item>`             | Floating menu with trigger slot and keyboard navigation.           |
| Pagination | `<mu-pagination>`                         | Page navigation control with ellipsis support.                     |
| Stepper    | `<mu-stepper>`, `<mu-step>`               | Multi-step progress indicator for guided workflows.                |
| Tabs       | `<mu-tabs>`, `<mu-tab>`, `<mu-tab-panel>` | ARIA-compliant tabbed interface.                                   |

### Overlays & Disclosure

| Component | Tag                                     | Description                                            |
| --------- | --------------------------------------- | ------------------------------------------------------ |
| Accordion | `<mu-accordion>`, `<mu-accordion-item>` | Expandable/collapsible sections.                       |
| Dialog    | `<mu-dialog>`                           | Modal dialog with focus trapping and Escape-key close. |
| Drawer    | `<mu-drawer>`                           | Side panel that slides in from left or right.          |
| Popover   | `<mu-popover>`                          | Floating overlay anchored to trigger content.          |
| Tooltip   | `<mu-tooltip>`                          | Contextual hover/focus hint.                           |

### Theme

| Component      | Tag                   | Description                                             |
| -------------- | --------------------- | ------------------------------------------------------- |
| Theme Provider | `<mu-theme-provider>` | Sets CSS custom-property tokens for the component tree. |

In addition to the component entry point, the package also exposes `lit-poc/tokens` for programmatic token access and `lit-poc/ssr` for server-side rendering helpers.

### Package Utilities

#### `lit-poc/tokens`

Use the tokens entry point when you need direct access to design token maps in JavaScript or TypeScript:

```ts
import {lightTokens, darkTokens, spacingTokens} from 'lit-poc/tokens';

console.log(lightTokens['--mu-primary']);
console.log(darkTokens['--mu-bg-default']);
console.log(spacingTokens);
```

#### `lit-poc/ssr`

Use the SSR entry point to render Lit templates on the server while importing library exports from the same module:

```ts
import {html} from 'lit';
import {collectResult, render} from 'lit-poc/ssr';
import 'lit-poc';

const stream = render(html`<mu-button color="primary">Save</mu-button>`);
const markup = await collectResult(stream);
```

`lit-poc/ssr` is intended for ESM-capable server environments such as Node.js, Vite SSR, or Next.js route handlers. The package already includes `@lit-labs/ssr` as a dependency, so you do not need to install it separately unless you want to use that library directly.

### Internationalization (i18n)

| Component       | Tag                    | Description                                                                           |
| --------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| Locale Provider | `<mu-locale-provider>` | Provides localized strings to descendant components via Lit Context (`@lit/context`). |

---

## Framework Compatibility

This library ships standard Web Components (Custom Elements v1, Shadow DOM). All components work natively in any modern browser and any framework that renders to the real DOM. Below are framework-specific setup guides.

### React

React 19 provides native Web Component support. For **React 16.8–18**, use the included React wrapper subpath — generated with [`@lit/react`](https://www.npmjs.com/package/@lit/react) — which maps custom events to typed React prop callbacks.

#### React 19 — native usage

```tsx
import 'lit-poc/button';
import 'lit-poc/chip';

function App() {
  return <mu-button color="primary">Save</mu-button>;
}
```

#### React 16.8–18 — `lit-poc/react` wrapper package

```tsx
import {Button, Chip, TextField, Dialog} from 'lit-poc/react';

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        color="primary"
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      <Chip
        label="React"
        deletable
        onDelete={() => console.log('deleted')}
      />
      <TextField
        label="Name"
        onChange={(e) => console.log(e)}
      />
      <Dialog
        headline="Confirm"
        open={open}
        onClose={() => setOpen(false)}
      >
        Are you sure?
      </Dialog>
    </>
  );
}
```

Every element has a PascalCase export (e.g. `<mu-pagination>` → `Pagination`). Custom events are mapped to `onEventName` props — see the table below.

| Web Component event | React prop          |
| ------------------- | ------------------- |
| `delete`            | `onDelete`          |
| `change`            | `onChange`          |
| `mu-open`           | `onOpen`            |
| `mu-close`          | `onClose`           |
| `mu-action`         | `onAction`          |
| `mu-complete`       | `onComplete`        |
| `tab-change`        | `onTabChange`       |
| `accordion-toggle`  | `onAccordionToggle` |
| `page-change`       | `onPageChange`      |

---

### Vue 3

Vue 3 supports custom elements natively. Configure the compiler to treat `mu-*` tags as custom elements.

#### `vite.config.ts`

```ts
import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mu-'),
        },
      },
    }),
  ],
});
```

#### Usage

```vue
<script setup lang="ts">
import 'lit-poc/button';
import 'lit-poc/chip';
</script>

<template>
  <mu-button color="primary">Save</mu-button>
  <mu-chip
    label="Vue"
    deletable
    @delete="onDelete"
  />
</template>
```

Vue binds properties with `:propName="value"` and listens to DOM events with `@eventName`. All `mu-*` events use `bubbles: true, composed: true`.

---

### Angular

Add `CUSTOM_ELEMENTS_SCHEMA` to suppress unknown-element warnings.

#### Standalone component

```ts
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import 'lit-poc/button';
import 'lit-poc/chip';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <mu-button color="primary">Save</mu-button>
    <mu-chip
      label="Angular"
      deletable
      (delete)="onDelete()"
    ></mu-chip>
  `,
})
export class AppComponent {
  onDelete(): void {
    console.log('chip deleted');
  }
}
```

Angular binds properties with `[propName]="value"` and listens to events with `(eventName)`.

#### Reactive Forms

The library ships Angular `ControlValueAccessor` directives for form elements. Import them via `MuFormsModule` or as individual standalone directives.

| Element            | Strategy                       | Notes                                                                                       |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `<mu-text-field>`  | `MuTextFieldControlDirective`  | Value, disabled, and error state synced; `error` set automatically from validation messages |
| `<mu-checkbox>`    | `MuCheckboxControlDirective`   | Maps boolean `checked` to form model                                                        |
| `<mu-switch>`      | `MuSwitchControlDirective`     | Maps boolean `checked` to form model                                                        |
| `<mu-select>`      | `MuSelectControlDirective`     | Bridges `change` event (not `input`)                                                        |
| `<mu-radio-group>` | `MuRadioGroupControlDirective` | Intercepts bubbled `change` from child `<mu-radio>` elements                                |

##### NgModule setup

```ts
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MuFormsModule} from 'lit-poc/angular';
import 'lit-poc/text-field';
import 'lit-poc/checkbox';
import 'lit-poc/switch';
import 'lit-poc/select';
import 'lit-poc/radio';
import 'lit-poc/radio-group';

@NgModule({
  imports: [ReactiveFormsModule, MuFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

##### Standalone component with reactive forms

```ts
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {
  MuCheckboxControlDirective,
  MuSwitchControlDirective,
  MuSelectControlDirective,
  MuRadioGroupControlDirective,
  MuTextFieldControlDirective,
} from 'lit-poc/angular';
import 'lit-poc/text-field';
import 'lit-poc/checkbox';
import 'lit-poc/switch';
import 'lit-poc/select';
import 'lit-poc/radio';
import 'lit-poc/radio-group';

@Component({
  selector: 'app-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ReactiveFormsModule,
    MuCheckboxControlDirective,
    MuSwitchControlDirective,
    MuSelectControlDirective,
    MuRadioGroupControlDirective,
    MuTextFieldControlDirective,
  ],
  template: `
    <form [formGroup]="form">
      <!-- text-field: MuTextFieldControlDirective activated automatically -->
      <mu-text-field
        formControlName="name"
        label="Name"
      ></mu-text-field>

      <!-- checkbox: boolean checked value -->
      <mu-checkbox
        formControlName="agree"
        label="I agree"
      ></mu-checkbox>

      <!-- switch: boolean checked value -->
      <mu-switch
        formControlName="notifications"
        label="Email notifications"
      ></mu-switch>

      <!-- select: string value -->
      <mu-select
        formControlName="country"
        label="Country"
        [options]="countries"
      ></mu-select>

      <!-- radio-group: string value from child radios -->
      <mu-radio-group
        formControlName="color"
        name="color"
      >
        <mu-radio
          value="red"
          label="Red"
        ></mu-radio>
        <mu-radio
          value="blue"
          label="Blue"
        ></mu-radio>
        <mu-radio
          value="green"
          label="Green"
        ></mu-radio>
      </mu-radio-group>
    </form>
  `,
})
export class AppFormComponent {
  readonly countries = [
    {value: 'us', label: 'United States'},
    {value: 'uk', label: 'United Kingdom'},
  ];

  readonly form = new FormGroup({
    name: new FormControl(''),
    agree: new FormControl(false),
    notifications: new FormControl(true),
    country: new FormControl('us'),
    color: new FormControl('red'),
  });
}
```

#### How the directives are activated

The CVA directives use Angular's **selector-based activation** — no extra attribute is needed. Each directive's selector matches the standard Angular forms bindings:

```
mu-text-field[formControlName], mu-text-field[formControl], mu-text-field[ngModel]
mu-checkbox[formControlName],   mu-checkbox[formControl],   mu-checkbox[ngModel]
mu-switch[formControlName],     mu-switch[formControl],     mu-switch[ngModel]
mu-select[formControlName],     mu-select[formControl],     mu-select[ngModel]
mu-radio-group[formControlName], mu-radio-group[formControl], mu-radio-group[ngModel]
```

When `formControlName="agree"` is placed on any of these elements inside a reactive form, Angular automatically instantiates the corresponding directive. No additional attribute or configuration is required.

`MuTextFieldControlDirective` also subscribes to the control's `statusChanges` observable (via `ControlContainer`) and automatically sets the element's `error` property when the control is touched and invalid, clearing it when it becomes valid again.

#### ControlValueAccessor contract

Each directive fully implements the `ControlValueAccessor` interface used by both `ReactiveFormsModule` and `FormsModule`:

| Method                  | Behaviour                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `writeValue(v)`         | Pushes a model value down to the element (`checked` for boolean controls, `value` for `mu-select`). **Never calls `onChange`** — Angular requires this separation. |
| `registerOnChange(fn)`  | Stores Angular's callback. Called with the new value every time the user interacts with the element.                                                               |
| `registerOnTouched(fn)` | Stores Angular's touched callback. Called alongside every `onChange`.                                                                                              |
| `setDisabledState(b)`   | Sets the `disabled` property on the host element. For `mu-radio-group`, every child `<mu-radio>` is disabled or re-enabled.                                        |

`<mu-radio-group>` also applies a **deselection guard**: it ignores `change` events fired by a radio whose `checked` property is `false` (i.e. the radio being deselected). This prevents a spurious second `onChange` call when the user switches between options.

#### Testing the CVA contract

The library ships unit tests for each directive under `src/angular/_tests/`. Each suite verifies the complete `ControlValueAccessor` contract in isolation. Angular's module graph is never loaded — Vitest's `vi.mock` stubs `@angular/core` and `@angular/forms` before any import, preventing the JIT compilation errors that would otherwise occur in a non-Angular test environment.

```
src/angular/_tests/
├── mu-checkbox-control.directive.unit.test.ts    (9 tests)
├── mu-switch-control.directive.unit.test.ts      (9 tests)
├── mu-select-control.directive.unit.test.ts      (9 tests)
└── mu-radio-group-control.directive.unit.test.ts (10 tests)
```

Each test follows the Arrange–Act–Assert pattern and covers:

- `writeValue` for every valid input, including coercion of `null`.
- `_handleChange` calling `onChange` with the correct value and calling `onTouched`.
- `setDisabledState(true/false)` reflecting onto the element's `disabled` property.
- Proof that `writeValue` **does not** call `onChange` (the key Angular contract invariant).

Run only the Angular directive tests:

```bash
npx vitest run src/angular/_tests/
```

#### Known warnings when running tests

Two warnings appear in the test output. Both are benign and do not affect correctness.

**`Lit is in dev mode. Not recommended for production!`**

Lit writes this message to `stderr` whenever `NODE_ENV` is not `"production"`. It is expected in a test environment. To suppress it, prefix the command with `NODE_ENV=production`:

```bash
NODE_ENV=production npx vitest run
```

Or set it globally in `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    env: {NODE_ENV: 'production'},
  },
});
```

**`[DEP0151] DeprecationWarning: No "main" or "exports" field in @open-wc/semantic-dom-diff`**

This Node.js deprecation notice originates from `@open-wc/testing`. The `@open-wc/semantic-dom-diff` package does not declare an `exports` field in its `package.json`, so Node.js falls back to a legacy index-file lookup that is now deprecated. This is a bug in the upstream `@open-wc` packages and is unrelated to this library. It appears only in render test files that import `@open-wc/testing`, not in unit tests. No action is needed — it has no effect on test results.

---

### Svelte

Svelte supports Web Components natively — no configuration needed.

```svelte
<script>
  import 'lit-poc/button';
  import 'lit-poc/chip';
</script>

<mu-button color="primary">Save</mu-button>
<mu-chip label="Svelte" deletable on:delete={() => console.log('deleted')} />
```

---

### Vanilla JS / HTML

```html
<script
  type="module"
  src="https://unpkg.com/lit-poc/dist/button.js"
></script>
<script
  type="module"
  src="https://unpkg.com/lit-poc/dist/chip.js"
></script>

<mu-button color="primary">Save</mu-button>
<mu-chip
  id="chip"
  label="Vanilla"
  deletable
></mu-chip>

<script>
  document.getElementById('chip').addEventListener('delete', () => {
    console.log('chip deleted');
  });
</script>
```

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Development Server

```bash
npm run serve
```

Open [http://localhost:8000/dev/index.html](http://localhost:8000/dev/index.html) to view the demo.

### Testing

#### Unit & Render Tests

Run all unit and render tests:

```bash
npm run test:unit
```

Watch unit tests during development:

```bash
npm run test:watch
```

#### End-to-End Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

Run the full automated test suite, including E2E:

```bash
npm run test:all
```

#### Performance Tests

Run all component performance benchmarks:

```bash
npm run test:perf
```

Benchmarks are located alongside each component in `src/<component>/_tests/*.perf.test.ts` and are powered by [Vitest's built-in benchmark runner](https://vitest.dev/guide/features.html#benchmarking) (based on [tinybench](https://github.com/tinylibs/tinybench)).

Each suite measures two dimensions of cost per component:

| Benchmark                      | What it measures                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `instantiation`                | Overhead of `new MuXxx()` — Lit constructor + decorator setup                                    |
| `property writes — <scenario>` | Cost of setting one or more reactive properties (e.g. variant cycle, disabled toggle, all props) |

The output reports `hz` (operations per second), latency percentiles (`p75`, `p99`, `p999`), relative error margin, and a ranked summary — e.g.:

```text
✓ src/typography/_tests/mu-typography.perf.test.ts > mu-typography performance
  · instantiation                          790,011 hz   ±1.00%
  · property writes — full variant cycle   418,498 hz   ±0.95%

Summary
  instantiation
    1.89x faster than property writes — full variant cycle
```

Benchmarks run in the `happy-dom` environment to keep results fast and consistent across machines. Use them as a regression baseline when making changes to component logic or styles.

### Linting & Formatting

Check code quality and auto-fix issues:

```bash
npm run lint
npm run format
```

Validate the generated dev landing page registry on its own:

```bash
npm run validate:landing
```

### Storybook

Run the interactive component explorer:

```bash
npm run storybook
```

Build Storybook for deployment:

```bash
npm run build-storybook
```

### Static Docs Site

Build and serve the documentation:

```bash
npm run docs
npm run docs:serve
```

Generate the custom elements manifest only:

```bash
npm run analyze
```

Rebuild exported design-token artefacts only:

```bash
npm run build:tokens
```

---

## Commit Rules

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) using commitlint and Husky.

- **Pre-commit**: Runs Prettier, ESLint, and tests on staged files.
- **Commit message**: Must follow the format `type(scope): subject`, e.g.:

```text
feat(card): add header slot to card component
fix: correct button alignment in mu-card-actions
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

If your commit message does not follow the rules, the commit will be rejected.

---

## Project Structure

- `src/` — Source code for all components, unit/E2E tests (inside `_tests/` subfolders), story files (`*.stories.ts`), and shared styles.
- `dev/` — Demo HTML for local development.
- `docs/` — Static documentation site (generated).
- `.storybook/` — Storybook configuration.
- `.husky/` — Git hooks for linting, testing, and commit message checks.

---

## Vite Configuration

The project uses two separate Vite configuration files. Each targets a distinct consumer and has different bundling rules.

### `vite.lib.config.ts` — Library build

**Script:** `npm run build` → `vite build --config vite.lib.config.ts`  
**Output directory:** `dist/`

This is the configuration used to publish the npm package. It compiles every component into its own flat ES-module file so consumers can tree-shake at the component level.

#### Output layout

```
dist/
├── index.js            ← full barrel re-export (import {} from 'lit-poc')
├── button.js           ← individual component (~3 kB gzip)
├── data-table.js
├── react.js            ← React wrapper bundle
├── angular.js          ← Angular CVA directives bundle
├── ...                 ← one file per entry in lib.entry
└── chunks/
    └── shared-*.js     ← Rollup-extracted shared code (styles, utilities)
```

#### Key settings

| Setting           | Value                     | Reason                                                                                                                    |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `outDir`          | `dist/`                   | Wiped clean before each build (`emptyOutDir: true`) to remove artefacts from deleted components.                          |
| `sourcemap`       | `true`                    | Inline source maps let consumers debug into TypeScript source in development environments.                                |
| `target`          | `es2021`                  | Matches the minimum browser baseline; provides logical-assignment operators, `WeakRef`, and other features used by Lit 3. |
| `formats`         | `['es']`                  | Only ES module output. CJS/UMD are intentionally omitted to avoid dual-package hazards and halve the dist size.           |
| `external`        | see below                 | All peer dependencies are externalised so they are _never_ inlined into dist bundles.                                     |
| `preserveModules` | `false`                   | Rollup merges modules into optimised per-entry bundles for a flat, predictable dist layout.                               |
| `chunkFileNames`  | `chunks/[name]-[hash].js` | Content-hashed chunks enable long-lived HTTP cache headers.                                                               |

#### Externalised peer dependencies

The following packages are treated as peer dependencies and must be provided by the consuming application:

| Package              | Used by                                     |
| -------------------- | ------------------------------------------- |
| `lit`, `lit/*`       | All components (Lit 3 runtime + directives) |
| `@lit/context`       | `mu-locale-provider` (context protocol)     |
| `@lit/react`         | `react` entry (React wrapper generator)     |
| `react`, `react-dom` | `react` entry                               |
| `@angular/core`      | `angular` entry (DI, decorators)            |
| `@angular/forms`     | `angular` entry (`ControlValueAccessor`)    |

#### Multi-entry strategy

Every component has its own entry in `lib.entry`. The key names map 1-to-1 with the `exports` subpath map in `package.json` and the dist filenames:

```ts
// vite.lib.config.ts
lib: {
  entry: {
    index:       'src/index.ts',         // import {} from 'lit-poc'
    button:      'src/button/mu-button.ts',   // import 'lit-poc/button'
    'list-item': 'src/list/mu-list-item.ts',  // import 'lit-poc/list-item'
    // ...
  }
}
```

```json
// package.json
"exports": {
  ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
  "./button": { "import": "./dist/button.js", "types": "./dist/button/mu-button.d.ts" },
  "./list-item": { "import": "./dist/list-item.js", "types": "./dist/list/mu-list-item.d.ts" }
}
```

#### TypeScript declarations

Vite handles JavaScript output only. Declaration files (`.d.ts`) are emitted by a separate `tsc` invocation that runs immediately after Vite as part of the same `build` script:

```bash
vite build --config vite.lib.config.ts && tsc --project tsconfig.build.json --emitDeclarationOnly
```

The `tsconfig.build.json` file sets `"declaration": true` and `"emitDeclarationOnly": true`, writing `.d.ts` files alongside the compiled JS in `dist/`.

---

### `vite.docs.config.ts` — Docs site build

**Script:** `npm run docs` (runs as part of the full docs pipeline)  
**Output directory:** `docs/` (appended alongside Eleventy's HTML output)

This configuration produces **self-contained** ES module bundles for use in the static documentation site. Unlike the library build, Lit and all other dependencies are **inlined**, so the output files can be loaded directly by a `<script type="module">` tag with no import maps or package manager required.

#### Output layout

```
docs/
├── index.html               ← generated by Eleventy (not touched by this build)
├── mu-avatar.bundled.js     ← self-contained bundle (Lit inlined)
├── mu-button.bundled.js
├── mu-card.bundled.js
└── mu-icon.bundled.js
```

#### Key settings

| Setting       | Value    | Reason                                                                                                                                                                             |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `outDir`      | `docs/`  | Bundles land alongside Eleventy's output so the docs site has everything in one directory.                                                                                         |
| `emptyOutDir` | `false`  | The `docs/` directory is managed by Eleventy. Setting this to `true` would delete all generated HTML before JS files are written. Full resets are handled by `npm run docs:clean`. |
| `sourcemap`   | `false`  | Not needed for the public docs site; omitting them reduces payload size.                                                                                                           |
| `external`    | _(none)_ | All imports, including Lit, are bundled. This is the key difference from the library build.                                                                                        |

#### Naming convention

Entries use the `<tag-name>.bundled` key pattern so the output filenames clearly signal that the file is a bundled variant:

```ts
entry: {
  'mu-button.bundled': 'src/button/mu-button.ts',  // → docs/mu-button.bundled.js
}
```

In Eleventy templates, reference the file as:

```html
<script
  type="module"
  src="/mu-button.bundled.js"
></script>
```

> **Bundle size note:** Because Lit is included in every bundle, each file is significantly larger than the equivalent library entry (~25 kB vs ~3 kB for `mu-button`). This is acceptable for a documentation site. **Do not use these bundles in production application code** — use the library subpath entries from `dist/` instead.

Only components that appear in live documentation examples need entries here. You do not need one for every component in the library.

---

### Adding a new component to the build

Adding a component requires a coordinated update to three files. The changes must stay in sync or subpath imports will break.

**1. `vite.lib.config.ts` — add an entry**

```ts
// Inside lib.entry:
'my-widget': resolve(__dirname, 'src/my-widget/mu-my-widget.ts'),
```

**2. `src/index.ts` — add the barrel export**

```ts
export {MuMyWidget} from './my-widget/mu-my-widget.js';
export type {MyWidgetVariant} from './my-widget/mu-my-widget.js'; // if applicable
```

**3. `package.json` — add the subpath export**

```json
"./my-widget": {
  "import": "./dist/my-widget.js",
  "types": "./dist/my-widget/mu-my-widget.d.ts"
}
```

If the component should also appear in the docs site, add it to `vite.docs.config.ts`:

```ts
'mu-my-widget.bundled': resolve(__dirname, 'src/my-widget/mu-my-widget.ts'),
```

---

### Key differences at a glance

|                  | `vite.lib.config.ts`        | `vite.docs.config.ts`                             |
| ---------------- | --------------------------- | ------------------------------------------------- |
| **Purpose**      | Publishable npm package     | Static documentation site                         |
| **Output dir**   | `dist/`                     | `docs/`                                           |
| **Lit bundled?** | No (externalised)           | Yes (inlined)                                     |
| **Source maps**  | Yes                         | No                                                |
| **emptyOutDir**  | `true`                      | `false`                                           |
| **Consumer**     | Application bundlers        | `<script type="module">` in HTML                  |
| **File size**    | ~1–10 kB gzip               | ~25–35 kB gzip                                    |
| **Entry naming** | `button` → `dist/button.js` | `mu-button.bundled` → `docs/mu-button.bundled.js` |

---

## Tooling

- **Linting**: ESLint, lit-analyzer
- **Formatting**: Prettier
- **Pre-commit hooks**: Husky + lint-staged
- **Commit message linting**: commitlint
- **Testing**: Vitest (unit/render/benchmarks), Playwright (E2E)
- **Docs**: Eleventy, Vite
- **Component Workshop**: Storybook

---

## Accessibility (a11y)

This library is built with accessibility as a core requirement. All components must follow these rules:

- Use semantic HTML elements for structure and interaction (button, input, nav, etc.).
- All interactive controls must have an accessible name (visible text, aria-label, or aria-labelledby).
- Ensure all controls are keyboard accessible (Tab, Enter, Space, focus order).
- Provide visible focus indicators for all focusable elements.
- Use ARIA roles and attributes (role, aria-\*, aria-disabled, aria-checked, etc.) to expose state and structure.
- Use disabled and aria-disabled appropriately; disabled controls must not be focusable or actionable.
- All form fields must have associated labels (label, aria-label, or aria-labelledby).
- Use aria-live regions to announce dynamic content, errors, or status changes.
- Ensure color contrast meets WCAG AA requirements for all text and UI elements.
- Never use color as the only means of conveying information; provide icons or text alternatives.
- All images must have meaningful alt text or be marked decorative (aria-hidden or role="presentation").
- Announce validation errors and success states using aria-live or inline text.
- Manage focus for dialogs, overlays, and popovers (trap focus, return focus on close).
- Use role="dialog", aria-modal, and aria-labelledby for modal dialogs.
- Expose state changes via strongly-typed custom events for integration with assistive tech.
- Document accessibility features and keyboard interactions for each component.

**Component compliance:**

- `mu-avatar`: Uses semantic HTML, alt text for images, and is non-interactive.
- `mu-badge`: Visually hides internal elements appropriately or provides accessible labels for alerts.
- `mu-button`: Uses native `<button>`, supports accessible names via slot, keyboard accessible, and uses aria-disabled/disabled.
- `mu-card`: Uses generic flow layout containers with semantic landmarks/headers via compositional slots.
- `mu-chip`: Read-only or actionable with keyboard navigation, dispatches custom `delete` events cleanly.
- `mu-divider`: Typically uses `role="separator"` and is purely presentational unless marked otherwise.
- `mu-icon`: Decorative by default (`aria-hidden="true"`), not interactive.
- `mu-list`: Employs semantic native list roles (`list` and `listitem`) or native tags (`<ul>`, `<li>`).
- `mu-typography`: Renders exact semantic tags (`<h1>` to `<h6>`, `<p>`) to support proper document flow and screen reader landmarks.
- `mu-theme-provider`: Non-visual; wraps content to apply CSS custom-property tokens.
- `mu-checkbox`: Uses a native `<input type="checkbox">` for built-in state exposure; supports `indeterminate`; labelled via slot.
- `mu-radio` / `mu-radio-group`: Uses native `<input type="radio">`; `mu-radio-group` provides `role="radiogroup"` and `aria-labelledby`.
- `mu-switch`: Rendered as `role="switch"` with `aria-checked`; keyboard toggleable via Space.
- `mu-text-field`: Associates a visible `<label>` with the `<input>` via `id`/`for`; surfaces error text in an `aria-live` region.
- `mu-select`: Wraps a native `<select>` for full keyboard and screen-reader support; error exposed via `aria-describedby`.
- `mu-dialog`: Uses a native `<dialog>` for built-in focus trapping and Escape-key close; `aria-modal` and `aria-labelledby` applied.
- `mu-tooltip`: Shown on hover and keyboard focus; tied to the trigger via `aria-describedby`; role="tooltip".
- `mu-snackbar`: Content region is `aria-live="assertive"` or `role="status"` so announcements reach screen readers.
- `mu-skeleton`: Marked `aria-hidden="true"` and `role="presentation"`; completely invisible to assistive technology.
- `mu-spinner`: Exposes `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and conditionally `aria-valuenow`.
- `mu-linear-progress`: Sets `role="progressbar"` and full aria-value attributes on the host; attributes are removed in indeterminate mode.
- `mu-alert`: `role="alert"` for error severity (live assertive); `role="status"` for all others. Icon is `aria-hidden`.
- `mu-tabs` / `mu-tab` / `mu-tab-panel`: Follows the ARIA Tabs pattern — `role="tab"` + `aria-selected`; `role="tabpanel"` + `aria-labelledby`; roving tabindex for arrow-key navigation.
- `mu-accordion` / `mu-accordion-item`: `aria-expanded` on header buttons; `role="region"` with `aria-labelledby` on each content region.
- `mu-breadcrumb` / `mu-breadcrumb-item`: `<nav aria-label>` wrapper; `<ol>` list structure; `aria-current="page"` on the current item.
- `mu-pagination`: `<nav aria-label="Pagination">` wrapper; `aria-label="Page N"` on every page button; `aria-current="page"` on the active page; ellipsis markers are `aria-hidden`.
- `mu-app-bar`: Renders `<header role="banner">`, mapping to the `banner` ARIA landmark.
- `mu-drawer`: Uses a native `<dialog>` for focus trapping and Escape-key close; focus returns to the triggering element on close.
- `mu-locale-provider`: Non-visual context provider; renders only a `<slot>`. All localised strings it distributes are used as `aria-label` or visually-hidden text in consuming components.

For full compliance, ensure you provide accessible labels and alt text when using these components. If you extend components with new features (e.g., interactive icons, dialogs), follow the rules above.

---

## Contributing

1. Create feature branches with descriptive names.
2. Write clear, conventional commit messages.
3. Ensure all lint, format, and tests pass before pushing.

---

## License

BSD-3-Clause (c) Google LLC

---
