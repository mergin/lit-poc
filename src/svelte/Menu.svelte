<script lang="ts">
  import '../menu/mu-menu.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Menu Svelte wrapper.
   */
  interface Props {
    /** Whether the menu list is visible. */
    open?: boolean;
    /** Preferred anchor corner for the floating list. */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {open, placement, children, ...rest}: Props = $props();
</script>

<mu-menu {open} {placement} {...rest}>
  {@render children?.()}
</mu-menu>
