# mu-data-table

Data table component with sortable columns, row selection, skeleton loading state, and empty state slot.

> **Note:** `mu-data-table` does not implement row virtualization in v1. Keep row counts below ~1000 rows for optimal performance.

## Usage

```html
<mu-data-table></mu-data-table>

<script>
  const table = document.querySelector('mu-data-table');
  table.columns = [
    {key: 'name', label: 'Name', sortable: true},
    {key: 'role', label: 'Role'},
  ];
  table.rows = [
    {name: 'Alice', role: 'Engineer'},
    {name: 'Bob', role: 'Designer'},
  ];
</script>
```

## Properties

| Property        | Type                   | Default | Description                                  |
| --------------- | ---------------------- | ------- | -------------------------------------------- |
| `columns`       | `DataTableColumn[]`    | `[]`    | Column definitions.                          |
| `rows`          | `Record<string,any>[]` | `[]`    | Row data objects.                            |
| `sortKey`       | `string`               | `''`    | Key of currently sorted column.              |
| `sortDirection` | `SortDirection`        | `'asc'` | `'asc'` \| `'desc'`                          |
| `selectable`    | `boolean`              | `false` | Enable row selection checkboxes.             |
| `loading`       | `boolean`              | `false` | Show skeleton loading rows.                  |
| `skeletonRows`  | `number`               | `5`     | Number of skeleton rows shown while loading. |

## DataTableColumn

| Field        | Type                                           | Description                       |
| ------------ | ---------------------------------------------- | --------------------------------- |
| `key`        | `string`                                       | Matches a key in each row object. |
| `label`      | `string`                                       | Column header text.               |
| `sortable`   | `boolean` (optional)                           | Makes the header clickable.       |
| `renderCell` | `(value, row) => TemplateResult\|string` (opt) | Custom cell renderer.             |

## Events

| Event              | Detail                              | Description                          |
| ------------------ | ----------------------------------- | ------------------------------------ |
| `sort-change`      | `{ key: string, direction: string}` | Sorting column or direction changed. |
| `selection-change` | `{ selected: number[] }`            | Selected row indices changed.        |

## Slots

| Slot          | Description                          |
| ------------- | ------------------------------------ |
| `empty-state` | Custom content when `rows` is empty. |

## CSS Parts

| Part            | Description               |
| --------------- | ------------------------- |
| `table`         | The `<table>` element.    |
| `head`          | The `<thead>` element.    |
| `body`          | The `<tbody>` element.    |
| `header-cell`   | Each `<th>` element.      |
| `cell`          | Each `<td>` element.      |
| `row`           | Each `<tr>` element.      |
| `row--selected` | Applied to selected rows. |

## Accessibility

- `role="grid"` with `role="row"`, `role="columnheader"`, `role="gridcell"`.
- `aria-sort` on sortable column headers.
- `aria-selected` on rows when selectable.
- `aria-rowcount` and `aria-rowindex` for screen reader navigation.
