import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-tooltip.js';

const meta: Meta = {
  title: 'Overlays/Tooltip',
  component: 'mu-tooltip',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};
export default meta;

type Story = StoryObj;

/** Default tooltip on top of a button. */
export const Default: Story = {
  args: {label: 'This is a tooltip', placement: 'top'},
  render: (args) => html`
    <div style="padding: 80px; display: flex; justify-content: center;">
      <mu-tooltip
        label="${args.label}"
        placement="${args.placement}"
      >
        <button>Hover me</button>
      </mu-tooltip>
    </div>
  `,
};

/** Tooltip positioned below. */
export const Below: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <mu-tooltip
        label="Tooltip below"
        placement="bottom"
      >
        <button>Hover me</button>
      </mu-tooltip>
    </div>
  `,
};

/** Tooltip on the left. */
export const Left: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <mu-tooltip
        label="Tooltip left"
        placement="left"
      >
        <button>Hover me</button>
      </mu-tooltip>
    </div>
  `,
};

/** Tooltip on the right. */
export const Right: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <mu-tooltip
        label="Tooltip right"
        placement="right"
      >
        <button>Hover me</button>
      </mu-tooltip>
    </div>
  `,
};
