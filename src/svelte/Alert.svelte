<script lang="ts">
  import '../alert/mu-alert.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Alert Svelte wrapper.
   */
  interface Props {
    /** Severity level controlling icon and colour. */
    severity?: 'info' | 'success' | 'warning' | 'error';
    /** Whether to show a close button. */
    closable?: boolean;
    /** Alert title text. */
    title?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {severity, closable, title, children, ...rest}: Props = $props();
</script>

<mu-alert {severity} {closable} {title} {...rest}>
  {@render children?.()}
</mu-alert>
