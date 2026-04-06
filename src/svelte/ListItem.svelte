<script lang="ts">
  import '../list/mu-list-item.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the ListItem Svelte wrapper.
   */
  interface Props {
    /** Primary text displayed in the list item. */
    primary?: string;
    /** Secondary text shown below the primary text. */
    secondary?: string;
    /** Whether the item is disabled. */
    disabled?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {primary, secondary, disabled, children, ...rest}: Props = $props();
</script>

<mu-list-item {primary} {secondary} {disabled} {...rest}>
  {@render children?.()}
</mu-list-item>
