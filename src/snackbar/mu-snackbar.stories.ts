import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-snackbar.js';

const meta: Meta = {
  title: 'Overlays/Snackbar',
  component: 'mu-snackbar',
  tags: ['autodocs'],
  argTypes: {
    message: {control: 'text'},
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    duration: {control: 'number'},
    open: {control: 'boolean'},
    actionLabel: {control: 'text'},
  },
};
export default meta;

type Story = StoryObj;

/** Default snackbar notification. */
export const Default: Story = {
  args: {message: 'Changes saved', open: true, duration: 0},
  render: (args) => html`
    <mu-snackbar
      message="${args.message}"
      ?open="${args.open}"
      .duration="${args.duration}"
    ></mu-snackbar>
  `,
};

/** Success variant. */
export const Success: Story = {
  args: {message: 'File uploaded successfully', variant: 'success', open: true, duration: 0},
  render: (args) => html`
    <mu-snackbar
      message="${args.message}"
      variant="${args.variant}"
      ?open="${args.open}"
      .duration="${args.duration}"
    ></mu-snackbar>
  `,
};

/** Error variant with assertive live region. */
export const Error: Story = {
  args: {message: 'Upload failed. Try again.', variant: 'error', open: true, duration: 0},
  render: (args) => html`
    <mu-snackbar
      message="${args.message}"
      variant="${args.variant}"
      ?open="${args.open}"
      .duration="${args.duration}"
    ></mu-snackbar>
  `,
};

/** Snackbar with an action button. */
export const WithAction: Story = {
  args: {message: 'Item deleted', actionLabel: 'Undo', open: true, duration: 0},
  render: (args) => html`
    <mu-snackbar
      message="${args.message}"
      action-label="${args.actionLabel}"
      ?open="${args.open}"
      .duration="${args.duration}"
    ></mu-snackbar>
  `,
};

/** Warning variant. */
export const Warning: Story = {
  args: {message: 'Connection unstable', variant: 'warning', open: true, duration: 0},
  render: (args) => html`
    <mu-snackbar
      message="${args.message}"
      variant="${args.variant}"
      ?open="${args.open}"
      .duration="${args.duration}"
    ></mu-snackbar>
  `,
};
