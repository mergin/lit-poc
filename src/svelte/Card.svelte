<script lang="ts">
  import '../card/mu-card.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Card Svelte wrapper.
   */
  interface Props {
    /** Elevation shadow level (0–4). */
    elevation?: number;
    /** Whether the card is outlined (no shadow). */
    outlined?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {elevation, outlined, children, ...rest}: Props = $props();
</script>

<mu-card {elevation} {outlined} {...rest}>
  {@render children?.()}
</mu-card>
