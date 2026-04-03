import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-badge';
import type {MuBadge} from '../mu-badge';

describe('mu-badge render', () => {
  test('renders badge visually and creates a11y text', async () => {
    // ARRANGE
    const el = await fixture<MuBadge>(html`<mu-badge content="5">Icon</mu-badge>`);

    // ACT
    const visuallyHidden = el.shadowRoot?.querySelector('.visually-hidden');
    const visualBadge = el.shadowRoot?.querySelector('.badge');

    // ASSERT
    expect(visualBadge).not.toBeNull();
    expect(visuallyHidden).not.toBeNull();
    expect(visuallyHidden?.textContent).toContain('5');
  });

  test('applies appropriate color class', async () => {
    // ARRANGE
    const el = await fixture<MuBadge>(html`<mu-badge color="error"></mu-badge>`);

    // ACT
    const badge = el.shadowRoot?.querySelector('.badge');

    // ASSERT
    expect(badge?.classList.contains('color-error')).toBe(true);
  });

  test('invisible property toggles invisible class', async () => {
    // ARRANGE
    const el = await fixture<MuBadge>(html`<mu-badge invisible></mu-badge>`);

    // ACT
    const badge = el.shadowRoot?.querySelector('.badge');

    // ASSERT
    expect(badge?.classList.contains('invisible')).toBe(true);
  });
});
