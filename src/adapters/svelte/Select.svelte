<script lang="ts">
  import '../../select/mu-select.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Select Svelte wrapper.
   */
  interface Props {
    /** Currently selected value (or array of values when multiple). */
    value?: string | string[];
    /** Visible label above the select. */
    label?: string;
    /** Placeholder option text. */
    placeholder?: string;
    /** Helper text below the select. */
    helper?: string;
    /** Error message. */
    error?: string;
    /** Whether the select is disabled. */
    disabled?: boolean;
    /** Whether the select is required. */
    required?: boolean;
    /** Whether multiple options can be selected. */
    multiple?: boolean;
    /** Visual style variant. */
    variant?: 'filled' | 'outlined';
    /** Form field name. */
    name?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, label, placeholder, helper, error, disabled, required, multiple, variant, name, children, ...rest}: Props = $props();
</script>

<mu-select {value} {label} {placeholder} {helper} {error} {disabled} {required} {multiple} {variant} {name} {...rest}>
  {@render children?.()}
</mu-select>
