import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {sharedStyles} from '../../styles/shared-styles.js';
import '../skeleton/mu-skeleton.js';

/** Definition for a single data table column. */
export interface DataTableColumn {
  /** Unique key matching a key in each row object. */
  key: string;
  /** Column header label. */
  label: string;
  /** When true, the column header is clickable for sorting. */
  sortable?: boolean;
  /** Custom cell render function. */
  renderCell?: (value: unknown, row: Record<string, unknown>) => TemplateResult | string;
}

/** Sort direction type. */
export type SortDirection = 'asc' | 'desc';

/**
 * Data table component with sorting, row selection, and skeleton loading state.
 * Does not support virtualization in v1 — keep row count reasonable (< 1000).
 *
 * @csspart table        - The `<table>` element.
 * @csspart head         - The `<thead>` element.
 * @csspart body         - The `<tbody>` element.
 * @csspart header-cell  - Each `<th>` in the header row.
 * @csspart cell         - Each `<td>` in a data row.
 * @csspart row          - Each `<tr>` in the body.
 * @csspart row--selected - Applied to selected rows.
 *
 * @fires sort-change      - Dispatched when sorting changes. Detail: `{ key: string, direction: SortDirection }`.
 * @fires selection-change - Dispatched when selection changes. Detail: `{ selected: number[] }`.
 */
@customElement('mu-data-table')
export class MuDataTable extends LitElement {
  /** Array of column definitions. */
  @property({type: Array}) columns: DataTableColumn[] = [];

  /** Array of row data objects. */
  @property({type: Array}) rows: Record<string, unknown>[] = [];

  /** Key of the currently sorted column, or empty string for none. */
  @property({type: String}) sortKey = '';

  /** Current sort direction. */
  @property({type: String}) sortDirection: SortDirection = 'asc';

  /** Enables row selection via checkboxes. */
  @property({type: Boolean}) selectable = false;

  /** Shows skeleton loading rows instead of actual data. */
  @property({type: Boolean}) loading = false;

  /** Number of skeleton rows to display when loading. */
  @property({type: Number}) skeletonRows = 5;

  /** Set of currently selected row indices. */
  @state() private _selected: Set<number> = new Set();

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
        part: table;
      }
      thead {
        part: head;
      }
      tbody {
        part: body;
      }
      th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        color: var(--mu-text-secondary, #637381);
        border-bottom: 2px solid var(--mu-divider, #e0e3e7);
        white-space: nowrap;
        part: header-cell;
      }
      th[aria-sort] {
        cursor: pointer;
        user-select: none;
      }
      th[aria-sort]:hover {
        color: var(--mu-text-primary, #212b36);
      }
      .sort-icon {
        display: inline-block;
        margin-left: 4px;
        font-size: 0.7em;
        vertical-align: middle;
      }
      td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--mu-divider, #e0e3e7);
        color: var(--mu-text-primary, #212b36);
        part: cell;
      }
      tr {
        part: row;
      }
      tr.selected {
        background: var(--mu-action-selected, rgba(25, 118, 210, 0.08));
        part: row row--selected;
      }
      tr:hover td {
        background: var(--mu-action-hover, rgba(145, 158, 171, 0.04));
      }
      .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: var(--mu-text-secondary, #637381);
      }
      .checkbox-cell {
        width: 48px;
        text-align: center;
      }
    `,
  ];

  /**
   * Handles a sort click on a column header.
   * @param key - The column key clicked.
   */
  private _handleSort(key: string): void {
    const newDirection: SortDirection =
      this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortKey = key;
    this.sortDirection = newDirection;
    this.dispatchEvent(
      new CustomEvent<{key: string; direction: SortDirection}>('sort-change', {
        bubbles: true,
        composed: true,
        detail: {key, direction: newDirection},
      })
    );
  }

  /**
   * Toggles selection for a specific row.
   * @param index - The index of the row to toggle.
   */
  private _toggleRow(index: number): void {
    const next = new Set(this._selected);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this._selected = next;
    this.dispatchEvent(
      new CustomEvent<{selected: number[]}>('selection-change', {
        bubbles: true,
        composed: true,
        detail: {selected: [...this._selected]},
      })
    );
  }

  /**
   * Toggles selection for all rows (select all / deselect all).
   */
  private _toggleAll(): void {
    if (this._selected.size === this.rows.length) {
      this._selected = new Set();
    } else {
      this._selected = new Set(this.rows.map((_: Record<string, unknown>, i): number => i));
    }
    this.dispatchEvent(
      new CustomEvent<{selected: number[]}>('selection-change', {
        bubbles: true,
        composed: true,
        detail: {selected: [...this._selected]},
      })
    );
  }

  /**
   * Returns the aria-sort value for a given column key.
   * @param key - The column key.
   * @returns 'ascending' | 'descending' | 'none'
   */
  private _ariaSortFor(key: string): 'ascending' | 'descending' | 'none' {
    if (this.sortKey !== key) return 'none';
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  /**
   * Renders a row of skeleton loading cells.
   * @param colCount - The number of cells to render in the skeleton row.
   * @returns A TemplateResult for one skeleton table row.
   */
  private _renderSkeletonRow(colCount: number): TemplateResult {
    return html`
      <tr role="row">
        ${Array.from(
          {length: colCount},
          (): TemplateResult => html`<td part="cell"><mu-skeleton width="80%"></mu-skeleton></td>`
        )}
      </tr>
    `;
  }

  override render(): TemplateResult {
    const colCount = this.columns.length + (this.selectable ? 1 : 0);
    const allSelected = this.rows.length > 0 && this._selected.size === this.rows.length;

    return html`
      <table
        part="table"
        role="grid"
        aria-rowcount="${this.rows.length}"
      >
        <thead part="head">
          <tr role="row">
            ${this.selectable
              ? html`
                  <th
                    class="checkbox-cell"
                    part="header-cell"
                    role="columnheader"
                  >
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      .checked="${allSelected}"
                      @change="${this._toggleAll}"
                    />
                  </th>
                `
              : ''}
            ${this.columns.map((col): TemplateResult => {
              const ariaSort = col.sortable ? this._ariaSortFor(col.key) : 'none';
              return html`
                <th
                  part="header-cell"
                  role="columnheader"
                  aria-sort="${ariaSort}"
                  @click="${col.sortable
                    ? (): void => {
                        this._handleSort(col.key);
                      }
                    : null}"
                >
                  ${col.label}
                  ${col.sortable
                    ? html`<span
                        class="sort-icon"
                        aria-hidden="true"
                      >
                        ${this.sortKey === col.key
                          ? this.sortDirection === 'asc'
                            ? '▲'
                            : '▼'
                          : '⇅'}
                      </span>`
                    : ''}
                </th>
              `;
            })}
          </tr>
        </thead>
        <tbody part="body">
          ${this.loading
            ? Array.from(
                {length: this.skeletonRows},
                (): TemplateResult => this._renderSkeletonRow(colCount)
              )
            : this.rows.length === 0
            ? html`
                <tr role="row">
                  <td
                    colspan="${colCount}"
                    class="empty-state"
                    role="gridcell"
                  >
                    <slot name="empty-state">No data available.</slot>
                  </td>
                </tr>
              `
            : repeat(
                this.rows,
                (_: Record<string, unknown>, i): number => i,
                (row, i): TemplateResult => html`
                  <tr
                    class="${this._selected.has(i) ? 'selected' : ''}"
                    part="row"
                    role="row"
                    aria-rowindex="${i + 1}"
                    aria-selected="${this.selectable
                      ? this._selected.has(i)
                        ? 'true'
                        : 'false'
                      : 'false'}"
                  >
                    ${this.selectable
                      ? html`
                          <td
                            class="checkbox-cell"
                            part="cell"
                            role="gridcell"
                          >
                            <input
                              type="checkbox"
                              aria-label="Select row ${i + 1}"
                              .checked="${this._selected.has(i)}"
                              @change="${(): void => {
                                this._toggleRow(i);
                              }}"
                            />
                          </td>
                        `
                      : ''}
                    ${this.columns.map(
                      (col): TemplateResult => html`
                        <td
                          part="cell"
                          role="gridcell"
                        >
                          ${col.renderCell
                            ? col.renderCell(row[col.key], row)
                            : String(row[col.key] ?? '')}
                        </td>
                      `
                    )}
                  </tr>
                `
              )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-data-table': MuDataTable;
  }
}
