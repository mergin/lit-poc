<script lang="ts">
  import '../../text-field/mu-text-field.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the TextField Svelte wrapper.
   */
  interface Props {
    /** Current value of the field. */
    value?: string;
    /** Visible label for the field. */
    label?: string;
    /** Placeholder text shown when the field is empty. */
    placeholder?: string;
    /** Helper text displayed below the field. */
    helper?: string;
    /** Error message (sets field to error state when non-empty). */
    error?: string;
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** Whether the field is required. */
    required?: boolean;
    /** Whether the field is read-only. */
    readonly?: boolean;
    /** Visual style variant. */
    variant?: 'filled' | 'outlined';
    /** Input type (text, email, password, number, ...). */
    type?: string;
    /** Whether the field renders as a textarea. */
    multiline?: boolean;
    /** Number of visible rows when multiline. */
    rows?: number;
    /** Whether to show a character count below the field. */
    showCharCount?: boolean;
    /** Maximum character count. */
    maxlength?: number;
    /** Form field name. */
    name?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, label, placeholder, helper, error, disabled, required, readonly, variant, type, multiline, rows, showCharCount, maxlength, name, children, ...rest}: Props = $props();
</script>

<mu-text-field {value} {label} {placeholder} {helper} {error} {disabled} {required} {readonly} {variant} {type} {multiline} {rows} {showCharCount} {maxlength} {name} {...rest}>
  {@render children?.()}
</mu-text-field>
