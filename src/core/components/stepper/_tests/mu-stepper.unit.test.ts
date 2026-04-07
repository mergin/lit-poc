import {describe, it, expect, beforeEach} from 'vitest';
import {MuStepper} from '../mu-stepper.js';
import {MuStep} from '../mu-step.js';

describe('MuStepper — unit', () => {
  let el: MuStepper;

  beforeEach(() => {
    // ARRANGE
    el = new MuStepper();
  });

  it('should be an instance of MuStepper', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el).toBeInstanceOf(MuStepper);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el.activeStep).toBe(0);
    expect(el.orientation).toBe('horizontal');
    expect(el.linear).toBe(true);
    // CLEANUP — none
  });

  it('should accept activeStep', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.activeStep = 2;
    // ASSERT
    expect(el.activeStep).toBe(2);
    // CLEANUP — none
  });

  it('should accept orientation', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.orientation = 'vertical';
    // ASSERT
    expect(el.orientation).toBe('vertical');
    // CLEANUP — none
  });

  it('should accept linear', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.linear = false;
    // ASSERT
    expect(el.linear).toBe(false);
    // CLEANUP — none
  });
});

describe('MuStep — unit', () => {
  let step: MuStep;

  beforeEach(() => {
    // ARRANGE
    step = new MuStep();
  });

  it('should be an instance of MuStep', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(step).toBeInstanceOf(MuStep);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(step.label).toBe('');
    expect(step.state).toBe('disabled');
    expect(step.index).toBe(0);
    // CLEANUP — none
  });

  it('should accept label', () => {
    // ARRANGE — done in beforeEach
    // ACT
    step.label = 'Account';
    // ASSERT
    expect(step.label).toBe('Account');
    // CLEANUP — none
  });

  it('should accept state', () => {
    // ARRANGE — done in beforeEach
    // ACT
    step.state = 'active';
    // ASSERT
    expect(step.state).toBe('active');
    // CLEANUP — none
  });
});
