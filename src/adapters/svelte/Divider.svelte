<script lang="ts">
  import '../../core/components/divider/mu-divider.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Divider Svelte wrapper.
   */
  interface Props {
    /** Orientation of the divider line. */
    orientation?: 'horizontal' | 'vertical';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {orientation, children, ...rest}: Props = $props();
</script>

<mu-divider {orientation} {...rest}>
  {@render children?.()}
</mu-divider>
