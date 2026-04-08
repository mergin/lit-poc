import {LitElement, html, css, nothing, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../../internal/utils/shared-styles.js';

/**
 * Checkbox form component that participates in native HTML forms via ElementInternals.
 * Supports checked, indeterminate, and disabled states with full keyboard accessibility.
 * @fires change - Dispatched when the checked state changes.
 * @csspart checkbox - The focusable wrapper element that holds the visual box.
 * @csspart checkmark - The inner box containing the SVG tick / dash mark.
 * @csspart label - The visible label text element.
 * @cssproperty --mu-checkbox-color - Active (checked) fill and border colour; defaults to `--mu-primary`.
 * @cssproperty --mu-checkbox-radius - Border radius of the box; defaults to 3 px.
 */
@customElement('mu-checkbox')
export class MuCheckbox extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Whether the checkbox is checked. */
  @property({type: Boolean, reflect: true}) checked = false;

  /** Tri-state: when true, overrides checked visually with a dash mark. */
  @property({type: Boolean, reflect: true}) indeterminate = false;

  /** Disables the checkbox, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Form field name submitted with the form. */
  @property({type: String}) name = '';

  /** Value submitted to the form when checked. */
  @property({type: String}) value = 'on';

  /** Visible label rendered next to the checkbox. Falls back to default slot. */
  @property({type: String}) label = '';

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
        --mu-checkbox-color: var(--mu-primary, #1976d2);
        --mu-checkbox-radius: 3px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
      }
      :host([disabled]) {
        cursor: not-allowed;
        pointer-events: none;
      }
      :host([disabled]) .wrapper {
        opacity: 0.38;
      }
      :host([disabled]) .label-text {
        color: var(--mu-text-disabled, #767676);
      }
      .wrapper {
        display: inline-flex;
        align-items: center;
        outline: none;
        border-radius: 50%;
        padding: 9px;
        margin: -9px;
        transition: background 0.15s;
      }
      .wrapper:focus-visible {
        background: rgba(25, 118, 210, 0.12);
      }
      .box {
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 2px solid var(--mu-text-secondary, #637381);
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transition: background 0.15s, border-color 0.15s;
        flex-shrink: 0;
      }
      .checked .box,
      .indeterminate .box {
        background: var(--mu-primary, #1976d2);
        border-color: var(--mu-primary, #1976d2);
      }
      .box svg {
        fill: none;
        stroke: #fff;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        display: block;
      }
      .label-text {
        font-size: 0.9375rem;
        color: var(--mu-text-primary, #212b36);
        line-height: 1.4;
      }
    `,
  ];

  /**
   * Applies the initial form value after the element connects to the DOM.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._syncFormValue();
  }

  /**
   * Re-syncs the form value when checked or value properties change.
   * @param changedProps Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string | number | symbol, unknown>): void {
    super.updated(changedProps);
    if (changedProps.has('checked') || changedProps.has('value')) {
      this._syncFormValue();
    }
  }

  /**
   * Syncs the current checked/value state to the ElementInternals form value.
   */
  private _syncFormValue(): void {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  /**
   * Toggles the checked state and dispatches a change event.
   */
  private _handleChange(): void {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
  }

  /**
   * Handles keyboard interaction, toggling state on Space key.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === ' ') {
      e.preventDefault();
      this._handleChange();
    }
  }

  override render(): TemplateResult {
    const ariaChecked: 'true' | 'false' | 'mixed' = this.indeterminate
      ? 'mixed'
      : this.checked
      ? 'true'
      : 'false';

    const wrapperClass = [
      'wrapper',
      this.checked && !this.indeterminate ? 'checked' : '',
      this.indeterminate ? 'indeterminate' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <span
        class="${wrapperClass}"
        part="checkbox"
        role="checkbox"
        tabindex="${this.disabled ? -1 : 0}"
        aria-checked="${ariaChecked}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-label="${this.label || nothing}"
        @click="${this._handleChange}"
        @keydown="${this._handleKeyDown}"
      >
        <span
          class="box"
          part="checkmark"
        >
          ${this.checked && !this.indeterminate
            ? html`<svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <polyline points="1.5,6 4.5,9 10.5,3"></polyline>
              </svg>`
            : ''}
          ${this.indeterminate
            ? html`<svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <line
                  x1="2"
                  y1="6"
                  x2="10"
                  y2="6"
                ></line>
              </svg>`
            : ''}
        </span>
      </span>
      ${this.label
        ? html`<span
            class="label-text"
            part="label"
            >${this.label}</span
          >`
        : html`<slot></slot>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-checkbox': MuCheckbox;
  }
}
