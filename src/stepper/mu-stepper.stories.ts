import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-stepper.js';
import './mu-step.js';

interface StepperArgs {
  activeStep: number;
  orientation: string;
  linear: boolean;
}

const meta: Meta<StepperArgs> = {
  title: 'Components/Stepper',
  component: 'mu-stepper',
  argTypes: {
    activeStep: {control: {type: 'number', min: 0, max: 4}, description: 'Active step (0-based)'},
    orientation: {
      control: {type: 'select'},
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    linear: {control: 'boolean', description: 'Steps must be completed in order'},
  },
  args: {
    activeStep: 0,
    orientation: 'horizontal',
    linear: true,
  },
};

export default meta;
type Story = StoryObj<StepperArgs>;

/** Horizontal linear stepper. */
export const HorizontalLinear: Story = {
  render: (args) => html`
    <mu-stepper
      .activeStep="${args.activeStep}"
      orientation="${args.orientation}"
      ?linear="${args.linear}"
    >
      <mu-step label="Account"></mu-step>
      <mu-step label="Profile"></mu-step>
      <mu-step label="Review"></mu-step>
    </mu-stepper>
  `,
};

/** Vertical non-linear stepper. */
export const VerticalNonLinear: Story = {
  args: {orientation: 'vertical', linear: false, activeStep: 1},
  render: (args) => html`
    <mu-stepper
      .activeStep="${args.activeStep}"
      orientation="${args.orientation}"
      ?linear="${args.linear}"
    >
      <mu-step label="Step One"><p>Content for step 1.</p></mu-step>
      <mu-step label="Step Two"><p>Content for step 2.</p></mu-step>
      <mu-step label="Step Three"><p>Content for step 3.</p></mu-step>
    </mu-stepper>
  `,
};

/** Stepper with completed steps. */
export const WithCompleted: Story = {
  args: {activeStep: 2},
  render: (args) => html`
    <mu-stepper
      .activeStep="${args.activeStep}"
      orientation="${args.orientation}"
      ?linear="${args.linear}"
    >
      <mu-step label="Done"></mu-step>
      <mu-step label="Also Done"></mu-step>
      <mu-step label="Current"></mu-step>
      <mu-step label="Upcoming"></mu-step>
    </mu-stepper>
  `,
};
