# mu-card

A compositional card component built from four cooperating elements: `mu-card`, `mu-card-header`, `mu-card-content`, and `mu-card-actions`. Use named slots to compose the layout.

## Import

```ts
import './src/card/mu-card.js';
```

## Usage

```html
<mu-card>
  <mu-card-header
    slot="header"
    title="Sprint Review"
    subtitle="April 2026"
  ></mu-card-header>
  <mu-card-content>The team delivered 14 story points this sprint.</mu-card-content>
  <div slot="actions">
    <mu-button variant="outlined">Dismiss</mu-button>
    <mu-button>View Report</mu-button>
  </div>
</mu-card>
```

## `mu-card` Slots

| Slot      | Description                                           |
| --------- | ----------------------------------------------------- |
| `header`  | Card header area. Use `mu-card-header` here.          |
| (default) | Main body. Use `mu-card-content` or arbitrary markup. |
| `actions` | Footer action area. Use `mu-button` elements.         |

## Subcomponents

### `mu-card-header`

| Property   | Type     | Default | Description                          |
| ---------- | -------- | ------- | ------------------------------------ |
| `title`    | `string` | `''`    | Primary heading text.                |
| `subtitle` | `string` | `''`    | Optional secondary text below title. |

### `mu-card-content`

No properties. Accepts slotted content; applies `body1` text styling.

### `mu-card-actions`

No properties. Accepts slotted action controls; aligns them to the right with a gap.

## Accessibility

- `mu-card-header` renders the title as an `<h2>`. Ensure heading hierarchy is correct in context.
- Action buttons inside the `actions` slot must each have an accessible label.
