import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Modal dialog overlay using the native &lt;dialog&gt; element.
 * Manages focus on open/close, traps focus inside, and closes on Escape.
 * @fires mu-open - Dispatched when the dialog finishes opening.
 * @fires mu-close - Dispatched when the dialog closes (any cause).
 * @csspart dialog - The native `<dialog>` element.
 * @csspart header - The `<h2>` headline element at the top of the dialog.
 * @csspart content - The scrollable content area containing the default slot.
 * @csspart actions - The footer actions area containing the `actions` named slot.
 * @csspart close-button - The × icon button in the top-right corner.
 * @cssproperty --mu-dialog-radius - Border radius of the dialog panel; defaults to `--mu-radius-xl` (12 px).
 * @cssproperty --mu-dialog-shadow - Box shadow of the dialog; defaults to `--mu-elevation-2`.
 * @cssproperty --mu-dialog-max-width - Maximum width of the dialog; defaults to `min(560px, 90vw)`.
 */
@customElement('mu-dialog')
export class MuDialog extends LitElement {
  /** Whether the dialog is currently open. Reflected to attribute. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Text rendered as the dialog headline / title. */
  @property({type: String}) headline = '';

  /** Expands the dialog to fill the full viewport. */
  @property({type: Boolean, reflect: true}) fullscreen = false;

  /** Makes the dialog content area scrollable when content overflows. */
  @property({type: Boolean, reflect: true}) scrollable = false;

  @query('dialog') private _dialog!: HTMLDialogElement;

  /** Stores the element that had focus before the dialog opened. */
  private _triggerElement: Element | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-dialog-radius: var(--mu-radius-xl, 12px);
        --mu-dialog-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
        --mu-dialog-max-width: min(560px, 90vw);
        display: contents;
      }
      dialog {
        border: none;
        border-radius: var(--mu-radius-xl, 12px);
        padding: 0;
        max-width: min(560px, 90vw);
        width: 100%;
        box-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
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
      .close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--mu-text-secondary, #637381);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 0;
      }
      .close-btn:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      .close-btn:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
      }
      dialog {
        position: relative;
      }
      :host([fullscreen]) dialog {
        position: fixed;
        inset: 0;
        border-radius: 0;
        max-width: 100%;
        max-height: 100%;
        margin: 0;
        width: 100%;
      }
      :host([scrollable]) dialog {
        overflow: hidden;
      }
      :host([scrollable]) .content {
        overflow-y: auto;
        max-height: calc(100vh - 160px);
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
        part="dialog"
        aria-modal="true"
        aria-labelledby="headline"
        @close="${this._handleClose}"
      >
        <h2
          id="headline"
          class="headline"
          part="header"
        >
          ${this.headline}
        </h2>
        <button
          class="close-btn"
          part="close-button"
          aria-label="Close dialog"
          @click="${this._handleClose}"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <line
              x1="4"
              y1="4"
              x2="14"
              y2="14"
            />
            <line
              x1="14"
              y1="4"
              x2="4"
              y2="14"
            />
          </svg>
        </button>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
        <div
          class="actions"
          part="actions"
        >
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
