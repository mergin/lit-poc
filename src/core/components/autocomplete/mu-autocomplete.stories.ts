import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-autocomplete.js';

const COUNTRIES = [
  {value: 'us', label: 'United States'},
  {value: 'gb', label: 'United Kingdom'},
  {value: 'ca', label: 'Canada'},
  {value: 'au', label: 'Australia'},
  {value: 'de', label: 'Germany'},
  {value: 'fr', label: 'France'},
  {value: 'jp', label: 'Japan'},
  {value: 'br', label: 'Brazil'},
];

interface AutocompleteArgs {
  label: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  minChars: number;
}

const meta: Meta<AutocompleteArgs> = {
  title: 'Components/Autocomplete',
  component: 'mu-autocomplete',
  argTypes: {
    label: {control: 'text', description: 'Input label'},
    placeholder: {control: 'text', description: 'Placeholder text'},
    disabled: {control: 'boolean', description: 'Disabled'},
    required: {control: 'boolean', description: 'Required'},
    minChars: {control: {type: 'number'}, description: 'Minimum characters before filtering'},
  },
  args: {
    label: 'Country',
    placeholder: 'Search…',
    disabled: false,
    required: false,
    minChars: 1,
  },
};

export default meta;
type Story = StoryObj<AutocompleteArgs>;

/** Default autocomplete. */
export const Default: Story = {
  render: (args) =>
    html`<mu-autocomplete
      label="${args.label}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      .minChars="${args.minChars}"
      .options="${COUNTRIES}"
    ></mu-autocomplete>`,
};

/** Disabled autocomplete. */
export const Disabled: Story = {
  args: {disabled: true},
  render: (args) =>
    html`<mu-autocomplete
      label="${args.label}"
      ?disabled="${args.disabled}"
      .options="${COUNTRIES}"
    ></mu-autocomplete>`,
};

/** Autocomplete requiring 2 characters before filtering. */
export const MinCharsTwo: Story = {
  args: {minChars: 2, label: 'Country (min 2 chars)'},
  render: (args) =>
    html`<mu-autocomplete
      label="${args.label}"
      .minChars="${args.minChars}"
      .options="${COUNTRIES}"
    ></mu-autocomplete>`,
};

/** Autocomplete with empty options to show "No results". */
export const NoResults: Story = {
  args: {label: 'Empty options'},
  render: (args) =>
    html`<mu-autocomplete
      label="${args.label}"
      .options="${[]}"
    ></mu-autocomplete>`,
};
