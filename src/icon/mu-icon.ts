// mu-icon.ts
// Icon component (Material Icons)

import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles';

/**
 * Material Icon wrapper component.
 * Supports size and color props.
 */
@customElement('mu-icon')
export class MuIcon extends LitElement {
  /** Icon name (Material Icons font ligature). */
  @property({type: String}) name = '';

  /** Icon size: 'small' | 'medium' | 'large' | number (px). */
  @property({type: String}) size: 'small' | 'medium' | 'large' | string = 'medium';

  /** Predefined color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'. */
  @property({type: String}) color: string = 'primary';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      .material-icons {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        user-select: none;
        color: var(--mu-primary, #1976d2);
      }
      :host([size='small']) .material-icons {
        font-size: 20px;
      }
      :host([size='large']) .material-icons {
        font-size: 32px;
      }
      :host([color='secondary']) .material-icons {
        color: var(--mu-secondary, #9c27b0);
      }
      :host([color='info']) .material-icons {
        color: var(--mu-info, #0288d1);
      }
      :host([color='success']) .material-icons {
        color: var(--mu-success, #2e7d32);
      }
      :host([color='warning']) .material-icons {
        color: var(--mu-warning, #ed6c02);
      }
      :host([color='error']) .material-icons {
        color: var(--mu-error, #d32f2f);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <span
        class="material-icons"
        part="icon"
        aria-hidden="true"
      >
        <slot>${this.name}</slot>
      </span>
    `;
  }
}
