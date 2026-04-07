import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../../styles/shared-styles.js';

/**
 * Individual breadcrumb item rendered as a list item.
 * Use inside a `mu-breadcrumb` container. Set `current` on the final item.
 */
@customElement('mu-breadcrumb-item')
export class MuBreadcrumbItem extends LitElement {
  /** URL the breadcrumb navigates to. When omitted the item renders as plain text. */
  @property({type: String}) href = '';

  /**
   * When true marks this as the current page (aria-current="page").
   * The item is rendered without a link.
   */
  @property({type: Boolean, reflect: true}) current = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }

      li {
        display: inline-flex;
        align-items: center;
        font-size: var(--mu-body2-size, 0.875rem);
        color: var(--mu-text-secondary, #637381);
      }

      a {
        color: var(--mu-primary, #1976d2);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      a:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
        border-radius: var(--mu-radius-sm, 2px);
      }

      .separator {
        margin: 0 6px;
        color: var(--mu-text-disabled, #919eab);
        user-select: none;
        font-size: 0.8em;
      }

      .current-text {
        color: var(--mu-text-primary, #212b36);
        font-weight: var(--mu-font-weight-medium, 500);
      }
    `,
  ];

  /**
   * @returns The rendered breadcrumb item template.
   */
  override render(): TemplateResult {
    return html`
      <li>
        <span
          class="separator"
          aria-hidden="true"
        >
          /
        </span>
        ${this.current
          ? html`<span
              class="current-text"
              aria-current="page"
              ><slot></slot
            ></span>`
          : html`${this.href
              ? html`<a href="${this.href}"><slot></slot></a>`
              : html`<span><slot></slot></span>`}`}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-breadcrumb-item': MuBreadcrumbItem;
  }
}
