# mu-checkbox

A form-associated web component implementing the Material You checkbox pattern. Supports checked, unchecked, and indeterminate states, keyboard interaction, and participates in native HTML forms via `ElementInternals`.

## Usage

```html
<mu-checkbox
  name="accept"
  value="yes"
  label="Accept terms"
></mu-checkbox>
```

```ts
import '@muds/mu-checkbox';
```

## Properties

| Property        | Type      | Default | Description                                 |
| --------------- | --------- | ------- | ------------------------------------------- |
| `checked`       | `boolean` | `false` | Whether the checkbox is checked.            |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in mixed state.     |
| `disabled`      | `boolean` | `false` | Disables the checkbox.                      |
| `name`          | `string`  | `''`    | Form field name.                            |
| `value`         | `string`  | `'on'`  | Value submitted with the form when checked. |
| `label`         | `string`  | `''`    | Accessible label text.                      |

## Events

| Event    | Detail                 | Description                           |
| -------- | ---------------------- | ------------------------------------- |
| `change` | `{ checked: boolean }` | Fired when the checked state changes. |

## Accessibility

- Uses `role="checkbox"` with `aria-checked="true | false | mixed"`.
- Keyboard: `Space` toggles the checkbox.
- Participates in native form submission via `ElementInternals`.

## Testing

```bash
# Unit
npx vitest run src/checkbox/_tests/mu-checkbox.unit.test.ts

# Render
npx vitest run src/checkbox/_tests/mu-checkbox.render.test.ts

# E2E (requires preview server)
npx playwright test src/checkbox/_tests/mu-checkbox.e2e.test.ts
```
