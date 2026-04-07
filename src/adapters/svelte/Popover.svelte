<script lang="ts">
  import '../../popover/mu-popover.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Popover Svelte wrapper.
   */
  interface Props {
    /** Whether the popover is visible. */
    open?: boolean;
    /** Preferred placement relative to the trigger. */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end';
    /** Whether clicking outside closes the popover. */
    closeOnOutsideClick?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {open, placement, closeOnOutsideClick, children, ...rest}: Props = $props();
</script>

<mu-popover {open} {placement} {closeOnOutsideClick} {...rest}>
  {@render children?.()}
</mu-popover>
