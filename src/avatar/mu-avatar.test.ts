import {fixture, assert, html} from '@open-wc/testing';
import '../avatar/mu-avatar.js';

// UNIT TESTS
describe('mu-avatar: unit', () => {
  // ARRANGE, ACT, ASSERT
  it('reflects properties to attributes', async () => {
    // ARRANGE
    const el = document.createElement('mu-avatar') as import('../avatar/mu-avatar').MuAvatar;
    el.initials = 'XY';
    el.size = 'large';
    el.color = 'info';
    // ACT
    document.body.appendChild(el);
    // ASSERT
    assert.equal(el.getAttribute('initials'), 'XY');
    assert.equal(el.getAttribute('size'), 'large');
    assert.equal(el.getAttribute('color'), 'info');
    // CLEANUP
    el.remove();
  });
});

// RENDER TESTS
describe('mu-avatar: render', () => {
  it('renders initials when no src', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-avatar initials="AB"></mu-avatar>`);
    // ASSERT
    assert.shadowDom.equal(el, `<span>AB</span>`);
  });
  it('renders image when src is set', async () => {
    // ARRANGE
    const el = await fixture(
      html`<mu-avatar
        src="img.png"
        alt="desc"
      ></mu-avatar>`
    );
    // ASSERT
    const img = el.shadowRoot!.querySelector('img');
    assert.ok(img);
    assert.equal(img?.getAttribute('src'), 'img.png');
    assert.equal(img?.getAttribute('alt'), 'desc');
  });
});

// E2E TESTS
describe('mu-avatar: e2e', () => {
  it('is accessible', async () => {
    // ARRANGE
    const el = await fixture(html`<mu-avatar initials="A"></mu-avatar>`);
    // ASSERT
    await assert.isAccessible(el);
  });
});
