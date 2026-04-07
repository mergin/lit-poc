<script lang="ts">
  import '../../core/components/chip/mu-chip-input.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the ChipInput Svelte wrapper.
   */
  interface Props {
    /** Current list of chip string values. */
    chips?: string[];
    /** Input placeholder text. */
    placeholder?: string;
    /** Whether the chip input is disabled. */
    disabled?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {chips, placeholder, disabled, children, ...rest}: Props = $props();
</script>

<mu-chip-input {chips} {placeholder} {disabled} {...rest}>
  {@render children?.()}
</mu-chip-input>
