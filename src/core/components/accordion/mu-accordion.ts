import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MuAccordionItem} from './mu-accordion-item.js';

/**
 * Accordion container that optionally enforces single-panel expansion.
 *
 * Slotted children must be `mu-accordion-item` elements.
 */
@customElement('mu-accordion')
export class MuAccordion extends LitElement {
  /**
   * When true, multiple items may be expanded simultaneously.
   * When false (default), expanding one item collapses all others.
   */
  @property({type: Boolean}) allowMultiple = false;

  static override styles = css`
    :host {
      display: block;
    }
  `;

  /**
   * Registers the accordion-toggle event listener on the host.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('accordion-toggle', this._handleToggle);
  }

  /**
   * Removes the accordion-toggle event listener from the host.
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('accordion-toggle', this._handleToggle);
  }

  /**
   * Listens for accordion-toggle events from child items.
   * When allowMultiple is false it collapses all other items.
   * @param e - The accordion-toggle event.
   */
  private _handleToggle(e: Event): void {
    if (this.allowMultiple) return;

    const source = e.composedPath()[0] as MuAccordionItem;
    const {expanded} = (e as CustomEvent<{expanded: boolean}>).detail;

    if (!expanded) return;

    const items = Array.from(this.querySelectorAll<MuAccordionItem>('mu-accordion-item'));
    items.forEach((item): void => {
      if (item !== source && item.expanded) {
        item.expanded = false;
      }
    });
  }

  /**
   * @returns The rendered accordion template.
   */
  override render(): TemplateResult {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-accordion': MuAccordion;
  }
}
