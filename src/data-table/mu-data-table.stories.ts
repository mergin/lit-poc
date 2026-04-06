import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-data-table.js';

const COLUMNS = [
  {key: 'name', label: 'Name', sortable: true},
  {key: 'role', label: 'Role', sortable: false},
  {key: 'status', label: 'Status', sortable: true},
];

const ROWS = [
  {name: 'Alice Martin', role: 'Engineer', status: 'Active'},
  {name: 'Bob Smith', role: 'Designer', status: 'Inactive'},
  {name: 'Carol Jones', role: 'Manager', status: 'Active'},
  {name: 'Dave Brown', role: 'Engineer', status: 'Active'},
];

interface DataTableArgs {
  selectable: boolean;
  loading: boolean;
  sortKey: string;
  sortDirection: string;
}

const meta: Meta<DataTableArgs> = {
  title: 'Components/DataTable',
  component: 'mu-data-table',
  argTypes: {
    selectable: {control: 'boolean', description: 'Enable row selection'},
    loading: {control: 'boolean', description: 'Show skeleton loading rows'},
    sortKey: {control: 'text', description: 'Currently sorted column key'},
    sortDirection: {
      control: {type: 'select'},
      options: ['asc', 'desc'],
      description: 'Sort direction',
    },
  },
  args: {
    selectable: false,
    loading: false,
    sortKey: '',
    sortDirection: 'asc',
  },
};

export default meta;
type Story = StoryObj<DataTableArgs>;

/** Default data table. */
export const Default: Story = {
  render: () =>
    html`<mu-data-table
      .columns="${COLUMNS}"
      .rows="${ROWS}"
    ></mu-data-table>`,
};

/** Sortable data table. */
export const Sortable: Story = {
  render: () =>
    html`<mu-data-table
      .columns="${COLUMNS}"
      .rows="${ROWS}"
      sortKey="name"
    ></mu-data-table>`,
};

/** Selectable data table. */
export const Selectable: Story = {
  args: {selectable: true},
  render: (args) =>
    html`<mu-data-table
      .columns="${COLUMNS}"
      .rows="${ROWS}"
      ?selectable="${args.selectable}"
    ></mu-data-table>`,
};

/** Loading state with skeleton. */
export const Loading: Story = {
  args: {loading: true},
  render: (args) =>
    html`<mu-data-table
      .columns="${COLUMNS}"
      .rows="${ROWS}"
      ?loading="${args.loading}"
    ></mu-data-table>`,
};

/** Empty state with custom slot content. */
export const EmptyState: Story = {
  render: () =>
    html`<mu-data-table
      .columns="${COLUMNS}"
      .rows="${[]}"
    >
      <span slot="empty-state">No records found. Try adjusting your filters.</span>
    </mu-data-table>`,
};
