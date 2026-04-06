<script lang="ts">
  import '../tabs/mu-tab.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Tab Svelte wrapper.
   */
  interface Props {
    /** Text label of the tab. */
    label?: string;
    /** Whether the tab is disabled. */
    disabled?: boolean;
    /** Index managed internally by the parent mu-tabs. */
    index?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, disabled, index, children, ...rest}: Props = $props();
</script>

<mu-tab {label} {disabled} {index} {...rest}>
  {@render children?.()}
</mu-tab>
