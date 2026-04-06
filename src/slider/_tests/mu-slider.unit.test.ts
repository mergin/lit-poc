import {describe, it, expect, beforeEach} from 'vitest';
import {MuSlider} from '../mu-slider.js';

describe('MuSlider — unit', () => {
  let slider: MuSlider;

  beforeEach(() => {
    // ARRANGE
    slider = new MuSlider();
  });

  it('should be an instance of MuSlider', () => {
    // ARRANGE — already done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(slider).toBeInstanceOf(MuSlider);
  });

  it('should have correct default property values', () => {
    // ARRANGE — already done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(slider.value).toBe(0);
    expect(slider.min).toBe(0);
    expect(slider.max).toBe(100);
    expect(slider.step).toBe(1);
    expect(slider.disabled).toBe(false);
    expect(slider.label).toBe('');
    expect(slider.name).toBe('');
    // CLEANUP — none
  });

  it('should accept custom value', () => {
    // ARRANGE — already done in beforeEach
    // ACT
    slider.value = 42;
    // ASSERT
    expect(slider.value).toBe(42);
    // CLEANUP — none
  });

  it('should accept min and max', () => {
    // ARRANGE — already done in beforeEach
    // ACT
    slider.min = -10;
    slider.max = 10;
    // ASSERT
    expect(slider.min).toBe(-10);
    expect(slider.max).toBe(10);
    // CLEANUP — none
  });

  it('should accept step', () => {
    // ARRANGE — already done in beforeEach
    // ACT
    slider.step = 5;
    // ASSERT
    expect(slider.step).toBe(5);
    // CLEANUP — none
  });

  it('should accept disabled', () => {
    // ARRANGE — already done in beforeEach
    // ACT
    slider.disabled = true;
    // ASSERT
    expect(slider.disabled).toBe(true);
    // CLEANUP — none
  });

  it('should accept label', () => {
    // ARRANGE — already done in beforeEach
    // ACT
    slider.label = 'Volume';
    // ASSERT
    expect(slider.label).toBe('Volume');
    // CLEANUP — none
  });

  it('should be form-associated', () => {
    // ARRANGE — already done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect((MuSlider as typeof MuSlider & {formAssociated: boolean}).formAssociated).toBe(true);
    // CLEANUP — none
  });
});
