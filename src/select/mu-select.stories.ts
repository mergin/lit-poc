import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-select.js';

const COUNTRY_OPTIONS = [
  {value: 'us', label: 'United States'},
  {value: 'gb', label: 'United Kingdom'},
  {value: 'de', label: 'Germany'},
  {value: 'fr', label: 'France'},
];

const meta: Meta = {
  title: 'Inputs/Select',
  component: 'mu-select',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placeholder: {control: 'text'},
    value: {control: 'text'},
    disabled: {control: 'boolean'},
    required: {control: 'boolean'},
    error: {control: 'text'},
  },
};
export default meta;

type Story = StoryObj;

/** Basic select with options. */
export const Default: Story = {
  render: () =>
    html`<div style="max-width:320px">
      <mu-select
        label="Country"
        placeholder="Choose a country"
        .options="${COUNTRY_OPTIONS}"
      ></mu-select>
    </div>`,
};

/** Select with a pre-selected value. */
export const WithValue: Story = {
  render: () =>
    html`<div style="max-width:320px">
      <mu-select
        label="Country"
        value="de"
        .options="${COUNTRY_OPTIONS}"
      ></mu-select>
    </div>`,
};

/** Required select with an error message. */
export const WithError: Story = {
  render: () =>
    html`<div style="max-width:320px">
      <mu-select
        label="Role"
        placeholder="Select a role"
        required
        error="This field is required"
        .options="${[
          {value: 'admin', label: 'Admin'},
          {value: 'user', label: 'User'},
          {value: 'guest', label: 'Guest'},
        ]}"
      ></mu-select>
    </div>`,
};

/** Disabled select. */
export const Disabled: Story = {
  render: () =>
    html`<div style="max-width:320px">
      <mu-select
        label="Country"
        value="us"
        disabled
        .options="${COUNTRY_OPTIONS}"
      ></mu-select>
    </div>`,
};
