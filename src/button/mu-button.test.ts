import {fixture, assert, html, oneEvent} from '@open-wc/testing';
import '../button/mu-button.js';
import '../icon/mu-icon.js';

// UNIT TESTS
describe('mu-button: unit', () => {
  it('reflects properties to attributes', async () => {
    // ARRANGE
    const el = document.createElement('mu-button') as import('../button/mu-button').MuButton;
    el.size = 'large';
    el.variant = 'outlined';
    el.color = 'info';
    el.disabled = true;
    // ACT
    document.body.appendChild(el);
    // ASSERT
    assert.equal(el.getAttribute('size'), 'large');
    assert.equal(el.getAttribute('variant'), 'outlined');
    assert.equal(el.getAttribute('color'), 'info');
    assert.equal(el.hasAttribute('disabled'), true);
    // CLEANUP
    el.remove();
  });
});

// RENDER TESTS
describe('mu-button: render', () => {
  it('renders slot content', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-button>Label</mu-button>`);
    // ASSERT
    assert.include(el.shadowRoot!.textContent, 'Label');
  });
  it('renders icon slot', async () => {
    // ARRANGE
    const el = await fixture(
      html`<mu-button variant="icon"><mu-icon name="star"></mu-icon></mu-button>`
    );
    // ASSERT
    assert.ok(el.querySelector('mu-icon'));
  });
});

// E2E TESTS
describe('mu-button: e2e', () => {
  it('fires click event when enabled', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-button>Click</mu-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    setTimeout(() => button.click());
    // ACT & ASSERT
    await oneEvent(el, 'click');
  });
  it('is accessible', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-button>Accessible</mu-button>`);
    // ASSERT
    await assert.isAccessible(el);
  });
});
