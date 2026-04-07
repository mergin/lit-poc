# mu-typography

A typography component that maps a `variant` prop to the correct semantic HTML tag and design-token-driven visual style. Covers all standard type scale entries: headings, body, caption, and overline.

## Import

```ts
import './src/typography/mu-typography.js';
```

## Usage

```html
<mu-typography variant="h1">Page Title</mu-typography>
<mu-typography variant="body1">Regular paragraph text.</mu-typography>
<mu-typography variant="caption">Helper or metadata text</mu-typography>
<mu-typography variant="overline">Label above a section</mu-typography>
```

## Properties

| Property  | Type                                                                                            | Default   | Description                                             |
| --------- | ----------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------- |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body1' \| 'body2' \| 'caption' \| 'overline'` | `'body1'` | Selects both the HTML tag and the visual style applied. |

## Variant → element mapping

| Variant    | HTML tag                  | Notes                             |
| ---------- | ------------------------- | --------------------------------- |
| `h1`–`h6`  | `<h1>`–`<h6>`             | Semantic heading levels.          |
| `body1`    | `<p class="body1">`       | Default body text size.           |
| `body2`    | `<p class="body2">`       | Smaller body text.                |
| `caption`  | `<span class="caption">`  | Inline; secondary color.          |
| `overline` | `<span class="overline">` | Inline; uppercase, letter-spaced. |

## Slots

| Slot      | Description             |
| --------- | ----------------------- |
| (default) | Text or markup content. |

## Accessibility

- Heading variants (`h1`–`h6`) render semantic heading elements — maintain logical heading hierarchy on the page.
- `caption` and `overline` render as `<span>` (inline); they do not convey heading structure.
- Last-child headings and paragraphs have their bottom margin removed to avoid double spacing inside containers.
