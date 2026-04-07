<script lang="ts">
  import '../../core/components/tabs/mu-tab-panel.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the TabPanel Svelte wrapper.
   */
  interface Props {
    /** Index managed internally by the parent mu-tabs. */
    index?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {index, children, ...rest}: Props = $props();
</script>

<mu-tab-panel {index} {...rest}>
  {@render children?.()}
</mu-tab-panel>
