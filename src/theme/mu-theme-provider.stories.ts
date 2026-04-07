import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components';
import './mu-theme-provider.js';
import '../core/components/button/mu-button.js';
import '../core/components/chip/mu-chip.js';
import '../core/components/badge/mu-badge.js';
import '../core/components/avatar/mu-avatar.js';
import '../core/components/typography/mu-typography.js';
import '../core/components/card/mu-card.js';
import '../core/components/divider/mu-divider.js';

const meta: Meta = {
  title: 'Theme/MuThemeProvider',
  component: 'mu-theme-provider',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: {type: 'radio'},
      options: ['light', 'dark'],
      description: 'Active color scheme applied to all descendant components.',
    },
  },
};

export default meta;

type Story = StoryObj;

/** A preview canvas rendered in light mode using the default token set. */
export const LightMode: Story = {
  args: {
    mode: 'light',
  },
  render: (args) => html`
    <mu-theme-provider
      mode=${args.mode}
      style="display: block; padding: 24px; background: var(--mu-bg-default, #f9fafb);"
    >
      <mu-typography variant="h3">Light mode</mu-typography>
      <mu-typography variant="body1">All tokens are applied from the light theme.</mu-typography>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; align-items: center;">
        <mu-button>Primary</mu-button>
        <mu-button color="secondary">Secondary</mu-button>
        <mu-button color="error">Error</mu-button>
        <mu-avatar
          initials="AB"
          color="primary"
        ></mu-avatar>
        <mu-chip
          label="Chip"
          color="primary"
        ></mu-chip>
        <mu-badge
          content="4"
          color="error"
          ><mu-button variant="icon">🔔</mu-button></mu-badge
        >
      </div>
    </mu-theme-provider>
  `,
};

/** A preview canvas rendered in dark mode using the dark token overrides. */
export const DarkMode: Story = {
  args: {
    mode: 'dark',
  },
  render: (args) => html`
    <mu-theme-provider
      mode=${args.mode}
      style="display: block; padding: 24px; background: var(--mu-bg-default, #121212);"
    >
      <mu-typography
        variant="h3"
        style="color: var(--mu-text-primary);"
        >Dark mode</mu-typography
      >
      <mu-typography
        variant="body1"
        style="color: var(--mu-text-secondary);"
      >
        All tokens are overridden with the dark theme.
      </mu-typography>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; align-items: center;">
        <mu-button>Primary</mu-button>
        <mu-button color="secondary">Secondary</mu-button>
        <mu-button color="error">Error</mu-button>
        <mu-avatar
          initials="AB"
          color="primary"
        ></mu-avatar>
        <mu-chip
          label="Chip"
          color="primary"
        ></mu-chip>
        <mu-badge
          content="4"
          color="error"
          ><mu-button variant="icon">🔔</mu-button></mu-badge
        >
      </div>
    </mu-theme-provider>
  `,
};

/** Demonstrates switching between light and dark mode interactively. */
export const ModeSwitcher: Story = {
  render: () => {
    let currentMode: 'light' | 'dark' = 'light';
    const provider = document.createElement('mu-theme-provider') as HTMLElement & {mode: string};

    const toggle = (): void => {
      currentMode = currentMode === 'light' ? 'dark' : 'light';
      provider.mode = currentMode;
      provider.style.background =
        currentMode === 'dark' ? 'var(--mu-bg-default, #121212)' : 'var(--mu-bg-default, #f9fafb)';
    };

    return html`
      <mu-theme-provider
        mode="light"
        style="display: block; padding: 24px; background: var(--mu-bg-default, #f9fafb);"
      >
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <mu-button @click=${toggle}>Toggle mode</mu-button>
          <mu-chip
            label="success"
            color="success"
          ></mu-chip>
          <mu-chip
            label="warning"
            color="warning"
          ></mu-chip>
          <mu-chip
            label="error"
            color="error"
          ></mu-chip>
        </div>
      </mu-theme-provider>
    `;
  },
};
