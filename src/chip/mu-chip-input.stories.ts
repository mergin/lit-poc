import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-chip-input.js';

const meta: Meta = {
  title: 'Inputs/ChipInput',
  component: 'mu-chip-input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {control: 'text'},
    disabled: {control: 'boolean'},
  },
};
export default meta;

type Story = StoryObj;

/** Default chip input — type a value and press Enter or comma to add a chip. */
export const Default: Story = {
  args: {placeholder: 'Add tag\u2026'},
  render: (args) =>
    html`<div style="max-width:420px">
      <mu-chip-input placeholder="${args.placeholder}"></mu-chip-input>
    </div>`,
};

/** Pre-seeded with initial chips. */
export const WithInitialChips: Story = {
  render: () =>
    html`<div style="max-width:420px">
      <mu-chip-input
        .chips="${['TypeScript', 'Lit', 'Web Components']}"
        placeholder="Add technology…"
      ></mu-chip-input>
    </div>`,
};

/** Disabled chip input. */
export const Disabled: Story = {
  render: () =>
    html`<div style="max-width:420px">
      <mu-chip-input
        .chips="${['Angular', 'React']}"
        disabled
      ></mu-chip-input>
    </div>`,
};
