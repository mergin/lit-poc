<script lang="ts">
  import '../../dialog/mu-dialog.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Dialog Svelte wrapper.
   */
  interface Props {
    /** Whether the dialog is open. */
    open?: boolean;
    /** Title shown in the dialog header. */
    heading?: string;
    /** Whether to show the close button. */
    showClose?: boolean;
    /** Whether the dialog occupies the full viewport. */
    fullscreen?: boolean;
    /** Whether the dialog body scrolls independently. */
    scrollable?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {open, heading, showClose, fullscreen, scrollable, children, ...rest}: Props = $props();
</script>

<mu-dialog {open} {heading} {showClose} {fullscreen} {scrollable} {...rest}>
  {@render children?.()}
</mu-dialog>
