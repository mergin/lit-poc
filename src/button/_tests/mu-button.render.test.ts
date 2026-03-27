import {fixture, html, expect} from '@open-wc/testing';
import '../mu-button';

describe('mu-button render', () => {
  // ARRANGE
  it('renders with text', async () => {
    // ACT
    const el = await fixture(html`<mu-button>Click me</mu-button>`);
    // ASSERT
    expect(el.shadowRoot?.textContent).to.include('Click me');
  });

  it('renders as disabled', async () => {
    // ACT
    const el = await fixture(html`<mu-button disabled></mu-button>`);
    // ASSERT
    const btn = el.shadowRoot?.querySelector('button');
    expect(btn?.hasAttribute('disabled')).to.be.true;
  });
});
