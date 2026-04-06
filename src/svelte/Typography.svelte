<script lang="ts">
  import '../typography/mu-typography.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Typography Svelte wrapper.
   */
  interface Props {
    /** Typographic variant following the design scale. */
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'button';
    /** Colour applied to the text. */
    color?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {variant, color, children, ...rest}: Props = $props();
</script>

<mu-typography {variant} {color} {...rest}>
  {@render children?.()}
</mu-typography>
