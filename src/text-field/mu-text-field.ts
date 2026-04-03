import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/** Supported HTML input types for mu-text-field. */
export type TextFieldType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';

/**
 * Single-line text input form component that participates in native HTML forms.
 * Wraps a native `<input>` inside shadow DOM with an accessible floating label.
 * @fires input - Dispatched on every keystroke (native input event forwarded).
 * @fires change - Dispatched when the input loses focus with a changed value.
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

  @query('#input') private _input!: HTMLInputElement;

  /**
   *
   */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

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
      input {
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
      input:focus {
        border-color: var(--mu-primary, #1976d2);
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
      }
      :host([error]) input,
      input.has-error {
        border-color: var(--mu-error, #d32f2f);
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
    }
  }

  /**
   * Handles the native input event, updating the value and propagating the event.
   * @param e - The native input event.
   */
  private _handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this._internals.setFormValue(this.value);
  }

  /**
   * Handles the native change event, updating value and syncing to form internals.
   * @param e - The native change event.
   */
  private _handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
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

  override render(): TemplateResult {
    const inputId = 'input';
    const helperId = this.error || this.helperText ? 'helper' : '';
    const hasError = this.error !== '';

    return html`
      <div class="field">
        ${this.label
          ? html`<label
              id="label"
              for="${inputId}"
              class="${hasError ? 'error-label' : ''}"
            >
              ${this.label}${this.required ? ' *' : ''}
            </label>`
          : ''}
        <input
          id="${inputId}"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          class="${hasError ? 'has-error' : ''}"
          aria-describedby="${helperId}"
          aria-invalid="${hasError ? 'true' : 'false'}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @invalid="${this._handleInvalid}"
        />
        ${this.error
          ? html`<span
              id="helper"
              class="helper error-text"
              role="alert"
              >${this.error}</span
            >`
          : this.helperText
          ? html`<span
              id="helper"
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
