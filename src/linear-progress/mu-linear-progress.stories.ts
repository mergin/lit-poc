import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-linear-progress';

const meta: Meta = {
  title: 'Feedback/LinearProgress',
  component: 'mu-linear-progress',
  argTypes: {
    value: {control: {type: 'range', min: 0, max: 100}},
    color: {control: 'color'},
    indeterminate: {control: 'boolean'},
  },
};
export default meta;

export const Determinate: StoryObj = {
  args: {value: 40, indeterminate: false},
  render: (args) =>
    html`<mu-linear-progress
      value="${args.value}"
      ?indeterminate="${args.indeterminate}"
    ></mu-linear-progress>`,
};

export const Indeterminate: StoryObj = {
  args: {indeterminate: true},
  render: (args) =>
    html`<mu-linear-progress ?indeterminate="${args.indeterminate}"></mu-linear-progress>`,
};

export const CustomColor: StoryObj = {
  render: () => html`
    <mu-linear-progress
      value="70"
      color="#e91e63"
    ></mu-linear-progress>
  `,
};
