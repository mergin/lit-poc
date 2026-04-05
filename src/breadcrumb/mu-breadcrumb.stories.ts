import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-breadcrumb';
import './mu-breadcrumb-item';

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  component: 'mu-breadcrumb',
};
export default meta;

export const Default: StoryObj = {
  render: () => html`
    <mu-breadcrumb>
      <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
      <mu-breadcrumb-item href="/components">Components</mu-breadcrumb-item>
      <mu-breadcrumb-item current>Breadcrumb</mu-breadcrumb-item>
    </mu-breadcrumb>
  `,
};

export const TwoLevels: StoryObj = {
  render: () => html`
    <mu-breadcrumb>
      <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
      <mu-breadcrumb-item current>About</mu-breadcrumb-item>
    </mu-breadcrumb>
  `,
};
