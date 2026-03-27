import {fixture, html, expect} from '@open-wc/testing';
import '../mu-card';

describe('mu-card e2e', (): void => {
  // ARRANGE
  it('should be focusable', async (): Promise<void> => {
    // ACT
    const el = await fixture(html`<mu-card tabindex="0"></mu-card>`);
    (el as HTMLElement).focus();
    // ASSERT
    expect(document.activeElement).to.equal(el);
    // CLEANUP
    (el as HTMLElement).blur();
  });
});
