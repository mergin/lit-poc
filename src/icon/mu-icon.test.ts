import {fixture, assert, html} from '@open-wc/testing';
import '../icon/mu-icon.js';

// UNIT TESTS
describe('mu-icon: unit', () => {
  it('reflects properties to attributes', async () => {
    // ARRANGE
    const el = document.createElement('mu-icon') as import('../icon/mu-icon').MuIcon;
    el.name = 'star';
    el.size = 'large';
    el.color = 'info';
    // ACT
    document.body.appendChild(el);
    // ASSERT
    assert.equal(el.getAttribute('name'), 'star');
    assert.equal(el.getAttribute('size'), 'large');
    assert.equal(el.getAttribute('color'), 'info');
    // CLEANUP
    el.remove();
  });
});

// RENDER TESTS
describe('mu-icon: render', () => {
  it('renders icon ligature', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-icon name="star"></mu-icon>`);
    // ASSERT
    assert.include(el.shadowRoot!.textContent, 'star');
  });
});

// E2E TESTS
describe('mu-icon: e2e', () => {
  it('is accessible', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-icon name="star"></mu-icon>`);
    // ASSERT
    await assert.isAccessible(el);
  });
});
