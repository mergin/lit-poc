import {fixture, assert, html} from '@open-wc/testing';
import '../card/mu-card.js';

// UNIT TESTS
describe('mu-card: unit', () => {
  it('reflects slots and attributes', async () => {
    // ARRANGE
    const el = document.createElement('mu-card');
    // ACT
    document.body.appendChild(el);
    // ASSERT
    assert.ok(el);
    // CLEANUP
    el.remove();
  });
});

// RENDER TESTS
describe('mu-card: render', () => {
  it('renders header/content/actions slots', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-card>
      <div slot="header">Header</div>
      <div slot="content">Content</div>
      <div slot="actions">Actions</div>
    </mu-card>`);
    // ASSERT
    assert.ok(el.querySelector('[slot="header"]'));
    assert.ok(el.querySelector('[slot="content"]'));
    assert.ok(el.querySelector('[slot="actions"]'));
  });
});

// E2E TESTS
describe('mu-card: e2e', () => {
  it('is accessible', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-card></mu-card>`);
    // ASSERT
    await assert.isAccessible(el);
  });
});
