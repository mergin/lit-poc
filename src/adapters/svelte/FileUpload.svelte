<script lang="ts">
  import '../../file-upload/mu-file-upload.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the FileUpload Svelte wrapper.
   */
  interface Props {
    /** Whether multiple files may be selected. */
    multiple?: boolean;
    /** Accepted MIME types or file extensions, e.g. 'image/*'. */
    accept?: string;
    /** Whether the dropzone is disabled. */
    disabled?: boolean;
    /** Label text shown in the dropzone. */
    label?: string;
    /** Drag-and-drop instruction text. */
    dragLabel?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {multiple, accept, disabled, label, dragLabel, children, ...rest}: Props = $props();
</script>

<mu-file-upload {multiple} {accept} {disabled} {label} {dragLabel} {...rest}>
  {@render children?.()}
</mu-file-upload>
