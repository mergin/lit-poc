# mu-switch

A form-associated web component implementing the Material You switch (toggle) pattern. Supports checked/unchecked states, keyboard interaction, and participates in native HTML forms via `ElementInternals`.

## Usage

```html
<mu-switch
  name="notifications"
  label="Enable notifications"
></mu-switch>
```

```ts
import '@muds/mu-switch';
```

## Properties

| Property   | Type      | Default | Description                                 |
| ---------- | --------- | ------- | ------------------------------------------- |
| `checked`  | `boolean` | `false` | Whether the switch is on.                   |
| `disabled` | `boolean` | `false` | Disables the switch.                        |
| `name`     | `string`  | `''`    | Form field name.                            |
| `value`    | `string`  | `'on'`  | Value submitted with the form when checked. |
| `label`    | `string`  | `''`    | Accessible label text.                      |

## Events

| Event    | Detail                 | Description                       |
| -------- | ---------------------- | --------------------------------- |
| `change` | `{ checked: boolean }` | Fired when the switch is toggled. |

## Accessibility

- Uses `role="switch"` with `aria-checked="true | false"`.
- Keyboard: `Space` and `Enter` toggle the switch.
- Participates in native form submission via `ElementInternals`.

## Testing

```bash
npx vitest run src/switch/_tests/mu-switch.unit.test.ts
npx vitest run src/switch/_tests/mu-switch.render.test.ts
npx playwright test src/switch/_tests/mu-switch.e2e.test.ts
```
