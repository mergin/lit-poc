<script lang="ts">
  import '../rating/mu-rating.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Rating Svelte wrapper.
   */
  interface Props {
    /** Current rating value. */
    value?: number;
    /** Total number of stars. */
    max?: number;
    /** Step precision (1 for whole stars, 0.5 for half stars). */
    precision?: number;
    /** Whether the rating is read-only. */
    readonly?: boolean;
    /** Whether the rating is disabled. */
    disabled?: boolean;
    /** Accessible label applied to the radiogroup. */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, max, precision, readonly, disabled, label, children, ...rest}: Props = $props();
</script>

<mu-rating {value} {max} {precision} {readonly} {disabled} {label} {...rest}>
  {@render children?.()}
</mu-rating>
