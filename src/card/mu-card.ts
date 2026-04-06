import {LitElement, html, css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles';

/**
 * Card container component. Use slots for header, content, and actions.
 * @csspart card - The root layout div wrapping all card sections.
 * @csspart header - The header section containing the `header` named slot.
 * @csspart content - The body section containing the default slot.
 * @csspart actions - The footer section containing the `actions` named slot.
 * @cssproperty --mu-card-radius - Border radius of the card; defaults to `--mu-radius-lg` (8 px).
 * @cssproperty --mu-card-shadow - Box shadow of the card; defaults to `--mu-elevation-1`.
 * @cssproperty --mu-card-padding - Internal padding; defaults to `--mu-spacing`.
 */
@customElement('mu-card')
export class MuCard extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-card-radius: var(--mu-radius-lg, 8px);
        --mu-card-shadow: var(--mu-elevation-1);
        --mu-card-padding: var(--mu-spacing);
        display: block;
        background: var(--mu-bg-paper);
        border-radius: var(--mu-card-radius);
        box-shadow: var(--mu-card-shadow);
        padding: var(--mu-card-padding);
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
      <div part="card">
        <div
          class="header"
          part="header"
        >
          <slot name="header"></slot>
        </div>
        <div
          class="content"
          part="content"
        >
          <slot></slot>
        </div>
        <div
          class="actions"
          part="actions"
        >
          <slot name="actions"></slot>
        </div>
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
