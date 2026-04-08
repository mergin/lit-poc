import {expect, test, describe} from 'vitest';
import {MuTabs} from '../mu-tabs';
import {MuTab} from '../mu-tab';
import {MuTabPanel} from '../mu-tab-panel';

describe('mu-tabs unit', () => {
  test('MuTabs is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-tabs');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuTabs);
  });

  test('MuTab is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-tab');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuTab);
  });

  test('MuTabPanel is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-tab-panel');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuTabPanel);
  });

  test('MuTabs defaults to selectedIndex 0', () => {
    // ARRANGE
    const el = new MuTabs();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.selectedIndex).toBe(0);
  });

  test('MuTab defaults to not selected, not disabled', () => {
    // ARRANGE
    const el = new MuTab();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.selected).toBe(false);
    expect(el.disabled).toBe(false);
  });

  test('MuTabPanel defaults to not active', () => {
    // ARRANGE
    const el = new MuTabPanel();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.active).toBe(false);
  });

  it('MuTabs defaults: orientation is horizontal, scrollable is false', (): void => {
    // ARRANGE
    const tabs = new MuTabs();

    // ACT — none

    // ASSERT
    expect(tabs.orientation).toBe('horizontal');
    expect(tabs.scrollable).toBe(false);
  });

  it('MuTabs accepts vertical orientation', (): void => {
    // ARRANGE
    const tabs = new MuTabs();

    // ACT
    tabs.orientation = 'vertical';

    // ASSERT
    expect(tabs.orientation).toBe('vertical');
  });

  it('MuTabs accepts scrollable property', (): void => {
    // ARRANGE
    const tabs = new MuTabs();

    // ACT
    tabs.scrollable = true;

    // ASSERT
    expect(tabs.scrollable).toBe(true);
  });
});
