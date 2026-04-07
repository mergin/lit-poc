import {expect, test, describe} from 'vitest';
import {MuTypography} from '../mu-typography';

describe('mu-typography unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-typography');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuTypography);
  });

  test('defaults to body1 variant', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.variant).toBe('body1');
  });

  test('accepts other variants via property', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    el.variant = 'h1';

    // ASSERT
    expect(el.variant).toBe('h1');
  });
});
