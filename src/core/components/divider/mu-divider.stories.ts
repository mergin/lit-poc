import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-divider';

const meta: Meta = {
  title: 'Data Display/Divider',
  component: 'mu-divider',
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};
export default meta;

export const Horizontal: StoryObj = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => html`
    <div style="width: 300px; border: 1px solid #ccc; padding: 16px;">
      <p>Above divider</p>
      <mu-divider orientation="${args.orientation}"></mu-divider>
      <p>Below divider</p>
    </div>
  `,
};

export const Vertical: StoryObj = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => html`
    <div
      style="height: 100px; display: flex; align-items: center; justify-content: space-evenly; border: 1px solid #ccc; width: 300px;"
    >
      <span>Left</span>
      <mu-divider orientation="${args.orientation}"></mu-divider>
      <span>Right</span>
    </div>
  `,
};
