import {LitElement, html, css, nothing, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/**
 * Radio button form component that participates in native HTML forms.
 * Use inside a `mu-radio-group` for proper grouping and roving tabindex.
 * @fires change - Dispatched when this radio becomes selected.
 */
@customElement('mu-radio')
export class MuRadio extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Whether this radio button is selected. */
  @property({type: Boolean, reflect: true}) checked = false;

  /** Disables the radio button, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Form field name used to group radio buttons. */
  @property({type: String}) name = '';

  /** Value submitted to the form when this radio is selected. */
  @property({type: String}) value = '';

  /** Visible label rendered next to the radio button. Falls back to default slot. */
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
        cursor: not-allowed;
        pointer-events: none;
      }
      :host([disabled]) .ripple {
        opacity: 0.38;
      }
      :host([disabled]) .label-text {
        color: var(--mu-text-disabled, #767676);
      }
      .ripple {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 9px;
        margin: -9px;
        outline: none;
        transition: background 0.15s;
      }
      .ripple:focus-visible {
        background: rgba(25, 118, 210, 0.12);
      }
      .outer {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid var(--mu-text-secondary, #637381);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.15s;
        flex-shrink: 0;
      }
      :host([checked]) .outer {
        border-color: var(--mu-primary, #1976d2);
      }
      .inner {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--mu-primary, #1976d2);
        transform: scale(0);
        transition: transform 0.15s;
      }
      :host([checked]) .inner {
        transform: scale(1);
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
    if (this.checked) {
      this._internals.setFormValue(this.value);
    }
  }

  /**
   * Re-syncs the form value when checked or value properties change.
   * @param changedProps Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string | number | symbol, unknown>): void {
    super.updated(changedProps);
    if (changedProps.has('checked') || changedProps.has('value')) {
      if (this.checked) {
        this._internals.setFormValue(this.value);
      }
    }
  }

  /**
   * Selects this radio, deselects siblings with the same name, and dispatches change.
   */
  private _select(): void {
    if (this.disabled || this.checked) return;
    this._deselectSiblings();
    this.checked = true;
    this._internals.setFormValue(this.value);
    this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
  }

  /**
   * Deselects all sibling mu-radio elements that share the same name in the same form.
   */
  private _deselectSiblings(): void {
    const form = this._internals.form;
    const siblings = form
      ? (Array.from(form.querySelectorAll('mu-radio')) as MuRadio[])
      : (Array.from(
          this.closest('mu-radio-group')?.querySelectorAll('mu-radio') ?? []
        ) as MuRadio[]);
    siblings
      .filter((r: MuRadio): boolean => r !== this && r.name === this.name)
      .forEach((r: MuRadio): void => {
        r.checked = false;
      });
  }

  /**
   * Handles keyboard navigation within the radio group (arrow keys, Space).
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._select();
      return;
    }

    if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      const group = this.closest('mu-radio-group');
      const radios = group
        ? (Array.from(group.querySelectorAll('mu-radio:not([disabled])')) as MuRadio[])
        : [];
      if (radios.length < 2) return;
      const idx = radios.indexOf(this);
      const next =
        e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? radios[(idx + 1) % radios.length]
          : radios[(idx - 1 + radios.length) % radios.length];
      next._select();
      next.focus();
    }
  }

  /**
   * Focuses the host element's inner ripple span.
   */
  override focus(): void {
    this.shadowRoot?.querySelector<HTMLElement>('.ripple')?.focus();
  }

  override render(): TemplateResult {
    return html`
      <span
        class="ripple"
        role="radio"
        tabindex="${this.checked || !this.disabled ? 0 : -1}"
        aria-checked="${this.checked ? 'true' : 'false'}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-label="${this.label || nothing}"
        @click="${this._select}"
        @keydown="${this._handleKeyDown}"
      >
        <span class="outer">
          <span class="inner"></span>
        </span>
      </span>
      ${this.label ? html`<span class="label-text">${this.label}</span>` : html`<slot></slot>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-radio': MuRadio;
  }
}
