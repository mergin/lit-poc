import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-accordion';
import './mu-accordion-item';

const meta: Meta = {
  title: 'Surfaces/Accordion',
  component: 'mu-accordion',
  argTypes: {
    allowMultiple: {control: 'boolean'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {allowMultiple: false},
  render: (args) => html`
    <mu-accordion ?allowMultiple="${args.allowMultiple}">
      <mu-accordion-item heading="What is Lit?">
        Lit is a simple library for building fast, lightweight web components.
      </mu-accordion-item>
      <mu-accordion-item heading="Why web components?">
        Web components are native browser primitives for building reusable UI elements.
      </mu-accordion-item>
      <mu-accordion-item heading="How do I get started?">
        Install Lit with <code>npm install lit</code> and create your first component.
      </mu-accordion-item>
    </mu-accordion>
  `,
};

export const AllowMultiple: StoryObj = {
  render: () => html`
    <mu-accordion allowMultiple>
      <mu-accordion-item
        heading="Section A"
        expanded
      >
        Content A
      </mu-accordion-item>
      <mu-accordion-item heading="Section B">Content B</mu-accordion-item>
      <mu-accordion-item heading="Section C">Content C</mu-accordion-item>
    </mu-accordion>
  `,
};

export const WithDisabledItem: StoryObj = {
  render: () => html`
    <mu-accordion>
      <mu-accordion-item heading="Enabled">Visible content</mu-accordion-item>
      <mu-accordion-item
        heading="Disabled"
        disabled
      >
        This cannot be opened.
      </mu-accordion-item>
    </mu-accordion>
  `,
};
