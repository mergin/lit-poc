import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-switch.js';

const meta: Meta = {
  title: 'Inputs/Switch',
  component: 'mu-switch',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
};
export default meta;

type Story = StoryObj;

/** Default unchecked switch. */
export const Default: Story = {
  args: {label: 'Dark mode'},
  render: (args) =>
    html`<mu-switch
      label="${args.label}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
    ></mu-switch>`,
};

/** Pre-checked switch. */
export const Checked: Story = {
  args: {label: 'Notifications enabled', checked: true},
  render: (args) =>
    html`<mu-switch
      label="${args.label}"
      ?checked="${args.checked}"
    ></mu-switch>`,
};

/** Disabled switch. */
export const Disabled: Story = {
  args: {label: 'Feature locked', disabled: true},
  render: (args) =>
    html`<mu-switch
      label="${args.label}"
      ?disabled="${args.disabled}"
    ></mu-switch>`,
};

/** All states side-by-side. */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <mu-switch label="Off"></mu-switch>
      <mu-switch
        label="On"
        checked
      ></mu-switch>
      <mu-switch
        label="Disabled off"
        disabled
      ></mu-switch>
      <mu-switch
        label="Disabled on"
        checked
        disabled
      ></mu-switch>
    </div>
  `,
};
