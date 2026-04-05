# mu-snackbar

Fixed bottom-center notification component with auto-dismiss, variant colours, and an optional action button. Uses `aria-live` so screen readers announce the message on open.

## Usage

```html
<mu-snackbar
  id="sb"
  message="Changes saved"
  duration="4000"
></mu-snackbar>
```

```ts
import '@muds/mu-snackbar';

const sb = document.getElementById('sb');
sb.open = true; // starts the auto-dismiss timer
```

## Properties

| Property      | Type              | Default     | Description                                      |
| ------------- | ----------------- | ----------- | ------------------------------------------------ |
| `message`     | `string`          | `''`        | Notification text.                               |
| `variant`     | `SnackbarVariant` | `'default'` | Colour theme and ARIA urgency.                   |
| `duration`    | `number`          | `5000`      | Auto-dismiss delay (ms). `0` = persistent.       |
| `open`        | `boolean`         | `false`     | Whether the snackbar is visible.                 |
| `actionLabel` | `string`          | `''`        | Optional action button label. Hidden when empty. |

## Types

```ts
type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
```

## Events

| Event       | Description                                    |
| ----------- | ---------------------------------------------- |
| `mu-action` | Dispatched when the action button is clicked.  |
| `mu-close`  | Dispatched whenever the snackbar is dismissed. |

## Accessibility

- Uses `role="status"` with `aria-live="polite"` for non-error variants.
- Uses `aria-live="assertive"` for the `error` variant.
- `aria-atomic="true"` ensures the full message is announced on update.
- The dismiss button `aria-label` is driven by `MuLocale.snackbar.closeLabel` and defaults to `"Dismiss"`. Override it by placing the snackbar inside a `<mu-locale-provider>` with a custom locale.

## Testing

```bash
npx vitest run src/snackbar/_tests/mu-snackbar.unit.test.ts
npx vitest run src/snackbar/_tests/mu-snackbar.render.test.ts
npx playwright test src/snackbar/_tests/mu-snackbar.e2e.test.ts
```
