import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './mu-breadcrumb-item.js';

/**
 * Breadcrumb navigation container.
 * Wraps `mu-breadcrumb-item` elements in an accessible `nav > ol` structure.
 */
@customElement('mu-breadcrumb')
export class MuBreadcrumb extends LitElement {
  /** Accessible label for the nav landmark. */
  @property({type: String}) label = 'Breadcrumb';

  static override styles = css`
    :host {
      display: block;
    }

    nav ol {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* Hide separator in first item */
    ::slotted(mu-breadcrumb-item:first-child) li .separator {
      display: none;
    }
  `;

  /**
   * @returns The rendered breadcrumb template.
   */
  override render(): TemplateResult {
    return html`
      <nav aria-label="${this.label}">
        <ol>
          <slot></slot>
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-breadcrumb': MuBreadcrumb;
  }
}
