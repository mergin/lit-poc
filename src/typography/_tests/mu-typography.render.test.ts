import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-typography';
import type {MuTypography} from '../mu-typography';

describe('mu-typography render', () => {
  test('renders using correct semantic h1 tag', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(
      html`<mu-typography variant="h1">Header</mu-typography>`
    );

    // ACT
    const h1 = el.shadowRoot?.querySelector('h1');

    // ASSERT
    expect(h1).not.toBeNull();

    // CLEANUP
    // (fixture auto-cleans)
  });

  test('renders using correct semantic p tag with body1 class', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(
      html`<mu-typography variant="body1">Body</mu-typography>`
    );

    // ACT
    const p = el.shadowRoot?.querySelector('p.body1');

    // ASSERT
    expect(p).not.toBeNull();
  });

  test('updates semantic tag when variant changes', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h2">Test</mu-typography>`);

    // ACT
    el.variant = 'h3';
    await el.updateComplete;

    // ASSERT
    expect(el.shadowRoot?.querySelector('h2')).toBeNull();
    expect(el.shadowRoot?.querySelector('h3')).not.toBeNull();
  });
});
