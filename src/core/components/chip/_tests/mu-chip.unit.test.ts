import {expect, test, describe} from 'vitest';
import {MuChip} from '../mu-chip';

describe('mu-chip unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-chip');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuChip);
  });

  test('defaults to not deletable and default color', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.deletable).toBe(false);
    expect(el.color).toBe('default');
    expect(el.disabled).toBe(false);
  });

  test('accepts properties', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    el.label = 'Tag';
    el.deletable = true;
    el.color = 'secondary';
    el.disabled = true;

    // ASSERT
    expect(el.label).toBe('Tag');
    expect(el.deletable).toBe(true);
    expect(el.color).toBe('secondary');
    expect(el.disabled).toBe(true);
  });
});
