# mu-text-field

A form-associated web component providing a Material You styled text input. Supports multiple input types, validation error display, helper text, and participates in native HTML forms via `ElementInternals`.

## Usage

```html
<mu-text-field
  name="email"
  type="email"
  label="Email address"
  required
></mu-text-field>
```

```ts
import '@muds/mu-text-field';
import type {TextFieldType} from '@muds/mu-text-field';
```

## Properties

| Property      | Type            | Default  | Description                                     |
| ------------- | --------------- | -------- | ----------------------------------------------- |
| `value`       | `string`        | `''`     | Current text value.                             |
| `label`       | `string`        | `''`     | Visible label text.                             |
| `placeholder` | `string`        | `''`     | Placeholder shown inside the input.             |
| `type`        | `TextFieldType` | `'text'` | Input type (`text`, `email`, `password`, etc.). |
| `disabled`    | `boolean`       | `false`  | Disables the field.                             |
| `readonly`    | `boolean`       | `false`  | Makes the field read-only.                      |
| `required`    | `boolean`       | `false`  | Marks the field as required.                    |
| `error`       | `string`        | `''`     | Error message. Shows below the field in red.    |
| `helperText`  | `string`        | `''`     | Helper text shown below the field.              |

## Events

| Event    | Detail              | Description                        |
| -------- | ------------------- | ---------------------------------- |
| `input`  | `{ value: string }` | Fired on every keystroke.          |
| `change` | `{ value: string }` | Fired when the value is committed. |

## Accessibility

- Renders a native `<input>` linked to a `<label>` via `for`/`id`.
- `aria-invalid` is set when `error` is non-empty.
- `aria-describedby` links to the helper or error text element.
- Participates in native form submission and constraint validation via `ElementInternals`.

## Testing

```bash
npx vitest run src/text-field/_tests/mu-text-field.unit.test.ts
npx vitest run src/text-field/_tests/mu-text-field.render.test.ts
npx playwright test src/text-field/_tests/mu-text-field.e2e.test.ts
```
