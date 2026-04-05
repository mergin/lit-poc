# mu-pagination

Pagination control for navigating between pages of content.

## Usage

```html
<mu-pagination
  count="20"
  page="1"
></mu-pagination>
```

## Properties

| Property       | Type      | Default | Description                                     |
| -------------- | --------- | ------- | ----------------------------------------------- |
| `count`        | `number`  | `1`     | Total number of pages.                          |
| `page`         | `number`  | `1`     | Active page (1-based).                          |
| `siblingCount` | `number`  | `1`     | Siblings shown either side of the current page. |
| `disabled`     | `boolean` | `false` | Disables all controls.                          |

## Events

| Event         | Detail             | Description                       |
| ------------- | ------------------ | --------------------------------- |
| `page-change` | `{ page: number }` | Fired when the user changes page. |

## Accessibility

Uses a `<nav aria-label="Pagination">` wrapper. Each page button has `aria-label="Page N"` and the active page has `aria-current="page"`. Ellipsis items are hidden with `aria-hidden`.
