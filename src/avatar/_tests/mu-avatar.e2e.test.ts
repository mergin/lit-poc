import {fixture, html, expect} from '@open-wc/testing';
import '../mu-avatar';

describe('mu-avatar e2e', () => {
  // ARRANGE
  it('should be focusable and accessible', async () => {
    // ACT
    const el = await fixture(
      html`<mu-avatar
        initials="XY"
        tabindex="0"
      ></mu-avatar>`
    );
    (el as HTMLElement).focus();
    // ASSERT
    expect(document.activeElement).to.equal(el);
    // CLEANUP
    (el as HTMLElement).blur();
  });
});
