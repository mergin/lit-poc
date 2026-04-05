import {expect, test, describe} from 'vitest';
import {MuAlert} from '../mu-alert';

describe('mu-alert unit', () => {
  test('is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-alert');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuAlert);
  });

  test('defaults to info severity', () => {
    // ARRANGE
    const el = new MuAlert();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.severity).toBe('info');
    expect(el.closeLabel).toBe('');
  });

  test('accepts all severity values', () => {
    // ARRANGE
    const el = new MuAlert();

    // ACT + ASSERT
    for (const s of ['success', 'info', 'warning', 'error'] as const) {
      el.severity = s;
      expect(el.severity).toBe(s);
    }
  });

  test('closeLabel can be set', () => {
    // ARRANGE
    const el = new MuAlert();

    // ACT
    el.closeLabel = 'Close';

    // ASSERT
    expect(el.closeLabel).toBe('Close');
  });
});
