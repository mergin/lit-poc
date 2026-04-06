import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Individual accordion item with an expandable content region.
 * Managed by `mu-accordion`; can also be used standalone.
 * @fires accordion-toggle - Dispatched when the item expands or collapses.
 *                           Detail: `{ expanded: boolean }`.
 * @csspart header - The `<button>` element that acts as the expandable heading.
 * @csspart content - The collapsible content region `div`.
 * @cssproperty --mu-accordion-divider-color - Border colour between items; defaults to `--mu-divider` (#e0e0e0).
 * @cssproperty --mu-accordion-header-color - Text colour of the header; defaults to `--mu-text-primary`.
 * @cssproperty --mu-accordion-content-color - Text colour of the content area; defaults to `--mu-text-secondary`.
 */
@customElement('mu-accordion-item')
export class MuAccordionItem extends LitElement {
  /** Whether the content region is currently expanded. */
  @property({type: Boolean, reflect: true}) expanded = false;

  /** Whether the item is disabled. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Heading text displayed in the header button. */
  @property({type: String}) heading = '';

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-accordion-divider-color: var(--mu-divider, #e0e0e0);
        --mu-accordion-header-color: var(--mu-text-primary, #212b36);
        --mu-accordion-content-color: var(--mu-text-secondary, #637381);
        display: block;
        border-bottom: 1px solid var(--mu-accordion-divider-color);
      }

      :host(:first-of-type) {
        border-top: 1px solid var(--mu-accordion-divider-color);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 16px;
        background: transparent;
        border: none;
        font-family: inherit;
        font-size: var(--mu-body1-size, 1rem);
        font-weight: var(--mu-font-weight-medium, 500);
        color: var(--mu-text-primary, #212b36);
        cursor: pointer;
        text-align: left;
        gap: 8px;
        box-sizing: border-box;
      }

      .header:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: -2px;
      }

      .header:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      .heading-text {
        flex: 1;
        min-width: 0;
      }

      .chevron {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        transition: transform var(--mu-duration-short, 250ms)
          var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host([expanded]) .chevron {
        transform: rotate(180deg);
      }

      .region {
        overflow: hidden;
        max-height: 0;
        transition: max-height var(--mu-duration-short, 250ms)
          var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
      }

      :host([expanded]) .region {
        max-height: 9999px;
      }

      .region-inner {
        padding: 0 16px 16px;
        font-size: var(--mu-body2-size, 0.875rem);
        color: var(--mu-text-secondary, #637381);
      }
    `,
  ];

  /**
   * Handles click on the header button, toggling the expanded state.
   */
  private _handleToggle(): void {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.dispatchEvent(
      new CustomEvent('accordion-toggle', {
        bubbles: true,
        composed: true,
        detail: {expanded: this.expanded},
      })
    );
  }

  /**
   * @returns The rendered accordion item template.
   */
  override render(): TemplateResult {
    const regionId = `region-${this.heading.replace(/\s+/g, '-').toLowerCase()}`;
    const headingId = `heading-${regionId}`;

    return html`
      <button
        class="header"
        part="header"
        aria-expanded="${this.expanded}"
        aria-controls="${regionId}"
        id="${headingId}"
        ?disabled="${this.disabled}"
        @click="${this._handleToggle}"
      >
        <span class="heading-text">
          <slot name="heading">${this.heading}</slot>
        </span>
        <span
          class="chevron"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        class="region"
        part="content"
        id="${regionId}"
        role="region"
        aria-labelledby="${headingId}"
      >
        <div class="region-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-accordion-item': MuAccordionItem;
  }
}
