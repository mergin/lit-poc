import {describe, it, expect, beforeEach} from 'vitest';
import {MuChipInput} from '../mu-chip-input.js';
import '../mu-chip-input.js';

describe('MuChipInput — unit', (): void => {
  let el: MuChipInput;

  beforeEach((): void => {
    // ARRANGE
    el = new MuChipInput();
  });

  it('is an instance of MuChipInput', (): void => {
    // ARRANGE
    const instance = document.createElement('mu-chip-input');

    // ACT — none

    // ASSERT
    expect(instance).toBeInstanceOf(MuChipInput);

    // CLEANUP — none
  });

  it('defaults: empty chips array', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.chips).toEqual([]);

    // CLEANUP — none
  });

  it('defaults: placeholder is "Add\u2026"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.placeholder).toBe('Add\u2026');

    // CLEANUP — none
  });

  it('defaults: disabled is false', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.disabled).toBe(false);

    // CLEANUP — none
  });

  it('chips property accepts an array of strings', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.chips = ['a', 'b', 'c'];

    // ASSERT
    expect(el.chips).toEqual(['a', 'b', 'c']);

    // CLEANUP — none
  });

  it('is form-associated', (): void => {
    // ARRANGE — none

    // ACT — none

    // ASSERT
    expect((MuChipInput as unknown as {formAssociated: boolean}).formAssociated).toBe(true);

    // CLEANUP — none
  });
});
