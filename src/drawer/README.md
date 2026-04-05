# mu-drawer

Side drawer that slides in from the left or right using a native `<dialog>` element for focus trapping and Escape-key handling.

## Usage

```html
<mu-drawer
  placement="left"
  open
>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</mu-drawer>
```

Open programmatically:

```js
document.querySelector('mu-drawer').open = true;
```

## Properties

| Property    | Type                | Default   | Description                       |
| ----------- | ------------------- | --------- | --------------------------------- |
| `open`      | `boolean`           | `false`   | Whether the drawer is visible.    |
| `placement` | `'left' \| 'right'` | `'left'`  | Side from which the drawer opens. |
| `width`     | `string`            | `'280px'` | Width of the drawer panel.        |

## Slots

| Slot      | Description          |
| --------- | -------------------- |
| (default) | Drawer body content. |

## Events

| Event      | Description                       |
| ---------- | --------------------------------- |
| `mu-open`  | Fired when the drawer has opened. |
| `mu-close` | Fired when the drawer has closed. |

## Accessibility

Uses a native `<dialog>` element for built-in focus trapping and Escape key close behaviour. On close, focus is returned to the element that triggered the drawer.
