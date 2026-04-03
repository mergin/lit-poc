import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js'; // Using .js for TS module resolution, though shared-styles is .ts. Wait, other files didn't use .js

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

/**
 * A typography component that ensures semantic HTML tags and consistent styling.
 */
@customElement('mu-typography')
export class MuTypography extends LitElement {
  /** The typography variant which determines the semantic HTML tag and visual style. */
  @property({type: String, reflect: true}) variant: TypographyVariant = 'body1';

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      :host([variant='caption']),
      :host([variant='overline']) {
        display: inline-block;
      }
      p.body1 {
        font-size: var(--mu-body1-size);
        margin: 0 0 var(--mu-spacing) 0;
      }
      p.body2 {
        font-size: var(--mu-body2-size);
        margin: 0 0 var(--mu-spacing) 0;
      }
      span.caption {
        font-size: var(--mu-caption-size);
        color: var(--mu-text-secondary);
      }
      span.overline {
        font-size: var(--mu-overline-size);
        text-transform: uppercase;
        color: var(--mu-text-secondary);
        letter-spacing: 0.05em;
        font-weight: var(--mu-font-weight-medium);
      }
      /* Remove margins from last child to prevent compounding spacing with containers */
      h1:last-child,
      h2:last-child,
      h3:last-child,
      h4:last-child,
      h5:last-child,
      h6:last-child,
      p:last-child {
        margin-bottom: 0;
      }
    `,
  ];

  override render(): TemplateResult {
    switch (this.variant) {
      case 'h1':
        return html`<h1><slot></slot></h1>`;
      case 'h2':
        return html`<h2><slot></slot></h2>`;
      case 'h3':
        return html`<h3><slot></slot></h3>`;
      case 'h4':
        return html`<h4><slot></slot></h4>`;
      case 'h5':
        return html`<h5><slot></slot></h5>`;
      case 'h6':
        return html`<h6><slot></slot></h6>`;
      case 'body2':
        return html`<p class="body2"><slot></slot></p>`;
      case 'caption':
        return html`<span class="caption"><slot></slot></span>`;
      case 'overline':
        return html`<span class="overline"><slot></slot></span>`;
      case 'body1':
      default:
        return html`<p class="body1"><slot></slot></p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-typography': MuTypography;
  }
}
