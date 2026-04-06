<script lang="ts">
  import '../tooltip/mu-tooltip.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Tooltip Svelte wrapper.
   */
  interface Props {
    /** Text content of the tooltip. */
    content?: string;
    /** Preferred placement relative to the trigger. */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** Delay before the tooltip appears (ms). */
    delay?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {content, placement, delay, children, ...rest}: Props = $props();
</script>

<mu-tooltip {content} {placement} {delay} {...rest}>
  {@render children?.()}
</mu-tooltip>
