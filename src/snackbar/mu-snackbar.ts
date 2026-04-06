import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {sharedStyles} from '../styles/shared-styles.js';
import {localeContext} from '../i18n/mu-locale-provider.js';
import {defaultLocale, type MuLocale} from '../i18n/default-locale.js';

/** Visual severity variant of the snackbar. */
export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Snackbar notification component rendered in a fixed bottom-center position.
 * Auto-dismisses after the configured duration; duration=0 is persistent.
 * @fires mu-action - Dispatched when the action button is clicked.
 * @fires mu-close - Dispatched when the snackbar is dismissed (any cause).
 * @csspart snackbar - The container div for the snackbar notification.
 * @csspart message - The text message span inside the snackbar.
 * @csspart action - The optional call-to-action button.
 * @csspart close-button - The dismiss (×) icon button.
 * @cssproperty --mu-snackbar-bg - Background colour; defaults to `--mu-text-primary` (#212b36).
 * @cssproperty --mu-snackbar-radius - Border radius; defaults to `--mu-radius-lg` (8 px).
 * @cssproperty --mu-snackbar-shadow - Box shadow; defaults to `--mu-elevation-2`.
 */
@customElement('mu-snackbar')
export class MuSnackbar extends LitElement {
  /** Notification message text. */
  @property({type: String}) message = '';

  /** Visual severity variant controlling colours and ARIA live region urgency. */
  @property({type: String, reflect: true}) variant: SnackbarVariant = 'default';

  /** Auto-dismiss delay in milliseconds. Use 0 for a persistent snackbar. */
  @property({type: Number}) duration = 5000;

  /** Whether the snackbar is currently visible. Reflected to attribute. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Optional label for the call-to-action button. Hidden when empty. */
  @property({type: String, attribute: 'action-label'}) actionLabel = '';

  /** Current locale strings; provided via `mu-locale-provider` or defaults to English. */
  @consume({context: localeContext, subscribe: true})
  private _locale: MuLocale = defaultLocale;

  /** Active auto-dismiss timer handle. */
  private _timer: number | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-snackbar-bg: var(--mu-text-primary, #212b36);
        --mu-snackbar-radius: var(--mu-radius-lg, 8px);
        --mu-snackbar-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
        display: contents;
      }
      .snackbar {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: var(--mu-radius-lg, 8px);
        background: var(--mu-text-primary, #212b36);
        color: #fff;
        font-size: var(--mu-body2-size, 0.875rem);
        min-width: 280px;
        max-width: min(560px, 90vw);
        box-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
        z-index: 1400;
        transition: opacity var(--mu-duration-shorter, 200ms),
          transform var(--mu-duration-shorter, 200ms);
      }
      :host(:not([open])) .snackbar {
        opacity: 0;
        pointer-events: none;
        transform: translateX(-50%) translateY(16px);
      }
      :host([variant='success']) .snackbar {
        background: var(--mu-success, #2e7d32);
      }
      :host([variant='error']) .snackbar {
        background: var(--mu-error, #d32f2f);
      }
      :host([variant='warning']) .snackbar {
        background: var(--mu-warning, #ed6c02);
      }
      :host([variant='info']) .snackbar {
        background: var(--mu-info, #0288d1);
      }
      .message {
        flex: 1;
      }
      .action {
        background: transparent;
        border: none;
        color: inherit;
        font-size: inherit;
        font-weight: var(--mu-font-weight-medium, 500);
        cursor: pointer;
        padding: 4px 8px;
        border-radius: var(--mu-radius-md, 4px);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .action:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .close {
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        padding: 4px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    `,
  ];

  /**
   * Responds to property changes; starts or clears the auto-dismiss timer.
   * @param changedProps - Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has('open') || changedProps.has('message')) {
      if (this.open) {
        this._startTimer();
      } else {
        this._clearTimer();
      }
    }
  }

  /**
   * Called when the element is removed from the DOM. Clears any pending timer.
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimer();
  }

  /**
   * Starts the auto-dismiss timer, resetting it if already running.
   */
  private _startTimer(): void {
    this._clearTimer();
    if (this.duration > 0) {
      this._timer = window.setTimeout((): void => {
        this._dismiss();
      }, this.duration);
    }
  }

  /**
   * Clears the active auto-dismiss timer.
   */
  private _clearTimer(): void {
    if (this._timer !== null) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * Closes the snackbar and dispatches the mu-close event.
   */
  private _dismiss(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
  }

  /**
   * Handles the action button click; dispatches mu-action then dismisses.
   */
  private _handleAction(): void {
    this.dispatchEvent(new CustomEvent('mu-action', {bubbles: true, composed: true}));
    this._dismiss();
  }

  /**
   * @returns The rendered snackbar template.
   */
  override render(): TemplateResult {
    const isAssertive = this.variant === 'error';
    return html`
      <div
        class="snackbar"
        part="snackbar"
        role="status"
        aria-live="${isAssertive ? 'assertive' : 'polite'}"
        aria-atomic="true"
      >
        <span
          class="message"
          part="message"
          >${this.message}</span
        >
        ${this.actionLabel
          ? html`<button
              class="action"
              part="action"
              @click="${this._handleAction}"
            >
              ${this.actionLabel}
            </button>`
          : ''}
        <button
          class="close"
          part="close-button"
          aria-label="${this._locale.snackbar.closeLabel}"
          @click="${this._dismiss}"
        >
          ✕
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-snackbar': MuSnackbar;
  }
}
