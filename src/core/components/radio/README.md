# mu-radio / mu-radio-group

Form-associated web components implementing the Material You radio button pattern. `mu-radio-group` wraps one or more `mu-radio` elements and manages group semantics. Arrow-key navigation between radios is supported automatically.

## Usage

```html
<mu-radio-group label="Favourite fruit">
  <mu-radio
    name="fruit"
    value="apple"
    checked
    label="Apple"
  ></mu-radio>
  <mu-radio
    name="fruit"
    value="banana"
    label="Banana"
  ></mu-radio>
  <mu-radio
    name="fruit"
    value="cherry"
    disabled
    label="Cherry"
  ></mu-radio>
</mu-radio-group>
```

```ts
import '@muds/mu-radio';
import '@muds/mu-radio-group';
```

## Properties — `mu-radio`

| Property   | Type      | Default | Description                                  |
| ---------- | --------- | ------- | -------------------------------------------- |
| `checked`  | `boolean` | `false` | Whether this radio is selected.              |
| `disabled` | `boolean` | `false` | Disables the radio.                          |
| `name`     | `string`  | `''`    | Form field name shared across the group.     |
| `value`    | `string`  | `''`    | Value submitted when this radio is selected. |
| `label`    | `string`  | `''`    | Accessible label text.                       |

## Properties — `mu-radio-group`

| Property   | Type      | Default | Description                                    |
| ---------- | --------- | ------- | ---------------------------------------------- |
| `label`    | `string`  | `''`    | Group label rendered above the radios.         |
| `required` | `boolean` | `false` | Marks the group as required. Reflected to DOM. |

## Events

| Component  | Event    | Detail              | Description                         |
| ---------- | -------- | ------------------- | ----------------------------------- |
| `mu-radio` | `change` | `{ value: string }` | Fired when a radio becomes checked. |

## Accessibility

- `mu-radio-group` uses `role="radiogroup"` and `aria-labelledby`.
- `mu-radio` uses `role="radio"` with `aria-checked`.
- Arrow keys navigate between radios within the group.
- Participates in native form submission via `ElementInternals`.

## Testing

```bash
npx vitest run src/radio/_tests/mu-radio.unit.test.ts
npx vitest run src/radio/_tests/mu-radio.render.test.ts
npx playwright test src/radio/_tests/mu-radio.e2e.test.ts
```
