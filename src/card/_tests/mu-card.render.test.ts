import {fixture, html, expect} from '@open-wc/testing';
import '../mu-card';

describe('mu-card render', () => {
  // ARRANGE
  it('renders header, content, and actions slots', async () => {
    // ACT
    const el = await fixture(html`
      <mu-card>
        <div slot="header">Header</div>
        <div>Content</div>
        <div slot="actions">Actions</div>
      </mu-card>
    `);
    // ASSERT
    expect(el.shadowRoot?.textContent).to.include('Header');
    expect(el.shadowRoot?.textContent).to.include('Content');
    expect(el.shadowRoot?.textContent).to.include('Actions');
  });
});
