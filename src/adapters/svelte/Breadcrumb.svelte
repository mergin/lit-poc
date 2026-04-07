<script lang="ts">
  import '../../breadcrumb/mu-breadcrumb.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Breadcrumb Svelte wrapper.
   */
  interface Props {
    /** aria-label for the breadcrumb navigation landmark. */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, children, ...rest}: Props = $props();
</script>

<mu-breadcrumb {label} {...rest}>
  {@render children?.()}
</mu-breadcrumb>
