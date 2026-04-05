import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, queryAssignedElements} from 'lit/decorators.js';
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

  @queryAssignedElements({slot: 'tab'})
  private _tabs!: NodeListOf<MuTab>;

  @queryAssignedElements({slot: 'panel'})
  private _panels!: NodeListOf<MuTabPanel>;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
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

      .tab-content {
        display: block;
      }
    `,
  ];

  /**
   * Registers the tab-select event listener on the host.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('tab-select', this._handleTabSelect);
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
      <div
        class="tab-list"
        role="tablist"
        @keydown="${this._handleKeyDown}"
      >
        <slot
          name="tab"
          @slotchange="${this._handleSlotChange}"
        ></slot>
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
