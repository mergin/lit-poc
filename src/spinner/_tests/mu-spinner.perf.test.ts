import {bench, describe} from 'vitest';
import {MuSpinner} from '../mu-spinner';

describe('mu-spinner performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuSpinner();
  });

  bench('size property assignment', () => {
    // ARRANGE
    const el = new MuSpinner();

    // ACT
    el.size = 'small';
    el.size = 'large';
    el.size = 'medium';
  });

  bench('value and indeterminate toggle', () => {
    // ARRANGE
    const el = new MuSpinner();

    // ACT
    el.value = 50;
    el.indeterminate = false;
    el.indeterminate = true;
    el.value = undefined;
  });
});
