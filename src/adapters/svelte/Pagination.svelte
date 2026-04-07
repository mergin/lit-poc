<script lang="ts">
  import '../../core/components/pagination/mu-pagination.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Pagination Svelte wrapper.
   */
  interface Props {
    /** Currently active page (one-based). */
    page?: number;
    /** Total number of pages. */
    count?: number;
    /** Whether to disable all navigation. */
    disabled?: boolean;
    /** Number of sibling pages visible beside the active page. */
    siblingCount?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {page, count, disabled, siblingCount, children, ...rest}: Props = $props();
</script>

<mu-pagination {page} {count} {disabled} {siblingCount} {...rest}>
  {@render children?.()}
</mu-pagination>
