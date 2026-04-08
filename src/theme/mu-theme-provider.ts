import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  lightTokens,
  darkTokens,
  spacingTokens,
  elevationTokens,
  motionTokens,
  shapeTokens,
  type TokenMap,
} from '../tokens/index.js';

/**
 * Converts a CSS custom property block into a token map.
 * @param block Raw CSS custom property declarations.
 * @returns A token map keyed by CSS custom property name.
 */
function tokenBlockToMap(block: string): TokenMap {
  return Array.from(block.matchAll(/(--[\w-]+):\s*([^;]+);/g)).reduce<TokenMap>(
    (tokens, match): TokenMap => {
      const [, key, value] = match;
      tokens[key] = value.trim();
      return tokens;
    },
    {}
  );
}

const staticTokens: TokenMap = {
  ...tokenBlockToMap(spacingTokens),
  ...tokenBlockToMap(elevationTokens),
  ...tokenBlockToMap(motionTokens),
  ...tokenBlockToMap(shapeTokens),
};

const reducedMotionTokens: TokenMap = {
  '--mu-duration-shortest': '0ms',
  '--mu-duration-shorter': '0ms',
  '--mu-duration-short': '0ms',
  '--mu-duration-standard': '0ms',
  '--mu-duration-complex': '0ms',
};

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

  private readonly _reducedMotionQuery =
    typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)');

  static override styles = css`
    :host {
      display: contents;
    }
  `;

  /**
   * Applies design tokens immediately after the element is connected to the DOM.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._reducedMotionQuery?.addEventListener('change', this._handleReducedMotionChange);
    this._applyTokens();
  }

  /**
   * Removes observers when the element leaves the DOM.
   */
  override disconnectedCallback(): void {
    this._reducedMotionQuery?.removeEventListener('change', this._handleReducedMotionChange);
    super.disconnectedCallback();
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
   * Re-applies tokens when the reduced motion preference changes.
   */
  private _handleReducedMotionChange = (): void => {
    this._applyTokens();
  };

  /**
   * Applies the token map for the current mode to the host element's inline style.
   * CSS custom properties set here cascade into all descendants including shadow roots.
   */
  private _applyTokens(): void {
    const tokens: TokenMap = {
      ...staticTokens,
      ...(this.mode === 'dark' ? darkTokens : lightTokens),
      ...(this._reducedMotionQuery?.matches ? reducedMotionTokens : {}),
    };

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
