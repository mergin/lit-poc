import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {sharedStyles} from '../../styles/shared-styles.js';
import './mu-chip.js';

/**
 * Input component that tokenises typed values into deletable chips.
 * Participates in native HTML forms via ElementInternals.
 *
 * @fires change - Dispatched when the chip array changes.
 *                 Detail: `{ chips: string[] }`.
 *
 * @csspart container - The flex wrapper around chips and the text input.
 * @csspart chip-text-input - The inline text input field.
 */
@customElement('mu-chip-input')
export class MuChipInput extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Array of chip label strings currently displayed and submitted to the form. */
  @property({type: Array}) chips: string[] = [];

  /** Placeholder text shown inside the input when no chips are present. */
  @property({type: String}) placeholder = 'Add\u2026';

  /** Disables the component, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** The form field name used when submitting. */
  @property({type: String}) name = '';

  /** Current text being typed in the inline input. */
  @state() private _inputValue = '';

  @query('#chip-input') private _input?: HTMLInputElement;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        background: var(--mu-bg-paper, #fff);
        border: 1.5px solid var(--mu-divider, #e0e0e0);
        border-radius: var(--mu-radius, 8px);
        padding: 6px 10px;
        min-height: 44px;
        box-sizing: border-box;
        cursor: text;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .container:focus-within {
        border-color: var(--mu-primary, #1976d2);
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
      }
      .chip-text-input {
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: 0.9375rem;
        color: var(--mu-text-primary, #212b36);
        min-width: 80px;
        flex: 1;
        padding: 2px 0;
      }
    `,
  ];

  /** Creates a MuChipInput instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /**
   * Syncs the form value on connect.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._internals.setFormValue(this.chips.join(','));
  }

  /**
   * Commits the current input text as a new chip.
   * Trims whitespace; no-op on empty input.
   */
  private _addChip(): void {
    const val = this._inputValue.trim();
    if (!val) return;
    this.chips = [...this.chips, val];
    this._inputValue = '';
    this._sync();
  }

  /**
   * Removes the chip at the given index.
   * @param index - Zero-based index of the chip to remove.
   */
  private _removeChip(index: number): void {
    this.chips = this.chips.filter((_: string, i: number): boolean => i !== index);
    this._sync();
  }

  /**
   * Sends the updated chip array to form internals and emits a change event.
   */
  private _sync(): void {
    this._internals.setFormValue(this.chips.join(','));
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {chips: [...this.chips]},
      })
    );
  }

  /**
   * Handles keydown events on the inline input.
   * Enter and Comma commit the current value; Backspace on empty removes the last chip.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if ((e.key === 'Enter' || e.key === ',') && !e.isComposing) {
      e.preventDefault();
      this._addChip();
    } else if (e.key === 'Backspace' && !this._inputValue && this.chips.length > 0) {
      this._removeChip(this.chips.length - 1);
    }
  }

  /**
   * Updates the internal input value state on every keystroke.
   * @param e - The native input event.
   */
  private _handleInputChange(e: Event): void {
    this._inputValue = (e.target as HTMLInputElement).value;
  }

  /**
   * Focuses the hidden text input when the container is clicked.
   */
  private _handleContainerClick(): void {
    this._input?.focus();
  }

  override render(): TemplateResult {
    return html`
      <div
        class="container"
        part="container"
        role="group"
        aria-label="Chip input"
        @click="${this._handleContainerClick}"
      >
        ${repeat(
          this.chips,
          (c: string, i: number): string => `${c}-${i}`,
          (chip: string, i: number): TemplateResult => html`
            <mu-chip
              label="${chip}"
              deletable
              ?disabled="${this.disabled}"
              @delete="${(): void => {
                this._removeChip(i);
              }}"
            ></mu-chip>
          `
        )}
        <input
          id="chip-input"
          class="chip-text-input"
          part="chip-text-input"
          type="text"
          .value="${this._inputValue}"
          placeholder="${this.chips.length === 0 ? this.placeholder : ''}"
          ?disabled="${this.disabled}"
          aria-label="${this.placeholder}"
          @keydown="${this._handleKeyDown}"
          @input="${this._handleInputChange}"
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-chip-input': MuChipInput;
  }
}
