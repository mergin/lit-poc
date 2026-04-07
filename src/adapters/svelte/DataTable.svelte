<script lang="ts">
  import '../../data-table/mu-data-table.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the DataTable Svelte wrapper.
   */
  interface Props {
    /** Column definitions. */
    columns?: ReadonlyArray<{key: string; label: string; sortable?: boolean; width?: string}>;
    /** Row data objects. */
    rows?: ReadonlyArray<Record<string, unknown>>;
    /** Key of the currently sorted column. */
    sortKey?: string;
    /** Direction of the current sort. */
    sortDirection?: 'asc' | 'desc';
    /** Whether to render a checkbox selection column. */
    selectable?: boolean;
    /** Whether to render skeleton loading rows. */
    loading?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {columns, rows, sortKey, sortDirection, selectable, loading, children, ...rest}: Props = $props();
</script>

<mu-data-table {columns} {rows} {sortKey} {sortDirection} {selectable} {loading} {...rest}>
  {@render children?.()}
</mu-data-table>
