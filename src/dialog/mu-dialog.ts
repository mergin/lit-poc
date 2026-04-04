import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Modal dialog overlay using the native &lt;dialog&gt; element.
 * Manages focus on open/close, traps focus inside, and closes on Escape.
 * @fires mu-open - Dispatched when the dialog finishes opening.
 * @fires mu-close - Dispatched when the dialog closes (any cause).
 */
@customElement('mu-dialog')
export class MuDialog extends LitElement {
  /** Whether the dialog is currently open. Reflected to attribute. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Text rendered as the dialog headline / title. */
  @property({type: String}) headline = '';

  @query('dialog') private _dialog!: HTMLDialogElement;

  /** Stores the element that had focus before the dialog opened. */
  private _triggerElement: Element | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }
      dialog {
        border: none;
        border-radius: 12px;
        padding: 0;
        max-width: min(560px, 90vw);
        width: 100%;
        box-shadow: var(--mu-shadow-2, 0px 4px 8px rgba(145, 158, 171, 0.16));
        background: var(--mu-bg-paper, #fff);
        color: var(--mu-text-primary, #212b36);
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
      .headline {
        font-size: var(--mu-h5-size, 1rem);
        font-weight: var(--mu-font-weight-medium, 500);
        margin: 0;
        padding: 20px 24px 0;
        color: var(--mu-text-primary, #212b36);
      }
      .content {
        padding: 16px 24px;
        font-size: var(--mu-body1-size, 1rem);
        color: var(--mu-text-secondary, #637381);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 8px 16px 16px;
      }
    `,
  ];

  /**
   * Responds to property changes; opens or closes the native dialog element.
   * @param changedProps - Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string, unknown>): void {
    if (!changedProps.has('open')) return;

    if (this.open) {
      this._triggerElement = document.activeElement;
      this._dialog?.showModal();
      this.dispatchEvent(new CustomEvent('mu-open', {bubbles: true, composed: true}));
    } else if (this._dialog?.open) {
      this._dialog.close();
    }
  }

  /**
   * Handles the native dialog close event (triggered by Escape or programmatic close).
   * Restores focus to the triggering element and dispatches mu-close.
   */
  private _handleClose(): void {
    if (this.open) {
      this.open = false;
    }
    (this._triggerElement as HTMLElement | null)?.focus();
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
  }

  /**
   * @returns The rendered dialog template.
   */
  override render(): TemplateResult {
    return html`
      <dialog
        aria-modal="true"
        aria-labelledby="headline"
        @close="${this._handleClose}"
      >
        <h2
          id="headline"
          class="headline"
        >
          ${this.headline}
        </h2>
        <div class="content">
          <slot></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-dialog': MuDialog;
  }
}
