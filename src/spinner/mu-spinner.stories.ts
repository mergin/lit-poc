import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-spinner';

const meta: Meta = {
  title: 'Feedback/Spinner',
  component: 'mu-spinner',
  argTypes: {
    size: {control: 'select', options: ['small', 'medium', 'large']},
    color: {control: 'color'},
    value: {control: 'number'},
    indeterminate: {control: 'boolean'},
  },
};
export default meta;

export const Indeterminate: StoryObj = {
  args: {size: 'medium', indeterminate: true},
  render: (args) =>
    html`<mu-spinner
      size="${args.size}"
      ?indeterminate="${args.indeterminate}"
    ></mu-spinner>`,
};

export const Determinate: StoryObj = {
  args: {size: 'medium', value: 60, indeterminate: false},
  render: (args) =>
    html`<mu-spinner
      size="${args.size}"
      value="${args.value}"
      ?indeterminate="${args.indeterminate}"
    ></mu-spinner>`,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display:flex; gap:24px; align-items:center;">
      <mu-spinner size="small"></mu-spinner>
      <mu-spinner size="medium"></mu-spinner>
      <mu-spinner size="large"></mu-spinner>
    </div>
  `,
};

export const CustomColor: StoryObj = {
  render: () => html`
    <mu-spinner
      size="medium"
      color="#e91e63"
    ></mu-spinner>
  `,
};
