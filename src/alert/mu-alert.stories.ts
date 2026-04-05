import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-alert';

const meta: Meta = {
  title: 'Feedback/Alert',
  component: 'mu-alert',
  argTypes: {
    severity: {control: 'select', options: ['success', 'info', 'warning', 'error']},
    closeLabel: {control: 'text'},
  },
};
export default meta;

export const Info: StoryObj = {
  args: {severity: 'info', closeLabel: ''},
  render: (args) => html`
    <mu-alert
      severity="${args.severity}"
      closeLabel="${args.closeLabel}"
    >
      This is an informational alert.
    </mu-alert>
  `,
};

export const Success: StoryObj = {
  render: () => html` <mu-alert severity="success">Your changes have been saved.</mu-alert> `,
};

export const Warning: StoryObj = {
  render: () => html`
    <mu-alert severity="warning">Please review this before proceeding.</mu-alert>
  `,
};

export const Error: StoryObj = {
  render: () => html`
    <mu-alert severity="error">Something went wrong. Please try again.</mu-alert>
  `,
};

export const Closeable: StoryObj = {
  render: () => html`
    <mu-alert
      severity="info"
      closeLabel="Dismiss"
    >
      This alert can be dismissed.
    </mu-alert>
  `,
};

export const AllSeverities: StoryObj = {
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:12px;">
      <mu-alert severity="success">Success alert</mu-alert>
      <mu-alert severity="info">Info alert</mu-alert>
      <mu-alert severity="warning">Warning alert</mu-alert>
      <mu-alert severity="error">Error alert</mu-alert>
    </div>
  `,
};
