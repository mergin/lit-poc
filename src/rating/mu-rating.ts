import {LitElement, html, css, type TemplateResult, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Star rating form component.
 * Supports half-star precision, read-only mode, and full keyboard navigation.
 *
 * @csspart star         - Each individual star wrapper span.
 * @csspart star--filled - Applied to fully filled stars.
 * @csspart star--empty  - Applied to empty stars.
 * @csspart star--partial- Applied to partial/half stars.
 *
 * @fires change - Dispatched when the rating value changes. Detail: `{ value: number }`.
 */
@customElement('mu-rating')
export class MuRating extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Current rating value. */
  @property({type: Number, reflect: true}) value = 0;

  /** Maximum number of stars to display. */
  @property({type: Number}) max = 5;

  /** Precision of allowed values. Use 1 for whole stars, 0.5 for half stars. */
  @property({type: Number}) precision = 1;

  /** When true, the rating is display-only and cannot be changed. */
  @property({type: Boolean, reflect: true}) readonly = false;

  /** Disables the rating control. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Accessible label for the radiogroup. */
  @property({type: String}) label = 'Rating';

  /** Form field name. */
  @property({type: String}) name = '';

  /** Hovered value for preview display. */
  @state() private _hoverValue = -1;

  /** Creates a MuRating instance and registers it with the form. */
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
        gap: 2px;
        cursor: pointer;
        user-select: none;
      }
      :host([disabled]),
      :host([readonly]) {
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) {
        opacity: 0.38;
      }
      .star {
        font-size: 1.5rem;
        line-height: 1;
        color: var(--mu-text-disabled, #919eab);
        transition: color 0.15s;
        outline: none;
        cursor: inherit;
        part: star;
      }
      .star:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
        border-radius: var(--mu-radius-sm, 2px);
      }
      .star.filled {
        color: var(--mu-warning, #ffc107);
        part: star star--filled;
      }
      .star.partial {
        color: var(--mu-warning, #ffc107);
        part: star star--partial;
      }
      .star.empty {
        part: star star--empty;
      }
    `,
  ];

  /**
   * Syncs form value when relevant properties change.
   * @param changedProps - Map of changed properties.
   */
  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('value') || changedProps.has('name')) {
      this._internals.setFormValue(String(this.value));
    }
  }

  /**
   * Returns the fill state for the star at position `starIndex`.
   * @param starIndex - 1-based index of the star.
   * @param displayValue - The value to use for display (hover or actual).
   * @returns 'filled' | 'partial' | 'empty'
   */
  private _getFill(starIndex: number, displayValue: number): 'filled' | 'partial' | 'empty' {
    if (displayValue >= starIndex) return 'filled';
    if (displayValue >= starIndex - 0.5 && this.precision <= 0.5) return 'partial';
    return 'empty';
  }

  /**
   * Computes the snapped rating value for a given star index based on precision.
   * @param starIndex - 1-based star index.
   * @returns The snapped value.
   */
  private _getStarValue(starIndex: number): number {
    return Math.round(starIndex / this.precision) * this.precision;
  }

  /**
   * Sets the rating value, syncs form value, and emits change event.
   * @param newValue - The new rating value.
   */
  private _setValue(newValue: number): void {
    const clamped = Math.max(0, Math.min(this.max, newValue));
    if (clamped === this.value) return;
    this.value = clamped;
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
   * Handles keyboard navigation on a star.
   * @param e - The keyboard event.
   * @param starIndex - 1-based star index.
   */
  private _handleKeyDown(e: KeyboardEvent, starIndex: number): void {
    if (this.readonly || this.disabled) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        this._setValue(Math.min(this.max, this.value + this.precision));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        this._setValue(Math.max(0, this.value - this.precision));
        break;
      case 'Home':
        e.preventDefault();
        this._setValue(0);
        break;
      case 'End':
        e.preventDefault();
        this._setValue(this.max);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._setValue(this._getStarValue(starIndex));
        break;
      default:
        break;
    }
  }

  /**
   * Handles click on a star to set its value.
   * @param starIndex - 1-based star index.
   */
  private _handleClick(starIndex: number): void {
    if (this.readonly || this.disabled) return;
    this._setValue(this._getStarValue(starIndex));
  }

  /**
   * Updates hover value when pointer moves over a star.
   * @param starIndex - 1-based star index.
   */
  private _handleMouseEnter(starIndex: number): void {
    if (this.readonly || this.disabled) return;
    this._hoverValue = this._getStarValue(starIndex);
  }

  /** Resets hover value when pointer leaves the component. */
  private _handleMouseLeave(): void {
    this._hoverValue = -1;
  }

  override render(): TemplateResult {
    const displayValue = this._hoverValue >= 0 ? this._hoverValue : this.value;
    const stars = Array.from({length: this.max}, (_: unknown, i: number): number => i + 1);

    return html`
      <span
        role="radiogroup"
        aria-label="${this.label}"
        @mouseleave="${this._handleMouseLeave}"
      >
        ${repeat(
          stars,
          (s): number => s,
          (starIndex): TemplateResult => {
            const fill = this._getFill(starIndex, displayValue);
            return html`
              <span
                class="star ${fill}"
                part="star"
                role="radio"
                tabindex="${starIndex === Math.max(1, Math.round(this.value)) && !this.disabled
                  ? '0'
                  : '-1'}"
                aria-label="${starIndex} star${starIndex > 1 ? 's' : ''}"
                aria-checked="${this.value >= starIndex ? 'true' : 'false'}"
                @click="${(): void => {
                  this._handleClick(starIndex);
                }}"
                @keydown="${(e: KeyboardEvent): void => {
                  this._handleKeyDown(e, starIndex);
                }}"
                @mouseenter="${(): void => {
                  this._handleMouseEnter(starIndex);
                }}"
                >${fill === 'partial' ? '½' : fill === 'filled' ? '★' : '☆'}</span
              >
            `;
          }
        )}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-rating': MuRating;
  }
}
