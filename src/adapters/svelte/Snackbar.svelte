<script lang="ts">
  import '../../core/components/snackbar/mu-snackbar.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Snackbar Svelte wrapper.
   */
  interface Props {
    /** Message text displayed in the snackbar. */
    message?: string;
    /** Whether the snackbar is visible. */
    open?: boolean;
    /** Duration in ms before auto-dismissal (0 = persist). */
    duration?: number;
    /** Label for the optional action button. */
    actionLabel?: string;
    /** Variant controlling icon and colour. */
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {message, open, duration, actionLabel, variant, children, ...rest}: Props = $props();
</script>

<mu-snackbar {message} {open} {duration} {actionLabel} {variant} {...rest}>
  {@render children?.()}
</mu-snackbar>
