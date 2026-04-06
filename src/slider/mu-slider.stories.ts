import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-slider.js';

interface SliderArgs {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  label: string;
}

const meta: Meta<SliderArgs> = {
  title: 'Components/Slider',
  component: 'mu-slider',
  argTypes: {
    value: {control: {type: 'number'}, description: 'Current value'},
    min: {control: {type: 'number'}, description: 'Minimum value'},
    max: {control: {type: 'number'}, description: 'Maximum value'},
    step: {control: {type: 'number'}, description: 'Step increment'},
    disabled: {control: 'boolean', description: 'Whether the slider is disabled'},
    label: {control: 'text', description: 'Accessible label text'},
  },
  args: {
    value: 30,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    label: 'Volume',
  },
};

export default meta;
type Story = StoryObj<SliderArgs>;

/** Default slider with label. */
export const Default: Story = {
  render: (args) =>
    html`<mu-slider
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-slider>`,
};

/** Disabled slider. */
export const Disabled: Story = {
  args: {disabled: true, label: 'Brightness'},
  render: (args) =>
    html`<mu-slider
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-slider>`,
};

/** Slider with a step of 10. */
export const WithStep: Story = {
  args: {step: 10, value: 40, label: 'Zoom (steps of 10)'},
  render: (args) =>
    html`<mu-slider
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-slider>`,
};

/** Slider with custom min and max. */
export const MinMax: Story = {
  args: {min: -50, max: 50, value: 0, label: 'Temperature'},
  render: (args) =>
    html`<mu-slider
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></mu-slider>`,
};
