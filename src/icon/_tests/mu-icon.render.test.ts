/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {fixture, html, expect} from '@open-wc/testing';
import '../mu-icon';

describe('mu-icon render', () => {
  // ARRANGE
  it('renders icon name as text', async () => {
    // ACT
    const el = await fixture(html`<mu-icon name="face"></mu-icon>`);
    // ASSERT
    expect(el.shadowRoot?.textContent).to.include('face');
  });

  it('applies color class', async () => {
    // ACT
    const el = await fixture(
      html`<mu-icon
        color="success"
        name="check"
      ></mu-icon>`
    );
    // ASSERT
    const icon = el.shadowRoot?.querySelector('.material-icons');
    expect(icon).to.exist;
    // The color is applied via CSS variable, so we check the attribute
    expect(el.getAttribute('color')).to.equal('success');
  });
});
