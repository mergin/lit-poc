import {expect, test, describe} from 'vitest';
import {MuBadge} from '../mu-badge';

describe('mu-badge unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-badge');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuBadge);
  });

  test('defaults to primary color and empty content', () => {
    // ARRANGE
    const el = new MuBadge();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.content).toBe('');
    expect(el.color).toBe('primary');
    expect(el.invisible).toBe(false);
  });

  test('accepts properties', () => {
    // ARRANGE
    const el = new MuBadge();

    // ACT
    el.content = '99+';
    el.color = 'error';
    el.invisible = true;

    // ASSERT
    expect(el.content).toBe('99+');
    expect(el.color).toBe('error');
    expect(el.invisible).toBe(true);
  });
});
