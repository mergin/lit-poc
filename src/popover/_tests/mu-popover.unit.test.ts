import {describe, it, expect, beforeEach} from 'vitest';
import {MuPopover} from '../mu-popover.js';

describe('MuPopover — unit', () => {
  let el: MuPopover;

  beforeEach(() => {
    // ARRANGE
    el = new MuPopover();
  });

  it('should be an instance of MuPopover', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(el).toBeInstanceOf(MuPopover);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action needed
    // ASSERT
    expect(el.open).toBe(false);
    expect(el.placement).toBe('bottom');
    expect(el.closeOnOutsideClick).toBe(true);
    expect(el.popoverrole).toBe('dialog');
    // CLEANUP — none
  });

  it('should accept open property', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.open = true;
    // ASSERT
    expect(el.open).toBe(true);
    // CLEANUP — none
  });

  it('should accept placement', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.placement = 'top';
    // ASSERT
    expect(el.placement).toBe('top');
    // CLEANUP — none
  });

  it('should accept closeOnOutsideClick', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.closeOnOutsideClick = false;
    // ASSERT
    expect(el.closeOnOutsideClick).toBe(false);
    // CLEANUP — none
  });
});
