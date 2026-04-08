import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {sharedStyles} from '../../../internal/utils/shared-styles.js';

/** Drawer placement options. */
export type DrawerPlacement = 'left' | 'right';

/**
 * Side drawer that slides in from the left or right edge of the viewport.
 * Uses a native `<dialog>` element for focus trapping and Escape handling.
 * @fires mu-open  - Dispatched after the drawer opens.
 * @fires mu-close - Dispatched after the drawer closes.
 */
@customElement('mu-drawer')
export class MuDrawer extends LitElement {
  /** Whether the drawer is visible. Reflects to attribute. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Side from which the drawer slides in. */
  @property({type: String}) placement: DrawerPlacement = 'left';

  /** Width of the drawer panel (any valid CSS length value). */
  @property({type: String}) width = '280px';

  @query('dialog') private _dialog!: HTMLDialogElement;

  /** Element that triggered the drawer open; focus restored on close. */
  private _triggerElement: Element | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }

      dialog {
        border: none;
        padding: 0;
        margin: 0;
        height: 100dvh;
        max-height: 100dvh;
        background: var(--mu-bg-paper, #fff);
        color: var(--mu-text-primary, #212b36);
        box-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
        overflow-y: auto;
        transition: transform var(--mu-duration-short, 250ms)
          var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
      }

      dialog.placement-left {
        inset-inline-start: 0;
        inset-inline-end: auto;
        border-radius: 0 var(--mu-radius-xl, 12px) var(--mu-radius-xl, 12px) 0;
      }

      dialog.placement-right {
        inset-inline-start: auto;
        inset-inline-end: 0;
        border-radius: var(--mu-radius-xl, 12px) 0 0 var(--mu-radius-xl, 12px);
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }

      .content {
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
      }
    `,
  ];

  /**
   * Reacts to open/placement changes by showing or hiding the native dialog.
   * @param changedProps - Changed property map.
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
   * Handles the native dialog close event.
   * Restores focus to the trigger element and dispatches mu-close.
   */
  private _handleClose(): void {
    if (this.open) {
      this.open = false;
    }
    (this._triggerElement as HTMLElement | null)?.focus();
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
  }

  /**
   * @returns The rendered drawer template.
   */
  override render(): TemplateResult {
    return html`
      <dialog
        class="placement-${this.placement}"
        style="width: ${this.width};"
        aria-modal="true"
        @close="${this._handleClose}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-drawer': MuDrawer;
  }
}
