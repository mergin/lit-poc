import {describe, it, expect, beforeEach} from 'vitest';
import {MuDataTable} from '../mu-data-table.js';

describe('MuDataTable — unit', () => {
  let el: MuDataTable;

  beforeEach(() => {
    // ARRANGE
    el = new MuDataTable();
  });

  it('should be an instance of MuDataTable', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el).toBeInstanceOf(MuDataTable);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el.columns).toEqual([]);
    expect(el.rows).toEqual([]);
    expect(el.sortKey).toBe('');
    expect(el.sortDirection).toBe('asc');
    expect(el.selectable).toBe(false);
    expect(el.loading).toBe(false);
    expect(el.skeletonRows).toBe(5);
    // CLEANUP — none
  });

  it('should accept columns', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.columns = [{key: 'name', label: 'Name', sortable: true}];
    // ASSERT
    expect(el.columns.length).toBe(1);
    expect(el.columns[0].key).toBe('name');
    // CLEANUP — none
  });

  it('should accept rows', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.rows = [{name: 'Alice', role: 'Engineer'}];
    // ASSERT
    expect(el.rows.length).toBe(1);
    // CLEANUP — none
  });

  it('should accept sortKey and sortDirection', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.sortKey = 'name';
    el.sortDirection = 'desc';
    // ASSERT
    expect(el.sortKey).toBe('name');
    expect(el.sortDirection).toBe('desc');
    // CLEANUP — none
  });

  it('should accept selectable', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.selectable = true;
    // ASSERT
    expect(el.selectable).toBe(true);
    // CLEANUP — none
  });

  it('should accept loading', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.loading = true;
    // ASSERT
    expect(el.loading).toBe(true);
    // CLEANUP — none
  });
});
