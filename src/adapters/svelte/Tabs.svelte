<script lang="ts">
  import '../../core/components/tabs/mu-tabs.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Tabs Svelte wrapper.
   */
  interface Props {
    /** Index of the currently active tab (zero-based). */
    activeTab?: number;
    /** Orientation of the tab list. */
    orientation?: 'horizontal' | 'vertical';
    /** Whether the tab list scrolls when it overflows. */
    scrollable?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {activeTab, orientation, scrollable, children, ...rest}: Props = $props();
</script>

<mu-tabs {activeTab} {orientation} {scrollable} {...rest}>
  {@render children?.()}
</mu-tabs>
