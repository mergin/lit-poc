import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../../../core/components/chip/mu-chip';
import '../../../core/components/badge/mu-badge';
import '../../../core/components/snackbar/mu-snackbar';
import '../mu-locale-provider';
import type {MuChip} from '../../../core/components/chip/mu-chip';
import type {MuBadge} from '../../../core/components/badge/mu-badge';
import type {MuSnackbar} from '../../../core/components/snackbar/mu-snackbar';
import type {MuLocale} from '../default-locale';

describe('mu-locale-provider render', () => {
  test('mu-chip delete button uses defaultLocale aria-label without provider', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(
      html`<mu-chip
        label="Tag"
        deletable
      ></mu-chip>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.delete-btn');

    // ASSERT
    expect(btn?.getAttribute('aria-label')).toBe('Delete Tag');
  });

  test('mu-chip delete button uses custom locale aria-label when provider present', async () => {
    // ARRANGE
    const customLocale: MuLocale = {
      chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
      badge: {defaultLabel: (content: string | number): string => `Abzeichen: ${content}`},
      dialog: {closeLabel: 'Schließen'},
      snackbar: {closeLabel: 'Verwerfen'},
    };
    const container = await fixture<MuChip>(
      html`<mu-locale-provider .locale="${customLocale}">
        <mu-chip
          label="Tag"
          deletable
        ></mu-chip>
      </mu-locale-provider>`
    );
    const chip = container.querySelector<MuChip>('mu-chip');
    await chip?.updateComplete;

    // ACT
    const btn = chip?.shadowRoot?.querySelector<HTMLButtonElement>('.delete-btn');

    // ASSERT
    expect(btn?.getAttribute('aria-label')).toBe('Entfernen Tag');
  });

  test('mu-badge uses defaultLocale accessible label without provider', async () => {
    // ARRANGE
    const el = await fixture<MuBadge>(
      html`<mu-badge content="3"><span>Notifications</span></mu-badge>`
    );

    // ACT
    const visHidden = el.shadowRoot?.querySelector('.visually-hidden');

    // ASSERT
    expect(visHidden?.textContent?.trim()).toBe('Badge content: 3');
  });

  test('mu-badge uses custom locale accessible label when provider present', async () => {
    // ARRANGE
    const customLocale: MuLocale = {
      chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
      badge: {defaultLabel: (content: string | number): string => `Ausweis: ${content}`},
      dialog: {closeLabel: 'Schließen'},
      snackbar: {closeLabel: 'Verwerfen'},
    };
    const container = await fixture(
      html`<mu-locale-provider .locale="${customLocale}">
        <mu-badge content="3"><span>Notifications</span></mu-badge>
      </mu-locale-provider>`
    );
    const badge = container.querySelector<MuBadge>('mu-badge');
    await badge?.updateComplete;

    // ACT
    const visHidden = badge?.shadowRoot?.querySelector('.visually-hidden');

    // ASSERT
    expect(visHidden?.textContent?.trim()).toBe('Ausweis: 3');
  });

  test('mu-snackbar dismiss button uses defaultLocale aria-label without provider', async () => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(
      html`<mu-snackbar
        message="Saved"
        open
      ></mu-snackbar>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.close');

    // ASSERT
    expect(btn?.getAttribute('aria-label')).toBe('Dismiss');
  });

  test('mu-snackbar dismiss button uses custom locale aria-label when provider present', async () => {
    // ARRANGE
    const customLocale: MuLocale = {
      chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
      badge: {defaultLabel: (content: string | number): string => `Abzeichen: ${content}`},
      dialog: {closeLabel: 'Schließen'},
      snackbar: {closeLabel: 'Verwerfen'},
    };
    const container = await fixture(
      html`<mu-locale-provider .locale="${customLocale}">
        <mu-snackbar
          message="Saved"
          open
        ></mu-snackbar>
      </mu-locale-provider>`
    );
    const snackbar = container.querySelector<MuSnackbar>('mu-snackbar');
    await snackbar?.updateComplete;

    // ACT
    const btn = snackbar?.shadowRoot?.querySelector<HTMLButtonElement>('.close');

    // ASSERT
    expect(btn?.getAttribute('aria-label')).toBe('Verwerfen');
  });
});
