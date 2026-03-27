import {fixture, html, expect} from '@open-wc/testing';
import '../mu-icon';

describe('mu-icon e2e', () => {
  // ARRANGE
  it('should be focusable', async () => {
    // ACT
    const el = await fixture(
      html`<mu-icon
        tabindex="0"
        name="star"
      ></mu-icon>`
    );
    (el as HTMLElement).focus();
    // ASSERT
    expect(document.activeElement).to.equal(el);
    // CLEANUP
    (el as HTMLElement).blur();
  });
});
