import {LitElement, html, css, type TemplateResult, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {sharedStyles} from '../../../internal/utils/shared-styles.js';

/** An option item for the autocomplete dropdown. */
export interface AutocompleteOption {
  /** Unique identifier for the option. */
  value: string;
  /** Display label for the option. */
  label: string;
}

/**
 * Autocomplete / combobox form component with filtering and keyboard navigation.
 * Participates natively in HTML forms.
 *
 * @csspart input   - The text input element.
 * @csspart listbox - The dropdown option list.
 * @csspart option  - Each individual option in the listbox.
 *
 * @fires change - Dispatched when an option is selected. Detail: `{ value: string, label: string }`.
 */
@customElement('mu-autocomplete')
export class MuAutocomplete extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Selected option value. */
  @property({type: String, reflect: true}) value = '';

  /** Label displayed above the input. */
  @property({type: String}) label = '';

  /** Array of options to search. */
  @property({type: Array}) options: AutocompleteOption[] = [];

  /** Disables the control. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Makes the field required for form validation. */
  @property({type: Boolean}) required = false;

  /** Placeholder text for the input. */
  @property({type: String}) placeholder = '';

  /** Minimum number of characters before showing options. */
  @property({type: Number}) minChars = 1;

  /** Form field name. */
  @property({type: String}) name = '';

  /** Current text in the input. */
  @state() private _inputValue = '';

  /** Whether the listbox is open. */
  @state() private _open = false;

  /** Index of the active option (-1 = none). */
  @state() private _activeIndex = -1;

  /** Unique id prefix for ARIA relationships. */
  private readonly _uid = `mu-ac-${Math.random().toString(36).slice(2, 8)}`;

  /** Creates a MuAutocomplete instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: relative;
      }
      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }
      .label-text {
        display: block;
        font-size: 0.75rem;
        color: var(--mu-text-secondary, #637381);
        margin-bottom: 4px;
      }
      .input {
        width: 100%;
        padding: 8px 12px;
        font-size: 0.875rem;
        border: 1px solid var(--mu-text-disabled, #919eab);
        border-radius: 4px;
        box-sizing: border-box;
        outline: none;
        background: #fff;
        color: var(--mu-text-primary, #212b36);
        part: input;
      }
      .input:focus {
        border-color: var(--mu-primary, #1976d2);
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
      }
      .listbox {
        position: absolute;
        top: calc(100% + 2px);
        left: 0;
        right: 0;
        z-index: 1000;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        list-style: none;
        margin: 0;
        padding: 4px 0;
        max-height: 220px;
        overflow-y: auto;
        part: listbox;
      }
      .listbox[hidden] {
        display: none;
      }
      .option {
        padding: 8px 12px;
        font-size: 0.875rem;
        cursor: pointer;
        color: var(--mu-text-primary, #212b36);
        part: option;
      }
      .option:hover,
      .option.active {
        background: var(--mu-action-hover, rgba(145, 158, 171, 0.08));
        part: option option--active;
      }
      .no-results {
        padding: 8px 12px;
        font-size: 0.875rem;
        color: var(--mu-text-secondary, #637381);
      }
    `,
  ];

  /**
   * Syncs form value when value or name changes.
   * @param changedProps - Map of changed properties.
   */
  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('value') || changedProps.has('name')) {
      this._internals.setFormValue(this.value);
      if (this.required) {
        const valid = this.value.length > 0;
        if (valid) {
          this._internals.setValidity({});
        } else {
          this._internals.setValidity({valueMissing: true}, 'Please select an option.');
        }
      }
    }
  }

  /**
   * Filtered options based on input value and minChars threshold.
   * @returns The filtered array of matching options.
   */
  private get _filtered(): AutocompleteOption[] {
    if (this._inputValue.length < this.minChars) return [];
    const query = this._inputValue.toLowerCase();
    return this.options.filter((o): boolean => o.label.toLowerCase().includes(query));
  }

  /**
   * ID of the currently active option element for aria-activedescendant.
   * @returns The element ID string, or empty string when no option is active.
   */
  private get _activeDescendant(): string {
    if (this._activeIndex < 0) return '';
    return `${this._uid}-opt-${this._activeIndex}`;
  }

  /**
   * Selects an option: updates value, emits event, closes listbox.
   * @param option - The option to select.
   */
  private _selectOption(option: AutocompleteOption): void {
    this.value = option.value;
    this._inputValue = option.label;
    this._open = false;
    this._activeIndex = -1;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(
      new CustomEvent<{value: string; label: string}>('change', {
        bubbles: true,
        composed: true,
        detail: {value: option.value, label: option.label},
      })
    );
  }

  /** Closes the listbox and resets active index. */
  private _close(): void {
    this._open = false;
    this._activeIndex = -1;
  }

  /**
   * Handles input events on the text field.
   * @param e - The InputEvent.
   */
  private _handleInput(e: Event): void {
    this._inputValue = (e.target as HTMLInputElement).value;
    this._activeIndex = -1;
    this._open = this._inputValue.length >= this.minChars && this._filtered.length > 0;
  }

  /**
   * Handles keydown for keyboard navigation of the listbox.
   * @param e - The KeyboardEvent.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    const filtered = this._filtered;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this._open) {
          this._open = filtered.length > 0;
        }
        this._activeIndex = Math.min(this._activeIndex + 1, filtered.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._activeIndex = Math.max(this._activeIndex - 1, -1);
        break;
      case 'Enter':
        if (this._open && this._activeIndex >= 0) {
          e.preventDefault();
          this._selectOption(filtered[this._activeIndex]);
        }
        break;
      case 'Escape':
      case 'Tab':
        this._close();
        break;
      default:
        break;
    }
  }

  override render(): TemplateResult {
    const filtered = this._filtered;
    const listboxId = `${this._uid}-listbox`;

    return html`
      ${this.label ? html`<span class="label-text">${this.label}</span>` : ''}
      <input
        class="input"
        part="input"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-expanded="${this._open ? 'true' : 'false'}"
        aria-autocomplete="list"
        aria-controls="${listboxId}"
        aria-activedescendant="${this._activeDescendant}"
        aria-label="${this.label || this.placeholder}"
        placeholder="${this.placeholder}"
        .value="${this._inputValue}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
        @keydown="${this._handleKeyDown}"
      />
      <ul
        id="${listboxId}"
        class="listbox"
        part="listbox"
        role="listbox"
        ?hidden="${!this._open}"
      >
        ${filtered.length
          ? repeat(
              filtered,
              (o): string => o.value,
              (option, i): TemplateResult => html`
                <li
                  id="${this._uid}-opt-${i}"
                  class="option ${this._activeIndex === i ? 'active' : ''}"
                  part="option"
                  role="option"
                  aria-selected="${this.value === option.value ? 'true' : 'false'}"
                  @click="${(): void => {
                    this._selectOption(option);
                  }}"
                  @mousedown="${(e: Event): void => {
                    e.preventDefault();
                  }}"
                >
                  ${option.label}
                </li>
              `
            )
          : html`<li class="no-results">No results found</li>`}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-autocomplete': MuAutocomplete;
  }
}
