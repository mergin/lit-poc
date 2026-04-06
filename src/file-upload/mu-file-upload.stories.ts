import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-file-upload.js';

interface FileUploadArgs {
  multiple: boolean;
  accept: string;
  disabled: boolean;
  label: string;
  dragLabel: string;
}

const meta: Meta<FileUploadArgs> = {
  title: 'Components/FileUpload',
  component: 'mu-file-upload',
  argTypes: {
    multiple: {control: 'boolean', description: 'Allow multiple file selection'},
    accept: {control: 'text', description: 'Accepted MIME types'},
    disabled: {control: 'boolean', description: 'Disable the control'},
    label: {control: 'text', description: 'Primary label'},
    dragLabel: {control: 'text', description: 'Secondary hint text'},
  },
  args: {
    multiple: false,
    accept: '',
    disabled: false,
    label: 'Choose file',
    dragLabel: 'or drag and drop here',
  },
};

export default meta;
type Story = StoryObj<FileUploadArgs>;

/** Default file upload. */
export const Default: Story = {
  render: (args) =>
    html`<mu-file-upload
      ?multiple="${args.multiple}"
      accept="${args.accept}"
      ?disabled="${args.disabled}"
      label="${args.label}"
      dragLabel="${args.dragLabel}"
    ></mu-file-upload>`,
};

/** Multiple file upload. */
export const MultipleFiles: Story = {
  args: {multiple: true, label: 'Choose files'},
  render: (args) =>
    html`<mu-file-upload
      ?multiple="${args.multiple}"
      label="${args.label}"
      dragLabel="${args.dragLabel}"
    ></mu-file-upload>`,
};

/** File upload restricted to images. */
export const WithAccept: Story = {
  args: {accept: 'image/*', label: 'Choose image'},
  render: (args) =>
    html`<mu-file-upload
      accept="${args.accept}"
      label="${args.label}"
      dragLabel="${args.dragLabel}"
    ></mu-file-upload>`,
};

/** Disabled file upload. */
export const Disabled: Story = {
  args: {disabled: true},
  render: (args) =>
    html`<mu-file-upload
      ?disabled="${args.disabled}"
      label="${args.label}"
      dragLabel="${args.dragLabel}"
    ></mu-file-upload>`,
};
