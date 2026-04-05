import {bench, describe} from 'vitest';
import {MuLinearProgress} from '../mu-linear-progress';

describe('mu-linear-progress performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuLinearProgress();
  });

  bench('value property assignment', () => {
    // ARRANGE
    const el = new MuLinearProgress();

    // ACT
    el.value = 25;
    el.value = 50;
    el.value = 75;
    el.value = 100;
  });

  bench('indeterminate toggle', () => {
    // ARRANGE
    const el = new MuLinearProgress();

    // ACT
    el.indeterminate = true;
    el.indeterminate = false;
  });
});
