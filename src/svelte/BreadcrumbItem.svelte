<script lang="ts">
  import '../breadcrumb/mu-breadcrumb-item.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the BreadcrumbItem Svelte wrapper.
   */
  interface Props {
    /** Navigation URL for this breadcrumb step. */
    href?: string;
    /** Whether this is the current (last) breadcrumb item. */
    current?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {href, current, children, ...rest}: Props = $props();
</script>

<mu-breadcrumb-item {href} {current} {...rest}>
  {@render children?.()}
</mu-breadcrumb-item>
