# Missing Features Implementation Guide

Phases 10–15 extend the completed base library (Phases 1–9). Each phase is self-contained and testable
before moving to the next. Follow steps in order within each phase.

Every new component must follow the file contract established in the base guide:

```
src/<name>/
  mu-<name>.ts
  mu-<name>.stories.ts
  README.md
  _tests/
    mu-<name>.unit.test.ts
    mu-<name>.render.test.ts
    mu-<name>.e2e.test.ts
    mu-<name>.perf.test.ts
```

After every new component:

1. Add its export to `src/index.ts`.
2. Add its entry to `vite.lib.config.ts`.
3. Add its subpath to the `exports` map in `package.json`.
4. Run `npm run analyze` to regenerate `custom-elements.json`.
5. Run `npm run build` and verify `dist/` output.
6. Run `npm test` and confirm 80 % minimum coverage.

---

## Phase 10 — New Components (High)

### Step 10.1 — `mu-slider`

**File:** `src/slider/mu-slider.ts`

Key implementation details:

- `static formAssociated = true;`
- `internals = this.attachInternals();`
- `@property({type: Number, reflect: true}) value = 0;`
- `@property({type: Number}) min = 0;`
- `@property({type: Number}) max = 100;`
- `@property({type: Number}) step = 1;`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: String}) label = '';`
- Render a `<div role="slider">` track with a draggable thumb `<div>`. Do **not** wrap a native `<input type="range">` — the thumb cannot be styled cross-browser via Shadow DOM without a custom element.
- Wire `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`.
- Handle `keydown`: `ArrowRight`/`ArrowUp` increments, `ArrowLeft`/`ArrowDown` decrements, `Home` → `min`, `End` → `max`, `PageUp`/`PageDown` by 10 % of the range.
- Handle `pointerdown`/`pointermove`/`pointerup` for drag. Use `setPointerCapture`.
- On value change call `this.internals.setFormValue(String(this.value))`.
- Emit a `change` custom event (`bubbles: true, composed: true`) carrying `{value: number}` in `detail`.
- CSS: position the thumb at `calc((value - min) / (max - min) * 100%)` using custom properties that consumers can override.

**Exposed CSS parts:** `track`, `thumb`, `fill`.

**Storybook stories:** `Default`, `Disabled`, `WithStep`, `MinMax`.

**Block on**: nothing — no dependencies on other new components.

---

### Step 10.2 — `mu-menu` + `mu-menu-item`

**Files:** `src/menu/mu-menu.ts`, `src/menu/mu-menu-item.ts`

`mu-menu` is a floating action menu anchored to a trigger element. It is **not** a form-associated element.

`mu-menu` key details:

- `@property({type: Boolean, reflect: true}) open = false;`
- `@property({type: String}) placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';`
- Use the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API): `popover="manual"` on the inner list container. Call `showPopover()` / `hidePopover()` when `open` changes.
- Position the list relative to the trigger using an anchor polyfill pattern: read the trigger's `getBoundingClientRect()` in `updated()` and apply `position: fixed` with computed `top`/`left`.
- `role="menu"` on the list container.
- Close on `Escape`, click outside (`pointerdown` listener on `document` via `this.addController`), and after any `mu-menu-item` selection.
- Keyboard: `ArrowDown`/`ArrowUp` move focus among `mu-menu-item` children (roving focus). `Home`/`End` jump to first/last.
- Emit `mu-open` and `mu-close` (`bubbles: true, composed: true`).
- Slot a trigger element: `<slot name="trigger"></slot>`. Listen for `click` on the assigned trigger to toggle `open`.

`mu-menu-item` key details:

- `@property({type: String}) label = '';`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `role="menuitem"`, `tabindex="-1"` (focus managed by `mu-menu`).
- On `click` or `Enter`/`Space` keydown, emit `mu-select` (`bubbles: true, composed: true`) with `{label}` in `detail`.
- Slot: `(default)` for icon prefix, `label` for text.

**Exposed CSS parts (`mu-menu`):** `menu`, `list`.
**Exposed CSS parts (`mu-menu-item`):** `item`.

**Storybook stories:** `Default` (three items), `WithIcons`, `Disabled`, `TopPlacement`.

---

### Step 10.3 — `mu-popover`

**File:** `src/popover/mu-popover.ts`

A general-purpose anchored overlay without the menu semantics — useful for rich content, help panels, etc.

Key implementation details:

- `@property({type: Boolean, reflect: true}) open = false;`
- `@property({type: String}) placement: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end' = 'bottom';`
- `@property({type: Boolean}) closeOnOutsideClick = true;`
- Same Popover API + positioning strategy as `mu-menu`.
- `role="dialog"` when content is interactive; `role="tooltip"` for read-only hints (consumer sets via `popoverrole` property).
- Slot: `trigger` (for anchor), `(default)` (for content).
- Emit `mu-open` and `mu-close`.
- Focus management: when `open` becomes `true`, move focus to the first focusable child inside the content slot. When `open` becomes `false`, return focus to the trigger.

**Exposed CSS parts:** `content`.

**Storybook stories:** `Default`, `RichContent`, `ManualControl`.

---

### Step 10.4 — `mu-rating`

**File:** `src/rating/mu-rating.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: Number, reflect: true}) value = 0;`
- `@property({type: Number}) max = 5;`
- `@property({type: Number}) precision = 1;` — `0.5` enables half-star.
- `@property({type: Boolean, reflect: true}) readonly = false;`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: String}) label = 'Rating';`
- Render `max` star icons in shadow DOM. Each interactive star is a `<span role="radio">` inside a `role="radiogroup"`.
- Highlight stars up to and including `value` with the filled icon; partial fill for `precision = 0.5`.
- Keyboard: `ArrowRight` increments by `precision`, `ArrowLeft` decrements, `Home` → 0, `End` → `max`.
- On change call `this.internals.setFormValue(String(this.value))`. Emit `change` (`bubbles: true, composed: true`) with `{value}`.
- `aria-label` on the radiogroup = `this.label`. Each radio: `aria-label="${n} star${n === 1 ? '' : 's'}"`.

**Exposed CSS parts:** `star`, `star--filled`, `star--empty`, `star--partial`.

**Storybook stories:** `Default`, `ReadOnly`, `HalfPrecision`, `Disabled`.

---

### Step 10.5 — `mu-file-upload`

**File:** `src/file-upload/mu-file-upload.ts`

Key implementation details:

- `static formAssociated = true;`
- `@property({type: Boolean, reflect: true}) multiple = false;`
- `@property({type: String}) accept = '';` — passed directly to the hidden `<input type="file">`.
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: String}) label = 'Choose file';`
- `@property({type: String}) dragLabel = 'or drag and drop here';`
- Render a visible drop zone `<div>` and a visually-hidden `<input type="file">`.
- Click on the drop zone programmatically clicks the input.
- Handle `dragenter`, `dragover`, `dragleave`, `drop` on the drop zone. Call `e.preventDefault()` on `dragover` to enable drop.
- On file selection or drop, call `this.internals.setFormValue(formData)` where `formData` is a `FormData` containing the `File` objects.
- Emit `mu-change` (`bubbles: true, composed: true`) with `{files: FileList}` in `detail`.
- `aria-label` on the drop zone to describe it; `role="button"` + `tabindex="0"` for keyboard access.
- Show the selected file name(s) inside the drop zone after selection.

**Exposed CSS parts:** `dropzone`, `dropzone--active`, `label`, `hint`.

**Storybook stories:** `Default`, `MultipleFiles`, `WithAccept`, `Disabled`.

---

### Step 10.6 — `mu-stepper` + `mu-step`

**Files:** `src/stepper/mu-stepper.ts`, `src/stepper/mu-step.ts`

`mu-stepper` manages multi-step wizard navigation.

`mu-stepper` key details:

- `@property({type: Number, reflect: true}) activeStep = 0;`
- `@property({type: String}) orientation: 'horizontal' | 'vertical' = 'horizontal';`
- `@property({type: Boolean}) linear = true;` — if true, blocks skipping ahead.
- Discover slotted `<mu-step>` children via `@queryAssignedElements({selector: 'mu-step'})`.
- Emit `step-change` (`bubbles: true, composed: true`) with `{from: number, to: number}` when `activeStep` changes.
- Render connector lines between steps in shadow DOM.

`mu-step` key details:

- `@property({type: String}) label = '';`
- `@property({type: String}) state: 'active' | 'completed' | 'error' | 'disabled' = 'disabled';`
- `role="listitem"` inside a `role="list"` in `mu-stepper`.
- The step button: `role="button"`, `aria-current="step"` when active.
- Slots: `(default)` for content shown below/beside the indicator; `icon` for a custom step icon.

**Exposed CSS parts (`mu-stepper`):** `connector`.
**Exposed CSS parts (`mu-step`):** `indicator`, `label`, `content`.

**Storybook stories:** `HorizontalLinear`, `VerticalNonLinear`, `WithErrors`, `Completed`.

---

### Step 10.7 — `mu-autocomplete`

**File:** `src/autocomplete/mu-autocomplete.ts`

Builds on `mu-text-field` internals but is an independent form-associated element.

Key implementation details:

- `static formAssociated = true;`
- `@property({type: String, reflect: true}) value = '';`
- `@property({type: String}) label = '';`
- `@property({type: Array}) options: ReadonlyArray<{label: string; value: string}> = [];`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- `@property({type: Boolean, reflect: true}) required = false;`
- `@property({type: String}) placeholder = '';`
- `@property({type: Number}) minChars = 1;` — minimum characters before the list opens.
- `@state() private _inputValue = '';`
- `@state() private _open = false;`
- `@state() private _activeIndex = -1;`
- Render: a visible `<input>` (shadow DOM), a `<ul role="listbox">` (shown when `_open`), `<li role="option">` per filtered option.
- Filter logic: `options.filter(o => o.label.toLowerCase().includes(this._inputValue.toLowerCase()))`.
- ARIA: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls="listbox-id"`, `aria-activedescendant` pointing to the active option.
- Keyboard: `ArrowDown`/`ArrowUp` move `_activeIndex`; `Enter` selects; `Escape` closes; `Tab` closes and confirms or clears.
- On selection: set `this.value = option.value`, set `this._inputValue = option.label`, close list, call `this.internals.setFormValue(this.value)`, emit `change`.
- On `input` event: update `_inputValue`, open list if `_inputValue.length >= this.minChars`.

**Exposed CSS parts:** `input`, `listbox`, `option`, `option--active`.

**Storybook stories:** `Default`, `Disabled`, `MinCharsTwo`, `NoResults`.

---

### Step 10.8 — `mu-data-table`

**File:** `src/data-table/mu-data-table.ts`

The most complex new component. Not form-associated.

Key implementation details:

- `@property({type: Array}) columns: ReadonlyArray<{key: string; label: string; sortable?: boolean; width?: string}> = [];`
- `@property({type: Array}) rows: ReadonlyArray<Record<string, unknown>> = [];`
- `@property({type: String}) sortKey = '';`
- `@property({type: String}) sortDirection: 'asc' | 'desc' = 'asc';`
- `@property({type: Boolean}) selectable = false;` — renders a checkbox column.
- `@property({type: Boolean}) loading = false;` — shows skeleton rows.
- `@state() private _selected: Set<number> = new Set();`
- Render a `<table>` in shadow DOM with `<thead>` and `<tbody>`.
- Sortable column headers: `<th role="columnheader" aria-sort="ascending|descending|none">` with a click handler.
- Emit `sort-change` (`bubbles: true, composed: true`) with `{key: string, direction: 'asc' | 'desc'}`.
- Emit `selection-change` with `{selected: number[]}` (row indices).
- Keyboard: full table navigation via `Arrow` keys using the [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) (`role="grid"`, `role="row"`, `role="gridcell"`).
- Loading state: render `columns.length` skeleton `<td>` cells per row (re-use `mu-skeleton` internally).
- Slot: `empty-state` — shown when `rows.length === 0` and `loading === false`.
- Do **not** implement virtualization in v1. Add a `Note` in the README about expected row count limits.

**Exposed CSS parts:** `table`, `head`, `body`, `header-cell`, `cell`, `row`, `row--selected`.

**Storybook stories:** `Default`, `Sortable`, `Selectable`, `Loading`, `EmptyState`.

---

## Phase 11 — Enhancements to Existing Components (Medium)

### Step 11.1 — `mu-text-field`: multiline / textarea support

**File:** `src/text-field/mu-text-field.ts`

Additions:

- `@property({type: Boolean, reflect: true}) multiline = false;`
- `@property({type: Number}) rows = 3;`
- `@property({type: Number}) maxlength = Infinity;`
- `@property({type: Boolean}) showCharCount = false;`
- When `multiline` is true, render `<textarea>` instead of `<input>` in shadow DOM.
- Character counter: render `<span aria-live="polite">${currentLength} / ${maxlength}</span>` below the field when `showCharCount && maxlength < Infinity`.
- Update tests and stories.

---

### Step 11.2 — `mu-text-field`: prefix/suffix icon slots

Add two named slots: `prefix` and `suffix`. Render them inside the input wrapper with appropriate padding compensation via CSS. The consumer places an `<mu-icon>` or any element into these slots.

```html
<mu-text-field label="Search">
  <mu-icon
    slot="prefix"
    name="search"
  ></mu-icon>
</mu-text-field>
```

Update CSS to add `padding-left` / `padding-right` compensation when the slots are populated. Use `slotchange` event to detect slot population.

---

### Step 11.3 — `mu-select`: multiple selection

Additions:

- `@property({type: Boolean, reflect: true}) multiple = false;`
- When `multiple` is true, render `<select multiple>` in shadow DOM.
- `value` type changes to `string | string[]`. When `multiple`, `value` is `string[]`.
- `registerOnChange` in the Angular CVA directive must handle `string[]` when `multiple` is true.
- Update `MuSelectControlDirective` in `src/angular/mu-select.directive.ts` accordingly.
- Update the React wrapper in `src/react/index.ts` to add `multiple` and `value` as `ReactWebComponent` props.

---

### Step 11.4 — `mu-dialog`: fullscreen and scrollable variants

Additions:

- `@property({type: Boolean, reflect: true}) fullscreen = false;`
- `@property({type: Boolean, reflect: true}) scrollable = false;`
- When `fullscreen`, apply `position: fixed; inset: 0; border-radius: 0; max-width: 100%; max-height: 100%;` to the inner `<dialog>`.
- When `scrollable`, apply `overflow-y: auto` to the content section and `overflow: hidden` to the dialog itself.
- Update stories and tests.

---

### Step 11.5 — `mu-chip`: avatar slot and chip input pattern

Additions to `mu-chip`:

- Add an `avatar` slot. When populated, render it to the left of the label with circular clipping.
- Guard the avatar slot rendering with `slotchange` exactly as the existing icon slots are guarded.

New component `mu-chip-input`:

**File:** `src/chip/mu-chip-input.ts`

- `static formAssociated = true;`
- `@property({type: Array}) chips: string[] = [];`
- `@property({type: String}) placeholder = 'Add…';`
- `@property({type: Boolean, reflect: true}) disabled = false;`
- Render a flex container with one `<mu-chip deletable>` per chip value and an inline `<input>` at the end.
- `Enter`/`Comma` keydown → add the current input value to `chips`; clear input.
- Delete pressed when input is empty → remove the last chip.
- On any chip `delete` event → remove that chip from the array.
- Call `this.internals.setFormValue(this.chips.join(','))` on every change.
- Emit `change` with `{chips: string[]}`.

---

### Step 11.6 — `mu-tabs`: vertical orientation and overflow scroll

Additions:

- `@property({type: String}) orientation: 'horizontal' | 'vertical' = 'horizontal';` — reflect to host for CSS.
- When `orientation === 'vertical'`, render the tab list beside the panels (CSS grid/flex column).
- `@property({type: Boolean}) scrollable = false;` — when true, apply `overflow-x: auto` to the tab list and prevent wrapping; render scroll-indicator buttons at each end.
- Update `aria-orientation` on the tab list element.

---

## Phase 12 — Testing Gaps (High)

### Step 12.1 — React wrapper unit and render tests

**Directory:** `src/react/_tests/`

Create three test files:

**`src/react/_tests/react-wrappers.unit.test.ts`**

Verify that every exported wrapper is a function (the `@lit/react` `createComponent` output) with the correct `displayName`. Do not mount React — just assert on the exported object.

```typescript
import {describe, expect, it} from 'vitest';
import * as wrappers from '../index.js';

const expectedNames = [
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Chip',
  'Divider',
  'Icon',
  'List',
  'ListItem',
  'Typography',
  'Checkbox',
  'Radio',
  'RadioGroup',
  'Switch',
  'TextField',
  'Select',
  'Dialog',
  'Tooltip',
  'Snackbar',
  'Skeleton',
  'Spinner',
  'LinearProgress',
  'Alert',
  'Tabs',
  'Tab',
  'TabPanel',
  'Accordion',
  'AccordionItem',
  'Breadcrumb',
  'BreadcrumbItem',
  'Pagination',
  'AppBar',
  'Drawer',
  'ThemeProvider',
  'LocaleProvider',
];

describe('React wrappers — unit', (): void => {
  it.each(expectedNames)('%s is exported as a function', (name): void => {
    // ARRANGE / ACT
    const wrapper = (wrappers as Record<string, unknown>)[name];
    // ASSERT
    expect(typeof wrapper).toBe('function');
    // CLEANUP — none
  });
});
```

**`src/react/_tests/react-wrappers.render.test.ts`**

Mount a representative subset of wrappers using `@testing-library/react` (install if not present: `npm install -D @testing-library/react`) and assert on the rendered custom element tag name:

```typescript
import {render} from '@testing-library/react';
import React from 'react';
import {describe, expect, it} from 'vitest';
import {Button, Checkbox, TextField} from '../index.js';

describe('React wrappers — render', (): void => {
  it('Button renders a mu-button element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(Button, {}, 'Hello'));
    // ASSERT
    expect(container.querySelector('mu-button')).not.toBeNull();
    // CLEANUP — none
  });

  it('Checkbox renders a mu-checkbox element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(Checkbox, {}));
    // ASSERT
    expect(container.querySelector('mu-checkbox')).not.toBeNull();
    // CLEANUP — none
  });

  it('TextField renders a mu-text-field element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(TextField, {label: 'Name'}));
    // ASSERT
    expect(container.querySelector('mu-text-field')).not.toBeNull();
    // CLEANUP — none
  });
});
```

Install `@testing-library/react`:

```bash
npm install -D @testing-library/react
```

Set the render test environment to `jsdom` via a vitest file-level directive:

```typescript
// @vitest-environment jsdom
```

---

### Step 12.2 — Angular CVA integration test

**File:** `src/angular/_tests/mu-angular-forms.integration.test.ts`

This test mounts an actual Angular component tree using `@angular/core/testing` to prove that binding `formControlName` to a `<mu-checkbox>` connects through the CVA directive to an `AbstractControl`. This requires the Angular testing module.

Install if not present:

```bash
npm install -D @angular/platform-browser-dynamic @angular/common @angular/compiler
```

Use `TestBed` from `@angular/core/testing`:

```typescript
// @vitest-environment jsdom
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {beforeEach, describe, expect, it} from 'vitest';
import {MuCheckboxControlDirective} from '../mu-checkbox.directive.js';
import '../../checkbox/mu-checkbox.js';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MuCheckboxControlDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<mu-checkbox
    [formControl]="ctrl"
    label="Test"
  ></mu-checkbox>`,
})
class TestHostComponent {
  readonly ctrl = new FormControl(false);
}

describe('Angular CVA — integration', (): void => {
  beforeEach((): void => {
    // ARRANGE
    TestBed.configureTestingModule({});
  });

  it('writeValue propagates model value to element checked property', async (): Promise<void> => {
    // ARRANGE
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('mu-checkbox');
    // ACT
    fixture.componentInstance.ctrl.setValue(true);
    fixture.detectChanges();
    await fixture.whenStable();
    // ASSERT
    expect(el.checked).toBe(true);
    // CLEANUP — none
  });

  it('user interaction propagates element value to form control', async (): Promise<void> => {
    // ARRANGE
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('mu-checkbox');
    // ACT
    el.checked = true;
    el.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    fixture.detectChanges();
    await fixture.whenStable();
    // ASSERT
    expect(fixture.componentInstance.ctrl.value).toBe(true);
    // CLEANUP — none
  });
});
```

> **Note:** The `vi.mock('@angular/core')` approach used in unit tests must NOT be applied to this integration file — the full Angular runtime is intentionally loaded here.

---

### Step 12.3 — Automated accessibility auditing in E2E tests

Install `@axe-core/playwright`:

```bash
npm install -D @axe-core/playwright
```

Add a shared helper at `src/test/a11y.ts`:

```typescript
import AxeBuilder from '@axe-core/playwright';
import type {Page} from '@playwright/test';
import {expect} from '@playwright/test';

/**
 * Runs axe-core against the full page and asserts no violations.
 * @param page - The Playwright page to audit.
 */
export async function assertNoA11yViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({page}).analyze();
  expect(results.violations).toEqual([]);
}
```

In each existing e2e test file, import and call `assertNoA11yViolations(page)` at the end of the primary "renders correctly" test. Example for `mu-button`:

```typescript
import {assertNoA11yViolations} from '../../../test/a11y.js';

test('mu-button has no accessibility violations', async ({page}) => {
  await page.goto('/dev/button.html');
  await page.waitForSelector('mu-button');
  await assertNoA11yViolations(page);
});
```

Apply this to all existing e2e test files. Priority order (highest risk): `mu-dialog`, `mu-tabs`, `mu-accordion`, `mu-radio`, `mu-checkbox`, `mu-select`, `mu-switch`, `mu-text-field`, `mu-tooltip`, `mu-snackbar`.

---

### Step 12.4 — Visual regression tests with Playwright

Add a visual regression suite next to each dev page. Use Playwright's built-in `toHaveScreenshot()`.

Create visual test files named `mu-<name>.visual.test.ts` colocated in each component's `_tests/` folder (e.g., `src/button/_tests/mu-button.visual.test.ts`). Start with components that have visual variants:

- `src/button/_tests/mu-button.visual.test.ts` — captures Default, Primary, Disabled
- `src/chip/_tests/mu-chip.visual.test.ts` — captures Default, Deletable, Selected
- `src/badge/_tests/mu-badge.visual.test.ts` — captures each variant
- `src/alert/_tests/mu-alert.visual.test.ts` — captures each severity

Example:

```typescript
import {test, expect} from '@playwright/test';

test('mu-button default snapshot', async ({page}) => {
  await page.goto('/dev/button.html');
  await page.waitForSelector('mu-button');
  await expect(page).toHaveScreenshot('mu-button-default.png');
});
```

Add a dedicated Playwright project in `playwright.config.ts`:

```typescript
{
  name: 'visual',
  testMatch: 'src/**/_tests/*.visual.test.ts',
  use: {
    ...devices['Desktop Chrome'],
    // Use a fixed viewport for deterministic screenshots.
    viewport: {width: 1280, height: 900},
  },
},
```

Add a script to `package.json`:

```json
"test:visual": "playwright test --project=visual",
"test:visual:update": "playwright test --project=visual --update-snapshots"
```

Commit initial snapshots with `npm run test:visual:update` and then treat failures as regressions.

---

## Phase 13 — Framework Adapters (Medium)

### Step 13.1 — Vue 3 wrapper package

**File:** `src/vue/index.ts`

Generate typed Vue 3 wrappers using [`vue-component-compiler-utils`](https://github.com/vuejs/component-compiler-utils) or, preferably, by exporting plain wrapper objects that declare event listeners and props explicitly.

Install:

```bash
npm install -D vue @vue/test-utils
```

For each component, export a Vue `defineComponent` wrapper that:

- Accepts native attribute props (type-narrowed via TypeScript).
- Emits typed Vue events by converting DOM custom events using `onXxx` camelCase convention.

Example for `mu-button`:

```typescript
import {defineComponent, h, type PropType} from 'vue';

/**
 * Vue 3 wrapper for `<mu-button>`.
 */
export const Button = defineComponent({
  name: 'MuButton',
  props: {
    color: {type: String as PropType<'default' | 'primary' | 'secondary'>},
    disabled: {type: Boolean, default: false},
    variant: {type: String as PropType<'filled' | 'outlined' | 'text'>},
  },
  emits: ['click'],
  setup(props, {slots, emit}) {
    return () =>
      h(
        'mu-button',
        {
          color: props.color,
          disabled: props.disabled,
          variant: props.variant,
          onClick: (e: MouseEvent) => emit('click', e),
        },
        slots.default?.()
      );
  },
});
```

Export all wrappers from `src/vue/index.ts`. Add the subpath to `package.json`:

```json
"./vue": {
  "import": "./dist/vue.js",
  "types": "./dist/vue/index.d.ts"
}
```

Add a Vite entry in `vite.lib.config.ts`:

```typescript
vue: resolve(__dirname, 'src/vue/index.ts'),
```

Mark `vue` as external in Rollup options:

```typescript
external: ['lit', /^lit\//, 'vue'],
```

**Tests:** Create `src/vue/_tests/vue-wrappers.unit.test.ts`. Use `@vue/test-utils` `mount` to render each wrapper and assert the correct custom element tag is in the DOM. Use `// @vitest-environment jsdom`.

**Storybook:** Add a storybook story in `src/vue/_tests/mu-vue-integration.stories.ts` demonstrating v-model binding on `mu-checkbox`.

---

### Step 13.2 — Svelte wrapper package

**File:** `src/svelte/index.ts`

Svelte can use custom elements directly, but typed wrappers provide better DX for events.

Create thin Svelte wrapper components for each element using Svelte 4's `<svelte:element>` or hand-written `.svelte` files. Export them from an index file.

Example `src/svelte/Button.svelte`:

```svelte
<script lang="ts">
  import 'lit-poc/button';
  export let color: 'default' | 'primary' | 'secondary' = 'default';
  export let disabled = false;
  export let variant: 'filled' | 'outlined' | 'text' = 'filled';
</script>

<mu-button {color} {disabled} {variant} on:click>
  <slot />
</mu-button>
```

Export from `src/svelte/index.ts`:

```typescript
export {default as Button} from './Button.svelte';
export {default as Checkbox} from './Checkbox.svelte';
// …etc
```

Add the subpath to `package.json`:

```json
"./svelte": {
  "import": "./dist/svelte.js",
  "types": "./dist/svelte/index.d.ts"
}
```

Install Svelte as a dev dependency:

```bash
npm install -D svelte @sveltejs/vite-plugin-svelte
```

Configure the Svelte plugin in `vite.lib.config.ts` for the svelte entry only. Keep the `svelte` peer dependency optional in `package.json`:

```json
"peerDependencies": {
  "svelte": ">=4.0.0"
},
"peerDependenciesMeta": {
  "svelte": {"optional": true}
}
```

---

### Step 13.3 — Angular `MuTextFieldControlDirective`

**File:** `src/angular/mu-text-field.directive.ts`

While `ngDefaultControl` on `<mu-text-field>` works (the inner `<input>` `input` event propagates through Shadow DOM), it does not bridge the `disabled`, `error`, or `touched` state back to the element.

Create a dedicated directive that:

- Selector: `mu-text-field[formControlName], mu-text-field[formControl], mu-text-field[ngModel]`
- `writeValue(value: string)` → `this._el.nativeElement.value = value ?? ''`
- `registerOnChange(fn)` → listen to `input` event on host; call `fn(this._el.nativeElement.value)`
- `registerOnTouched(fn)` → listen to `blur` event on host; call `fn()`
- `setDisabledState(isDisabled)` → `this._el.nativeElement.disabled = isDisabled`
- On `AbstractControl` status change (via `ControlContainer` injection): when `touched && invalid`, set `this._el.nativeElement.error = control.errors ? Object.values(control.errors)[0] : ''`

Add `MuTextFieldControlDirective` to `MuFormsModule` in `src/angular/mu-forms.module.ts`.

Add unit tests in `src/angular/_tests/mu-text-field-control.directive.unit.test.ts` following the same `vi.mock` pattern as the other CVA directive tests.

Update `src/angular/index.ts` to export `MuTextFieldControlDirective`.

Update README Angular section to document this directive and remove the `ngDefaultControl` recommendation.

---

## Phase 14 — Design Token System (Medium)

### Step 14.1 — Spacing scale tokens

**File:** `src/styles/tokens.ts` (extend the existing `lightTokens` and `darkTokens`)

Add a spacing scale that all components must adopt. Replace all hardcoded `px` margin/padding/gap values in component stylesheets:

```typescript
export const spacingTokens = `
  --mu-spacing-0: 0px;
  --mu-spacing-1: 4px;
  --mu-spacing-2: 8px;
  --mu-spacing-3: 12px;
  --mu-spacing-4: 16px;
  --mu-spacing-5: 20px;
  --mu-spacing-6: 24px;
  --mu-spacing-8: 32px;
  --mu-spacing-10: 40px;
  --mu-spacing-12: 48px;
  --mu-spacing-16: 64px;
`;
```

Include `spacingTokens` in the `:host` block of `mu-theme-provider`. Document each token in `src/styles/README.md`.

---

### Step 14.2 — Elevation (shadow) tokens

```typescript
export const elevationTokens = `
  --mu-elevation-0: none;
  --mu-elevation-1: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
  --mu-elevation-2: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
  --mu-elevation-3: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23);
  --mu-elevation-4: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22);
`;
```

Replace all hardcoded `box-shadow` values in `mu-card`, `mu-dialog`, `mu-drawer`, `mu-snackbar`, `mu-tooltip` with the appropriate `var(--mu-elevation-N)`.

---

### Step 14.3 — Motion tokens

```typescript
export const motionTokens = `
  --mu-duration-shortest: 150ms;
  --mu-duration-shorter: 200ms;
  --mu-duration-short: 250ms;
  --mu-duration-standard: 300ms;
  --mu-duration-complex: 375ms;
  --mu-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --mu-easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --mu-easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --mu-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
`;
```

Replace all hardcoded `transition` durations and `animation` timings in component stylesheets. Components affected: `mu-drawer`, `mu-dialog`, `mu-snackbar`, `mu-accordion-item`, `mu-tooltip`, `mu-switch`, `mu-linear-progress`, `mu-spinner`.

Respect `prefers-reduced-motion` — override duration tokens to `0ms` inside a `@media (prefers-reduced-motion: reduce)` block within `mu-theme-provider`.

---

### Step 14.4 — Border-radius tokens

```typescript
export const shapeTokens = `
  --mu-radius-none: 0px;
  --mu-radius-sm: 2px;
  --mu-radius-md: 4px;
  --mu-radius-lg: 8px;
  --mu-radius-xl: 12px;
  --mu-radius-full: 9999px;
`;
```

Replace all hardcoded `border-radius` values in component stylesheets.

---

### Step 14.5 — Export tokens as JSON (Style Dictionary)

Install [Style Dictionary](https://amzn.github.io/style-dictionary/):

```bash
npm install -D style-dictionary
```

Create `src/styles/tokens.json` containing all token definitions in Style Dictionary format. Add a build script to `package.json`:

```json
"build:tokens": "style-dictionary build --config src/styles/sd.config.cjs"
```

Create `src/styles/sd.config.cjs` that outputs:

1. `dist/tokens.css` — all tokens as a `:root { }` block for non-provider consumption.
2. `dist/tokens.json` — flat JSON map for Figma / third-party tooling.
3. `dist/tokens.d.ts` — TypeScript literal union types for each token name.

Add `dist/tokens.css` and `dist/tokens.json` to the `files` array in `package.json`. Add a `"./tokens"` and `"./tokens.css"` subpath to the `exports` map.

---

## Phase 15 — Production / DX (Low)

### Step 15.1 — Declarative Shadow DOM / SSR support

Install the Lit SSR package:

```bash
npm install @lit-labs/ssr
```

Create `src/ssr/index.ts` that re-exports the library barrel alongside the SSR render utilities:

```typescript
export * from '../index.js';
export {render} from '@lit-labs/ssr';
export {collectResult} from '@lit-labs/ssr/lib/render-result.js';
```

Add an SSR subpath to `package.json`:

```json
"./ssr": {
  "import": "./dist/ssr.js",
  "types": "./dist/ssr/index.d.ts"
}
```

Add instructions to the README for each major SSR-capable framework:

- **Next.js (App Router):** Import components inside a `'use client'` boundary, or use the SSR entry with `renderToReadableStream`.
- **Nuxt 3:** Use `@lit-labs/ssr-client` in the client hydration layer.
- **SvelteKit:** Use `onMount` to defer custom element import to the browser.

Add a server-render smoke test at `src/test/ssr.test.ts` using Node.js `happy-dom` environment:

```typescript
// @vitest-environment node
import {describe, expect, it} from 'vitest';
import {render, collectResult} from 'lit-poc/ssr';
import {html} from 'lit';
import 'lit-poc'; // registers elements on the server

describe('SSR smoke test', (): void => {
  it('renders mu-button to a string without throwing', async (): Promise<void> => {
    // ARRANGE / ACT
    const result = render(html`<mu-button>Click</mu-button>`);
    const output = await collectResult(result);
    // ASSERT
    expect(output).toContain('mu-button');
    // CLEANUP — none
  });
});
```

---

### Step 15.2 — `::part()` attribute documentation

Every shadow DOM component must declare `part` attributes on styleable internal elements. This is the only way consumers can style inside shadow roots without CSS custom properties.

For each component, audit its shadow DOM template and add `part=""` attributes. Maintain this inventory in the component's `README.md` under a `## CSS Parts` section.

Minimum required parts per category:

| Component           | Required parts                                           |
| ------------------- | -------------------------------------------------------- |
| `mu-button`         | `button`                                                 |
| `mu-checkbox`       | `checkbox`, `checkmark`, `label`                         |
| `mu-switch`         | `track`, `thumb`, `label`                                |
| `mu-text-field`     | `input`, `label`, `helper`, `error`, `wrapper`           |
| `mu-select`         | `select`, `label`, `helper`, `error`                     |
| `mu-chip`           | `chip`, `label`, `delete-button`                         |
| `mu-card`           | `card`, `header`, `content`, `actions`                   |
| `mu-dialog`         | `dialog`, `header`, `content`, `actions`, `close-button` |
| `mu-tooltip`        | `tooltip`                                                |
| `mu-snackbar`       | `snackbar`, `message`, `action`, `close-button`          |
| `mu-tabs`           | `tab-list`, `tab`, `tab-panel`                           |
| `mu-accordion-item` | `header`, `content`                                      |
| `mu-badge`          | `badge`                                                  |

Add the `--part` entries to the custom-elements manifest by annotating with `@csspart` JSDoc on the component class.

---

### Step 15.3 — CSS custom property inventory per component

Every component must document its CSS custom properties in two places:

1. **`README.md`** under `## CSS Custom Properties`.
2. **JSDoc on the class** using `@cssproperty` (picked up by the custom-elements manifest analyzer).

Example for `mu-button`:

```typescript
/**
 * @cssproperty --mu-button-bg - Background colour of the button.
 * @cssproperty --mu-button-color - Text colour of the button.
 * @cssproperty --mu-button-radius - Border radius.
 * @cssproperty --mu-button-padding - Internal padding.
 */
@customElement('mu-button')
export class MuButton extends LitElement { … }
```

Required properties per component align with the token names introduced in Phase 14. All component-level properties must fall back to the token value:

```css
:host {
  --mu-button-radius: var(--mu-radius-md, 4px);
  --mu-button-padding: var(--mu-spacing-2, 8px) var(--mu-spacing-4, 16px);
}
```

---

### Step 15.4 — Automated publish with semantic-release

Install:

```bash
npm install -D semantic-release @semantic-release/changelog @semantic-release/git
```

Create `.releaserc.json` at the project root:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {"changelogFile": "CHANGELOG.md"}],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]"
      }
    ],
    "@semantic-release/github"
  ]
}
```

Add `publishConfig` to `package.json`:

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}
```

Update `.github/workflows/ci.yml` to add a `release` job that runs only on pushes to `main` after all tests pass:

```yaml
release:
  needs: [test, lint]
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
        persist-credentials: false
    - uses: actions/setup-node@v4
      with:
        node-version: 22
    - run: npm ci
    - run: npm run build
    - run: npx semantic-release
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` as a GitHub Actions secret (generate from npmjs.com under Access Tokens).

---

## Completion Checklist

After all phases:

- [x] `npm run build` produces `dist/` entries for all Phase 10–11 components (slider, menu, menu-item, rating, file-upload, stepper, step, autocomplete, data-table, chip-input).
- [ ] `npm run build` also produces `dist/` entries for Vue wrappers, Svelte wrappers, SSR entry, and design tokens.
  - [x] `dist/vue.js` produced (Phase 13.1)
  - [x] `dist/svelte.js` produced (Phase 13.2)
- [x] `npm run lint` passes with zero errors on all new files.
- [x] `npm test` passes with ≥ 80 % coverage across all new and modified files. (620 tests, 85 test files)
- [x] `npm run test:e2e` includes axe-core accessibility assertions for priority interactive components (`mu-dialog`, `mu-tabs`, `mu-accordion`, `mu-radio`, `mu-checkbox`, `mu-select`, `mu-switch`, `mu-text-field`, `mu-tooltip`, `mu-snackbar`).
- [x] `src/test/a11y.ts` helper with `assertNoA11yViolations` created and wired into all priority e2e files.
- [x] Visual regression test files created for `mu-button`, `mu-chip`, `mu-badge`, `mu-alert` colocated in each component's `_tests/` folder.
- [x] `playwright.config.ts` has a `visual` project (`testMatch: 'src/**/_tests/*.visual.test.ts'`) with 1280×900 fixed viewport.
- [x] `package.json` has `test:visual` and `test:visual:update` scripts.
- [x] `npm run test:visual:update` run and baseline snapshots committed to the repository. (13 snapshots under each component's `_tests/*-snapshots/`)
- [ ] Every new component has a `README.md` with `## CSS Parts` and `## CSS Custom Properties` sections.
- [ ] Every shadow DOM element that should be styleable has a `part=""` attribute.
- [ ] Every component class has `@cssproperty` JSDoc annotations.
- [ ] `npm run analyze` regenerates `custom-elements.json` including all new `@csspart` and `@cssproperty` entries.
- [ ] `custom-elements.json` contains entries for all new components.
- [x] `src/index.ts` exports every new public class and type (including `MuChipInput`, `SelectValue`).
- [x] `package.json` exports map covers all Phase 10–11 subpaths (`./slider`, `./menu`, `./menu-item`, `./rating`, `./file-upload`, `./stepper`, `./step`, `./autocomplete`, `./data-table`, `./chip-input`).
- [ ] `package.json` exports map covers remaining subpaths (`./vue`, `./svelte`, `./angular`, `./ssr`, `./tokens`, `./tokens.css`).
- [x] `vite.lib.config.ts` has Rollup entries for all Phase 10–11 subpaths.
- [ ] `vite.lib.config.ts` has Rollup entries for Vue, Svelte, and SSR subpaths.
- [x] React wrapper tests (`unit` + `render`) pass — `src/react/_tests/`.
- [x] Angular CVA integration test passes with full Angular `TestBed` — `src/angular/_tests/mu-angular-forms.integration.test.ts`.
- [ ] Angular `MuTextFieldControlDirective` is created, added to `MuFormsModule`, and documented in README. (Phase 13.3)
- [x] Vue 3 wrappers are exported from `src/vue/index.ts` and tested — 49 components, `src/vue/_tests/vue-wrappers.unit.test.ts`. (Phase 13.1)
- [x] Svelte 5 wrappers are exported from `src/svelte/index.ts` and tested — 49 components, `src/svelte/_tests/svelte-wrappers.unit.test.ts`. `dist/svelte.js` 23.78 kB (3.18 kB gzip). (Phase 13.2)
- [ ] Design tokens (spacing, elevation, motion, shape) defined in `src/styles/tokens.ts` and consumed by all components; no hardcoded `px`/`box-shadow`/`transition`/`border-radius` values remain. (Phase 14)
- [ ] `dist/tokens.css` and `dist/tokens.json` are produced by `npm run build:tokens`. (Phase 14.5)
- [ ] SSR smoke test passes in a Node environment. (Phase 15.1)
- [ ] `.releaserc.json` and CI `release` job are in place. (Phase 15.4)
- [ ] `semantic-release` dry-run passes: `npx semantic-release --dry-run`. (Phase 15.4)
