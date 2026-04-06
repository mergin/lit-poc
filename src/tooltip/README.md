# mu-tooltip

Tooltip overlay that reveals a short descriptive label near a trigger element. Displays after a 300 ms hover/focus delay and hides on leave/blur.

## Usage

```html
<mu-tooltip
  label="Delete this item"
  placement="top"
>
  <button>Delete</button>
</mu-tooltip>
```

```ts
import '@muds/mu-tooltip';
```

## Properties

| Property    | Type                                     | Default | Description                                    |
| ----------- | ---------------------------------------- | ------- | ---------------------------------------------- |
| `label`     | `string`                                 | `''`    | Text content of the tooltip.                   |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Side of the trigger where the tooltip appears. |

## Accessibility

- Tooltip content has `role="tooltip"`.
- Trigger wrapper uses `aria-describedby` pointing to the tooltip element.
- Tooltip is keyboard-accessible — appears on `focusin` and hides on `focusout`.

## Testing

```bash
npx vitest run src/tooltip/_tests/mu-tooltip.unit.test.ts
npx vitest run src/tooltip/_tests/mu-tooltip.render.test.ts
npx playwright test src/tooltip/_tests/mu-tooltip.e2e.test.ts
```

## CSS Parts

| Part      | Description                 |
| --------- | --------------------------- |
| `tooltip` | The tooltip bubble element. |

## CSS Custom Properties

| Property              | Description        | Default                           |
| --------------------- | ------------------ | --------------------------------- |
| `--mu-tooltip-bg`     | Background colour. | `var(--mu-text-primary, #212b36)` |
| `--mu-tooltip-color`  | Text colour.       | `#fff`                            |
| `--mu-tooltip-radius` | Border radius.     | `var(--mu-radius-md, 4px)`        |
