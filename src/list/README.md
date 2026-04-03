# mu-list

A continuous vertical list component. Works together with `mu-list-item` and optionally `mu-divider` to build navigational or content lists. Supports a compact dense mode.

## Import

```ts
import './src/list/mu-list.js';
```

## Usage

```html
<!-- Standard list -->
<mu-list>
  <mu-list-item>Inbox</mu-list-item>
  <mu-divider></mu-divider>
  <mu-list-item>Sent</mu-list-item>
  <mu-divider></mu-divider>
  <mu-list-item disabled>Archived</mu-list-item>
</mu-list>

<!-- Dense list -->
<mu-list dense>
  <mu-list-item>Small item one</mu-list-item>
  <mu-list-item>Small item two</mu-list-item>
</mu-list>
```

## `mu-list` Properties

| Property | Type      | Default | Description                                             |
| -------- | --------- | ------- | ------------------------------------------------------- |
| `dense`  | `boolean` | `false` | Reduces vertical padding and font size for compact UIs. |

## `mu-list-item` Properties

| Property   | Type      | Default | Description                                               |
| ---------- | --------- | ------- | --------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Applies reduced opacity and disables pointer interaction. |

## Slots

| Component      | Slot      | Description                              |
| -------------- | --------- | ---------------------------------------- |
| `mu-list`      | (default) | Accepts `mu-list-item` and `mu-divider`. |
| `mu-list-item` | (default) | Item content (text, icons, etc.).        |

## Accessibility

- `mu-list` renders a `<ul role="list">` container.
- Each `mu-list-item` renders an `<li role="listitem">`.
- Disabled items are visually de-emphasised and removed from pointer interaction; add `aria-disabled="true"` on the host if the item must remain focusable for screen readers.
