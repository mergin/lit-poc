<script lang="ts">
  import '../../core/components/button/mu-button.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Button Svelte wrapper.
   */
  interface Props {
    /** Color variant of the button. */
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    /** Whether the button is disabled. */
    disabled?: boolean;
    /** Visual style variant. */
    variant?: 'filled' | 'outlined' | 'text' | 'icon';
    /** Size of the button. */
    size?: 'small' | 'medium' | 'large';
    /** Accessible label (used when variant is "icon"). */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {color, disabled, variant, size, label, children, ...rest}: Props = $props();
</script>

<mu-button {color} {disabled} {variant} {size} {label} {...rest}>
  {@render children?.()}
</mu-button>
