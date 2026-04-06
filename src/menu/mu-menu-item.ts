import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Individual menu item used inside `mu-menu`.
 *
 * @csspart item - The root button element of the menu item.
 *
 * @fires mu-select - Dispatched when the item is selected. Detail: `{ label: string }`.
 */
@customElement('mu-menu-item')
export class MuMenuItem extends LitElement {
  /** Text label displayed in the menu item. */
  @property({type: String}) label = '';

  /** Disables the menu item, preventing selection. */
  @property({type: Boolean, reflect: true}) disabled = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .item {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 8px 16px;
        font-size: 0.875rem;
        line-height: 1.5;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--mu-text-primary, #212b36);
        text-align: left;
        box-sizing: border-box;
        outline: none;
        white-space: nowrap;
      }
      .item:hover:not(:disabled),
      .item:focus-visible {
        background: var(--mu-action-hover, rgba(145, 158, 171, 0.08));
      }
      .item:disabled,
      :host([disabled]) .item {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
  ];

  /**
   * Handles click on the item button.
   */
  private _handleClick(): void {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent<{label: string}>('mu-select', {
        bubbles: true,
        composed: true,
        detail: {label: this.label},
      })
    );
  }

  override render(): TemplateResult {
    return html`
      <button
        class="item"
        part="item"
        role="menuitem"
        tabindex="-1"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        <slot></slot>
        ${!this.shadowRoot?.querySelector('slot')?.assignedNodes().length ? this.label : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-menu-item': MuMenuItem;
  }
}
