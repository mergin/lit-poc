import {html} from 'lit';

import '../icon/mu-icon';
import './mu-button';

/** Story args for mu-button. */
interface MuButtonStoryArgs {
  /** Visible button text. */
  label: string;
  /** Button size variant. */
  size: 'small' | 'medium' | 'large';
  /** Button visual variant. */
  variant: 'contained' | 'outlined' | 'icon';
  /** Button color token. */
  color: string;
  /** Disabled interaction state. */
  disabled: boolean;
  /** Enables the leading icon content. */
  withIcon: boolean;
}

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args: MuButtonStoryArgs): ReturnType<typeof html> => html`
    <mu-button
      size=${args.size}
      variant=${args.variant}
      color=${args.color}
      ?disabled=${args.disabled}
    >
      ${args.withIcon
        ? html`<mu-icon name="check_circle"></mu-icon>${args.variant === 'icon' ? '' : html``}`
        : ''}
      ${args.variant === 'icon' ? '' : args.label}
    </mu-button>
  `,
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: {type: 'select'},
      options: ['contained', 'outlined', 'icon'],
    },
    color: {
      control: {type: 'select'},
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
    },
  },
  args: {
    label: 'Button',
    size: 'medium',
    variant: 'contained',
    color: 'primary',
    disabled: false,
    withIcon: false,
  },
};

export default meta;
type Story = {args?: Partial<MuButtonStoryArgs>};

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const WithIcon: Story = {
  args: {
    withIcon: true,
    label: 'Continue',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    withIcon: true,
    label: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large',
  },
};
