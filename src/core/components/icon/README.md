# mu-icon

A thin wrapper around the Material Icons font. Accepts an icon name via slot text or the `name` property, and supports size and color tokens.

## Import

```ts
import './src/icon/mu-icon.js';
```

## Usage

```html
<!-- Via slot (recommended) -->
<mu-icon>star</mu-icon>

<!-- Via property -->
<mu-icon
  name="delete"
  color="error"
  size="large"
></mu-icon>

<!-- Inside a button -->
<mu-button variant="icon"><mu-icon>edit</mu-icon></mu-button>
```

## Properties

| Property | Type                                       | Default     | Description                                                                                  |
| -------- | ------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------- |
| `name`   | `string`                                   | `''`        | Material Icons ligature name. The slot value takes precedence.                               |
| `size`   | `'small' \| 'medium' \| 'large' \| string` | `'medium'`  | Icon size. Named sizes map to 20 / 24 / 32 px.                                               |
| `color`  | `string`                                   | `'primary'` | Color token. Accepted values: `primary`, `secondary`, `info`, `success`, `warning`, `error`. |

## Slots

| Slot      | Description                                          |
| --------- | ---------------------------------------------------- |
| (default) | Material Icons ligature name (e.g. `notifications`). |

## Accessibility

- The inner `<span>` carries `aria-hidden="true"` — icons are treated as decorative.
- When an icon conveys meaning without accompanying text, place an `aria-label` on the interactive parent (e.g. `mu-button`).
- Exposed via `part="icon"` for external CSS overrides.
