import {expect, test, describe} from 'vitest';
import {MuSkeleton} from '../mu-skeleton';

describe('mu-skeleton unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-skeleton');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuSkeleton);
  });

  test('defaults are text/pulse', () => {
    // ARRANGE
    const el = new MuSkeleton();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.variant).toBe('text');
    expect(el.animation).toBe('pulse');
    expect(el.width).toBe('');
    expect(el.height).toBe('');
  });

  test('accepts variant, animation, width and height', () => {
    // ARRANGE
    const el = new MuSkeleton();

    // ACT
    el.variant = 'circular';
    el.animation = 'wave';
    el.width = '48px';
    el.height = '48px';

    // ASSERT
    expect(el.variant).toBe('circular');
    expect(el.animation).toBe('wave');
    expect(el.width).toBe('48px');
    expect(el.height).toBe('48px');
  });

  test('accepts animation = false', () => {
    // ARRANGE
    const el = new MuSkeleton();

    // ACT
    el.animation = false;

    // ASSERT
    expect(el.animation).toBe(false);
  });
});
