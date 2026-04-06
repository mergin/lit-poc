import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Linear progress bar component.
 * Supports determinate (value-based) and indeterminate (animated) modes.
 * @fires mu-complete - Dispatched when value reaches 100 in determinate mode.
 */
@customElement('mu-linear-progress')
export class MuLinearProgress extends LitElement {
  /**
   * Progress value from 0 to 100.
   * Ignored when `indeterminate` is true.
   */
  @property({type: Number}) value = 0;

  /** Stroke/fill color of the progress bar. Accepts any valid CSS color. */
  @property({type: String}) color = 'var(--mu-primary, #1976d2)';

  /** When true the bar animates indefinitely instead of showing a fixed value. */
  @property({type: Boolean}) indeterminate = false;

  static override styles = css`
    :host {
      display: block;
      overflow: hidden;
      height: 4px;
      border-radius: 2px;
      background-color: rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-radius: inherit;
      transition: width 0.3s ease;
    }

    .bar-indeterminate-1 {
      animation: indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .bar-indeterminate-2 {
      animation: indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    }

    @keyframes indeterminate1 {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate2 {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }
  `;

  /**
   * @returns The rendered linear progress template.
   */
  override render(): TemplateResult {
    const clampedValue = Math.min(100, Math.max(0, this.value));

    return html`
      ${this.indeterminate
        ? html`
            <div
              class="bar bar-indeterminate-1"
              style="background-color: ${this.color};"
            ></div>
            <div
              class="bar bar-indeterminate-2"
              style="background-color: ${this.color};"
            ></div>
          `
        : html`
            <div
              class="bar"
              style="width: ${clampedValue}%; background-color: ${this.color};"
            ></div>
          `}
    `;
  }

  /** Applies the ARIA role attribute when the element is connected to the DOM. */
  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'progressbar');
    }
    this._syncAriaAttributes();
  }

  /**
   * Syncs ARIA attributes and fires mu-complete when progress reaches 100.
   * @param changedProps - Map of changed property names to their previous values.
   */
  override updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);
    this._syncAriaAttributes();
    if (!this.indeterminate && changedProps.has('value') && this.value >= 100) {
      this.dispatchEvent(new CustomEvent('mu-complete', {bubbles: true, composed: true}));
    }
  }

  /**
   * Syncs aria-valuenow to reflect current progress in determinate mode.
   */
  private _syncAriaAttributes(): void {
    if (this.indeterminate) {
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuemin');
      this.removeAttribute('aria-valuemax');
    } else {
      this.setAttribute('aria-valuemin', '0');
      this.setAttribute('aria-valuemax', '100');
      this.setAttribute('aria-valuenow', String(Math.min(100, Math.max(0, this.value))));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-linear-progress': MuLinearProgress;
  }
}
