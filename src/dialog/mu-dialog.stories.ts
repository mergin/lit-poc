import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-dialog.js';

const meta: Meta = {
  title: 'Overlays/Dialog',
  component: 'mu-dialog',
  tags: ['autodocs'],
  argTypes: {
    headline: {control: 'text'},
    open: {control: 'boolean'},
  },
};
export default meta;

type Story = StoryObj;

/** Default dialog with headline and body content. */
export const Default: Story = {
  args: {headline: 'Confirm action', open: true},
  render: (args) => html`
    <mu-dialog
      headline="${args.headline}"
      ?open="${args.open}"
    >
      <p>Are you sure you want to proceed?</p>
      <button
        slot="actions"
        @click="${(e: Event) =>
          (((e.target as HTMLElement).closest('mu-dialog') as HTMLElement & {open: boolean}).open =
            false)}"
      >
        Cancel
      </button>
      <button slot="actions">Confirm</button>
    </mu-dialog>
  `,
};

/** Dialog opened by a trigger button. */
export const WithTrigger: Story = {
  render: () => {
    const toggle = (e: Event): void => {
      const dialog = (e.target as HTMLElement).nextElementSibling as HTMLElement & {open: boolean};
      dialog.open = true;
    };
    return html`
      <button @click="${toggle}">Open dialog</button>
      <mu-dialog headline="Delete item">
        <p>This action cannot be undone.</p>
        <button slot="actions">Cancel</button>
        <button slot="actions">Delete</button>
      </mu-dialog>
    `;
  },
};

/** Dialog with only a close button in the actions slot. */
export const InformationOnly: Story = {
  args: {headline: 'Information', open: true},
  render: (args) => html`
    <mu-dialog
      headline="${args.headline}"
      ?open="${args.open}"
    >
      <p>Your session will expire in 5 minutes.</p>
      <button
        slot="actions"
        @click="${(e: Event) =>
          (((e.target as HTMLElement).closest('mu-dialog') as HTMLElement & {open: boolean}).open =
            false)}"
      >
        OK
      </button>
    </mu-dialog>
  `,
};

/** Fullscreen dialog that fills the whole viewport. */
export const Fullscreen: Story = {
  args: {headline: 'Full Page Form', open: true},
  render: (args) => html`
    <mu-dialog
      headline="${args.headline}"
      ?open="${args.open}"
      fullscreen
    >
      <p>This dialog occupies the entire viewport.</p>
      <button
        slot="actions"
        @click="${(e: Event) =>
          (((e.target as HTMLElement).closest('mu-dialog') as HTMLElement & {open: boolean}).open =
            false)}"
      >
        Close
      </button>
    </mu-dialog>
  `,
};

/** Scrollable dialog with overflowing body content. */
export const Scrollable: Story = {
  args: {headline: 'Terms and Conditions', open: true},
  render: (args) => html`
    <mu-dialog
      headline="${args.headline}"
      ?open="${args.open}"
      scrollable
    >
      ${Array.from(
        {length: 20},
        (_: unknown, i: number): string =>
          `Paragraph ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
      )
        .map((p: string): string => `<p>${p}</p>`)
        .join('')}
      <button
        slot="actions"
        @click="${(e: Event) =>
          (((e.target as HTMLElement).closest('mu-dialog') as HTMLElement & {open: boolean}).open =
            false)}"
      >
        Accept
      </button>
    </mu-dialog>
  `,
};
