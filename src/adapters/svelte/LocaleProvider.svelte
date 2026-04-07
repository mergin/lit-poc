<script lang="ts">
  import '../../i18n/mu-locale-provider.js';
  import type {Snippet} from 'svelte';

  /**
   * Props for the LocaleProvider Svelte wrapper.
   */
  interface Props {
    /** BCP-47 locale tag, e.g. 'en-US', 'de-DE'. */
    locale?: string;
    /** Default slot content. */
    children?: Snippet;
    /** Catch-all for remaining attributes and event listeners. */
    [key: string]: unknown;
  }

  let {locale, children, ...rest}: Props = $props();
</script>

<mu-locale-provider {locale} {...rest}>
  {@render children?.()}
</mu-locale-provider>
