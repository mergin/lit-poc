import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-radio.js';
import './mu-radio-group.js';

const meta: Meta = {
  title: 'Inputs/Radio',
  component: 'mu-radio',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    value: {control: 'text'},
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
};
export default meta;

type Story = StoryObj;

/** A group of radio buttons inside a radio group. */
export const Default: Story = {
  render: () => html`
    <mu-radio-group label="Preferred contact">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <mu-radio
          name="contact"
          value="email"
          label="Email"
          checked
        ></mu-radio>
        <mu-radio
          name="contact"
          value="phone"
          label="Phone"
        ></mu-radio>
        <mu-radio
          name="contact"
          value="none"
          label="No preference"
        ></mu-radio>
      </div>
    </mu-radio-group>
  `,
};

/** A radio group with one disabled option. */
export const WithDisabled: Story = {
  render: () => html`
    <mu-radio-group label="Plan">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <mu-radio
          name="plan"
          value="free"
          label="Free"
          checked
        ></mu-radio>
        <mu-radio
          name="plan"
          value="pro"
          label="Pro"
        ></mu-radio>
        <mu-radio
          name="plan"
          value="enterprise"
          label="Enterprise (coming soon)"
          disabled
        ></mu-radio>
      </div>
    </mu-radio-group>
  `,
};

/** Horizontal layout of radio buttons. */
export const Horizontal: Story = {
  render: () => html`
    <mu-radio-group label="Size">
      <div style="display: flex; gap: 16px;">
        <mu-radio
          name="size"
          value="sm"
          label="Small"
        ></mu-radio>
        <mu-radio
          name="size"
          value="md"
          label="Medium"
          checked
        ></mu-radio>
        <mu-radio
          name="size"
          value="lg"
          label="Large"
        ></mu-radio>
      </div>
    </mu-radio-group>
  `,
};
