import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-chip';
import type {MuChip} from '../mu-chip';

describe('mu-chip render', () => {
  test('renders text correctly', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(html`<mu-chip label="Testing"></mu-chip>`);

    // ACT
    const span = el.shadowRoot?.querySelector('.label');

    // ASSERT
    expect(span?.textContent).toBe('Testing');
  });

  test('renders delete button when deletable', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(
      html`<mu-chip
        label="Tag"
        deletable
      ></mu-chip>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector('button.delete-btn');

    // ASSERT
    expect(btn).not.toBeNull();
    // Validate accessibility
    expect(btn?.getAttribute('aria-label')).toBe('Delete Tag');
  });

  test('does not render delete button when not deletable', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(html`<mu-chip label="Tag"></mu-chip>`);

    // ACT
    const btn = el.shadowRoot?.querySelector('button.delete-btn');

    // ASSERT
    expect(btn).toBeNull();
  });
});
