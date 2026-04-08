import {describe, bench} from 'vitest';
import {MuSelect} from '../mu-select.js';

describe('MuSelect — performance', (): void => {
  bench('instantiation', (): void => {
    new MuSelect();
  });

  bench('property write — value', (): void => {
    const el = new MuSelect();
    el.value = 'option-a';
  });

  bench('property write — options array', (): void => {
    const el = new MuSelect();
    el.options = [
      {value: 'a', label: 'Alpha'},
      {value: 'b', label: 'Beta'},
      {value: 'c', label: 'Gamma'},
    ];
  });
});
