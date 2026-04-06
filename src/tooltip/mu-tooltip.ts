import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/** Allowed placement values for the tooltip. */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip overlay component that reveals a short label near a trigger element.
 * Displays on hover and keyboard focus with a 300 ms delay.
 * Uses the Popover API (popover="manual") for top-layer rendering where supported.
 */
@customElement('mu-tooltip')
export class MuTooltip extends LitElement {
  /** Text content of the tooltip. */
  @property({type: String}) label = '';

  /** Side of the trigger on which the tooltip appears. */
  @property({type: String, reflect: true}) placement: TooltipPlacement = 'top';

  /** Whether the tooltip is currently visible. */
  @state() private _visible = false;

  /** Timer handle for the 300 ms show delay. */
  private _showTimer: number | null = null;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }
      .wrapper {
        display: inline-flex;
        position: relative;
      }
      .tooltip {
        position: absolute;
        z-index: 1500;
        background: var(--mu-text-primary, #212b36);
        color: #fff;
        font-size: 0.75rem;
        line-height: 1.4;
        padding: 4px 8px;
        border-radius: var(--mu-radius-md, 4px);
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mu-duration-shortest, 150ms),
          visibility var(--mu-duration-shortest, 150ms);
      }
      .tooltip.visible {
        opacity: 1;
        visibility: visible;
      }
      /* top */
      :host([placement='top']) .tooltip,
      .tooltip.top {
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }
      /* bottom */
      :host([placement='bottom']) .tooltip,
      .tooltip.bottom {
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }
      /* left */
      :host([placement='left']) .tooltip,
      .tooltip.left {
        right: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }
      /* right */
      :host([placement='right']) .tooltip,
      .tooltip.right {
        left: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ];

  /**
   * Called when the element is removed from the DOM. Clears any pending show timer.
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearShowTimer();
  }

  /**
   * Clears the pending show-delay timer.
   */
  private _clearShowTimer(): void {
    if (this._showTimer !== null) {
      window.clearTimeout(this._showTimer);
      this._showTimer = null;
    }
  }

  /**
   * Schedules showing the tooltip after a 300 ms delay.
   */
  private _show(): void {
    this._clearShowTimer();
    this._showTimer = window.setTimeout((): void => {
      this._visible = true;
    }, 300);
  }

  /**
   * Immediately hides the tooltip and cancels any pending show timer.
   */
  private _hide(): void {
    this._clearShowTimer();
    this._visible = false;
  }

  /**
   * @returns The rendered tooltip template.
   */
  override render(): TemplateResult {
    return html`
      <div
        class="wrapper"
        @mouseenter="${this._show}"
        @mouseleave="${this._hide}"
        @focusin="${this._show}"
        @focusout="${this._hide}"
        aria-describedby="tt"
      >
        <slot></slot>
        <div
          id="tt"
          role="tooltip"
          class="tooltip ${this.placement} ${this._visible ? 'visible' : ''}"
        >
          ${this.label}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-tooltip': MuTooltip;
  }
}
