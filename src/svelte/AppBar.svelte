<script lang="ts">
  import '../app-bar/mu-app-bar.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the AppBar Svelte wrapper.
   */
  interface Props {
    /** Text displayed as the application title. */
    title?: string;
    /** Elevation shadow depth (0–4). */
    elevation?: number;
    /** Colour variant. */
    color?: 'default' | 'primary' | 'secondary';
    /** ARIA landmark label. */
    label?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {title, elevation, color, label, children, ...rest}: Props = $props();
</script>

<mu-app-bar {title} {elevation} {color} {label} {...rest}>
  {@render children?.()}
</mu-app-bar>
