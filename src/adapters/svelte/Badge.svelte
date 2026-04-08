<script lang="ts">
  import '../../core/components/badge/mu-badge.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the Badge Svelte wrapper.
   */
  interface Props {
    /** Text content shown inside the badge. */
    content?: string;
    /** Color variant. */
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    /** Max numeric value before the badge shows the `max+` overflow label. */
    max?: number;
    /** Whether to show a plain dot with no content. */
    dot?: boolean;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {content, color, max, dot, children, ...rest}: Props = $props();
</script>

<mu-badge {content} {color} {max} {dot} {...rest}>
  {@render children?.()}
</mu-badge>
