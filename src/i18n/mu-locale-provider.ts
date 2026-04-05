import {LitElement, html, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {provide, createContext} from '@lit/context';
import {defaultLocale, type MuLocale} from './default-locale.js';

export type {MuLocale} from './default-locale.js';

/**
 * Lit Context key for the locale object.
 * Use with `@consume({ context: localeContext, subscribe: true })` in consuming components.
 */
export const localeContext = createContext<MuLocale>('mu-locale');

/**
 * Locale provider component that supplies a `MuLocale` object to all
 * descendant components via the Lit Context API.
 * When no provider is present in the tree, components fall back to
 * `defaultLocale` (English).
 */
@customElement('mu-locale-provider')
export class MuLocaleProvider extends LitElement {
  /**
   * The locale object provided to descendant components.
   * Replace with a custom object that satisfies `MuLocale` to localise the library.
   */
  @provide({context: localeContext})
  @property({attribute: false})
  locale: MuLocale = defaultLocale;

  /**
   * @returns The rendered locale provider template (transparent wrapper).
   */
  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-locale-provider': MuLocaleProvider;
  }
}
