import {LitElement, html, css, type PropertyValues, type TemplateResult} from 'lit';
import {customElement, property, queryAssignedElements} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';
import type {MuStep} from './mu-step.js';
import './mu-step.js';

/**
 * Step-by-step progress indicator component.
 * Accepts `mu-step` elements as children to define each step.
 *
 * @csspart connector - The line connecting two adjacent steps.
 *
 * @fires step-change - Dispatched when the active step changes.
 *   Detail: `{ from: number, to: number }`.
 */
@customElement('mu-stepper')
export class MuStepper extends LitElement {
  /** Index (0-based) of the currently active step. */
  @property({type: Number, reflect: true}) activeStep = 0;

  /** Layout orientation of the stepper. */
  @property({type: String, reflect: true}) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** When true, steps can only be activated in sequence. */
  @property({type: Boolean}) linear = true;

  /** All `mu-step` children assigned to the default slot. */
  @queryAssignedElements({selector: 'mu-step'})
  private readonly _steps!: MuStep[];

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      :host([orientation='horizontal']) .stepper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      }
      :host([orientation='vertical']) .stepper {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .step-wrapper {
        display: contents;
      }
      .connector {
        flex: 1;
        height: 2px;
        background: var(--mu-text-disabled, #919eab);
        margin-top: 15px;
        part: connector;
      }
      :host([orientation='vertical']) .connector {
        width: 2px;
        height: 24px;
        margin: 0 0 0 15px;
        flex: unset;
      }
    `,
  ];

  /**
   * Navigates to the given step index if allowed.
   * @param toIndex - The 0-based target step index.
   */
  goTo(toIndex: number): void {
    const steps = this._steps;
    if (!steps?.length) return;
    if (toIndex < 0 || toIndex >= steps.length) return;
    if (this.linear && toIndex > this.activeStep + 1) return;

    const from = this.activeStep;
    this.activeStep = toIndex;
    this._syncStepStates();
    this.dispatchEvent(
      new CustomEvent<{from: number; to: number}>('step-change', {
        bubbles: true,
        composed: true,
        detail: {from, to: toIndex},
      })
    );
  }

  /** Advances to the next step. */
  next(): void {
    this.goTo(this.activeStep + 1);
  }

  /** Returns to the previous step. */
  back(): void {
    this.goTo(this.activeStep - 1);
  }

  /**
   * Updates the `state` and `index` properties of all child `mu-step` elements
   * to reflect the current `activeStep`.
   */
  private _syncStepStates(): void {
    this._steps?.forEach((step, i): void => {
      step.index = i + 1;
      if (i < this.activeStep) {
        step.state = 'completed';
      } else if (i === this.activeStep) {
        step.state = 'active';
      } else {
        step.state = 'disabled';
      }
    });
  }

  /**
   * Handles slot change to sync step states on initial render.
   */
  private _handleSlotChange(): void {
    this._syncStepStates();
  }

  /**
   * Called once after the first render; ensures steps are synced even if
   * the slotchange event fired before the decorator query was ready.
   * @param _changedProps - Map of changed properties.
   */
  override firstUpdated(_changedProps: PropertyValues): void {
    super.firstUpdated(_changedProps);
    this._syncStepStates();
  }

  override render(): TemplateResult {
    const hasConnector = (index: number): boolean => {
      return index < (this._steps?.length ?? 0) - 1;
    };

    return html`
      <div
        class="stepper"
        role="group"
        aria-label="Steps"
      >
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${this._steps?.map((_, i): TemplateResult | string =>
          hasConnector(i)
            ? html`<div
                class="connector"
                part="connector"
                aria-hidden="true"
              ></div>`
            : ''
        ) ?? ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-stepper': MuStepper;
  }
}
