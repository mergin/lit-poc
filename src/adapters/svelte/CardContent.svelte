<script lang="ts">
  import '../../card/mu-card.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the CardContent Svelte wrapper.
   */
  interface Props {
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {children, ...rest}: Props = $props();
</script>

<mu-card-content {...rest}>
  {@render children?.()}
</mu-card-content>
