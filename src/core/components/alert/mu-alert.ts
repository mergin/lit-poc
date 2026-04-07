import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/** Alert severity levels. */
export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

/** Icon map keyed by severity. */
const ICONS: Record<AlertSeverity, string> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

/** Color map keyed by severity. */
const COLORS: Record<AlertSeverity, {bg: string; border: string; icon: string}> = {
  success: {bg: '#edf7ed', border: '#4caf50', icon: '#2e7d32'},
  info: {bg: '#e5f6fd', border: '#03a9f4', icon: '#0288d1'},
  warning: {bg: '#fff4e5', border: '#ff9800', icon: '#ed6c02'},
  error: {bg: '#fdeded', border: '#ef5350', icon: '#d32f2f'},
};

/**
 * Alert component for communicating feedback messages.
 * Uses role="alert" for error severity and role="status" for others.
 * @fires mu-close - Dispatched when the close button is clicked.
 */
@customElement('mu-alert')
export class MuAlert extends LitElement {
  /** Severity level controlling color, icon and ARIA role. */
  @property({type: String}) severity: AlertSeverity = 'info';

  /**
   * When provided, renders a close button.
   * The button's aria-label is set to this value.
   */
  @property({type: String}) closeLabel = '';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 16px;
        border-radius: var(--mu-radius, 8px);
        border: 1px solid;
        font-size: var(--mu-body2-size, 0.875rem);
        line-height: 1.5;
        position: relative;
      }

      .icon {
        font-size: 1.2em;
        line-height: 1;
        flex-shrink: 0;
        font-style: normal;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0 0 0 8px;
        margin: 0;
        line-height: 1;
        font-size: 1.1em;
        opacity: 0.6;
        color: inherit;
        flex-shrink: 0;
      }

      .close-btn:hover,
      .close-btn:focus-visible {
        opacity: 1;
        outline: 2px solid currentColor;
        outline-offset: 2px;
        border-radius: var(--mu-radius-sm, 2px);
      }
    `,
  ];

  /**
   * Handles the close button click.
   */
  private _handleClose(): void {
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
  }

  /**
   * @returns The rendered alert template.
   */
  override render(): TemplateResult {
    const {bg, border, icon: iconColor} = COLORS[this.severity];
    const role = this.severity === 'error' ? 'alert' : 'status';

    return html`
      <div
        class="alert"
        role="${role}"
        style="background-color:${bg}; border-color:${border};"
      >
        <em
          class="icon"
          style="color:${iconColor};"
          aria-hidden="true"
        >
          <slot name="icon">${ICONS[this.severity]}</slot>
        </em>
        <div class="content">
          <slot></slot>
        </div>
        ${this.closeLabel
          ? html`
              <button
                class="close-btn"
                aria-label="${this.closeLabel}"
                style="color:${iconColor};"
                @click="${this._handleClose}"
              >
                &times;
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-alert': MuAlert;
  }
}
