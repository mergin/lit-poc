# mu-select

A form-associated web component providing a Material You styled select (dropdown). Renders a native `<select>` element for full accessibility and form participation, wrapped with a custom label, chevron icon, and error/helper states.

## Usage

```html
<mu-select
  name="country"
  label="Country"
  placeholder="Choose a country"
  required
></mu-select>
```

```ts
import '@muds/mu-select';
import type {SelectOption} from '@muds/mu-select';

const el = document.querySelector('mu-select');
el.options = [
  {value: 'us', label: 'United States'},
  {value: 'gb', label: 'United Kingdom'},
  {value: 'de', label: 'Germany', disabled: true},
];
```

## Properties

| Property      | Type             | Default | Description                                     |
| ------------- | ---------------- | ------- | ----------------------------------------------- |
| `value`       | `string`         | `''`    | Currently selected option value.                |
| `label`       | `string`         | `''`    | Visible label text.                             |
| `disabled`    | `boolean`        | `false` | Disables the select.                            |
| `required`    | `boolean`        | `false` | Marks the field as required.                    |
| `error`       | `string`         | `''`    | Error message shown below the select in red.    |
| `options`     | `SelectOption[]` | `[]`    | Array of options to render.                     |
| `placeholder` | `string`         | `''`    | Placeholder shown as the first disabled option. |

## Types

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Events

| Event    | Detail              | Description                             |
| -------- | ------------------- | --------------------------------------- |
| `change` | `{ value: string }` | Fired when the selected option changes. |

## Accessibility

- Renders a native `<select>` linked to a `<label>` via `for`/`id`.
- `aria-invalid` is set when `error` is non-empty.
- Participates in native form submission via `ElementInternals`.

## Testing

```bash
npx vitest run src/select/_tests/mu-select.unit.test.ts
npx vitest run src/select/_tests/mu-select.render.test.ts
npx playwright test src/select/_tests/mu-select.e2e.test.ts
```

## CSS Parts

| Part     | Description                                |
| -------- | ------------------------------------------ |
| `label`  | The `<label>` element above the select.    |
| `select` | The native `<select>` element.             |
| `error`  | The error message element below the field. |

## CSS Custom Properties

| Property                   | Description                      | Default                      |
| -------------------------- | -------------------------------- | ---------------------------- |
| `--mu-select-radius`       | Border radius of the select.     | `var(--mu-radius, 8px)`      |
| `--mu-select-border-color` | Default border colour.           | `var(--mu-divider, #e0e0e0)` |
| `--mu-select-focus-color`  | Border and ring colour on focus. | `var(--mu-primary, #1976d2)` |
