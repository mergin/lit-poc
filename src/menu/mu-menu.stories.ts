import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-menu.js';
import './mu-menu-item.js';

interface MenuArgs {
  placement: string;
}

const meta: Meta<MenuArgs> = {
  title: 'Components/Menu',
  component: 'mu-menu',
  argTypes: {
    placement: {
      control: {type: 'select'},
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Placement of the dropdown',
    },
  },
  args: {
    placement: 'bottom-start',
  },
};

export default meta;
type Story = StoryObj<MenuArgs>;

/** Default menu triggered by a button. */
export const Default: Story = {
  render: (args) => html`
    <mu-menu placement="${args.placement}">
      <button slot="trigger">Open menu</button>
      <mu-menu-item label="Edit"></mu-menu-item>
      <mu-menu-item label="Duplicate"></mu-menu-item>
      <mu-menu-item label="Archive"></mu-menu-item>
      <mu-menu-item label="Delete"></mu-menu-item>
    </mu-menu>
  `,
};

/** Menu with one disabled item. */
export const WithDisabledItem: Story = {
  render: (args) => html`
    <mu-menu placement="${args.placement}">
      <button slot="trigger">Open menu</button>
      <mu-menu-item label="Edit"></mu-menu-item>
      <mu-menu-item
        label="Duplicate"
        disabled
      ></mu-menu-item>
      <mu-menu-item label="Delete"></mu-menu-item>
    </mu-menu>
  `,
};

/** Menu positioned at the top-start. */
export const TopPlacement: Story = {
  args: {placement: 'top-start'},
  render: (args) => html`
    <div style="padding-top: 120px;">
      <mu-menu placement="${args.placement}">
        <button slot="trigger">Open menu (top)</button>
        <mu-menu-item label="Option A"></mu-menu-item>
        <mu-menu-item label="Option B"></mu-menu-item>
        <mu-menu-item label="Option C"></mu-menu-item>
      </mu-menu>
    </div>
  `,
};
