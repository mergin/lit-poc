import {expect, test, describe} from 'vitest';
import {MuLinearProgress} from '../mu-linear-progress';

describe('mu-linear-progress unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-linear-progress');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuLinearProgress);
  });

  test('defaults to value 0, not indeterminate', () => {
    // ARRANGE
    const el = new MuLinearProgress();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.value).toBe(0);
    expect(el.indeterminate).toBe(false);
  });

  test('accepts value and indeterminate', () => {
    // ARRANGE
    const el = new MuLinearProgress();

    // ACT
    el.value = 50;
    el.indeterminate = true;

    // ASSERT
    expect(el.value).toBe(50);
    expect(el.indeterminate).toBe(true);
  });
});
