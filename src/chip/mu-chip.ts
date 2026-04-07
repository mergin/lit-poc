import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {sharedStyles} from '../styles/shared-styles.js';
import {classMap} from 'lit/directives/class-map.js';
import {localeContext} from '../core/i18n/mu-locale-provider.js';
import {defaultLocale, type MuLocale} from '../core/i18n/default-locale.js';
import '../icon/mu-icon.js';

/**
 * Chip component for tags, attributes, and actions.
 * @fires delete - Dispatched when the delete button is clicked on a deletable chip.
 * @csspart chip - The outer chip container element.
 * @csspart label - The text label inside the chip.
 * @csspart delete-button - The delete / close icon button (only present when `deletable`).
 * @cssproperty --mu-chip-radius - Border radius of the chip; defaults to 16 px.
 * @cssproperty --mu-chip-height - Height of the chip; defaults to 32 px.
 * @cssproperty --mu-chip-bg - Background colour for the default chip variant.
 */
@customElement('mu-chip')
export class MuChip extends LitElement {
  /** Text label displayed in the chip. */
  @property({type: String}) label = '';

  /** Disables the chip and its actions. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Allows the chip to be deleted, rendering a close icon. */
  @property({type: Boolean}) deletable = false;

  /** Current locale strings; provided via `mu-locale-provider` or defaults to English. */
  @consume({context: localeContext, subscribe: true})
  private _locale: MuLocale = defaultLocale;

  /** Whether the avatar slot has assigned nodes. */
  @state() private _hasAvatar = false;

  /** Predefined color variant. */
  @property({type: String}) color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info' = 'default';

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-chip-radius: 16px;
        --mu-chip-height: 32px;
        --mu-chip-bg: #e0e0e0;
        display: inline-flex;
        outline: 0;
        vertical-align: middle;
      }
      .chip {
        display: inline-flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        transition: background-color var(--mu-duration-standard, 300ms)
            var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)) 0ms,
          box-shadow var(--mu-duration-standard, 300ms)
            var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)) 0ms;
        cursor: default;
        outline: 0;
        text-decoration: none;
        border: 0;
        padding: 0 12px;
        border-radius: 16px;
        font-family: inherit;
        font-size: 0.8125rem;
        height: 32px;
        background-color: #e0e0e0;
        color: rgba(0, 0, 0, 0.87);
      }
      .chip.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      /* Colors */
      .color-primary {
        background-color: var(--mu-primary);
        color: var(--mu-primary-contrast);
      }
      .color-secondary {
        background-color: var(--mu-secondary);
        color: var(--mu-secondary-contrast);
      }
      .color-error {
        background-color: var(--mu-error);
        color: #fff;
      }
      .color-success {
        background-color: var(--mu-success);
        color: #fff;
      }
      .color-warning {
        background-color: var(--mu-warning);
        color: #fff;
      }
      .color-info {
        background-color: var(--mu-info);
        color: #fff;
      }

      .label {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .delete-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        padding: 0;
        margin: 0 -6px 0 4px;
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        border-radius: 50%;
        height: 22px;
        width: 22px;
        transition: opacity var(--mu-duration-shorter, 200ms)
          var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
      }
      .delete-btn:hover,
      .delete-btn:focus-visible {
        opacity: 1;
        outline: 2px solid var(--mu-primary);
        outline-offset: 2px;
      }
      .delete-btn mu-icon {
        --mu-icon-size: 18px;
        font-size: 18px;
      }
      ::slotted([slot='avatar']) {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        margin-left: -6px;
        margin-right: 4px;
        overflow: hidden;
      }
      .avatar-hidden {
        display: none;
      }
    `,
  ];

  /**
   * Handles the click event on the delete button.
   * @param e - The click event object.
   */
  private _handleDelete(e: Event): void {
    if (this.disabled) return;
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete', {bubbles: true, composed: true}));
  }

  /**
   * Updates the _hasAvatar flag when the avatar slot population changes.
   * @param e - The slotchange event from the avatar slot.
   */
  private _handleAvatarSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasAvatar = slot.assignedNodes().length > 0;
  }

  override render(): TemplateResult {
    const classes = {
      chip: true,
      disabled: this.disabled,
      [`color-${this.color}`]: this.color !== 'default',
    };

    return html`
      <div
        class="${classMap(classes)}"
        part="chip"
      >
        <slot
          name="avatar"
          class="${this._hasAvatar ? '' : 'avatar-hidden'}"
          @slotchange="${this._handleAvatarSlotChange}"
        ></slot>
        <span
          class="label"
          part="label"
          >${this.label}</span
        >
        <slot></slot>
        ${this.deletable
          ? html`
              <button
                class="delete-btn"
                part="delete-button"
                aria-label="${this._locale.chip.deleteLabel(this.label)}"
                @click="${this._handleDelete}"
                ?disabled="${this.disabled}"
              >
                <mu-icon>cancel</mu-icon>
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-chip': MuChip;
  }
}
