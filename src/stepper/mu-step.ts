import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/** Valid visual states for a stepper step. */
export type MuStepState = 'active' | 'completed' | 'error' | 'disabled';

/**
 * Individual step used inside `mu-stepper`.
 * Displays a step indicator with a label and optional content slot.
 *
 * @csspart indicator - The circular step indicator.
 * @csspart label     - The step label text.
 * @csspart content   - The slot container for step content.
 */
@customElement('mu-step')
export class MuStep extends LitElement {
  /** Descriptive label shown next to the indicator. */
  @property({type: String}) label = '';

  /** Visual and semantic state of the step. */
  @property({type: String, reflect: true}) state: MuStepState = 'disabled';

  /** 1-based index assigned by the parent stepper. */
  @property({type: Number}) index = 0;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        position: relative;
      }
      :host([state='active']) .indicator {
        background: var(--mu-primary, #1976d2);
        color: #fff;
        border-color: var(--mu-primary, #1976d2);
      }
      :host([state='completed']) .indicator {
        background: var(--mu-success, #2e7d32);
        color: #fff;
        border-color: var(--mu-success, #2e7d32);
      }
      :host([state='error']) .indicator {
        background: var(--mu-error, #d32f2f);
        color: #fff;
        border-color: var(--mu-error, #d32f2f);
      }
      :host([state='disabled']) .indicator {
        background: #fff;
        color: var(--mu-text-disabled, #919eab);
        border-color: var(--mu-text-disabled, #919eab);
      }
      .step-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--mu-text-disabled, #919eab);
        font-size: 0.875rem;
        font-weight: 600;
        box-sizing: border-box;
        outline: none;
        part: indicator;
      }
      .indicator:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 3px;
      }
      .label {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--mu-text-primary, #212b36);
        text-align: center;
        part: label;
      }
      .content {
        width: 100%;
        padding: 8px 0;
        part: content;
      }
    `,
  ];

  /**
   * Returns the indicator text based on the step state.
   * @returns '✓' for completed, '✕' for error, or the step index as a string.
   */
  private _indicatorText(): string {
    switch (this.state) {
      case 'completed':
        return '✓';
      case 'error':
        return '✕';
      default:
        return String(this.index);
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="step-header">
        <div
          class="indicator"
          part="indicator"
          role="button"
          tabindex="${this.state !== 'disabled' ? '0' : '-1'}"
          aria-label="Step ${this.index}: ${this.label}"
          aria-current="${this.state === 'active' ? 'step' : 'false'}"
          aria-disabled="${this.state === 'disabled' ? 'true' : 'false'}"
        >
          <slot name="icon">${this._indicatorText()}</slot>
        </div>
        <span
          class="label"
          part="label"
          >${this.label}</span
        >
      </div>
      <div
        class="content"
        part="content"
        ?hidden="${this.state !== 'active'}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-step': MuStep;
  }
}
