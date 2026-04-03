import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-typography';

const meta: Meta = {
  title: 'Data Display/Typography',
  component: 'mu-typography',
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline'],
    },
  },
};
export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'body1',
  },
  render: (args) => html`
    <mu-typography variant=${args.variant}> Current variant: ${args.variant} </mu-typography>
  `,
};

export const AllVariants: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <mu-typography variant="h1">Heading 1</mu-typography>
      <mu-typography variant="h2">Heading 2</mu-typography>
      <mu-typography variant="h3">Heading 3</mu-typography>
      <mu-typography variant="h4">Heading 4</mu-typography>
      <mu-typography variant="h5">Heading 5</mu-typography>
      <mu-typography variant="h6">Heading 6</mu-typography>
      <mu-typography variant="body1"
        >Body 1 (Default paragraph text. Lorem ipsum dolor sit amet.)</mu-typography
      >
      <mu-typography variant="body2"
        >Body 2 (Smaller paragraph text. Consectetur adipiscing elit.)</mu-typography
      >
      <mu-typography variant="caption">Caption text</mu-typography>
      <br />
      <mu-typography variant="overline">Overline text</mu-typography>
    </div>
  `,
};
