# mu-rating

Star rating form component with keyboard navigation, half-star precision, and read-only display mode.

## Usage

```html
<mu-rating
  value="3"
  max="5"
  label="Product rating"
></mu-rating>
```

## Properties

| Property    | Type      | Default    | Description                                     |
| ----------- | --------- | ---------- | ----------------------------------------------- |
| `value`     | `number`  | `0`        | Current rating value.                           |
| `max`       | `number`  | `5`        | Number of stars shown.                          |
| `precision` | `number`  | `1`        | Step precision (`1` for whole, `0.5` for half). |
| `readonly`  | `boolean` | `false`    | Display-only; non-interactive.                  |
| `disabled`  | `boolean` | `false`    | Disables the control.                           |
| `label`     | `string`  | `'Rating'` | Accessible label for the radiogroup.            |
| `name`      | `string`  | `''`       | Form field name.                                |

## Events

| Event    | Detail              | Description               |
| -------- | ------------------- | ------------------------- |
| `change` | `{ value: number }` | Fired when value changes. |

## CSS Parts

| Part            | Description         |
| --------------- | ------------------- |
| `star`          | Each star span.     |
| `star--filled`  | Fully filled stars. |
| `star--empty`   | Empty stars.        |
| `star--partial` | Half-filled stars.  |

## Keyboard

| Key                | Action                    |
| ------------------ | ------------------------- |
| `ArrowRight`/`Up`  | Increase by one precision |
| `ArrowLeft`/`Down` | Decrease by one precision |
| `Home`             | Set to 0                  |
| `End`              | Set to max                |
| `Enter`/`Space`    | Select focused star value |

## Accessibility

- `role="radiogroup"` wrapping all stars.
- `role="radio"` and `aria-checked` on each star.
- Hover preview for sighted users.
