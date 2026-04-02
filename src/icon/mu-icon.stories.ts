import {html} from 'lit';

import './mu-icon';

/** Story args for mu-icon. */
interface MuIconStoryArgs {
  /** Material icon ligature name. */
  name: string;
  /** Icon size variant. */
  size: 'small' | 'medium' | 'large';
  /** Icon color token. */
  color: string;
}

const meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  render: (args: MuIconStoryArgs): ReturnType<typeof html> => html`
    <mu-icon
      name=${args.name}
      size=${args.size}
      color=${args.color}
    ></mu-icon>
  `,
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: {type: 'select'},
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
    },
  },
  args: {
    name: 'star',
    size: 'medium',
    color: 'primary',
  },
};

export default meta;
type Story = {args?: Partial<MuIconStoryArgs>};

export const Default: Story = {};

export const LargeSecondary: Story = {
  args: {
    size: 'large',
    color: 'secondary',
  },
};

export const StatusSuccess: Story = {
  args: {
    name: 'check_circle',
    color: 'success',
  },
};
