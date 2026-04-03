import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-list';
import './mu-list-item';
import '../divider/mu-divider';

const meta: Meta = {
  title: 'Data Display/List',
  component: 'mu-list',
  argTypes: {
    dense: {control: 'boolean'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {
    dense: false,
  },
  render: (args) => html`
    <div style="border: 1px solid #ccc; max-width: 360px;">
      <mu-list ?dense="${args.dense}">
        <mu-list-item>Single-line item</mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item>Another single-line item</mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item disabled>Disabled item</mu-list-item>
      </mu-list>
    </div>
  `,
};
