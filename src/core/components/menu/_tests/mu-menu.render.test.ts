import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuMenu} from '../mu-menu.js';
import type {MuMenuItem} from '../mu-menu-item.js';
import '../mu-menu.js';
import '../mu-menu-item.js';

describe('MuMenu — render', () => {
  let el: MuMenu;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuMenu>(html`
      <mu-menu>
        <button slot="trigger">Trigger</button>
        <mu-menu-item label="Edit"></mu-menu-item>
        <mu-menu-item label="Delete"></mu-menu-item>
      </mu-menu>
    `);
  });

  it('renders the trigger slot', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const triggerSlot = el.shadowRoot?.querySelector('slot[name="trigger"]');
    // ASSERT
    expect(triggerSlot).to.exist;
    // CLEANUP — none
  });

  it('hides the menu by default', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const menu = el.shadowRoot?.querySelector('.menu');
    // ASSERT
    expect(menu?.hasAttribute('hidden')).to.be.true;
    // CLEANUP — none
  });

  it('shows the menu when open=true', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.open = true;
    await el.updateComplete;
    const menu = el.shadowRoot?.querySelector('.menu');
    // ASSERT
    expect(menu?.hasAttribute('hidden')).to.be.false;
    // CLEANUP — none
  });

  it('renders the list with role="menu"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const menuEl = el.shadowRoot?.querySelector('[role="menu"]');
    // ASSERT
    expect(menuEl).to.exist;
    // CLEANUP — none
  });
});

describe('MuMenuItem — render', () => {
  let item: MuMenuItem;

  beforeEach(async () => {
    // ARRANGE
    item = await fixture<MuMenuItem>(html`<mu-menu-item label="Edit"></mu-menu-item>`);
  });

  it('renders a button with role="menuitem"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const btn = item.shadowRoot?.querySelector('[role="menuitem"]');
    // ASSERT
    expect(btn).to.exist;
    // CLEANUP — none
  });

  it('button has tabindex="-1"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const btn = item.shadowRoot?.querySelector('button');
    // ASSERT
    expect(btn?.getAttribute('tabindex')).to.equal('-1');
    // CLEANUP — none
  });

  it('button is disabled when disabled prop is true', async () => {
    // ARRANGE
    item = await fixture<MuMenuItem>(
      html`<mu-menu-item
        label="Edit"
        disabled
      ></mu-menu-item>`
    );
    // ACT
    const btn = item.shadowRoot?.querySelector('button');
    // ASSERT
    expect(btn?.hasAttribute('disabled')).to.be.true;
    // CLEANUP — none
  });

  it('emits mu-select on click', async () => {
    // ARRANGE — done in beforeEach
    let selected: string | undefined;
    item.addEventListener('mu-select', (e: Event) => {
      selected = (e as CustomEvent<{label: string}>).detail.label;
    });
    // ACT
    (item.shadowRoot?.querySelector('button') as HTMLButtonElement).click();
    // ASSERT
    expect(selected).to.equal('Edit');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — wrap in required parent role for axe compliance
    const wrapper = await fixture<HTMLDivElement>(
      html`<div role="menu"><mu-menu-item label="Edit"></mu-menu-item></div>`
    );
    const menuItem = wrapper.querySelector<MuMenuItem>('mu-menu-item')!;
    // ACT + ASSERT
    await expect(menuItem).to.be.accessible();
    // CLEANUP — none
  });
});
