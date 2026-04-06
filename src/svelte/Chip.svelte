<script lang="ts">
  import '../chip/mu-chip.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Chip Svelte wrapper.
   */
  interface Props {
    /** Text label displayed inside the chip. */
    label?: string;
    /** Color variant. */
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    /** Whether the chip shows a delete/close button. */
    deletable?: boolean;
    /** Whether the chip is in a selected state. */
    selected?: boolean;
    /** Whether the chip is disabled. */
    disabled?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, color, deletable, selected, disabled, children, ...rest}: Props = $props();
</script>

<mu-chip {label} {color} {deletable} {selected} {disabled} {...rest}>
  {@render children?.()}
</mu-chip>
