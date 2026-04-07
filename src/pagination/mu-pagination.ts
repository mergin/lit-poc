import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Pagination component for navigating through pages of content.
 * Emits a `page-change` event when a page button or prev/next is clicked.
 * @fires page-change - Detail: `{ page: number }`.
 */
@customElement('mu-pagination')
export class MuPagination extends LitElement {
  /** Total number of pages. */
  @property({type: Number}) count = 1;

  /** Currently active page (1-based). */
  @property({type: Number}) page = 1;

  /** Number of sibling pages shown on each side of the current page. */
  @property({type: Number}) siblingCount = 1;

  /** Whether to disable all navigation controls. */
  @property({type: Boolean, reflect: true}) disabled = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      nav {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        flex-wrap: wrap;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        height: 36px;
        padding: 0 6px;
        border: 1px solid var(--mu-divider, #e0e0e0);
        border-radius: var(--mu-radius, 8px);
        background: transparent;
        font-family: inherit;
        font-size: var(--mu-body2-size, 0.875rem);
        cursor: pointer;
        color: var(--mu-text-primary, #212b36);
        transition: background-color 150ms, color 150ms;
      }

      button:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.04);
      }

      button:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
      }

      button[aria-current='page'],
      button.active {
        background-color: var(--mu-primary, #1976d2);
        border-color: var(--mu-primary, #1976d2);
        color: #fff;
      }

      button:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }

      .ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        height: 36px;
        color: var(--mu-text-disabled, #919eab);
        font-size: var(--mu-body2-size, 0.875rem);
      }
    `,
  ];

  /**
   * Computes the list of page items to render, including ellipsis markers.
   * @returns Array of page numbers or 'ellipsis' strings.
   */
  private _buildPages(): Array<number | 'ellipsis'> {
    const {count, page, siblingCount} = this;
    const BOUNDARY = 1;

    const range = (start: number, end: number): number[] =>
      Array.from({length: end - start + 1}, (_, i): number => i + start);

    const totalMiddle = siblingCount * 2 + 1;
    const totalPage = totalMiddle + BOUNDARY * 2 + 2;

    if (count <= totalPage) {
      return range(1, count);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, BOUNDARY + 1);
    const rightSiblingIndex = Math.min(page + siblingCount, count - BOUNDARY);

    const showLeft = leftSiblingIndex > BOUNDARY + 2;
    const showRight = rightSiblingIndex < count - BOUNDARY - 1;

    const pages: Array<number | 'ellipsis'> = [];
    pages.push(...range(1, BOUNDARY));

    if (showLeft) {
      pages.push('ellipsis');
    } else {
      pages.push(...range(BOUNDARY + 1, leftSiblingIndex - 1));
    }

    pages.push(...range(leftSiblingIndex, rightSiblingIndex));

    if (showRight) {
      pages.push('ellipsis');
    } else {
      pages.push(...range(rightSiblingIndex + 1, count - BOUNDARY));
    }

    pages.push(...range(count - BOUNDARY + 1, count));

    return pages;
  }

  /**
   * Navigates to a given page number and emits `page-change`.
   * @param p - Target page number (1-based).
   */
  private _navigate(p: number): void {
    if (this.disabled || p < 1 || p > this.count || p === this.page) return;
    this.page = p;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        bubbles: true,
        composed: true,
        detail: {page: p},
      })
    );
  }

  /**
   * @returns The rendered pagination template.
   */
  override render(): TemplateResult {
    const pages = this._buildPages();
    let ellipsisCount = 0;

    return html`
      <nav aria-label="Pagination">
        <button
          aria-label="Previous page"
          ?disabled="${this.disabled || this.page <= 1}"
          @click="${(): void => this._navigate(this.page - 1)}"
        >
          ‹
        </button>

        ${pages.map((p): TemplateResult => {
          if (p === 'ellipsis') {
            ellipsisCount++;
            return html`<span
              class="ellipsis"
              aria-hidden="true"
              key="ellipsis-${ellipsisCount}"
            >
              …
            </span>`;
          }
          const isActive = p === this.page;
          return html`
            <button
              class="${isActive ? 'active' : ''}"
              aria-label="Page ${p}"
              aria-current="${ifDefined(isActive ? 'page' : undefined)}"
              ?disabled="${this.disabled}"
              @click="${(): void => this._navigate(p)}"
            >
              ${p}
            </button>
          `;
        })}

        <button
          aria-label="Next page"
          ?disabled="${this.disabled || this.page >= this.count}"
          @click="${(): void => this._navigate(this.page + 1)}"
        >
          ›
        </button>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-pagination': MuPagination;
  }
}
