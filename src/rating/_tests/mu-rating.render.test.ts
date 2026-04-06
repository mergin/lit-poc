import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuRating} from '../mu-rating.js';
import '../mu-rating.js';

describe('MuRating — render', () => {
  let el: MuRating;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuRating>(
      html`<mu-rating
        value="3"
        label="Rating"
      ></mu-rating>`
    );
  });

  it('renders a radiogroup', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const group = el.shadowRoot?.querySelector('[role="radiogroup"]');
    // ASSERT
    expect(group).to.exist;
    // CLEANUP — none
  });

  it('renders 5 stars by default', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const stars = el.shadowRoot?.querySelectorAll('[role="radio"]');
    // ASSERT
    expect(stars?.length).to.equal(5);
    // CLEANUP — none
  });

  it('renders max stars according to max property', async () => {
    // ARRANGE
    el = await fixture<MuRating>(html`<mu-rating max="3"></mu-rating>`);
    // ACT
    const stars = el.shadowRoot?.querySelectorAll('[role="radio"]');
    // ASSERT
    expect(stars?.length).to.equal(3);
    // CLEANUP — none
  });

  it('first 3 stars have aria-checked="true" when value=3', async () => {
    // ARRANGE — done in beforeEach (value=3)
    // ACT
    const stars = [...(el.shadowRoot?.querySelectorAll('[role="radio"]') ?? [])];
    // ASSERT
    expect(stars[0].getAttribute('aria-checked')).to.equal('true');
    expect(stars[1].getAttribute('aria-checked')).to.equal('true');
    expect(stars[2].getAttribute('aria-checked')).to.equal('true');
    expect(stars[3].getAttribute('aria-checked')).to.equal('false');
    expect(stars[4].getAttribute('aria-checked')).to.equal('false');
    // CLEANUP — none
  });

  it('emits change event when star is clicked', async () => {
    // ARRANGE — done in beforeEach
    let received: number | undefined;
    el.addEventListener('change', (e: Event) => {
      received = (e as CustomEvent<{value: number}>).detail.value;
    });
    // ACT
    const stars = el.shadowRoot?.querySelectorAll<HTMLElement>('[role="radio"]');
    stars?.[4].click();
    // ASSERT
    expect(received).to.equal(5);
    // CLEANUP — none
  });

  it('does not emit change when readonly', async () => {
    // ARRANGE
    el = await fixture<MuRating>(
      html`<mu-rating
        readonly
        value="3"
      ></mu-rating>`
    );
    let called = false;
    el.addEventListener('change', () => {
      called = true;
    });
    // ACT
    const stars = el.shadowRoot?.querySelectorAll<HTMLElement>('[role="radio"]');
    stars?.[4].click();
    // ASSERT
    expect(called).to.be.false;
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
