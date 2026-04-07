import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-checkbox.js';

const meta: Meta = {
  title: 'Inputs/Checkbox',
  component: 'mu-checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    checked: {control: 'boolean'},
    indeterminate: {control: 'boolean'},
    disabled: {control: 'boolean'},
    value: {control: 'text'},
  },
};
export default meta;

type Story = StoryObj;

/** Default unchecked checkbox with a label. */
export const Default: Story = {
  args: {label: 'Accept terms and conditions'},
  render: (args) =>
    html`<mu-checkbox
      label="${args.label}"
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
      ?disabled="${args.disabled}"
    ></mu-checkbox>`,
};

/** Pre-checked state. */
export const Checked: Story = {
  args: {label: 'Remember me', checked: true},
  render: (args) =>
    html`<mu-checkbox
      label="${args.label}"
      ?checked="${args.checked}"
    ></mu-checkbox>`,
};

/** Indeterminate (partial-select) state. */
export const Indeterminate: Story = {
  args: {label: 'Select all', indeterminate: true},
  render: (args) =>
    html`<mu-checkbox
      label="${args.label}"
      ?indeterminate="${args.indeterminate}"
    ></mu-checkbox>`,
};

/** Disabled checkbox. */
export const Disabled: Story = {
  args: {label: 'Disabled option', disabled: true},
  render: (args) =>
    html`<mu-checkbox
      label="${args.label}"
      ?disabled="${args.disabled}"
    ></mu-checkbox>`,
};

/** All states side-by-side. */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <mu-checkbox label="Unchecked"></mu-checkbox>
      <mu-checkbox
        label="Checked"
        checked
      ></mu-checkbox>
      <mu-checkbox
        label="Indeterminate"
        indeterminate
      ></mu-checkbox>
      <mu-checkbox
        label="Disabled"
        disabled
      ></mu-checkbox>
      <mu-checkbox
        label="Disabled checked"
        disabled
        checked
      ></mu-checkbox>
    </div>
  `,
};
