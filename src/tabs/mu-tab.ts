import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Individual tab button inside a `mu-tabs` container.
 * Managed by `mu-tabs`; do not use standalone.
 */
@customElement('mu-tab')
export class MuTab extends LitElement {
  /** Whether this tab is currently the selected one. */
  @property({type: Boolean, reflect: true}) selected = false;

  /** Whether the tab is disabled. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * ID of the `mu-tab-panel` this tab controls.
   * Set automatically by `mu-tabs`.
   */
  @property({type: String}) controls = '';

  static override styles = css`
    :host {
      display: inline-flex;
      outline: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      height: 48px;
      border: 0;
      background: transparent;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      cursor: pointer;
      color: var(--mu-text-secondary, #637381);
      border-bottom: 2px solid transparent;
      transition: color 200ms, border-color 200ms;
      white-space: nowrap;
    }

    button:hover:not(:disabled) {
      color: var(--mu-primary, #1976d2);
    }

    button:focus-visible {
      outline: 2px solid var(--mu-primary, #1976d2);
      outline-offset: -2px;
    }

    button:disabled {
      opacity: 0.38;
      cursor: not-allowed;
    }

    :host([selected]) button {
      color: var(--mu-primary, #1976d2);
      border-bottom-color: var(--mu-primary, #1976d2);
    }
  `;

  /**
   * Handles a click on the tab button, dispatches a tab-select event.
   */
  private _handleClick(): void {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('tab-select', {bubbles: true, composed: true}));
  }

  /**
   * @returns The rendered tab button template.
   */
  override render(): TemplateResult {
    return html`
      <button
        role="tab"
        aria-selected="${this.selected}"
        aria-controls="${this.controls}"
        ?disabled="${this.disabled}"
        tabindex="${this.selected ? 0 : -1}"
        @click="${this._handleClick}"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-tab': MuTab;
  }
}
