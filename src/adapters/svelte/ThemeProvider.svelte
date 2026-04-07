<script lang="ts">
  import '../../theme/mu-theme-provider.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the ThemeProvider Svelte wrapper.
   */
  interface Props {
    /** Active colour scheme. */
    theme?: 'light' | 'dark';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {theme, children, ...rest}: Props = $props();
</script>

<mu-theme-provider {theme} {...rest}>
  {@render children?.()}
</mu-theme-provider>
