<script lang="ts">
  import '../switch/mu-switch.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Switch Svelte wrapper.
   */
  interface Props {
    /** Whether the switch is toggled on. */
    checked?: boolean;
    /** Accessible label. */
    label?: string;
    /** Whether the switch is disabled. */
    disabled?: boolean;
    /** Whether the switch is required. */
    required?: boolean;
    /** Form field name. */
    name?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {checked, label, disabled, required, name, children, ...rest}: Props = $props();
</script>

<mu-switch {checked} {label} {disabled} {required} {name} {...rest}>
  {@render children?.()}
</mu-switch>
