import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-divider';
import type {MuDivider} from '../mu-divider';

describe('mu-divider render', () => {
  test('renders native hr element', async () => {
    // ARRANGE
    const el = await fixture<MuDivider>(html`<mu-divider></mu-divider>`);

    // ACT
    const hr = el.shadowRoot?.querySelector('hr');

    // ASSERT
    expect(hr).not.toBeNull();
    expect(hr?.getAttribute('role')).toBe('separator');
  });

  test('passes orientation to aria attribute', async () => {
    // ARRANGE
    const el = await fixture<MuDivider>(html`<mu-divider orientation="vertical"></mu-divider>`);

    // ACT
    const hr = el.shadowRoot?.querySelector('hr');

    // ASSERT
    expect(hr?.getAttribute('aria-orientation')).toBe('vertical');
  });
});
