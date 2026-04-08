import {describe, it, expect, beforeEach} from 'vitest';
import {MuMenu} from '../mu-menu.js';
import {MuMenuItem} from '../mu-menu-item.js';

describe('MuMenu — unit', () => {
  let menu: MuMenu;

  beforeEach(() => {
    // ARRANGE
    menu = new MuMenu();
  });

  it('should be an instance of MuMenu', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(menu).toBeInstanceOf(MuMenu);
    // CLEANUP — none
  });

  it('should have correct default property values', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(menu.open).toBe(false);
    expect(menu.placement).toBe('bottom-start');
    // CLEANUP — none
  });

  it('should accept open property', () => {
    // ARRANGE — done in beforeEach
    // ACT
    menu.open = true;
    // ASSERT
    expect(menu.open).toBe(true);
    // CLEANUP — none
  });

  it('should accept placement property', () => {
    // ARRANGE — done in beforeEach
    // ACT
    menu.placement = 'top-end';
    // ASSERT
    expect(menu.placement).toBe('top-end');
    // CLEANUP — none
  });
});

describe('MuMenuItem — unit', () => {
  let item: MuMenuItem;

  beforeEach(() => {
    // ARRANGE
    item = new MuMenuItem();
  });

  it('should be an instance of MuMenuItem', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(item).toBeInstanceOf(MuMenuItem);
    // CLEANUP — none
  });

  it('should have correct default property values', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(item.label).toBe('');
    expect(item.disabled).toBe(false);
    // CLEANUP — none
  });

  it('should accept label', () => {
    // ARRANGE — done in beforeEach
    // ACT
    item.label = 'Delete';
    // ASSERT
    expect(item.label).toBe('Delete');
    // CLEANUP — none
  });

  it('should accept disabled', () => {
    // ARRANGE — done in beforeEach
    // ACT
    item.disabled = true;
    // ASSERT
    expect(item.disabled).toBe(true);
    // CLEANUP — none
  });
});
