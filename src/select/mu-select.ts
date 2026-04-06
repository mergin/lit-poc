import {LitElement, html, css, nothing, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/** A single option entry for mu-select. */
export interface SelectOption {
  /** The value submitted to the form when this option is selected. */
  value: string;
  /** The human-readable label displayed in the dropdown list. */
  label: string;
  /** When true, this option is not selectable. */
  disabled?: boolean;
}

/** Value type for mu-select — single string or array when multiple is true. */
export type SelectValue = string | string[];

/**
 * Select (dropdown) form component that participates in native HTML forms.
 * Uses a native `<select>` inside shadow DOM for maximum accessibility.
 * @fires change - Dispatched when the selected value changes.
 * @csspart label - The `<label>` element displayed above the select.
 * @csspart select - The native `<select>` element.
 * @csspart error - The error message element displayed below the field.
 * @cssproperty --mu-select-radius - Border radius of the select element; defaults to `--mu-radius` (8 px).
 * @cssproperty --mu-select-border-color - Default border colour; defaults to `--mu-divider`.
 * @cssproperty --mu-select-focus-color - Border and ring colour on focus; defaults to `--mu-primary`.
 */
@customElement('mu-select')
export class MuSelect extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Currently selected value; a string array when multiple is true. */
  @property({type: String}) value: SelectValue = '';

  /** Floating label displayed above the select. */
  @property({type: String}) label = '';

  /** Disables the select, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Marks the field as required in form validation. */
  @property({type: Boolean, reflect: true}) required = false;

  /** Validation error message. Non-empty string triggers error styling. */
  @property({type: String}) error = '';

  /** Array of options to render in the dropdown. */
  @property({type: Array}) options: SelectOption[] = [];

  /** Placeholder text shown as the first unselectable option. */
  @property({type: String}) placeholder = '';

  /** Enables multi-select mode; value becomes string[]. */
  @property({type: Boolean, reflect: true}) multiple = false;

  /** Creates a MuSelect instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-select-radius: var(--mu-radius, 8px);
        --mu-select-border-color: var(--mu-divider, #e0e0e0);
        --mu-select-focus-color: var(--mu-primary, #1976d2);
        display: block;
      }
      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }
      .field {
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
      .select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      select {
        font-family: inherit;
        font-size: 0.9375rem;
        color: var(--mu-text-primary, #212b36);
        background: var(--mu-bg-paper, #fff);
        border: 1.5px solid var(--mu-divider, #e0e0e0);
        border-radius: var(--mu-radius, 8px);
        padding: 10px 36px 10px 14px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      select:focus {
        border-color: var(--mu-primary, #1976d2);
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.15);
      }
      select.has-error {
        border-color: var(--mu-error, #d32f2f);
      }
      .chevron {
        position: absolute;
        right: 12px;
        pointer-events: none;
        color: var(--mu-text-secondary, #637381);
        display: flex;
        align-items: center;
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
    this._internals.setFormValue(this._serializeValue());
  }

  /**
   * Re-syncs the form value when the value property changes.
   * @param changedProps Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string | number | symbol, unknown>): void {
    super.updated(changedProps);
    if (changedProps.has('value')) {
      this._internals.setFormValue(this._serializeValue());
    }
  }

  /**
   * Serializes the current value for form submission.
   * @returns A comma-joined string when multiple, otherwise the raw string value.
   */
  private _serializeValue(): string {
    return Array.isArray(this.value) ? this.value.join(',') : (this.value as string);
  }

  /**
   * Handles the native select change event, updating the value and dispatching change.
   * @param e - The native change event from the select element.
   */
  private _handleChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    if (this.multiple) {
      this.value = Array.from(target.selectedOptions).map(
        (o: HTMLOptionElement): string => o.value
      );
    } else {
      this.value = target.value;
    }
    this._internals.setFormValue(this._serializeValue());
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
  }

  override render(): TemplateResult {
    const hasError = this.error !== '';
    const isMultiple = Boolean(this.multiple);
    const currentValue = this.value;

    return html`
      <div class="field">
        ${this.label
          ? html`<label
              for="select"
              part="label"
              class="${hasError ? 'error-label' : ''}"
            >
              ${this.label}${this.required ? ' *' : ''}
            </label>`
          : ''}
        <div class="select-wrapper">
          <select
            id="select"
            part="select"
            ?multiple="${isMultiple}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            class="${hasError ? 'has-error' : ''}"
            aria-invalid="${hasError ? 'true' : 'false'}"
            aria-describedby="${hasError ? 'helper' : nothing}"
            @change="${this._handleChange}"
          >
            ${!isMultiple && this.placeholder
              ? html`<option
                  value=""
                  disabled
                  selected="${!currentValue}"
                >
                  ${this.placeholder}
                </option>`
              : ''}
            ${this.options.map(
              (opt: SelectOption): TemplateResult =>
                html`<option
                  value="${opt.value}"
                  ?disabled="${opt.disabled ?? false}"
                  ?selected="${isMultiple
                    ? (Array.isArray(currentValue) ? currentValue : []).includes(opt.value)
                    : opt.value === currentValue}"
                >
                  ${opt.label}
                </option>`
            )}
          </select>
          ${!isMultiple
            ? html`<span
                class="chevron"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>`
            : ''}
        </div>
        ${hasError
          ? html`<span
              id="helper"
              part="error"
              class="helper error-text"
              role="alert"
              >${this.error}</span
            >`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-select': MuSelect;
  }
}
