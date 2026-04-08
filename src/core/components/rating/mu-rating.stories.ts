import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-rating.js';

interface RatingArgs {
  value: number;
  max: number;
  precision: number;
  readonly: boolean;
  disabled: boolean;
  label: string;
}

const meta: Meta<RatingArgs> = {
  title: 'Components/Rating',
  component: 'mu-rating',
  argTypes: {
    value: {control: {type: 'number', min: 0, max: 5, step: 0.5}, description: 'Rating value'},
    max: {control: {type: 'number'}, description: 'Max stars'},
    precision: {
      control: {type: 'select'},
      options: [1, 0.5],
      description: 'Step precision',
    },
    readonly: {control: 'boolean', description: 'Read-only mode'},
    disabled: {control: 'boolean', description: 'Disabled'},
    label: {control: 'text', description: 'Accessible label'},
  },
  args: {
    value: 3,
    max: 5,
    precision: 1,
    readonly: false,
    disabled: false,
    label: 'Rating',
  },
};

export default meta;
type Story = StoryObj<RatingArgs>;

/** Default editable rating. */
export const Default: Story = {
  render: (args) =>
    html`<mu-rating
      .value="${args.value}"
      .max="${args.max}"
      .precision="${args.precision}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-rating>`,
};

/** Read-only rating. */
export const ReadOnly: Story = {
  args: {readonly: true, value: 4},
  render: (args) =>
    html`<mu-rating
      .value="${args.value}"
      .max="${args.max}"
      ?readonly="${args.readonly}"
      label="${args.label}"
    ></mu-rating>`,
};

/** Half-star precision rating. */
export const HalfPrecision: Story = {
  args: {precision: 0.5, value: 2.5},
  render: (args) =>
    html`<mu-rating
      .value="${args.value}"
      .max="${args.max}"
      .precision="${args.precision}"
      label="${args.label}"
    ></mu-rating>`,
};

/** Disabled rating. */
export const Disabled: Story = {
  args: {disabled: true},
  render: (args) =>
    html`<mu-rating
      .value="${args.value}"
      .max="${args.max}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-rating>`,
};
