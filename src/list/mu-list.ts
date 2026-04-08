import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../internal/utils/shared-styles.js';

/**
 * List component for continuous vertical indexes.
 */
@customElement('mu-list')
export class MuList extends LitElement {
  /** Enables dense mode (reduces padding). */
  @property({type: Boolean, reflect: true}) dense = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        list-style: none;
        margin: 0;
        padding: 8px 0;
        position: relative;
        background-color: var(--mu-bg-paper, #fff);
      }
      :host([dense]) {
        padding: 4px 0;
        --mu-list-item-padding-y: 4px;
        --mu-list-item-font-size: 0.875rem;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <ul role="list">
        <slot></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-list': MuList;
  }
}
