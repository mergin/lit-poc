<script lang="ts">
  import '../../core/components/avatar/mu-avatar.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Avatar Svelte wrapper.
   * Extends `mu-avatar` attributes with strongly-typed Svelte prop declarations.
   */
  interface Props {
    /** Image URL to display inside the avatar. */
    src?: string;
    /** Alternative text for the image. */
    alt?: string;
    /** Size of the avatar in pixels. */
    size?: number;
    /** Shape of the avatar. */
    shape?: 'circle' | 'square';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {src, alt, size, shape, children, ...rest}: Props = $props();
</script>

<mu-avatar {src} {alt} {size} {shape} {...rest}>
  {@render children?.()}
</mu-avatar>
