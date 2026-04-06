import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './mu-popover.js';

interface PopoverArgs {
  placement: string;
  closeOnOutsideClick: boolean;
  popoverrole: string;
}

const meta: Meta<PopoverArgs> = {
  title: 'Components/Popover',
  component: 'mu-popover',
  argTypes: {
    placement: {
      control: {type: 'select'},
      options: ['bottom', 'top', 'left', 'right'],
      description: 'Placement relative to trigger',
    },
    closeOnOutsideClick: {control: 'boolean', description: 'Close on outside click'},
    popoverrole: {
      control: {type: 'select'},
      options: ['dialog', 'tooltip'],
      description: 'ARIA role of content',
    },
  },
  args: {
    placement: 'bottom',
    closeOnOutsideClick: true,
    popoverrole: 'dialog',
  },
};

export default meta;
type Story = StoryObj<PopoverArgs>;

/** Default popover with a trigger button. */
export const Default: Story = {
  render: (args) => html`
    <mu-popover
      placement="${args.placement}"
      ?closeOnOutsideClick="${args.closeOnOutsideClick}"
      popoverrole="${args.popoverrole}"
    >
      <button slot="trigger">Show popover</button>
      <p style="margin:0">This is the popover content.</p>
    </mu-popover>
  `,
};

/** Popover with rich content. */
export const RichContent: Story = {
  render: (args) => html`
    <mu-popover placement="${args.placement}">
      <button slot="trigger">Show info</button>
      <div>
        <strong>Info title</strong>
        <p style="margin:8px 0 0">More detailed information here.</p>
        <button @click="${() => {}}">Action</button>
      </div>
    </mu-popover>
  `,
};

/** Popover with manual control (programmatic open/close). */
export const ManualControl: Story = {
  render: () => {
    const open = () => {
      document.querySelector<HTMLElement & {openPopover(): void}>('#manual-popover')?.openPopover();
    };
    const close = () => {
      document
        .querySelector<HTMLElement & {closePopover(): void}>('#manual-popover')
        ?.closePopover();
    };
    return html`
      <div style="display:flex;gap:8px;align-items:flex-start;">
        <button @click="${open}">Open</button>
        <button @click="${close}">Close</button>
        <mu-popover
          id="manual-popover"
          placement="bottom"
          .closeOnOutsideClick="${false}"
        >
          <span slot="trigger"></span>
          <p style="margin:0">Manually controlled popover.</p>
        </mu-popover>
      </div>
    `;
  },
};
