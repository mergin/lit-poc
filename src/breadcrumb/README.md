# mu-breadcrumb

Breadcrumb navigation component consisting of `mu-breadcrumb` (container) and `mu-breadcrumb-item` (crumb).

## Usage

```html
<mu-breadcrumb>
  <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
  <mu-breadcrumb-item href="/components">Components</mu-breadcrumb-item>
  <mu-breadcrumb-item current>Breadcrumb</mu-breadcrumb-item>
</mu-breadcrumb>
```

## mu-breadcrumb Properties

| Property | Type     | Default        | Description                             |
| -------- | -------- | -------------- | --------------------------------------- |
| `label`  | `string` | `'Breadcrumb'` | Accessible label for the `nav` element. |

## mu-breadcrumb-item Properties

| Property  | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `href`    | `string`  | `''`    | Link target. If blank, renders as non-linked text. |
| `current` | `boolean` | `false` | Marks the item as the current page.                |

## Accessibility

Uses `<nav aria-label>` wrapper and `<ol>` list structure. The last item should have `current` set, which applies `aria-current="page"`.
