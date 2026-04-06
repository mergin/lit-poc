import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-chip';

const meta: Meta = {
  title: 'Data Display/Chip',
  component: 'mu-chip',
  argTypes: {
    label: {control: 'text'},
    disabled: {control: 'boolean'},
    deletable: {control: 'boolean'},
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    onDelete: {action: 'delete'},
  },
};
export default meta;

export const Default: StoryObj = {
  args: {
    label: 'Basic Chip',
    color: 'default',
  },
  render: (args) => html`
    <mu-chip
      label="${args.label}"
      color="${args.color}"
      ?disabled="${args.disabled}"
      ?deletable="${args.deletable}"
      @delete="${args.onDelete}"
    ></mu-chip>
  `,
};

export const DeletableTheme: StoryObj = {
  args: {
    label: 'Primary Chip',
    color: 'primary',
    deletable: true,
  },
  render: (args) => html`
    <div style="display: flex; gap: 8px;">
      <mu-chip
        label="${args.label}"
        color="${args.color}"
        ?deletable="${args.deletable}"
        @delete="${args.onDelete}"
      ></mu-chip>
      <mu-chip
        label="Disabled Deletable"
        color="${args.color}"
        ?deletable="${args.deletable}"
        disabled
      ></mu-chip>
    </div>
  `,
};

export const Colors: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      ${(['default', 'primary', 'secondary', 'error', 'success', 'warning', 'info'] as const).map(
        (color) =>
          html`<mu-chip
            label=${color}
            color=${color}
          ></mu-chip>`
      )}
    </div>
  `,
};

export const Disabled: StoryObj = {
  args: {
    label: 'Disabled',
    disabled: true,
    color: 'default',
  },
  render: (args) => html`
    <mu-chip
      label="${args.label}"
      ?disabled="${args.disabled}"
      color="${args.color}"
    ></mu-chip>
  `,
};

/** Chip with an avatar image in the avatar slot. */
export const WithAvatar: StoryObj = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <mu-chip label="Alice">
        <img
          slot="avatar"
          src="https://i.pravatar.cc/40?u=alice"
          alt="Alice"
          width="24"
          height="24"
          style="border-radius:50%;object-fit:cover"
        />
      </mu-chip>
      <mu-chip
        label="Bob"
        color="primary"
      >
        <img
          slot="avatar"
          src="https://i.pravatar.cc/40?u=bob"
          alt="Bob"
          width="24"
          height="24"
          style="border-radius:50%;object-fit:cover"
        />
      </mu-chip>
    </div>
  `,
};
