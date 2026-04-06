<script lang="ts">
  import '../accordion/mu-accordion.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Accordion Svelte wrapper.
   */
  interface Props {
    /** Whether only one item may be expanded at a time. */
    single?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {single, children, ...rest}: Props = $props();
</script>

<mu-accordion {single} {...rest}>
  {@render children?.()}
</mu-accordion>
