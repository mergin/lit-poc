<script lang="ts">
  import '../../drawer/mu-drawer.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Drawer Svelte wrapper.
   */
  interface Props {
    /** Whether the drawer is open. */
    open?: boolean;
    /** Side from which the drawer slides in. */
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    /** Whether clicking the backdrop closes the drawer. */
    modal?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {open, anchor, modal, children, ...rest}: Props = $props();
</script>

<mu-drawer {open} {anchor} {modal} {...rest}>
  {@render children?.()}
</mu-drawer>
