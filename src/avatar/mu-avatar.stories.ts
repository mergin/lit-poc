import {html} from 'lit';

import './mu-avatar';

/** Story args for mu-avatar. */
interface MuAvatarStoryArgs {
  /** Avatar image URL. When set, initials are not displayed. */
  src: string | null;
  /** Alt text for the image avatar. */
  alt: string;
  /** Initials displayed when no image source is provided. */
  initials: string;
  /** Avatar size variant. */
  size: 'small' | 'medium' | 'large';
  /** Avatar color token. */
  color: string;
}

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  render: (args: MuAvatarStoryArgs): ReturnType<typeof html> => html`
    <mu-avatar
      .src=${args.src}
      alt=${args.alt}
      initials=${args.initials}
      size=${args.size}
      color=${args.color}
    ></mu-avatar>
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
    src: null,
    alt: 'User avatar',
    initials: 'JD',
    size: 'medium',
    color: 'primary',
  },
};

export default meta;
type Story = {args?: Partial<MuAvatarStoryArgs>};

export const Initials: Story = {};

export const Image: Story = {
  args: {
    src: 'https://i.pravatar.cc/120?img=5',
    initials: '',
    alt: 'Jane Doe avatar',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      ${(['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const).map(
        (color) =>
          html`<mu-avatar
            initials="AB"
            color=${color}
          ></mu-avatar>`
      )}
    </div>
  `,
};
