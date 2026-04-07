import {LitElement, html, css, nothing, type TemplateResult} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/** Supported HTML input types for mu-text-field. */
export type TextFieldType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';

/**
 * Single-line text input form component that participates in native HTML forms.
 * Wraps a native `<input>` inside shadow DOM with an accessible floating label.
 * @fires input - Dispatched on every keystroke (native input event forwarded).
 * @fires change - Dispatched when the input loses focus with a changed value.
 * @csspart label - The `<label>` element displayed above the input.
 * @csspart wrapper - The flex wrapper that holds prefix slot, input, and suffix slot.
 * @csspart input - The native `<input>` or `<textarea>` element.
 * @csspart helper - The helper text element displayed below the field.
 * @csspart error - The error message element displayed below the field.
 * @cssproperty --mu-text-field-radius - Border radius of the input element; defaults to `--mu-radius` (8 px).
 * @cssproperty --mu-text-field-border-color - Default border colour; defaults to `--mu-divider`.
 * @cssproperty --mu-text-field-focus-color - Border and ring colour on focus; defaults to `--mu-primary`.
 */
@customElement('mu-text-field')
export class MuTextField extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Current value of the input field. */
  @property({type: String}) value = '';

  /** Floating label displayed above the input when focused or filled. */
  @property({type: String}) label = '';

  /** Placeholder text shown inside the input when empty. */
  @property({type: String}) placeholder = '';

  /** HTML input type controlling keyboard, validation, and rendering. */
  @property({type: String}) type: TextFieldType = 'text';

  /** Disables the text field, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Makes the text field read-only. */
  @property({type: Boolean, reflect: true}) readonly = false;

  /** Marks the field as required in form validation. */
  @property({type: Boolean, reflect: true}) required = false;

  /** Validation error message. Non-empty string triggers error styling. */
  @property({type: String}) error = '';

  /** Secondary descriptive text shown below the input when no error is present. */
  @property({type: String, attribute: 'helper-text'}) helperText = '';

  /** Renders a multi-line textarea instead of a single-line input. */
  @property({type: Boolean, reflect: true}) multiline = false;

  /** Visible row count when multiline is true. */
  @property({type: Number}) rows = 3;

  /** Maximum character count. Used with showCharCount to render a counter. */
  @property({type: Number}) maxlength = Infinity;

  /** Displays a character counter below the field when maxlength is finite. */
  @property({type: Boolean}) showCharCount = false;

  @query('#input') private _input?: HTMLInputElement;
  @query('#textarea') private _textarea?: HTMLTextAreaElement;

  /** Whether the prefix slot currently has assigned nodes. */
  @state() private _hasPrefix = false;
  /** Whether the suffix slot currently has assigned nodes. */
  @state() private _hasSuffix = false;

  /** Creates a MuTextField instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-text-field-radius: var(--mu-radius, 8px);
        --mu-text-field-border-color: var(--mu-divider, #e0e0e0);
        --mu-text-field-focus-color: var(--mu-primary, #1976d2);
        display: block;
      }
      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }
      .field {
        position: relative;
        display: flex;
        flex-direction: column;
      }
      label {
        font-size: 0.75rem;
        font-weight: var(--mu-font-weight-medium, 500);
        color: var(--mu-text-secondary, #637381);
        margin-bottom: 4px;
        display: block;
      }
      .error-label {
        color: var(--mu-error, #d32f2f);
      }
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: stretch;
      }
      .input-wrapper ::slotted([slot='prefix']),
      .input-wrapper ::slotted([slot='suffix']) {
        display: flex;
        align-items: center;
        padding: 0 8px;
        color: var(--mu-text-secondary, #637381);
        pointer-events: none;
      }
      input,
      textarea {
        font-family: inherit;
        font-size: 0.9375rem;
        color: var(--mu-text-primary, #212b36);
        background: var(--mu-bg-paper, #fff);
        border: 1.5px solid var(--mu-divider, #e0e0e0);
        border-radius: var(--mu-radius, 8px);
        padding: 10px 14px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      textarea {
        resize: vertical;
        line-height: 1.5;
      }
      .has-prefix input,
      .has-prefix textarea {
        padding-left: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .has-suffix input,
      .has-suffix textarea {
        padding-right: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      input:focus,
      textarea:focus {
        border-color: var(--mu-primary, #1976d2);
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
      }
      :host([error]) input,
      :host([error]) textarea,
      input.has-error,
      textarea.has-error {
        border-color: var(--mu-error, #d32f2f);
      }
      .char-count {
        font-size: 0.75rem;
        margin-top: 2px;
        text-align: right;
        color: var(--mu-text-secondary, #637381);
      }
      .helper {
        font-size: 0.75rem;
        margin-top: 4px;
        color: var(--mu-text-secondary, #637381);
      }
      .helper.error-text {
        color: var(--mu-error, #d32f2f);
      }
    `,
  ];

  /**
   * Applies the initial form value after the element connects to the DOM.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._internals.setFormValue(this.value);
  }

  /**
   * Re-syncs the form value when the value property changes.
   * @param changedProps Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string | number | symbol, unknown>): void {
    super.updated(changedProps);
    if (changedProps.has('value')) {
      this._internals.setFormValue(this.value);
      if (this._input && this._input.value !== this.value) {
        this._input.value = this.value;
      }
      if (this._textarea && this._textarea.value !== this.value) {
        this._textarea.value = this.value;
      }
    }
  }

  /**
   * Handles the native input event, updating the value and propagating the event.
   * @param e - The native input event.
   */
  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this._internals.setFormValue(this.value);
  }

  /**
   * Handles the native change event, updating value and syncing to form internals.
   * @param e - The native change event.
   */
  private _handleChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
  }

  /**
   * Handles native invalid event, surfacing the browser validation message as an error.
   */
  private _handleInvalid(): void {
    this.error = this._internals.validationMessage;
  }

  /**
   * Updates _hasPrefix state when the prefix slot content changes.
   * @param e - The slotchange event.
   */
  private _handlePrefixSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasPrefix = slot.assignedNodes().length > 0;
  }

  /**
   * Updates _hasSuffix state when the suffix slot content changes.
   * @param e - The slotchange event.
   */
  private _handleSuffixSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasSuffix = slot.assignedNodes().length > 0;
  }

  override render(): TemplateResult {
    const fieldId = this.multiline ? 'textarea' : 'input';
    const helperId = this.error || this.helperText ? 'helper' : '';
    const hasError = this.error !== '';
    const showCount = this.showCharCount && isFinite(this.maxlength);
    const wrapperClasses = {
      'input-wrapper': true,
      'has-prefix': this._hasPrefix,
      'has-suffix': this._hasSuffix,
    };

    return html`
      <div class="field">
        ${this.label
          ? html`<label
              id="label"
              for="${fieldId}"
              part="label"
              class="${hasError ? 'error-label' : ''}"
            >
              ${this.label}${this.required ? ' *' : ''}
            </label>`
          : ''}
        <div
          class="${classMap(wrapperClasses)}"
          part="wrapper"
        >
          <slot
            name="prefix"
            @slotchange="${this._handlePrefixSlotChange}"
          ></slot>
          ${this.multiline
            ? html`<textarea
                id="textarea"
                part="input"
                .value="${this.value}"
                placeholder="${this.placeholder}"
                rows="${this.rows}"
                ${isFinite(this.maxlength) ? html`maxlength="${this.maxlength}"` : ''}
                ?disabled="${this.disabled}"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                class="${hasError ? 'has-error' : ''}"
                aria-describedby="${helperId || nothing}"
                aria-invalid="${hasError ? 'true' : 'false'}"
                @input="${this._handleInput}"
                @change="${this._handleChange}"
                @invalid="${this._handleInvalid}"
              ></textarea>`
            : html`<input
                id="input"
                part="input"
                type="${this.type}"
                .value="${this.value}"
                placeholder="${this.placeholder}"
                ${isFinite(this.maxlength) ? html`maxlength="${this.maxlength}"` : ''}
                ?disabled="${this.disabled}"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                class="${hasError ? 'has-error' : ''}"
                aria-describedby="${helperId || nothing}"
                aria-invalid="${hasError ? 'true' : 'false'}"
                @input="${this._handleInput}"
                @change="${this._handleChange}"
                @invalid="${this._handleInvalid}"
              />`}
          <slot
            name="suffix"
            @slotchange="${this._handleSuffixSlotChange}"
          ></slot>
        </div>
        ${showCount
          ? html`<span
              class="char-count"
              aria-live="polite"
              >${this.value.length} / ${this.maxlength}</span
            >`
          : ''}
        ${this.error
          ? html`<span
              id="helper"
              part="error"
              class="helper error-text"
              role="alert"
              >${this.error}</span
            >`
          : this.helperText
          ? html`<span
              id="helper"
              part="helper"
              class="helper"
              >${this.helperText}</span
            >`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-text-field': MuTextField;
  }
}
