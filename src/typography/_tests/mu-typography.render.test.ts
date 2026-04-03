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

  test('renders h2 tag for h2 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h2">H2</mu-typography>`);
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('h2')).not.toBeNull();
  });

  test('renders h3 tag for h3 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h3">H3</mu-typography>`);
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('h3')).not.toBeNull();
  });

  test('renders h4 tag for h4 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h4">H4</mu-typography>`);
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('h4')).not.toBeNull();
  });

  test('renders h5 tag for h5 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h5">H5</mu-typography>`);
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('h5')).not.toBeNull();
  });

  test('renders h6 tag for h6 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(html`<mu-typography variant="h6">H6</mu-typography>`);
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('h6')).not.toBeNull();
  });

  test('renders p.body2 for body2 variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(
      html`<mu-typography variant="body2">Body</mu-typography>`
    );
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('p.body2')).not.toBeNull();
  });

  test('renders span.caption for caption variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(
      html`<mu-typography variant="caption">Cap</mu-typography>`
    );
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('span.caption')).not.toBeNull();
  });

  test('renders span.overline for overline variant', async () => {
    // ARRANGE
    const el = await fixture<MuTypography>(
      html`<mu-typography variant="overline">Over</mu-typography>`
    );
    // ACT / ASSERT
    expect(el.shadowRoot?.querySelector('span.overline')).not.toBeNull();
  });
});
