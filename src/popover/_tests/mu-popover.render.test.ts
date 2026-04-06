import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuPopover} from '../mu-popover.js';
import '../mu-popover.js';

describe('MuPopover — render', () => {
  let el: MuPopover;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuPopover>(html`
      <mu-popover>
        <button slot="trigger">Trigger</button>
        <p>Content</p>
      </mu-popover>
    `);
  });

  it('renders trigger slot', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const slot = el.shadowRoot?.querySelector('slot[name="trigger"]');
    // ASSERT
    expect(slot).to.exist;
    // CLEANUP — none
  });

  it('hides content by default', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const content = el.shadowRoot?.querySelector('.content');
    // ASSERT
    expect(content?.hasAttribute('hidden')).to.be.true;
    // CLEANUP — none
  });

  it('shows content when open=true', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.open = true;
    await el.updateComplete;
    const content = el.shadowRoot?.querySelector('.content');
    // ASSERT
    expect(content?.hasAttribute('hidden')).to.be.false;
    // CLEANUP — none
  });

  it('content has role="dialog" by default', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const content = el.shadowRoot?.querySelector('.content');
    // ASSERT
    expect(content?.getAttribute('role')).to.equal('dialog');
    // CLEANUP — none
  });

  it('content has aria-modal="true" when role is dialog', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const content = el.shadowRoot?.querySelector('.content');
    // ASSERT
    expect(content?.getAttribute('aria-modal')).to.equal('true');
    // CLEANUP — none
  });

  it('content has role="tooltip" when popoverrole is tooltip', async () => {
    // ARRANGE
    el = await fixture<MuPopover>(html`
      <mu-popover popoverrole="tooltip">
        <button slot="trigger">T</button>
        <span>tip</span>
      </mu-popover>
    `);
    // ACT
    const content = el.shadowRoot?.querySelector('.content');
    // ASSERT
    expect(content?.getAttribute('role')).to.equal('tooltip');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
