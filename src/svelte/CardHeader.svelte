<script lang="ts">
  import '../card/mu-card.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the CardHeader Svelte wrapper.
   */
  interface Props {
    /** Main heading text. */
    title?: string;
    /** Secondary subheading text. */
    subheader?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {title, subheader, children, ...rest}: Props = $props();
</script>

<mu-card-header {title} {subheader} {...rest}>
  {@render children?.()}
</mu-card-header>
