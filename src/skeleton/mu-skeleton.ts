import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';

/** Supported shape variants for the skeleton placeholder. */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

/** Supported animation types for the skeleton. */
export type SkeletonAnimation = 'pulse' | 'wave' | false;

/**
 * Skeleton placeholder component used to preview content shape before loading.
 * Renders a pulsing or waving animated placeholder with configurable shape and size.
 */
@customElement('mu-skeleton')
export class MuSkeleton extends LitElement {
  /** Shape variant of the skeleton. */
  @property({type: String}) variant: SkeletonVariant = 'text';

  /** Width of the skeleton element (any valid CSS length value). */
  @property({type: String}) width = '';

  /** Height of the skeleton element (any valid CSS length value). */
  @property({type: String}) height = '';

  /** Animation style; set to false to disable animation. */
  @property({type: String}) animation: SkeletonAnimation = 'pulse';

  static override styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 4px;
      display: block;
    }

    .variant-text {
      height: 1.2em;
      width: 100%;
      border-radius: 4px;
      transform-origin: 0 55%;
      transform: scale(1, 0.6);
    }

    .variant-circular {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .variant-rectangular {
      border-radius: 0;
      width: 100%;
      height: 118px;
    }

    .animation-pulse {
      animation: pulse 2s ease-in-out 0.5s infinite;
    }

    .animation-wave::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: wave 2s linear 0.5s infinite;
      transform: translateX(-100%);
    }

    .animation-wave {
      position: relative;
      overflow: hidden;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      60% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  /**
   * Computes inline styles based on width/height overrides.
   * @returns A style object for use with styleMap.
   */
  private _computeStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    if (this.width) styles['width'] = this.width;
    if (this.height) styles['height'] = this.height;
    return styles;
  }

  /**
   * @returns The rendered skeleton template.
   */
  override render(): TemplateResult {
    const animationClass =
      this.animation === 'wave'
        ? 'animation-wave'
        : this.animation === 'pulse'
        ? 'animation-pulse'
        : '';

    return html`
      <span
        class="skeleton variant-${this.variant} ${animationClass}"
        style=${styleMap(this._computeStyles())}
        aria-hidden="true"
        role="presentation"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-skeleton': MuSkeleton;
  }
}
