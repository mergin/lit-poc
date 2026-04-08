import {expect, test, describe} from 'vitest';
import {MuPagination} from '../mu-pagination';

describe('mu-pagination unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-pagination');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuPagination);
  });

  test('defaults', () => {
    // ARRANGE
    const el = new MuPagination();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.count).toBe(1);
    expect(el.page).toBe(1);
    expect(el.siblingCount).toBe(1);
    expect(el.disabled).toBe(false);
  });

  test('accepts count, page and siblingCount', () => {
    // ARRANGE
    const el = new MuPagination();

    // ACT
    el.count = 20;
    el.page = 10;
    el.siblingCount = 2;

    // ASSERT
    expect(el.count).toBe(20);
    expect(el.page).toBe(10);
    expect(el.siblingCount).toBe(2);
  });
});
