# mu-accordion

An accordion component consisting of `mu-accordion` (container) and `mu-accordion-item` (expandable section).

## Usage

```html
<mu-accordion>
  <mu-accordion-item heading="What is Lit?">
    Lit is a simple library for building fast web components.
  </mu-accordion-item>
  <mu-accordion-item heading="Why use web components?">
    Native browser primitives with no framework dependency.
  </mu-accordion-item>
</mu-accordion>
```

## mu-accordion Properties

| Property        | Type      | Default | Description                                          |
| --------------- | --------- | ------- | ---------------------------------------------------- |
| `allowMultiple` | `boolean` | `false` | Allows multiple items to be expanded simultaneously. |

## mu-accordion-item Properties

| Property   | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `heading`  | `string`  | `''`    | Label displayed in the header.      |
| `expanded` | `boolean` | `false` | Whether the content region is open. |
| `disabled` | `boolean` | `false` | Prevents toggling when true.        |

## mu-accordion-item Slots

| Slot        | Description                                |
| ----------- | ------------------------------------------ |
| `heading`   | Override the header text (takes priority). |
| `(default)` | Expandable body content.                   |

## mu-accordion-item Events

| Event              | Detail                  | Description                     |
| ------------------ | ----------------------- | ------------------------------- |
| `accordion-toggle` | `{ expanded: boolean }` | Fired when the item is toggled. |

## Accessibility

Uses `aria-expanded` on the header button and `role="region"` with `aria-labelledby` on the content region.
