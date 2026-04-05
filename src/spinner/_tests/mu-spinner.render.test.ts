import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-spinner';
import type {MuSpinner} from '../mu-spinner';

describe('mu-spinner render', () => {
  test('renders an svg role="progressbar"', async () => {
    // ARRANGE
    const el = await fixture<MuSpinner>(html`<mu-spinner></mu-spinner>`);

    // ACT
    const svg = el.shadowRoot?.querySelector('svg');

    // ASSERT
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('role')).toBe('progressbar');
  });

  test('adds spinning class in indeterminate mode', async () => {
    // ARRANGE
    const el = await fixture<MuSpinner>(html`<mu-spinner></mu-spinner>`);

    // ACT
    const svg = el.shadowRoot?.querySelector('svg');

    // ASSERT
    expect(svg?.classList.contains('spinning')).toBe(true);
  });

  test('removes spinning class in determinate mode', async () => {
    // ARRANGE
    const el = await fixture<MuSpinner>(
      html`<mu-spinner
        .indeterminate="${false}"
        value="50"
      ></mu-spinner>`
    );

    // ACT
    const svg = el.shadowRoot?.querySelector('svg');

    // ASSERT
    expect(svg?.classList.contains('spinning')).toBe(false);
  });

  test('sets aria-valuenow in determinate mode', async () => {
    // ARRANGE
    const el = await fixture<MuSpinner>(
      html`<mu-spinner
        .indeterminate="${false}"
        value="40"
      ></mu-spinner>`
    );

    // ACT
    const svg = el.shadowRoot?.querySelector('svg');

    // ASSERT
    expect(svg?.getAttribute('aria-valuenow')).toBe('40');
  });

  test('renders arc with custom color', async () => {
    // ARRANGE
    const el = await fixture<MuSpinner>(html`<mu-spinner color="#e91e63"></mu-spinner>`);

    // ACT
    const arc = el.shadowRoot?.querySelector('.arc');

    // ASSERT
    expect(arc?.getAttribute('stroke')).toBe('#e91e63');
  });
});
