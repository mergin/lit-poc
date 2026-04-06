# mu-dialog

Modal dialog overlay using the native `<dialog>` element. Manages focus on open/close, traps focus inside while open, and handles `Escape` natively.

## Usage

```html
<button id="open-btn">Open</button>

<mu-dialog
  id="dialog"
  headline="Confirm action"
>
  <p>Are you sure you want to proceed?</p>
  <button
    slot="actions"
    id="cancel"
  >
    Cancel
  </button>
  <button
    slot="actions"
    id="confirm"
  >
    Confirm
  </button>
</mu-dialog>
```

```ts
import '@muds/mu-dialog';

document.getElementById('open-btn').addEventListener('click', () => {
  document.getElementById('dialog').open = true;
});
document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('dialog').open = false;
});
```

## Properties

| Property   | Type      | Default | Description                                  |
| ---------- | --------- | ------- | -------------------------------------------- |
| `open`     | `boolean` | `false` | Controls visibility. Reflected as attribute. |
| `headline` | `string`  | `''`    | Text used as the dialog title.               |

## Slots

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| (default) | Body content rendered below the headline. |
| `actions` | Footer buttons (e.g. Cancel / Confirm).   |

## Events

| Event      | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `mu-open`  | Dispatched when the dialog opens.                           |
| `mu-close` | Dispatched when the dialog closes (any cause, inc. Escape). |

## Accessibility

- Renders a native `<dialog>` element — `role="dialog"` is implicit.
- Sets `aria-modal="true"` and `aria-labelledby` pointing to the headline.
- Focus is moved inside the dialog on open and restored to the triggering element on close.
- The native `<dialog>` handles focus trapping and `Escape` key dismissal in modern browsers.

## Testing

```bash
npx vitest run src/dialog/_tests/mu-dialog.unit.test.ts
npx vitest run src/dialog/_tests/mu-dialog.render.test.ts
npx playwright test src/dialog/_tests/mu-dialog.e2e.test.ts
```

## CSS Parts

| Part           | Description                                |
| -------------- | ------------------------------------------ |
| `dialog`       | The native `<dialog>` element.             |
| `header`       | The `<h2>` headline element.               |
| `content`      | The scrollable content area.               |
| `actions`      | The footer actions area.                   |
| `close-button` | The × icon button in the top-right corner. |

## CSS Custom Properties

| Property                | Description    | Default                     |
| ----------------------- | -------------- | --------------------------- |
| `--mu-dialog-radius`    | Border radius. | `var(--mu-radius-xl, 12px)` |
| `--mu-dialog-shadow`    | Box shadow.    | `var(--mu-elevation-2)`     |
| `--mu-dialog-max-width` | Maximum width. | `min(560px, 90vw)`          |
