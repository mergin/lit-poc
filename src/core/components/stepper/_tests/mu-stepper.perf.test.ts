import {describe, bench} from 'vitest';
import {MuStepper} from '../mu-stepper.js';
import {MuStep} from '../mu-step.js';

describe('MuStepper — perf', () => {
  bench('MuStepper instantiation', () => {
    new MuStepper();
  });

  bench('MuStep instantiation', () => {
    new MuStep();
  });

  bench('MuStepper property write — activeStep', () => {
    const el = new MuStepper();
    el.activeStep = 2;
  });

  bench('MuStep property write — state', () => {
    const el = new MuStep();
    el.state = 'completed';
  });
});
