# mu-menu / mu-menu-item

Accessible dropdown menu with keyboard navigation. Uses a positioned floating list that opens when the trigger slot element is clicked.

## Usage

```html
<mu-menu>
  <button slot="trigger">Open menu</button>
  <mu-menu-item label="Edit"></mu-menu-item>
  <mu-menu-item label="Delete"></mu-menu-item>
</mu-menu>
```

## mu-menu Properties

| Property    | Type      | Default          | Description                    |
| ----------- | --------- | ---------------- | ------------------------------ |
| `open`      | `boolean` | `false`          | Controls menu visibility.      |
| `placement` | `string`  | `'bottom-start'` | Placement relative to trigger. |

## mu-menu Events

| Event      | Description                  |
| ---------- | ---------------------------- |
| `mu-open`  | Dispatched when menu opens.  |
| `mu-close` | Dispatched when menu closes. |

## mu-menu CSS Parts

| Part   | Description                  |
| ------ | ---------------------------- |
| `menu` | The floating container.      |
| `list` | The `ul` holding menu items. |

## mu-menu-item Properties

| Property   | Type      | Default | Description        |
| ---------- | --------- | ------- | ------------------ |
| `label`    | `string`  | `''`    | Text label.        |
| `disabled` | `boolean` | `false` | Disables the item. |

## mu-menu-item Events

| Event       | Detail              | Description                         |
| ----------- | ------------------- | ----------------------------------- |
| `mu-select` | `{ label: string }` | Dispatched when the item is picked. |

## mu-menu-item CSS Parts

| Part   | Description              |
| ------ | ------------------------ |
| `item` | The root button element. |

## Keyboard

| Key             | Action                        |
| --------------- | ----------------------------- |
| `ArrowDown`     | Focus next item (wraps)       |
| `ArrowUp`       | Focus previous item (wraps)   |
| `Home`          | Focus first item              |
| `End`           | Focus last item               |
| `Escape`        | Close menu, return focus      |
| `Enter`/`Space` | Activate item (native button) |

## Accessibility

- `role="menu"` on the floating list.
- `role="menuitem"` on each item.
- Roving `tabindex` for keyboard navigation.
- Focus returns to trigger on close.
