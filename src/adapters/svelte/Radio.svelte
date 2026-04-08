<script lang="ts">
  import '../../core/components/radio/mu-radio.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Radio Svelte wrapper.
   */
  interface Props {
    /** Value submitted when this radio is selected. */
    value?: string;
    /** Whether this radio is checked. */
    checked?: boolean;
    /** Accessible label. */
    label?: string;
    /** Whether the radio is disabled. */
    disabled?: boolean;
    /** Form field name. */
    name?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, checked, label, disabled, name, children, ...rest}: Props = $props();
</script>

<mu-radio {value} {checked} {label} {disabled} {name} {...rest}>
  {@render children?.()}
</mu-radio>
