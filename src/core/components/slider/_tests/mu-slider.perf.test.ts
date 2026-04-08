import {describe, bench} from 'vitest';
import {MuSlider} from '../mu-slider.js';

describe('MuSlider — perf', () => {
  bench('instantiation', () => {
    new MuSlider();
  });

  bench('property write — value', () => {
    const el = new MuSlider();
    el.value = 50;
  });

  bench('property write — disabled', () => {
    const el = new MuSlider();
    el.disabled = true;
  });

  bench('property write — label', () => {
    const el = new MuSlider();
    el.label = 'Volume';
  });
});
