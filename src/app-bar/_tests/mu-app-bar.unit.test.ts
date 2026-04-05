import {expect, test, describe} from 'vitest';
import {MuAppBar} from '../mu-app-bar';

describe('mu-app-bar unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-app-bar');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuAppBar);
  });

  test('defaults', () => {
    // ARRANGE
    const el = new MuAppBar();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.elevation).toBe(1);
    expect(el.fixed).toBe(false);
  });

  test('accepts elevation and color', () => {
    // ARRANGE
    const el = new MuAppBar();

    // ACT
    el.elevation = 0;
    el.color = '#e91e63';

    // ASSERT
    expect(el.elevation).toBe(0);
    expect(el.color).toBe('#e91e63');
  });
});
