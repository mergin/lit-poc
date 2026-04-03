# mu-badge

A status badge component that renders a small indicator positioned over a child element. Supports counts, dot mode, color variants, an invisible state, and a screen-reader label.

## Import

```ts
import './src/badge/mu-badge.js';
```

## Usage

```html
<!-- Count badge -->
<mu-badge
  content="4"
  color="error"
>
  <mu-icon>mail</mu-icon>
</mu-badge>

<!-- Dot badge (no content) -->
<mu-badge color="primary">
  <mu-icon>notifications</mu-icon>
</mu-badge>

<!-- Hidden badge -->
<mu-badge
  content="2"
  invisible
>
  <mu-icon>chat</mu-icon>
</mu-badge>

<!-- Custom accessible label -->
<mu-badge
  content="99+"
  label="99 or more unread messages"
  color="error"
>
  <mu-icon>inbox</mu-icon>
</mu-badge>
```

## Properties

| Property    | Type               | Default     | Description                                                                    |
| ----------- | ------------------ | ----------- | ------------------------------------------------------------------------------ |
| `content`   | `string \| number` | `''`        | Text shown in the badge. An empty string renders a dot badge.                  |
| `color`     | `string`           | `'primary'` | Color variant: `primary`, `secondary`, `error`, `success`, `warning`, `info`.  |
| `invisible` | `boolean`          | `false`     | When `true`, the badge is scaled to zero (hidden via CSS transition).          |
| `label`     | `string`           | `''`        | Accessible label for screen readers. Defaults to `"Badge content: [content]"`. |

## Slots

| Slot      | Description                             |
| --------- | --------------------------------------- |
| (default) | The element the badge is anchored over. |

## Accessibility

- The visible badge span is `aria-hidden="true"` to avoid duplicate announcements.
- A visually-hidden `<span>` renders the `label` (or the auto-generated fallback) for screen readers.
- Provide a meaningful `label` whenever `content` alone is not self-explanatory in context.
