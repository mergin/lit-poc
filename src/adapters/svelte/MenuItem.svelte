<script lang="ts">
  import '../../menu/mu-menu-item.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the MenuItem Svelte wrapper.
   */
  interface Props {
    /** Text label of the menu item. */
    label?: string;
    /** Whether the menu item is disabled. */
    disabled?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, disabled, children, ...rest}: Props = $props();
</script>

<mu-menu-item {label} {disabled} {...rest}>
  {@render children?.()}
</mu-menu-item>
