import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-app-bar';

const meta: Meta = {
  title: 'Navigation/AppBar',
  component: 'mu-app-bar',
  argTypes: {
    elevation: {control: {type: 'number', min: 0, max: 1}},
    color: {control: 'color'},
    fixed: {control: 'boolean'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {elevation: 1},
  render: (args) => html`
    <mu-app-bar elevation="${args.elevation}">
      <span slot="start">☰</span>
      <span>My Application</span>
      <span slot="end">👤</span>
    </mu-app-bar>
  `,
};

export const CustomColor: StoryObj = {
  render: () => html`
    <mu-app-bar color="#e91e63">
      <span slot="start">☰</span>
      <span>Custom Color</span>
    </mu-app-bar>
  `,
};

export const Flat: StoryObj = {
  render: () => html`
    <mu-app-bar
      elevation="0"
      color="#212b36"
    >
      <span>Flat App Bar</span>
    </mu-app-bar>
  `,
};
