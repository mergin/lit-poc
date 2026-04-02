import {html} from 'lit';

import '../button/mu-button';
import './mu-card';

/** Story args for mu-card composition examples. */
interface MuCardStoryArgs {
  /** Header title text. */
  title: string;
  /** Header subtitle text. */
  subtitle: string;
  /** Main body content. */
  content: string;
  /** Primary action label. */
  primaryActionLabel: string;
  /** Secondary action label. */
  secondaryActionLabel: string;
}

const meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: (args: MuCardStoryArgs): ReturnType<typeof html> => html`
    <div style="max-width: 420px;">
      <mu-card>
        <mu-card-header
          slot="header"
          title=${args.title}
          subtitle=${args.subtitle}
        ></mu-card-header>
        <mu-card-content>${args.content}</mu-card-content>
        <mu-card-actions slot="actions">
          <mu-button variant="outlined">${args.secondaryActionLabel}</mu-button>
          <mu-button>${args.primaryActionLabel}</mu-button>
        </mu-card-actions>
      </mu-card>
    </div>
  `,
  args: {
    title: 'Order Summary',
    subtitle: 'Updated just now',
    content:
      'Your order includes 3 items and qualifies for free shipping. Review details before checkout.',
    primaryActionLabel: 'Checkout',
    secondaryActionLabel: 'Details',
  },
};

export default meta;
type Story = {args?: Partial<MuCardStoryArgs>};

export const Default: Story = {};

export const ContentFocused: Story = {
  args: {
    title: 'Project Update',
    subtitle: 'Sprint 12',
    content: 'The team completed 14 tasks this sprint, with 2 items moved to the next cycle.',
    primaryActionLabel: 'View Report',
    secondaryActionLabel: 'Dismiss',
  },
};
