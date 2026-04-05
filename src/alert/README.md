# mu-alert

Feedback component for communicating status messages with contextual color and icon.

## Usage

```html
<mu-alert severity="success">Your changes have been saved.</mu-alert>
<mu-alert
  severity="error"
  closeLabel="Dismiss"
  >Something went wrong.</mu-alert
>
```

## Properties

| Property     | Type                                          | Default  | Description                                                   |
| ------------ | --------------------------------------------- | -------- | ------------------------------------------------------------- |
| `severity`   | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | Controls color, icon, and ARIA role.                          |
| `closeLabel` | `string`                                      | `''`     | When set, renders a close button with this as its aria-label. |

## Slots

| Slot        | Description                         |
| ----------- | ----------------------------------- |
| `(default)` | Alert message content.              |
| `icon`      | Override the default severity icon. |

## Events

| Event      | Description                             |
| ---------- | --------------------------------------- |
| `mu-close` | Fired when the close button is clicked. |

## Accessibility

Uses `role="alert"` for error severity and `role="status"` for all others. The icon is hidden from assistive technology with `aria-hidden`.
