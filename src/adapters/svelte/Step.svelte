<script lang="ts">
  import '../../stepper/mu-step.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Step Svelte wrapper.
   */
  interface Props {
    /** Label text shown beside or below the step indicator. */
    label?: string;
    /** Visual state of the step indicator. */
    state?: 'active' | 'completed' | 'error' | 'disabled';
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {label, state, children, ...rest}: Props = $props();
</script>

<mu-step {label} {state} {...rest}>
  {@render children?.()}
</mu-step>
