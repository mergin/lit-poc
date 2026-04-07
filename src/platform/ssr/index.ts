/**
 * Server-side rendering entry point for lit-poc.
 *
 * Re-exports the full component library alongside Lit SSR utilities so
 * consumers can render web-component HTML strings on the server without
 * needing two separate imports.
 *
 * @example Node / Next.js API route
 * ```ts
 * import { render, collectResult } from 'lit-poc/ssr';
 * import { html } from 'lit';
 * import 'lit-poc'; // registers all custom elements
 *
 * const stream = render(html`<mu-button>Click</mu-button>`);
 * const markup = await collectResult(stream);
 * ```
 */
export * from '../../index.js';
export {render} from '@lit-labs/ssr';
export {collectResult} from '@lit-labs/ssr/lib/render-result.js';
