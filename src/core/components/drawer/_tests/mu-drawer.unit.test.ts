import {expect, test, describe} from 'vitest';
import {MuDrawer} from '../mu-drawer';

describe('mu-drawer unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-drawer');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuDrawer);
  });

  test('defaults', () => {
    // ARRANGE
    const el = new MuDrawer();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.open).toBe(false);
    expect(el.placement).toBe('left');
    expect(el.width).toBe('280px');
  });

  test('accepts placement and width', () => {
    // ARRANGE
    const el = new MuDrawer();

    // ACT
    el.placement = 'right';
    el.width = '320px';

    // ASSERT
    expect(el.placement).toBe('right');
    expect(el.width).toBe('320px');
  });
});
