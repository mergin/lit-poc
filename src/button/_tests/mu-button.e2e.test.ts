import {fixture, html, expect, oneEvent} from '@open-wc/testing';
import '../mu-button';

describe('mu-button e2e', () => {
  // ARRANGE
  it('fires click event', async () => {
    // ACT
    const el = await fixture(html`<mu-button>Test</mu-button>`);
    const btn = el.shadowRoot?.querySelector('button');
    setTimeout(() => btn?.click());
    // ASSERT
    const event = await oneEvent(el, 'click');
    expect(event).to.exist;
  });
});
