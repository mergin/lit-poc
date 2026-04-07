# mu-app-bar

Sticky application header with named slots for navigation, title, and actions.

## Usage

```html
<mu-app-bar>
  <button
    slot="start"
    aria-label="Open menu"
  >
    ☰
  </button>
  <span>My Application</span>
  <button
    slot="end"
    aria-label="Account"
  >
    👤
  </button>
</mu-app-bar>
```

## Properties

| Property    | Type      | Default                        | Description                         |
| ----------- | --------- | ------------------------------ | ----------------------------------- |
| `elevation` | `number`  | `1`                            | Shadow level: `0` flat, `1` raised. |
| `color`     | `string`  | `'var(--mu-primary, #1976d2)'` | Background color.                   |
| `fixed`     | `boolean` | `false`                        | Uses `position: fixed` when true.   |

## Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| `start`   | Leading content (menu icon, logo).   |
| (default) | Central content (title, search).     |
| `end`     | Trailing content (account, actions). |

## Accessibility

Renders a `<header role="banner">` which maps to the `banner` ARIA landmark.
