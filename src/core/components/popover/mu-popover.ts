import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/**
 * Floating popover component with focus management and accessible markup.
 * Attach a trigger element via the `trigger` slot.
 *
 * @csspart content - The floating content container.
 *
 * @fires mu-open  - Dispatched when the popover opens.
 * @fires mu-close - Dispatched when the popover closes.
 */
@customElement('mu-popover')
export class MuPopover extends LitElement {
  /** Controls the open/close state of the popover. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Preferred placement of the popover relative to the trigger. */
  @property({type: String}) placement: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

  /** When true, clicking outside the popover closes it. */
  @property({type: Boolean}) closeOnOutsideClick = true;

  /** ARIA role applied to the content container. */
  @property({type: String}) popoverrole: 'dialog' | 'tooltip' = 'dialog';

  /** Element to return focus to when the popover closes. */
  private _triggerEl: HTMLElement | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      .trigger-wrapper {
        display: contents;
      }
      .content {
        position: fixed;
        z-index: 1000;
        background: var(--mu-paper, #fff);
        border-radius: var(--mu-radius-lg, 8px);
        box-shadow: var(
          --mu-elevation-3,
          0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23)
        );
        padding: 16px;
        box-sizing: border-box;
        min-width: 200px;
        outline: none;
        part: content;
      }
      .content[hidden] {
        display: none;
      }
    `,
  ];

  /**
   * Opens the popover, positions it, and moves focus to the first focusable child.
   */
  openPopover(): void {
    if (this.open) return;
    this._triggerEl =
      (this.shadowRoot
        ?.querySelector<HTMLSlotElement>('slot[name="trigger"]')
        ?.assignedElements()[0] as HTMLElement) ?? null;
    this.open = true;
    this.dispatchEvent(new CustomEvent('mu-open', {bubbles: true, composed: true}));
    this.updateComplete.then((): void => {
      this._positionContent();
      const content = this.shadowRoot?.querySelector<HTMLElement>('.content');
      const focusable = content?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      (focusable ?? content)?.focus();
    });
  }

  /**
   * Closes the popover and restores focus to the trigger.
   */
  closePopover(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
    this._triggerEl?.focus();
  }

  /**
   * Positions the content element relative to the trigger.
   */
  private _positionContent(): void {
    const triggerSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const triggerEl = triggerSlot?.assignedElements()[0] as HTMLElement | undefined;
    const content = this.shadowRoot?.querySelector<HTMLElement>('.content');
    if (!triggerEl || !content) return;
    const rect = triggerEl.getBoundingClientRect();
    const gap = 8;
    switch (this.placement) {
      case 'top':
        content.style.bottom = `${window.innerHeight - rect.top + gap}px`;
        content.style.top = 'auto';
        content.style.left = `${rect.left}px`;
        content.style.right = 'auto';
        break;
      case 'left':
        content.style.right = `${window.innerWidth - rect.left + gap}px`;
        content.style.left = 'auto';
        content.style.top = `${rect.top}px`;
        content.style.bottom = 'auto';
        break;
      case 'right':
        content.style.left = `${rect.right + gap}px`;
        content.style.right = 'auto';
        content.style.top = `${rect.top}px`;
        content.style.bottom = 'auto';
        break;
      default:
        content.style.top = `${rect.bottom + gap}px`;
        content.style.bottom = 'auto';
        content.style.left = `${rect.left}px`;
        content.style.right = 'auto';
        break;
    }
  }

  /**
   * Handles outside click to close the popover when allowed.
   * @param e - The mouse event.
   */
  private _handleOutsideClick = (e: MouseEvent): void => {
    if (this.closeOnOutsideClick && !this.contains(e.target as Node)) {
      this.closePopover();
    }
  };

  /** Registers the outside-click listener when the element is connected to the DOM. */
  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick, true);
  }

  /** Removes the outside-click listener when the element is disconnected from the DOM. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick, true);
  }

  /**
   * Handles keydown on the content area for Escape key dismissal.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.closePopover();
    }
  }

  /**
   * Handles trigger slot click to toggle the popover.
   */
  private _handleTriggerClick(): void {
    if (this.open) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  override render(): TemplateResult {
    return html`
      <div
        class="trigger-wrapper"
        @click="${this._handleTriggerClick}"
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class="content"
        part="content"
        role="${this.popoverrole}"
        tabindex="-1"
        aria-modal="${this.popoverrole === 'dialog' ? 'true' : 'false'}"
        ?hidden="${!this.open}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-popover': MuPopover;
  }
}
