import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

/** Spinner size variants. */
export type SpinnerSize = 'small' | 'medium' | 'large';

/** Map from size name to pixel dimension. */
const SIZE_MAP: Record<SpinnerSize, number> = {small: 24, medium: 40, large: 56};

/**
 * Circular progress indicator rendered as an SVG.
 * Supports both indeterminate (spinning) and determinate (percentage) modes.
 */
@customElement('mu-spinner')
export class MuSpinner extends LitElement {
  /** Named size of the spinner. */
  @property({type: String}) size: SpinnerSize = 'medium';

  /** Stroke color of the spinning arc. Accepts any valid CSS color value. */
  @property({type: String}) color = 'var(--mu-primary, #1976d2)';

  /**
   * Progress value 0–100 for determinate mode.
   * When set to a number the spinner renders a static filled arc;
   * otherwise it spins indefinitely.
   */
  @property({type: Number}) value: number | undefined = undefined;

  /** Whether to spin indefinitely regardless of `value`. */
  @property({type: Boolean}) indeterminate = true;

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .track {
      fill: none;
      stroke: rgba(0, 0, 0, 0.1);
    }

    .arc {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .spinning {
      transform-origin: center;
      animation: rotate 1.4s linear infinite;
    }

    .spinning .arc {
      animation: dash 1.4s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -15;
      }
      100% {
        stroke-dasharray: 100, 200;
        stroke-dashoffset: -124;
      }
    }
  `;

  /** @returns Whether the spinner is in indeterminate spinning mode. */
  private get _isIndeterminate(): boolean {
    return this.indeterminate || this.value === undefined;
  }

  /**
   * Computes stroke-dasharray and stroke-dashoffset for a determinate value.
   * @returns Style string for the arc element.
   */
  private _determinateStyle(): string {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const pct = Math.min(100, Math.max(0, this.value ?? 0));
    const offset = circumference - (pct / 100) * circumference;
    return `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};`;
  }

  /**
   * @returns The rendered spinner SVG template.
   */
  override render(): TemplateResult {
    const px = SIZE_MAP[this.size] ?? SIZE_MAP.medium;
    const strokeWidth = this.size === 'small' ? 3 : 3.6;
    const isSpinning = this._isIndeterminate;

    return html`
      <svg
        width="${px}"
        height="${px}"
        viewBox="0 0 44 44"
        class="${isSpinning ? 'spinning' : ''}"
        role="progressbar"
        aria-valuemin="${ifDefined(isSpinning ? undefined : 0)}"
        aria-valuemax="${ifDefined(isSpinning ? undefined : 100)}"
        aria-valuenow="${ifDefined(isSpinning ? undefined : this.value)}"
        aria-label="Loading"
      >
        <circle
          class="track"
          cx="22"
          cy="22"
          r="18"
          stroke-width="${strokeWidth}"
        ></circle>
        <circle
          class="arc"
          cx="22"
          cy="22"
          r="18"
          stroke="${this.color}"
          stroke-width="${strokeWidth}"
          style="${isSpinning
            ? 'stroke-dasharray: 80, 200; stroke-dashoffset: -10;'
            : this._determinateStyle()}"
        ></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-spinner': MuSpinner;
  }
}
