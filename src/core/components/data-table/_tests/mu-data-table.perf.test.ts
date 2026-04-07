import {describe, bench} from 'vitest';
import {MuDataTable} from '../mu-data-table.js';

const BIG_ROWS = Array.from({length: 100}, (_, i) => ({
  name: `User ${i}`,
  role: 'Engineer',
  status: 'Active',
}));

const COLUMNS = [
  {key: 'name', label: 'Name', sortable: true},
  {key: 'role', label: 'Role'},
  {key: 'status', label: 'Status'},
];

describe('MuDataTable — perf', () => {
  bench('instantiation', () => {
    new MuDataTable();
  });

  bench('property write — rows (100 items)', () => {
    const el = new MuDataTable();
    el.rows = BIG_ROWS;
  });

  bench('property write — columns', () => {
    const el = new MuDataTable();
    el.columns = COLUMNS;
  });

  bench('property write — sortKey', () => {
    const el = new MuDataTable();
    el.sortKey = 'name';
  });

  bench('property write — loading', () => {
    const el = new MuDataTable();
    el.loading = true;
  });
});
