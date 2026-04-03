import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * List item component to be used inside mu-list.
 */
@customElement('mu-list-item')
export class MuListItem extends LitElement {
  /** If true, the list item is disabled. */
  @property({type: Boolean, reflect: true}) disabled = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        padding-top: var(--mu-list-item-padding-y, 8px);
        padding-bottom: var(--mu-list-item-padding-y, 8px);
        padding-left: 16px;
        padding-right: 16px;
        color: var(--mu-text-primary, #212b36);
        font-size: var(--mu-list-item-font-size, 1rem);
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        line-height: 1.5;
      }
      li.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    `,
  ];

  override render(): TemplateResult {
    const classes = {
      disabled: this.disabled,
    };
    return html`
      <li
        role="listitem"
        class="${classMap(classes)}"
      >
        <slot></slot>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-list-item': MuListItem;
  }
}
