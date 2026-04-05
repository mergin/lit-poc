# mu-linear-progress

A horizontal progress bar that supports determinate (value-driven) and indeterminate (animated) modes.

## Usage

```html
<!-- determinate -->
<mu-linear-progress value="60"></mu-linear-progress>

<!-- indeterminate -->
<mu-linear-progress indeterminate></mu-linear-progress>
```

## Properties

| Property        | Type      | Default                        | Description                      |
| --------------- | --------- | ------------------------------ | -------------------------------- |
| `value`         | `number`  | `0`                            | Progress percentage 0–100.       |
| `color`         | `string`  | `'var(--mu-primary, #1976d2)'` | Fill color.                      |
| `indeterminate` | `boolean` | `false`                        | Animates indefinitely when true. |

## Events

| Event         | Description                        |
| ------------- | ---------------------------------- |
| `mu-complete` | Fired once when value reaches 100. |

## Accessibility

Sets `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` on the host element automatically. In indeterminate mode the value attributes are removed.
