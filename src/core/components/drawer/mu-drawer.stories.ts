import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-drawer';

const meta: Meta = {
  title: 'Navigation/Drawer',
  component: 'mu-drawer',
  argTypes: {
    open: {control: 'boolean'},
    placement: {control: 'select', options: ['left', 'right']},
    width: {control: 'text'},
  },
};
export default meta;

export const Left: StoryObj = {
  args: {open: false, placement: 'left', width: '280px'},
  render: (args) => html`
    <button
      @click="${() => {
        const d = document.querySelector<HTMLElement & {open: boolean}>('mu-drawer');
        if (d) d.open = true;
      }}"
    >
      Open Drawer
    </button>
    <mu-drawer
      ?open="${args.open}"
      placement="${args.placement}"
      width="${args.width}"
      @mu-close="${() => {}}"
    >
      <p>Drawer content here.</p>
    </mu-drawer>
  `,
};

export const Right: StoryObj = {
  render: () => html`
    <button
      @click="${() => {
        const d = document.querySelector<HTMLElement & {open: boolean}>(
          'mu-drawer[placement="right"]'
        );
        if (d) d.open = true;
      }}"
    >
      Open Right Drawer
    </button>
    <mu-drawer placement="right">
      <p>Right-side drawer content.</p>
    </mu-drawer>
  `,
};
