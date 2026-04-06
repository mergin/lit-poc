<script lang="ts">
  import '../checkbox/mu-checkbox.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Checkbox Svelte wrapper.
   */
  interface Props {
    /** Whether the checkbox is checked. */
    checked?: boolean;
    /** Whether the checkbox is in an indeterminate state. */
    indeterminate?: boolean;
    /** Accessible label for the checkbox. */
    label?: string;
    /** Whether the checkbox is disabled. */
    disabled?: boolean;
    /** Whether the checkbox is required. */
    required?: boolean;
    /** Form field name. */
    name?: string;
    /** Form field value when checked. */
    value?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {checked, indeterminate, label, disabled, required, name, value, children, ...rest}: Props = $props();
</script>

<mu-checkbox {checked} {indeterminate} {label} {disabled} {required} {name} {value} {...rest}>
  {@render children?.()}
</mu-checkbox>
