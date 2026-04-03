import {expect, test, describe} from 'vitest';
import {MuDivider} from '../mu-divider';

describe('mu-divider unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-divider');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuDivider);
  });

  test('defaults to horizontal orientation', () => {
    // ARRANGE
    const el = new MuDivider();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.orientation).toBe('horizontal');
  });

  test('accepts vertical orientation', () => {
    // ARRANGE
    const el = new MuDivider();

    // ACT
    el.orientation = 'vertical';

    // ASSERT
    expect(el.orientation).toBe('vertical');
  });
});
