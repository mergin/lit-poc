import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles';

/**
 * Minimal/MUI-style button component.
 * Supports 3 sizes, 3 types, and predefined colors.
 */
@customElement('mu-button')
export class MuButton extends LitElement {
  /** Button size: 'small' | 'medium' | 'large'. */
  @property({type: String}) size: 'small' | 'medium' | 'large';

  /** Button variant: 'contained' | 'outlined' | 'icon'. */
  @property({type: String}) variant: 'contained' | 'outlined' | 'icon';

  /** Predefined color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'. */
  @property({type: String}) color: string;

  /** Disabled state. */
  @property({type: Boolean, reflect: true}) disabled: boolean;
  constructor() {
    super();
    this.size = 'medium';
    this.variant = 'contained';
    this.color = 'primary';
    this.disabled = false;
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
      }
      button {
        font-family: inherit;
        font-weight: var(--mu-font-weight-medium);
        border-radius: var(--mu-radius);
        border: none;
        cursor: pointer;
        outline: none;
        transition: background 0.2s, color 0.2s, border 0.2s;
        padding: 0 16px;
        min-width: 64px;
        height: 40px;
        font-size: 1rem;
        background: var(--mu-primary, #1976d2);
        color: #fff;
      }
      :host([size='small']) button {
        height: 32px;
        font-size: 0.875rem;
      }
      :host([size='large']) button {
        height: 48px;
        font-size: 1.125rem;
      }
      :host([variant='outlined']) button {
        background: transparent;
        color: var(--mu-primary, #1976d2);
        border: 1.5px solid var(--mu-primary, #1976d2);
      }
      :host([variant='icon']) button {
        padding: 0;
        min-width: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        color: var(--mu-primary, #1976d2);
        border: none;
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <button
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
}
