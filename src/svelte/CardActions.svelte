<script lang="ts">
  import '../card/mu-card.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the CardActions Svelte wrapper.
   */
  interface Props {
    /** Horizontal alignment of action buttons. */
    align?: 'start' | 'end' | 'center';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {align, children, ...rest}: Props = $props();
</script>

<mu-card-actions {align} {...rest}>
  {@render children?.()}
</mu-card-actions>
