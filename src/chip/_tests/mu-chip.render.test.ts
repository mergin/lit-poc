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

  test('dispatches delete event when delete button is clicked', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(
      html`<mu-chip
        label="Chip"
        deletable
      ></mu-chip>`
    );
    let fired = false;
    el.addEventListener('delete', () => {
      fired = true;
    });

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('.delete-btn');
    btn?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP
    // (fixture auto-cleans)
  });

  test('does not dispatch delete event when chip is disabled', async () => {
    // ARRANGE
    const el = await fixture<MuChip>(
      html`<mu-chip
        label="Chip"
        deletable
        disabled
      ></mu-chip>`
    );
    let fired = false;
    el.addEventListener('delete', () => {
      fired = true;
    });

    // ACT — call handler directly to test the disabled guard since native click won't fire on disabled button
    (el as unknown as {_handleDelete: (e: Event) => void})._handleDelete(new Event('click'));

    // ASSERT
    expect(fired).toBe(false);

    // CLEANUP
    // (fixture auto-cleans)
  });
});
