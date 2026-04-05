# mu-spinner

Circular progress indicator rendered as an SVG. Supports indeterminate (spinning) and determinate (percentage-fill) modes.

## Usage

```html
<!-- indeterminate (default) -->
<mu-spinner></mu-spinner>

<!-- determinate 60% -->
<mu-spinner
  .indeterminate="${false}"
  value="60"
></mu-spinner>

<!-- small, custom color -->
<mu-spinner
  size="small"
  color="#e91e63"
></mu-spinner>
```

## Properties

| Property        | Type                             | Default                        | Description                                      |
| --------------- | -------------------------------- | ------------------------------ | ------------------------------------------------ |
| `size`          | `'small' \| 'medium' \| 'large'` | `'medium'`                     | Diameter of the spinner.                         |
| `color`         | `string`                         | `'var(--mu-primary, #1976d2)'` | Stroke color of the arc.                         |
| `value`         | `number \| undefined`            | `undefined`                    | 0–100 for determinate mode.                      |
| `indeterminate` | `boolean`                        | `true`                         | Forces spinning animation regardless of `value`. |

## Accessibility

Renders as `role="progressbar"`. In determinate mode `aria-valuenow`, `aria-valuemin` and `aria-valuemax` are set automatically. Provide a surrounding label when context is not obvious.
