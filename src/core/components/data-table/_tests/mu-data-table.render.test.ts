import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuDataTable} from '../mu-data-table.js';
import '../mu-data-table.js';

const COLUMNS = [
  {key: 'name', label: 'Name', sortable: true},
  {key: 'role', label: 'Role'},
];

const ROWS = [
  {name: 'Alice', role: 'Engineer'},
  {name: 'Bob', role: 'Designer'},
];

describe('MuDataTable — render', () => {
  let el: MuDataTable;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuDataTable>(
      html`<mu-data-table
        .columns="${COLUMNS}"
        .rows="${ROWS}"
      ></mu-data-table>`
    );
  });

  it('renders a table with role="grid"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const table = el.shadowRoot?.querySelector('[role="grid"]');
    // ASSERT
    expect(table).to.exist;
    // CLEANUP — none
  });

  it('renders column headers', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const headers = el.shadowRoot?.querySelectorAll('[role="columnheader"]');
    // ASSERT
    expect(headers?.length).to.equal(2);
    // CLEANUP — none
  });

  it('renders correct number of data rows', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const rows = el.shadowRoot?.querySelectorAll('[role="row"]');
    // ASSERT — 1 header row + 2 data rows = 3
    expect(rows?.length).to.equal(3);
    // CLEANUP — none
  });

  it('renders skeleton rows when loading=true', async () => {
    // ARRANGE
    el = await fixture<MuDataTable>(
      html`<mu-data-table
        .columns="${COLUMNS}"
        .rows="${ROWS}"
        loading
        skeletonRows="3"
      ></mu-data-table>`
    );
    // ACT
    const rows = el.shadowRoot?.querySelectorAll('tbody [role="row"]');
    // ASSERT — 3 skeleton rows
    expect(rows?.length).to.equal(3);
    // CLEANUP — none
  });

  it('renders empty state when rows is empty', async () => {
    // ARRANGE
    el = await fixture<MuDataTable>(
      html`<mu-data-table
        .columns="${COLUMNS}"
        .rows="${[]}"
      ></mu-data-table>`
    );
    // ACT
    const emptyEl = el.shadowRoot?.querySelector('.empty-state');
    // ASSERT
    expect(emptyEl).to.exist;
    // CLEANUP — none
  });

  it('renders selection checkboxes when selectable=true', async () => {
    // ARRANGE
    el = await fixture<MuDataTable>(
      html`<mu-data-table
        .columns="${COLUMNS}"
        .rows="${ROWS}"
        selectable
      ></mu-data-table>`
    );
    // ACT
    const checkboxes = el.shadowRoot?.querySelectorAll('input[type="checkbox"]');
    // ASSERT — 1 "select all" + 2 row checkboxes = 3
    expect(checkboxes?.length).to.equal(3);
    // CLEANUP — none
  });

  it('sortable column header has aria-sort attribute', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const sortableHeader = el.shadowRoot?.querySelector('[aria-sort="none"]');
    // ASSERT
    expect(sortableHeader).to.exist;
    // CLEANUP — none
  });

  it('emits sort-change when sortable header is clicked', async () => {
    // ARRANGE — done in beforeEach
    let sortDetail: {key: string; direction: string} | undefined;
    el.addEventListener('sort-change', (e: Event) => {
      sortDetail = (e as CustomEvent<{key: string; direction: string}>).detail;
    });
    // ACT
    const headers = el.shadowRoot?.querySelectorAll<HTMLElement>('[role="columnheader"]');
    headers?.[0].click();
    // ASSERT
    expect(sortDetail?.key).to.equal('name');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
