<script lang="ts">
  import '../linear-progress/mu-linear-progress.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the LinearProgress Svelte wrapper.
   */
  interface Props {
    /** Progress percentage (0–100). Omit for indeterminate mode. */
    value?: number;
    /** Whether rendering in indeterminate mode. */
    indeterminate?: boolean;
    /** Color variant. */
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    /** Accessible label. */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, indeterminate, color, label, children, ...rest}: Props = $props();
</script>

<mu-linear-progress {value} {indeterminate} {color} {label} {...rest}>
  {@render children?.()}
</mu-linear-progress>
