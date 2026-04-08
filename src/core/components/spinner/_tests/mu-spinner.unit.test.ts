import {expect, test, describe} from 'vitest';
import {MuSpinner} from '../mu-spinner';

describe('mu-spinner unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-spinner');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuSpinner);
  });

  test('defaults are medium size and indeterminate', () => {
    // ARRANGE
    const el = new MuSpinner();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.size).toBe('medium');
    expect(el.indeterminate).toBe(true);
    expect(el.value).toBeUndefined();
  });

  test('accepts size, value, color and indeterminate', () => {
    // ARRANGE
    const el = new MuSpinner();

    // ACT
    el.size = 'large';
    el.value = 75;
    el.color = '#ff0000';
    el.indeterminate = false;

    // ASSERT
    expect(el.size).toBe('large');
    expect(el.value).toBe(75);
    expect(el.color).toBe('#ff0000');
    expect(el.indeterminate).toBe(false);
  });
});
