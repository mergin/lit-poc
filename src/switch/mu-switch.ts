import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Toggle switch form component that participates in native HTML forms.
 * Supports checked, disabled states and full keyboard accessibility.
 * @fires change - Dispatched when the switch is toggled.
 */
@customElement('mu-switch')
export class MuSwitch extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Whether the switch is in the on/checked state. */
  @property({type: Boolean, reflect: true}) checked = false;

  /** Disables the switch, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Form field name submitted with the form. */
  @property({type: String}) name = '';

  /** Value submitted to the form when the switch is on. */
  @property({type: String}) value = 'on';

  /** Visible label rendered next to the switch. Falls back to default slot. */
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
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
      }
      :host([disabled]) {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }
      .track {
        position: relative;
        width: 52px;
        height: 28px;
        border-radius: 14px;
        background: var(--mu-text-disabled, #919eab);
        transition: background 0.2s;
        box-sizing: border-box;
        outline: none;
        flex-shrink: 0;
      }
      .track:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
      }
      :host([checked]) .track {
        background: var(--mu-primary, #1976d2);
      }
      .thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
        pointer-events: none;
      }
      :host([checked]) .thumb {
        transform: translateX(24px);
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
   * Toggles the switch state and dispatches a change event.
   */
  private _handleToggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
  }

  /**
   * Handles keyboard events: Space and Enter toggle the switch.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleToggle();
    }
  }

  override render(): TemplateResult {
    return html`
      <span
        class="track"
        role="switch"
        tabindex="${this.disabled ? -1 : 0}"
        aria-checked="${this.checked ? 'true' : 'false'}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        @click="${this._handleToggle}"
        @keydown="${this._handleKeyDown}"
      >
        <span class="thumb"></span>
      </span>
      ${this.label ? html`<span class="label-text">${this.label}</span>` : html`<slot></slot>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-switch': MuSwitch;
  }
}
