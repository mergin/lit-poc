import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../../internal/utils/shared-styles.js';

/**
 * Minimal/MUI-style avatar component.
 * Can display an image or initials, supports size and color.
 */
@customElement('mu-avatar')
export class MuAvatar extends LitElement {
  /** Avatar image URL (optional). */
  @property({type: String}) src: string | null = null;

  /** Alt text for the image (for accessibility). */
  @property({type: String}) alt = '';

  /** Fallback initials if no image. */
  @property({type: String}) initials = '';

  /** Avatar size: 'small' | 'medium' | 'large'. */
  @property({type: String}) size: 'small' | 'medium' | 'large' = 'medium';

  /** Predefined color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'. */
  @property({type: String}) color = 'primary';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
        background: var(--mu-primary, #1976d2);
        color: #fff;
        font-weight: var(--mu-font-weight-medium);
        user-select: none;
        transition: background 0.2s;
      }
      :host([size='small']) {
        width: 32px;
        height: 32px;
        font-size: 1rem;
      }
      :host([size='medium']) {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }
      :host([size='large']) {
        width: 56px;
        height: 56px;
        font-size: 1.5rem;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        display: block;
      }
    `,
  ];

  override render(): TemplateResult {
    return this.src
      ? html`<img
          src="${this.src}"
          alt="${this.alt}"
        />`
      : html`<span>${this.initials}</span>`;
  }
}
