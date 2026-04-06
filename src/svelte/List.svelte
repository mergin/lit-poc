<script lang="ts">
  import '../list/mu-list.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the List Svelte wrapper.
   */
  interface Props {
    /** When true, adds a dense styling to reduce spacing. */
    dense?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {dense, children, ...rest}: Props = $props();
</script>

<mu-list {dense} {...rest}>
  {@render children?.()}
</mu-list>
