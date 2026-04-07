<script lang="ts">
  import '../../radio/mu-radio-group.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the RadioGroup Svelte wrapper.
   */
  interface Props {
    /** Currently selected value. */
    value?: string;
    /** Whether all child radios are disabled. */
    disabled?: boolean;
    /** Form field name shared by all child radios. */
    name?: string;
    /** Label for the group (used as aria-label). */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {value, disabled, name, label, children, ...rest}: Props = $props();
</script>

<mu-radio-group {value} {disabled} {name} {label} {...rest}>
  {@render children?.()}
</mu-radio-group>
