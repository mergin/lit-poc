import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';
import type {MuMenuItem} from './mu-menu-item.js';
import './mu-menu-item.js';

/**
 * Dropdown menu component with keyboard navigation and accessible focus management.
 * Place `mu-menu-item` elements in the default slot.
 * Use the `trigger` slot for the element that opens the menu.
 *
 * @csspart menu    - The outer container of the floating list.
 * @csspart list    - The `ul` element holding menu items.
 *
 * @fires mu-open   - Dispatched when the menu opens.
 * @fires mu-close  - Dispatched when the menu closes.
 */
@customElement('mu-menu')
export class MuMenu extends LitElement {
  /** Controls the open/close state of the menu. */
  @property({type: Boolean, reflect: true}) open = false;

  /** Preferred placement of the menu relative to the trigger. */
  @property({type: String}) placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' =
    'bottom-start';

  /** Index of the currently focused menu item (roving focus). */
  @state() private _activeIndex = -1;

  static override styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      .trigger-wrapper {
        display: contents;
      }
      .menu {
        position: fixed;
        z-index: 1000;
        min-width: 160px;
        background: var(--mu-paper, #fff);
        border-radius: var(--mu-radius-lg, 8px);
        box-shadow: var(
          --mu-elevation-3,
          0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23)
        );
        padding: 4px 0;
        box-sizing: border-box;
        outline: none;
        part: menu;
      }
      .list {
        list-style: none;
        margin: 0;
        padding: 0;
        part: list;
      }
      .menu[hidden] {
        display: none;
      }
    `,
  ];

  /**
   * Opens the menu, positions it, and moves focus to the first item.
   */
  private _openMenu(): void {
    if (this.open) return;
    this.open = true;
    this.dispatchEvent(new CustomEvent('mu-open', {bubbles: true, composed: true}));
    this.updateComplete.then((): void => {
      this._positionMenu();
      this._focusItem(0);
    });
  }

  /**
   * Closes the menu and restores focus to the trigger element.
   */
  private _closeMenu(): void {
    if (!this.open) return;
    this.open = false;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('mu-close', {bubbles: true, composed: true}));
    const trigger = this.shadowRoot
      ?.querySelector<HTMLSlotElement>('slot[name="trigger"]')
      ?.assignedElements()[0] as HTMLElement | undefined;
    trigger?.focus();
  }

  /**
   * Positions the menu relative to the trigger using getBoundingClientRect.
   */
  private _positionMenu(): void {
    const triggerSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]');
    const triggerEl = triggerSlot?.assignedElements()[0] as HTMLElement | undefined;
    const menu = this.shadowRoot?.querySelector<HTMLElement>('.menu');
    if (!triggerEl || !menu) return;
    const rect = triggerEl.getBoundingClientRect();
    if (this.placement.startsWith('top')) {
      menu.style.bottom = `${window.innerHeight - rect.top}px`;
      menu.style.top = 'auto';
    } else {
      menu.style.top = `${rect.bottom}px`;
      menu.style.bottom = 'auto';
    }
    if (this.placement.endsWith('end')) {
      menu.style.right = `${window.innerWidth - rect.right}px`;
      menu.style.left = 'auto';
    } else {
      menu.style.left = `${rect.left}px`;
      menu.style.right = 'auto';
    }
  }

  /**
   * Returns all non-disabled menu items inside the default slot.
   * @returns Array of `MuMenuItem` elements.
   */
  private _getItems(): MuMenuItem[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
    return (slot?.assignedElements() ?? []).filter(
      (el): el is MuMenuItem =>
        el.tagName.toLowerCase() === 'mu-menu-item' && !(el as MuMenuItem).disabled
    );
  }

  /**
   * Focuses the item at the given index.
   * @param index - The index of the item to focus.
   */
  private _focusItem(index: number): void {
    const items = this._getItems();
    if (!items.length) return;
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    this._activeIndex = clamped;
    (items[clamped].shadowRoot?.querySelector('button') as HTMLElement | null)?.focus();
  }

  /**
   * Handles keydown for keyboard navigation.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    const items = this._getItems();
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this._closeMenu();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._focusItem(this._activeIndex < items.length - 1 ? this._activeIndex + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusItem(this._activeIndex > 0 ? this._activeIndex - 1 : items.length - 1);
        break;
      case 'Home':
        e.preventDefault();
        this._focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        this._focusItem(items.length - 1);
        break;
      default:
        break;
    }
  }

  /**
   * Handles clicks outside the component to auto-close the menu.
   * @param e - The mouse event.
   */
  private _handleOutsideClick = (e: MouseEvent): void => {
    if (!this.contains(e.target as Node)) {
      this._closeMenu();
    }
  };

  /** Registers the outside-click listener when the element is connected to the DOM. */
  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick, true);
  }

  /** Removes the outside-click listener when the element is disconnected from the DOM. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick, true);
  }

  /**
   * Handles selection events bubbling from mu-menu-item.
   */
  private _handleSelect(): void {
    this._closeMenu();
  }

  /**
   * Handles click on the trigger slot to toggle the menu.
   */
  private _handleTriggerClick(): void {
    if (this.open) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  override render(): TemplateResult {
    return html`
      <div
        class="trigger-wrapper"
        @click="${this._handleTriggerClick}"
      >
        <slot name="trigger"></slot>
      </div>
      <div
        class="menu"
        part="menu"
        role="menu"
        ?hidden="${!this.open}"
        @keydown="${this._handleKeyDown}"
        @mu-select="${this._handleSelect}"
      >
        <ul
          class="list"
          part="list"
        >
          <slot></slot>
        </ul>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-menu': MuMenu;
  }
}
