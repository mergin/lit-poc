import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles';

/**
 * Minimal/MUI-style button component.
 * Supports 3 sizes, 3 types, and predefined colors.
 * @csspart button - The inner `<button>` element.
 * @cssproperty --mu-button-bg - Background colour; defaults to `--mu-primary`.
 * @cssproperty --mu-button-color - Text colour; defaults to `#fff` for contained variant.
 * @cssproperty --mu-button-radius - Border radius; falls back to `--mu-radius-md` (4 px).
 * @cssproperty --mu-button-padding - Internal block / inline padding; falls back to `--mu-spacing-2` / `--mu-spacing-4`.
 */
@customElement('mu-button')
export class MuButton extends LitElement {
  /** Button size: 'small' | 'medium' | 'large'. */
  @property({type: String}) size: 'small' | 'medium' | 'large' = 'medium';

  /** Button variant: 'contained' | 'outlined' | 'icon'. */
  @property({type: String}) variant: 'contained' | 'outlined' | 'icon' = 'contained';

  /** Predefined color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'. */
  @property({type: String}) color = 'primary';

  /** Disabled state. */
  @property({type: Boolean, reflect: true}) disabled = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-button-radius: var(--mu-radius-md, 4px);
        --mu-button-padding: 0 var(--mu-spacing-4, 16px);
        display: inline-block;
      }
      button {
        font-family: inherit;
        font-weight: var(--mu-font-weight-medium);
        border-radius: var(--mu-button-radius);
        border: none;
        cursor: pointer;
        outline: none;
        transition: background 0.2s, color 0.2s, border 0.2s;
        padding: var(--mu-button-padding);
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
