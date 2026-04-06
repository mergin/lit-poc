import {LitElement, html, css, unsafeCSS, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  lightTokens,
  darkTokens,
  spacingTokens,
  elevationTokens,
  motionTokens,
  shapeTokens,
  type TokenMap,
} from '../styles/tokens.js';

/**
 * Theme provider component that applies design tokens to its DOM subtree.
 * Wrap your application root or a section of UI with this element to enable
 * theming. Switches between light and dark token sets via the `mode` property.
 *
 * CSS custom properties are applied directly to the host element's inline style,
 * so they cascade through both light DOM children and shadow roots of
 * descendant components.
 * @example
 * ```html
 * <mu-theme-provider mode="dark">
 *   <mu-button>Dark button</mu-button>
 * </mu-theme-provider>
 * ```
 */
@customElement('mu-theme-provider')
export class MuThemeProvider extends LitElement {
  /** Active color scheme. Switches between the light and dark token sets. */
  @property({type: String, reflect: true}) mode: 'light' | 'dark' = 'light';

  static override styles = css`
    :host {
      display: contents;
      ${unsafeCSS(spacingTokens)}
      ${unsafeCSS(elevationTokens)}
      ${unsafeCSS(motionTokens)}
      ${unsafeCSS(shapeTokens)}
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        --mu-duration-shortest: 0ms;
        --mu-duration-shorter: 0ms;
        --mu-duration-short: 0ms;
        --mu-duration-standard: 0ms;
        --mu-duration-complex: 0ms;
      }
    }
  `;

  /**
   * Applies design tokens immediately after the element is connected to the DOM.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._applyTokens();
  }

  /**
   * Re-applies tokens when observed properties change.
   * @param changedProperties Map of changed property names to their previous values.
   */
  override updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('mode')) {
      this._applyTokens();
    }
  }

  /**
   * Applies the token map for the current mode to the host element's inline style.
   * CSS custom properties set here cascade into all descendants including shadow roots.
   */
  private _applyTokens(): void {
    const tokens: TokenMap = this.mode === 'dark' ? darkTokens : lightTokens;
    Object.entries(tokens).forEach(([key, value]): void => {
      this.style.setProperty(key, value);
    });
  }

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-theme-provider': MuThemeProvider;
  }
}
