import {describe, it, expect, beforeEach} from 'vitest';
import {MuTooltip} from '../mu-tooltip.js';

describe('MuTooltip — unit', (): void => {
  let el: MuTooltip;

  beforeEach((): void => {
    // ARRANGE
    el = new MuTooltip();
  });

  it('is an instance of MuTooltip', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-tooltip');

    // ASSERT
    expect(instance).toBeInstanceOf(MuTooltip);

    // CLEANUP — none
  });

  it('defaults label to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.label).toBe('');

    // CLEANUP — none
  });

  it('defaults placement to "top"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.placement).toBe('top');

    // CLEANUP — none
  });

  it('accepts label property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.label = 'Delete this item';

    // ASSERT
    expect(el.label).toBe('Delete this item');

    // CLEANUP — none
  });

  it('accepts placement property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.placement = 'bottom';

    // ASSERT
    expect(el.placement).toBe('bottom');

    // CLEANUP — none
  });
});
