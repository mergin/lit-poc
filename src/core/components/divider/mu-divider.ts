import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/**
 * Divider component to separate content.
 */
@customElement('mu-divider')
export class MuDivider extends LitElement {
  /** The orientation of the divider. */
  @property({type: String, reflect: true}) orientation: 'horizontal' | 'vertical' = 'horizontal';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        margin: 0;
      }
      :host([orientation='vertical']) {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      hr {
        margin: 0;
        flex-shrink: 0;
        border-width: 0;
        border-style: solid;
        border-color: var(--mu-divider, #e0e0e0);
      }
      :host([orientation='horizontal']) hr {
        border-bottom-width: 1px;
        width: 100%;
      }
      :host([orientation='vertical']) hr {
        border-right-width: 1px;
        height: 100%;
      }
    `,
  ];

  override render(): TemplateResult {
    // Native <hr> is used to satisfy the strict native HTML rule for accessibility and semantics.
    return html`
      <hr
        role="separator"
        aria-orientation="${this.orientation}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-divider': MuDivider;
  }
}
