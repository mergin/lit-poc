import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles';

/**
 * Card container component. Use slots for header, content, and actions.
 */
@customElement('mu-card')
export class MuCard extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        background: var(--mu-bg-paper);
        border-radius: var(--mu-radius);
        box-shadow: var(--mu-shadow-1);
        padding: var(--mu-spacing);
        margin: var(--mu-spacing) 0;
      }
      .header {
        margin-bottom: var(--mu-spacing);
      }
      .actions {
        margin-top: var(--mu-spacing);
        display: flex;
        gap: var(--mu-spacing);
        justify-content: flex-end;
      }
    `,
  ];

  override render(): TemplateResult<1> {
    return html`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `;
  }
}

/**
 * Card header subcomponent. Use in the header slot of mu-card.
 */
@customElement('mu-card-header')
export class MuCardHeader extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      h2 {
        font-size: var(--mu-h3-size);
        font-weight: var(--mu-font-weight-bold);
        margin: 0;
      }
      .subtitle {
        color: var(--mu-text-secondary);
        font-size: var(--mu-body2-size);
        margin-top: 2px;
      }
    `,
  ];

  /** Title text for the card header. */
  @property({type: String}) override title = '';

  /** Optional subtitle text. */
  @property({type: String}) subtitle = '';

  override render(): TemplateResult {
    return html`
      <h2>${this.title}</h2>
      ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : ''}
    `;
  }
}

/**
 * Card content subcomponent. Use as the default slot of mu-card.
 */
@customElement('mu-card-content')
export class MuCardContent extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        font-size: var(--mu-body1-size);
        color: var(--mu-text-primary);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

/**
 * Card actions subcomponent. Use in the actions slot of mu-card.
 */
@customElement('mu-card-actions')
export class MuCardActions extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        gap: var(--mu-spacing);
        justify-content: flex-end;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
