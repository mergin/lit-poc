import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Radio group container that wraps `mu-radio` elements.
 * Provides `role="radiogroup"` and an accessible group label.
 */
@customElement('mu-radio-group')
export class MuRadioGroup extends LitElement {
  /** Accessible label for the radio group, referenced by aria-labelledby. */
  @property({type: String}) label = '';

  /** Marks the control as required — at least one radio must be selected. */
  @property({type: Boolean, reflect: true}) required = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .group-label {
        font-size: 0.875rem;
        font-weight: var(--mu-font-weight-medium, 500);
        color: var(--mu-text-secondary, #637381);
        margin-bottom: 6px;
        display: block;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      ${this.label
        ? html`<span
            id="group-label"
            class="group-label"
            >${this.label}</span
          >`
        : ''}
      <div
        role="radiogroup"
        aria-labelledby="${this.label ? 'group-label' : ''}"
        aria-required="${this.required ? 'true' : 'false'}"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-radio-group': MuRadioGroup;
  }
}
