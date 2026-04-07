<script lang="ts">
  import '../../icon/mu-icon.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Icon Svelte wrapper.
   */
  interface Props {
    /** Icon name from the configured icon set. */
    name?: string;
    /** Color applied to the icon. */
    color?: string;
    /** Icon size in pixels. */
    size?: number;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {name, color, size, children, ...rest}: Props = $props();
</script>

<mu-icon {name} {color} {size} {...rest}>
  {@render children?.()}
</mu-icon>
