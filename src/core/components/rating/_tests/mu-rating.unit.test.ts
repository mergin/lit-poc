import {describe, it, expect, beforeEach} from 'vitest';
import {MuRating} from '../mu-rating.js';

describe('MuRating — unit', () => {
  let el: MuRating;

  beforeEach(() => {
    // ARRANGE
    el = new MuRating();
  });

  it('should be an instance of MuRating', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el).toBeInstanceOf(MuRating);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el.value).toBe(0);
    expect(el.max).toBe(5);
    expect(el.precision).toBe(1);
    expect(el.readonly).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.label).toBe('Rating');
    expect(el.name).toBe('');
    // CLEANUP — none
  });

  it('should accept value', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.value = 3;
    // ASSERT
    expect(el.value).toBe(3);
    // CLEANUP — none
  });

  it('should accept max', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.max = 10;
    // ASSERT
    expect(el.max).toBe(10);
    // CLEANUP — none
  });

  it('should accept precision', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.precision = 0.5;
    // ASSERT
    expect(el.precision).toBe(0.5);
    // CLEANUP — none
  });

  it('should accept readonly', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.readonly = true;
    // ASSERT
    expect(el.readonly).toBe(true);
    // CLEANUP — none
  });

  it('should accept disabled', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.disabled = true;
    // ASSERT
    expect(el.disabled).toBe(true);
    // CLEANUP — none
  });

  it('should be form-associated', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect((MuRating as typeof MuRating & {formAssociated: boolean}).formAssociated).toBe(true);
    // CLEANUP — none
  });
});
