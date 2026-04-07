import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-tabs';
import '../mu-tab';
import '../mu-tab-panel';
import type {MuTabs} from '../mu-tabs';

describe('mu-tabs render', () => {
  test('renders tablist with slotted tabs', async () => {
    // ARRANGE
    const el = await fixture<MuTabs>(html`
      <mu-tabs>
        <mu-tab slot="tab">Tab 1</mu-tab>
        <mu-tab slot="tab">Tab 2</mu-tab>
        <mu-tab-panel slot="panel">Panel 1</mu-tab-panel>
        <mu-tab-panel slot="panel">Panel 2</mu-tab-panel>
      </mu-tabs>
    `);

    // ACT
    const tabList = el.shadowRoot?.querySelector('[role="tablist"]');

    // ASSERT
    expect(tabList).not.toBeNull();
  });

  test('fires tab-change when a tab is clicked', async () => {
    // ARRANGE
    const el = await fixture<MuTabs>(html`
      <mu-tabs>
        <mu-tab slot="tab">Tab 1</mu-tab>
        <mu-tab slot="tab">Tab 2</mu-tab>
        <mu-tab-panel slot="panel">Panel 1</mu-tab-panel>
        <mu-tab-panel slot="panel">Panel 2</mu-tab-panel>
      </mu-tabs>
    `);
    let changedIndex = -1;
    el.addEventListener('tab-change', (e: Event) => {
      changedIndex = (e as CustomEvent<{index: number}>).detail.index;
    });

    // ACT
    const tabs = Array.from(el.querySelectorAll('mu-tab'));
    const btn = tabs[1].shadowRoot?.querySelector<HTMLButtonElement>('button');
    btn?.click();
    await tabs[1].updateComplete;
    await el.updateComplete;

    // ASSERT
    expect(changedIndex).toBe(1);
    expect(el.selectedIndex).toBe(1);
  });

  test('does not fire tab-change when disabled tab is clicked', async () => {
    // ARRANGE
    const el = await fixture<MuTabs>(html`
      <mu-tabs>
        <mu-tab slot="tab">Tab 1</mu-tab>
        <mu-tab
          slot="tab"
          disabled
        >
          Tab 2
        </mu-tab>
        <mu-tab-panel slot="panel">Panel 1</mu-tab-panel>
        <mu-tab-panel slot="panel">Panel 2</mu-tab-panel>
      </mu-tabs>
    `);
    let fired = false;
    el.addEventListener('tab-change', () => {
      fired = true;
    });

    // ACT
    const tabs = Array.from(el.querySelectorAll('mu-tab'));
    const btn = tabs[1].shadowRoot?.querySelector<HTMLButtonElement>('button');
    btn?.click();
    await el.updateComplete;

    // ASSERT
    expect(fired).toBe(false);
    expect(el.selectedIndex).toBe(0);
  });
});
