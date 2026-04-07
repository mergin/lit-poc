<script lang="ts">
  import '../../accordion/mu-accordion-item.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the AccordionItem Svelte wrapper.
   */
  interface Props {
    /** Heading text shown in the collapsed header. */
    heading?: string;
    /** Whether the item is currently expanded. */
    expanded?: boolean;
    /** Whether the item is disabled. */
    disabled?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {heading, expanded, disabled, children, ...rest}: Props = $props();
</script>

<mu-accordion-item {heading} {expanded} {disabled} {...rest}>
  {@render children?.()}
</mu-accordion-item>
