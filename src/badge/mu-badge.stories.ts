import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-badge';
import '../icon/mu-icon';

const meta: Meta = {
  title: 'Data Display/Badge',
  component: 'mu-badge',
  argTypes: {
    content: {control: 'text'},
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    invisible: {control: 'boolean'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {
    content: '4',
    color: 'primary',
  },
  render: (args) => html`
    <div style="padding: 24px;">
      <mu-badge
        content="${args.content}"
        color="${args.color}"
        ?invisible="${args.invisible}"
      >
        <div style="width: 40px; height: 40px; background: #e0e0e0; border-radius: 4px;"></div>
      </mu-badge>
    </div>
  `,
};

export const DotBadge: StoryObj = {
  args: {
    color: 'error',
  },
  render: (args) => html`
    <div style="padding: 24px;">
      <mu-badge
        color="${args.color}"
        ?invisible="${args.invisible}"
      >
        <mu-icon>notifications</mu-icon>
      </mu-badge>
    </div>
  `,
};
