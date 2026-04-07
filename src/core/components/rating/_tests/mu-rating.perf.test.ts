import {describe, bench} from 'vitest';
import {MuRating} from '../mu-rating.js';

describe('MuRating — perf', () => {
  bench('instantiation', () => {
    new MuRating();
  });

  bench('property write — value', () => {
    const el = new MuRating();
    el.value = 3;
  });

  bench('property write — max', () => {
    const el = new MuRating();
    el.max = 10;
  });

  bench('property write — precision', () => {
    const el = new MuRating();
    el.precision = 0.5;
  });
});
