<script lang="ts">
  import '../../core/components/skeleton/mu-skeleton.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Skeleton Svelte wrapper.
   */
  interface Props {
    /** Shape variant of the skeleton placeholder. */
    variant?: 'text' | 'circular' | 'rectangular';
    /** Explicit width of the skeleton. */
    width?: string;
    /** Explicit height of the skeleton. */
    height?: string;
    /** Whether the skeleton should animate. */
    animation?: 'pulse' | 'wave' | 'none';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {variant, width, height, animation, children, ...rest}: Props = $props();
</script>

<mu-skeleton {variant} {width} {height} {animation} {...rest}>
  {@render children?.()}
</mu-skeleton>
