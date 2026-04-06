import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, query, queryAssignedElements, state} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';
import {MuTab} from './mu-tab.js';
import type {MuTabPanel} from './mu-tab-panel.js';
import './mu-tab.js';
import './mu-tab-panel.js';

/**
 * Tabs container that manages selection and keyboard navigation across
 * slotted `mu-tab` and `mu-tab-panel` children.
 * @fires tab-change - Dispatched when the selected tab index changes.
 *                     Detail: `{ index: number }`.
 */
@customElement('mu-tabs')
export class MuTabs extends LitElement {
  /** Zero-based index of the currently selected tab. */
  @property({type: Number}) selectedIndex = 0;

  /**
   * Layout orientation of the tab list.
   * `vertical` places the tab list beside the panels in a row layout.
   */
  @property({type: String, reflect: true}) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Enables horizontal scroll overflow on the tab list and shows
   * scroll-indicator chevron buttons at each end when overflow is present.
   */
  @property({type: Boolean, reflect: true}) scrollable = false;

  @queryAssignedElements({slot: 'tab'})
  private _tabs!: NodeListOf<MuTab>;

  @queryAssignedElements({slot: 'panel'})
  private _panels!: NodeListOf<MuTabPanel>;

  @query('.tab-list') private _tabListEl?: HTMLDivElement;

  /** Whether the tab list can scroll toward the beginning. */
  @state() private _canScrollBack = false;
  /** Whether the tab list can scroll toward the end. */
  @state() private _canScrollForward = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      :host([orientation='vertical']) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      }

      .tab-list-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      :host([orientation='vertical']) .tab-list-wrapper {
        flex-direction: column;
        align-self: stretch;
      }

      .tab-list {
        display: flex;
        border-bottom: 1px solid var(--mu-divider, #e0e0e0);
        overflow-x: auto;
        scrollbar-width: none;
      }

      .tab-list::-webkit-scrollbar {
        display: none;
      }

      :host([orientation='vertical']) .tab-list {
        flex-direction: column;
        border-bottom: none;
        border-right: 1px solid var(--mu-divider, #e0e0e0);
        overflow-x: hidden;
        overflow-y: auto;
        min-width: max-content;
      }

      :host([scrollable]) .tab-list {
        overflow-x: auto;
        white-space: nowrap;
        flex-wrap: nowrap;
      }

      .scroll-btn {
        display: none;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        background: var(--mu-bg-paper, #fff);
        border: none;
        width: 28px;
        height: 28px;
        cursor: pointer;
        color: var(--mu-text-secondary, #637381);
        border-radius: 50%;
        z-index: 1;
      }

      :host([scrollable]) .scroll-btn {
        display: flex;
      }

      .scroll-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .tab-content {
        display: block;
        flex: 1;
      }
    `,
  ];

  /**
   * Registers the tab-select event listener on the host.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('tab-select', this._handleTabSelect);
    if (this.scrollable) {
      this.updateComplete.then((): void => {
        this._updateScrollState();
      });
    }
  }

  /**
   * Removes the tab-select event listener from the host.
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('tab-select', this._handleTabSelect);
  }

  /**
   * Syncs selected state on all tabs and panels after each update.
   * @param changedProps - Map of changed property names to old values.
   */
  override updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has('selectedIndex')) {
      this._syncSelection();
    }
  }

  /**
   * Updates aria attributes and visibility for tabs and panels.
   */
  private _syncSelection(): void {
    const tabs = Array.from(this._tabs ?? this.querySelectorAll<MuTab>('mu-tab'));
    const panels = Array.from(this._panels ?? this.querySelectorAll<MuTabPanel>('mu-tab-panel'));

    tabs.forEach((tab, i): void => {
      const panelId = `mu-panel-${i}`;
      const tabId = `mu-tab-${i}`;
      tab.id = tabId;
      tab.controls = panelId;
      tab.selected = i === this.selectedIndex;
    });

    panels.forEach((panel, i): void => {
      const tabId = `mu-tab-${i}`;
      panel.id = `mu-panel-${i}`;
      panel.labelledby = tabId;
      panel.active = i === this.selectedIndex;
    });
  }

  /**
   * Updates the scroll-indicator state after each render.
   */
  private _updateScrollState(): void {
    const el = this._tabListEl;
    if (!el) return;
    this._canScrollBack = el.scrollLeft > 0;
    this._canScrollForward = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }

  /**
   * Scrolls the tab list toward the beginning.
   */
  private _scrollBack(): void {
    this._tabListEl?.scrollBy({left: -120, behavior: 'smooth'});
  }

  /**
   * Scrolls the tab list toward the end.
   */
  private _scrollForward(): void {
    this._tabListEl?.scrollBy({left: 120, behavior: 'smooth'});
  }

  /**
   * Handles scroll events on the tab list to refresh indicator visibility.
   */
  private _handleTabListScroll(): void {
    this._updateScrollState();
  }

  /**
   * Handles slotchange to wire up IDs and selection on first render.
   */
  private _handleSlotChange(): void {
    this._syncSelection();
  }

  /**
   * Handles tab-select custom events bubbled from child mu-tab elements.
   * @param e - The tab-select event from a mu-tab.
   */
  private _handleTabSelect(e: Event): void {
    const path = e.composedPath();
    const source = path.find((el): el is MuTab => el instanceof MuTab);
    if (!source) return;
    const tabs = Array.from(this._tabs ?? this.querySelectorAll<MuTab>('mu-tab'));
    const index = tabs.indexOf(source);
    if (index !== -1 && index !== this.selectedIndex) {
      this.selectedIndex = index;
      this._syncSelection();
      this.dispatchEvent(
        new CustomEvent('tab-change', {
          bubbles: true,
          composed: true,
          detail: {index},
        })
      );
    }
  }

  /**
   * Handles keyboard arrow navigation within the tab list.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    const tabs = Array.from(this._tabs ?? this.querySelectorAll<MuTab>('mu-tab')).filter(
      (t): boolean => !t.disabled
    );
    if (!tabs.length) return;

    const currentIndex = tabs.findIndex((t): boolean => t.selected);
    let next = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    tabs[next].dispatchEvent(new CustomEvent('tab-select', {bubbles: true, composed: true}));
    (tabs[next].shadowRoot?.querySelector('button') as HTMLElement | null)?.focus();
  }

  /**
   * @returns The rendered tabs template.
   */
  override render(): TemplateResult {
    return html`
      <div class="tab-list-wrapper">
        <button
          class="scroll-btn scroll-start"
          aria-label="Scroll tabs back"
          ?disabled="${!this._canScrollBack}"
          @click="${this._scrollBack}"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M10 4L6 8l4 4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div
          class="tab-list"
          role="tablist"
          aria-orientation="${this.orientation}"
          @keydown="${this._handleKeyDown}"
          @scroll="${this._handleTabListScroll}"
        >
          <slot
            name="tab"
            @slotchange="${this._handleSlotChange}"
          ></slot>
        </div>
        <button
          class="scroll-btn scroll-end"
          aria-label="Scroll tabs forward"
          ?disabled="${!this._canScrollForward}"
          @click="${this._scrollForward}"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M6 4l4 4-4 4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="tab-content">
        <slot
          name="panel"
          @slotchange="${this._handleSlotChange}"
        ></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-tabs': MuTabs;
  }
}
