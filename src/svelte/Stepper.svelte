<script lang="ts">
  import '../stepper/mu-stepper.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Stepper Svelte wrapper.
   */
  interface Props {
    /** Zero-based index of the currently active step. */
    activeStep?: number;
    /** Layout direction of the step connectors. */
    orientation?: 'horizontal' | 'vertical';
    /** Whether steps must be completed in order. */
    linear?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {activeStep, orientation, linear, children, ...rest}: Props = $props();
</script>

<mu-stepper {activeStep} {orientation} {linear} {...rest}>
  {@render children?.()}
</mu-stepper>
