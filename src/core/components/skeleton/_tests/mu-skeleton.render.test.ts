import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-skeleton';
import type {MuSkeleton} from '../mu-skeleton';

describe('mu-skeleton render', () => {
  test('renders a span with correct variant class', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(html`<mu-skeleton variant="circular"></mu-skeleton>`);

    // ACT
    const span = el.shadowRoot?.querySelector('.skeleton');

    // ASSERT
    expect(span).not.toBeNull();
    expect(span?.classList.contains('variant-circular')).toBe(true);
  });

  test('renders pulse animation class by default', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(html`<mu-skeleton></mu-skeleton>`);

    // ACT
    const span = el.shadowRoot?.querySelector('.skeleton');

    // ASSERT
    expect(span?.classList.contains('animation-pulse')).toBe(true);
  });

  test('renders wave animation class when set', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(html`<mu-skeleton animation="wave"></mu-skeleton>`);

    // ACT
    const span = el.shadowRoot?.querySelector('.skeleton');

    // ASSERT
    expect(span?.classList.contains('animation-wave')).toBe(true);
  });

  test('renders no animation class when animation is false', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(html`<mu-skeleton></mu-skeleton>`);
    el.animation = false;
    await el.updateComplete;

    // ACT
    const span = el.shadowRoot?.querySelector('.skeleton');

    // ASSERT
    expect(span?.classList.contains('animation-pulse')).toBe(false);
    expect(span?.classList.contains('animation-wave')).toBe(false);
  });

  test('applies inline width and height styles', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(
      html`<mu-skeleton
        width="200px"
        height="80px"
      ></mu-skeleton>`
    );

    // ACT
    const span = el.shadowRoot?.querySelector<HTMLElement>('.skeleton');

    // ASSERT
    expect(span?.style.width).toBe('200px');
    expect(span?.style.height).toBe('80px');
  });

  test('is hidden from assistive technology', async () => {
    // ARRANGE
    const el = await fixture<MuSkeleton>(html`<mu-skeleton></mu-skeleton>`);

    // ACT
    const span = el.shadowRoot?.querySelector('.skeleton');

    // ASSERT
    expect(span?.getAttribute('aria-hidden')).toBe('true');
    expect(span?.getAttribute('role')).toBe('presentation');
  });
});
