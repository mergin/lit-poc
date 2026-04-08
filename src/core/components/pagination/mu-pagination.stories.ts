import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-pagination';

const meta: Meta = {
  title: 'Navigation/Pagination',
  component: 'mu-pagination',
  argTypes: {
    count: {control: {type: 'number', min: 1}},
    page: {control: {type: 'number', min: 1}},
    siblingCount: {control: {type: 'number', min: 0}},
    disabled: {control: 'boolean'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {count: 10, page: 1, siblingCount: 1},
  render: (args) =>
    html`<mu-pagination
      count="${args.count}"
      page="${args.page}"
      siblingCount="${args.siblingCount}"
      ?disabled="${args.disabled}"
    ></mu-pagination>`,
};

export const MidPage: StoryObj = {
  args: {count: 20, page: 10, siblingCount: 1},
  render: (args) =>
    html`<mu-pagination
      count="${args.count}"
      page="${args.page}"
    ></mu-pagination>`,
};

export const FewPages: StoryObj = {
  render: () =>
    html`<mu-pagination
      count="5"
      page="3"
    ></mu-pagination>`,
};

export const Disabled: StoryObj = {
  render: () =>
    html`<mu-pagination
      count="10"
      page="3"
      disabled
    ></mu-pagination>`,
};
