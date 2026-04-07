<script lang="ts">
  import '../../spinner/mu-spinner.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Spinner Svelte wrapper.
   */
  interface Props {
    /** Accessible label announced to screen readers. */
    label?: string;
    /** Diameter of the spinner in pixels. */
    size?: number;
    /** Color variant. */
    color?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, size, color, children, ...rest}: Props = $props();
</script>

<mu-spinner {label} {size} {color} {...rest}>
  {@render children?.()}
</mu-spinner>
