# mu-button

A Minimal/MUI-style button component. Supports three sizes, three variants (contained, outlined, icon), six color tokens, and a disabled state.

## Import

```ts
import './src/button/mu-button.js';
```

## Usage

```html
<!-- Contained (default) -->
<mu-button>Save</mu-button>

<!-- Outlined -->
<mu-button
  variant="outlined"
  color="secondary"
  >Cancel</mu-button
>

<!-- Icon-only -->
<mu-button variant="icon"><mu-icon>delete</mu-icon></mu-button>

<!-- Small, disabled -->
<mu-button
  size="small"
  disabled
  >Unavailable</mu-button
>
```

## Properties

| Property   | Type                                  | Default       | Description                                       |
| ---------- | ------------------------------------- | ------------- | ------------------------------------------------- |
| `size`     | `'small' \| 'medium' \| 'large'`      | `'medium'`    | Controls height and font size.                    |
| `variant`  | `'contained' \| 'outlined' \| 'icon'` | `'contained'` | Visual style of the button.                       |
| `color`    | `string`                              | `'primary'`   | Color token applied to background or border/text. |
| `disabled` | `boolean`                             | `false`       | Disables interaction and applies reduced opacity. |

## Slots

| Slot      | Description                            |
| --------- | -------------------------------------- |
| (default) | Button label text or icon (`mu-icon`). |

## Accessibility

- The underlying `<button>` element receives both `disabled` and `aria-disabled` attributes when disabled.
- For icon-only buttons, slot in a visually-hidden label or `aria-label` on a parent wrapper to describe the action.
- Exposed via `part="button"` for external CSS overrides.
