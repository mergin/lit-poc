<script lang="ts">
  import '../../core/components/slider/mu-slider.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Slider Svelte wrapper.
   */
  interface Props {
    /** Current numeric value of the slider. */
    value?: number;
    /** Minimum allowed value. */
    min?: number;
    /** Maximum allowed value. */
    max?: number;
    /** Step increment per tick. */
    step?: number;
    /** Whether the slider is disabled. */
    disabled?: boolean;
    /** Accessible label for the slider. */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, min, max, step, disabled, label, children, ...rest}: Props = $props();
</script>

<mu-slider {value} {min} {max} {step} {disabled} {label} {...rest}>
  {@render children?.()}
</mu-slider>
