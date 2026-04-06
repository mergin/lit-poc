import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-text-field.js';

const meta: Meta = {
  title: 'Inputs/TextField',
  component: 'mu-text-field',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placeholder: {control: 'text'},
    value: {control: 'text'},
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
    },
    disabled: {control: 'boolean'},
    readonly: {control: 'boolean'},
    required: {control: 'boolean'},
    error: {control: 'text'},
    helperText: {control: 'text'},
  },
};
export default meta;

type Story = StoryObj;

/** Basic text field with a label. */
export const Default: Story = {
  args: {label: 'Full name', placeholder: 'John Doe'},
  render: (args) =>
    html`<div style="max-width:320px">
      <mu-text-field
        label="${args.label}"
        placeholder="${args.placeholder}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
      ></mu-text-field>
    </div>`,
};

/** Email type with required validation. */
export const EmailRequired: Story = {
  args: {label: 'Email', type: 'email', required: true, placeholder: 'you@example.com'},
  render: (args) =>
    html`<div style="max-width:320px">
      <mu-text-field
        label="${args.label}"
        type="${args.type}"
        placeholder="${args.placeholder}"
        ?required="${args.required}"
      ></mu-text-field>
    </div>`,
};

/** Field with an inline validation error. */
export const WithError: Story = {
  args: {label: 'Username', value: 'ab', error: 'Minimum 3 characters required'},
  render: (args) =>
    html`<div style="max-width:320px">
      <mu-text-field
        label="${args.label}"
        value="${args.value}"
        error="${args.error}"
      ></mu-text-field>
    </div>`,
};

/** Field with helper text below the input. */
export const WithHelperText: Story = {
  args: {label: 'Password', type: 'password', helperText: 'At least 8 characters'},
  render: (args) =>
    html`<div style="max-width:320px">
      <mu-text-field
        label="${args.label}"
        type="${args.type}"
        helper-text="${args.helperText}"
      ></mu-text-field>
    </div>`,
};

/** Disabled state. */
export const Disabled: Story = {
  args: {label: 'Disabled field', value: 'Cannot edit', disabled: true},
  render: (args) =>
    html`<div style="max-width:320px">
      <mu-text-field
        label="${args.label}"
        value="${args.value}"
        ?disabled="${args.disabled}"
      ></mu-text-field>
    </div>`,
};

/** Multiline textarea mode. */
export const Multiline: Story = {
  args: {label: 'Message', placeholder: 'Write your message…'},
  render: (args) =>
    html`<div style="max-width:400px">
      <mu-text-field
        label="${args.label}"
        placeholder="${args.placeholder}"
        multiline
        rows="4"
      ></mu-text-field>
    </div>`,
};

/** Multiline with character counter. */
export const WithCharCount: Story = {
  args: {label: 'Bio', placeholder: 'Tell us about yourself'},
  render: (args) =>
    html`<div style="max-width:400px">
      <mu-text-field
        label="${args.label}"
        placeholder="${args.placeholder}"
        multiline
        rows="3"
        maxlength="200"
        showcharcount
      ></mu-text-field>
    </div>`,
};

/** Single-line input with prefix and suffix icon slots. */
export const WithPrefixSuffix: Story = {
  render: () =>
    html`<div style="max-width:320px; display:flex; flex-direction:column; gap:12px">
      <mu-text-field label="Search">
        <span
          slot="prefix"
          style="padding:0 8px;color:#637381;font-size:1rem"
          >🔍</span
        >
      </mu-text-field>
      <mu-text-field label="Amount">
        <span
          slot="prefix"
          style="padding:0 8px;color:#637381"
          >&dollar;</span
        >
        <span
          slot="suffix"
          style="padding:0 8px;color:#637381"
          >.00</span
        >
      </mu-text-field>
    </div>`,
};
