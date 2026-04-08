import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components';
import './mu-locale-provider.js';
import '../../core/components/chip/mu-chip.js';
import '../../core/components/badge/mu-badge.js';
import '../../core/components/snackbar/mu-snackbar.js';
import '../../core/components/typography/mu-typography.js';
import type {MuLocale} from './default-locale.js';

const meta: Meta = {
  title: 'i18n/MuLocaleProvider',
  component: 'mu-locale-provider',
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: false,
      description: 'An object satisfying the `MuLocale` interface that overrides default strings.',
    },
  },
};

export default meta;

type Story = StoryObj;

/** Default locale (English) — no provider needed. Components render built-in English strings. */
export const DefaultLocale: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <mu-chip
        label="React"
        deletable
      ></mu-chip>
      <mu-badge content="5"><mu-typography variant="body2">Messages</mu-typography></mu-badge>
      <mu-snackbar
        message="Changes saved"
        open
      ></mu-snackbar>
    </div>
  `,
};

/** Custom locale (German) — wrap components in `mu-locale-provider` and supply a `MuLocale` object. */
export const GermanLocale: Story = {
  render: () => {
    const germanLocale: MuLocale = {
      chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
      badge: {defaultLabel: (content: string | number): string => `Ausweis: ${content}`},
      dialog: {closeLabel: 'Schließen'},
      snackbar: {closeLabel: 'Verwerfen'},
    };
    return html`
      <mu-locale-provider .locale=${germanLocale}>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <mu-chip
            label="React"
            deletable
          ></mu-chip>
          <mu-badge content="5"
            ><mu-typography variant="body2">Nachrichten</mu-typography></mu-badge
          >
          <mu-snackbar
            message="Änderungen gespeichert"
            open
          ></mu-snackbar>
        </div>
      </mu-locale-provider>
    `;
  },
};

/** Custom locale (French) — demonstrates that any language can be provided via the locale object. */
export const FrenchLocale: Story = {
  render: () => {
    const frenchLocale: MuLocale = {
      chip: {deleteLabel: (label: string): string => `Supprimer ${label}`},
      badge: {defaultLabel: (content: string | number): string => `Badge : ${content}`},
      dialog: {closeLabel: 'Fermer'},
      snackbar: {closeLabel: 'Ignorer'},
    };
    return html`
      <mu-locale-provider .locale=${frenchLocale}>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <mu-chip
            label="Vue"
            deletable
          ></mu-chip>
          <mu-badge content="3"><mu-typography variant="body2">Messages</mu-typography></mu-badge>
          <mu-snackbar
            message="Modifications enregistrées"
            open
          ></mu-snackbar>
        </div>
      </mu-locale-provider>
    `;
  },
};
