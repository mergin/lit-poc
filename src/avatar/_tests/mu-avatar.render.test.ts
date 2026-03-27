import {fixture, html, expect} from '@open-wc/testing';
import '../mu-avatar';

describe('mu-avatar render', () => {
  // ARRANGE
  it('renders initials when no src', async () => {
    // ACT
    const el = await fixture(html`<mu-avatar initials="AB"></mu-avatar>`);
    // ASSERT
    expect(el.shadowRoot?.textContent).to.include('AB');
  });

  it('renders image when src is set', async () => {
    // ACT
    const el = await fixture(
      html`<mu-avatar
        src="img.png"
        alt="Avatar"
      ></mu-avatar>`
    );
    // ASSERT
    const img = el.shadowRoot?.querySelector('img');
    expect(img).to.exist;
    expect(img?.getAttribute('src')).to.equal('img.png');
    expect(img?.getAttribute('alt')).to.equal('Avatar');
  });
});
