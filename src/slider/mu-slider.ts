import {LitElement, html, css, type TemplateResult, type PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Range slider form element that participates in native HTML forms.
 * Supports keyboard navigation, pointer drag, and full accessibility.
 *
 * @csspart track - The background track element.
 * @csspart fill  - The filled portion of the track representing the current value.
 * @csspart thumb - The draggable circular handle.
 *
 * @fires change - Dispatched when the value changes. Detail: `{ value: number }`.
 */
@customElement('mu-slider')
export class MuSlider extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Current numeric value of the slider. */
  @property({type: Number, reflect: true}) value = 0;

  /** Minimum allowed value. */
  @property({type: Number}) min = 0;

  /** Maximum allowed value. */
  @property({type: Number}) max = 100;

  /** Step increment for keyboard and pointer movement. */
  @property({type: Number}) step = 1;

  /** Disables the slider, making it non-interactive. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Accessible label text for the slider. */
  @property({type: String}) label = '';

  /** Form field name submitted with the form. */
  @property({type: String}) name = '';

  /** Creates a MuSlider instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        padding: 12px 0;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
      }
      :host([disabled]) {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }
      .label-text {
        display: block;
        font-size: 0.875rem;
        color: var(--mu-text-secondary, #637381);
        margin-bottom: 8px;
      }
      .track-wrapper {
        position: relative;
        height: 20px;
        display: flex;
        align-items: center;
      }
      .track {
        position: absolute;
        inset: 0;
        margin: auto 0;
        height: 4px;
        border-radius: 2px;
        background: var(--mu-text-disabled, #919eab);
        part: track;
      }
      .fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        border-radius: 2px;
        background: var(--mu-primary, #1976d2);
        pointer-events: none;
        part: fill;
      }
      .thumb {
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--mu-primary, #1976d2);
        border: 2px solid #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%);
        outline: none;
        box-sizing: border-box;
        part: thumb;
      }
      .thumb:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 3px;
      }
    `,
  ];

  /**
   * Syncs form value and thumb position after relevant property changes.
   * @param changedProps - Map of changed properties.
   */
  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (
      changedProps.has('value') ||
      changedProps.has('min') ||
      changedProps.has('max') ||
      changedProps.has('name')
    ) {
      this._internals.setFormValue(String(this.value));
    }
  }

  /**
   * Returns the proportion (0–1) of the current value within the range.
   * @returns A number between 0 and 1 inclusive.
   */
  private _getFraction(): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return Math.max(0, Math.min(1, (this.value - this.min) / range));
  }

  /**
   * Clamps and steps a raw value to the nearest valid increment.
   * @param raw - The raw candidate value.
   * @returns The clamped and stepped value.
   */
  private _snap(raw: number): number {
    const stepped = Math.round((raw - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, stepped));
  }

  /**
   * Sets the slider value, emits a change event, and syncs the form value.
   * @param newValue - The new numeric value to set.
   */
  private _setValue(newValue: number): void {
    const snapped = this._snap(newValue);
    if (snapped === this.value) return;
    this.value = snapped;
    this._internals.setFormValue(String(this.value));
    this.dispatchEvent(
      new CustomEvent<{value: number}>('change', {
        bubbles: true,
        composed: true,
        detail: {value: this.value},
      })
    );
  }

  /**
   * Handles keydown events for accessible keyboard control.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;
    const range = this.max - this.min;
    const pageStep = Math.max(this.step, range * 0.1);
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        this._setValue(this.value + this.step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        this._setValue(this.value - this.step);
        break;
      case 'Home':
        e.preventDefault();
        this._setValue(this.min);
        break;
      case 'End':
        e.preventDefault();
        this._setValue(this.max);
        break;
      case 'PageUp':
        e.preventDefault();
        this._setValue(this.value + pageStep);
        break;
      case 'PageDown':
        e.preventDefault();
        this._setValue(this.value - pageStep);
        break;
      default:
        break;
    }
  }

  /**
   * Handles pointerdown on the track wrapper to begin dragging.
   * @param e - The pointer event.
   */
  private _handlePointerDown(e: PointerEvent): void {
    if (this.disabled) return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    this._updateFromPointer(e);
  }

  /**
   * Handles pointermove to update value while dragging.
   * @param e - The pointer event.
   */
  private _handlePointerMove(e: PointerEvent): void {
    if (this.disabled || !e.buttons) return;
    this._updateFromPointer(e);
  }

  /**
   * Calculates and sets the value from the pointer position relative to the track.
   * @param e - The pointer event.
   */
  private _updateFromPointer(e: PointerEvent): void {
    const wrapper = this.shadowRoot?.querySelector<HTMLElement>('.track-wrapper');
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._setValue(this.min + fraction * (this.max - this.min));
  }

  override render(): TemplateResult {
    const fraction = this._getFraction();
    const fillPercent = `${fraction * 100}%`;
    const thumbLeft = `calc(${fraction * 100}% - 0px)`;

    return html`
      ${this.label ? html`<span class="label-text">${this.label}</span>` : ''}
      <div
        class="track-wrapper"
        @pointerdown="${this._handlePointerDown}"
        @pointermove="${this._handlePointerMove}"
      >
        <div
          class="track"
          part="track"
        ></div>
        <div
          class="fill"
          part="fill"
          style="width: ${fillPercent}"
        ></div>
        <div
          class="thumb"
          part="thumb"
          role="slider"
          tabindex="${this.disabled ? '-1' : '0'}"
          aria-label="${this.label || 'slider'}"
          aria-valuemin="${this.min}"
          aria-valuemax="${this.max}"
          aria-valuenow="${this.value}"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
          style="left: ${thumbLeft}"
          @keydown="${this._handleKeyDown}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-slider': MuSlider;
  }
}
