# mu-slider

A range slider form component built with Lit 3. Participates natively in HTML forms and exposes full keyboard and pointer interaction.

## Usage

```html
<mu-slider
  label="Volume"
  value="30"
  min="0"
  max="100"
  step="1"
></mu-slider>
```

## Properties

| Property   | Type      | Default | Description                             |
| ---------- | --------- | ------- | --------------------------------------- |
| `value`    | `number`  | `0`     | Current slider value.                   |
| `min`      | `number`  | `0`     | Minimum value.                          |
| `max`      | `number`  | `100`   | Maximum value.                          |
| `step`     | `number`  | `1`     | Step increment for keyboard and drag.   |
| `disabled` | `boolean` | `false` | Disables the slider.                    |
| `label`    | `string`  | `''`    | Accessible label displayed above track. |
| `name`     | `string`  | `''`    | Form field name.                        |

## Events

| Event    | Detail             | Description                   |
| -------- | ------------------ | ----------------------------- |
| `change` | `{ value: number}` | Fired when the value changes. |

## CSS Parts

| Part    | Description                      |
| ------- | -------------------------------- |
| `track` | The background track element.    |
| `fill`  | The filled portion of the track. |
| `thumb` | The draggable circular handle.   |

## Keyboard

| Key                | Action                   |
| ------------------ | ------------------------ |
| `ArrowRight`/`Up`  | Increase by one step     |
| `ArrowLeft`/`Down` | Decrease by one step     |
| `Home`             | Jump to minimum value    |
| `End`              | Jump to maximum value    |
| `PageUp`           | Increase by 10% of range |
| `PageDown`         | Decrease by 10% of range |

## Accessibility

- `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.
- Fully keyboard accessible.
- Supports `aria-label` derived from the `label` property.
