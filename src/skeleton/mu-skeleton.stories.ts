import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton',
  component: 'mu-skeleton',
  argTypes: {
    variant: {control: 'select', options: ['text', 'circular', 'rectangular']},
    animation: {control: 'select', options: ['pulse', 'wave', false]},
    width: {control: 'text'},
    height: {control: 'text'},
  },
};
export default meta;

export const Text: StoryObj = {
  args: {variant: 'text', animation: 'pulse'},
  render: (args) =>
    html`<mu-skeleton
      variant="${args.variant}"
      animation="${args.animation}"
      width="${args.width ?? ''}"
    ></mu-skeleton>`,
};

export const Circular: StoryObj = {
  args: {variant: 'circular', animation: 'pulse', width: '60px', height: '60px'},
  render: (args) =>
    html`<mu-skeleton
      variant="${args.variant}"
      animation="${args.animation}"
      width="${args.width}"
      height="${args.height}"
    ></mu-skeleton>`,
};

export const Rectangular: StoryObj = {
  args: {variant: 'rectangular', animation: 'wave', width: '300px', height: '150px'},
  render: (args) =>
    html`<mu-skeleton
      variant="${args.variant}"
      animation="${args.animation}"
      width="${args.width}"
      height="${args.height}"
    ></mu-skeleton>`,
};

export const CardPlaceholder: StoryObj = {
  render: () => html`
    <div style="width:300px; padding:16px; display:flex; flex-direction:column; gap:12px;">
      <mu-skeleton
        variant="rectangular"
        height="150px"
      ></mu-skeleton>
      <mu-skeleton variant="text"></mu-skeleton>
      <mu-skeleton
        variant="text"
        width="80%"
      ></mu-skeleton>
      <mu-skeleton
        variant="text"
        width="60%"
      ></mu-skeleton>
    </div>
  `,
};

export const NoAnimation: StoryObj = {
  render: () =>
    html`<mu-skeleton
      variant="text"
      .animation="${false}"
    ></mu-skeleton>`,
};
