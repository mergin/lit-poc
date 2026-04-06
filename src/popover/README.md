# mu-popover

Floating popover component with focus management and keyboard dismissal. Provides accessible `role="dialog"` or `role="tooltip"` container above a trigger element.

## Usage

```html
<mu-popover>
  <button slot="trigger">Show info</button>
  <p>Popover content here.</p>
</mu-popover>
```

## Properties

| Property              | Type      | Default    | Description                                    |
| --------------------- | --------- | ---------- | ---------------------------------------------- |
| `open`                | `boolean` | `false`    | Controls visibility.                           |
| `placement`           | `string`  | `'bottom'` | `'bottom'` \| `'top'` \| `'left'` \| `'right'` |
| `closeOnOutsideClick` | `boolean` | `true`     | Closes when clicking outside.                  |
| `popoverrole`         | `string`  | `'dialog'` | `'dialog'` \| `'tooltip'`                      |

## Methods

| Method           | Description                         |
| ---------------- | ----------------------------------- |
| `openPopover()`  | Opens the popover programmatically. |
| `closePopover()` | Closes the popover.                 |

## Events

| Event      | Description                    |
| ---------- | ------------------------------ |
| `mu-open`  | Dispatched when popover opens. |
| `mu-close` | Dispatched when it closes.     |

## CSS Parts

| Part      | Description                   |
| --------- | ----------------------------- |
| `content` | The floating content element. |

## Accessibility

- `role="dialog"` (or `role="tooltip"`) on the floating container.
- `aria-modal="true"` when `popoverrole="dialog"`.
- Focus moves to the first focusable child on open.
- Focus returns to the trigger on close.
- `Escape` key closes the popover.
