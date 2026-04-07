<script lang="ts">
  import '../../autocomplete/mu-autocomplete.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Autocomplete Svelte wrapper.
   */
  interface Props {
    /** Current selected value. */
    value?: string;
    /** Visible label above the input. */
    label?: string;
    /** Placeholder text when the input is empty. */
    placeholder?: string;
    /** List of label/value pairs shown as suggestions. */
    options?: ReadonlyArray<{label: string; value: string}>;
    /** Whether the autocomplete is disabled. */
    disabled?: boolean;
    /** Whether a non-empty value is required. */
    required?: boolean;
    /** Minimum typed characters before the suggestion list opens. */
    minChars?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, label, placeholder, options, disabled, required, minChars, children, ...rest}: Props = $props();
</script>

<mu-autocomplete {value} {label} {placeholder} {options} {disabled} {required} {minChars} {...rest}>
  {@render children?.()}
</mu-autocomplete>
