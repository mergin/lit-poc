import {describe, bench} from 'vitest';
import {MuCheckbox} from '../mu-checkbox.js';

describe('MuCheckbox — performance', (): void => {
  bench('instantiation', (): void => {
    new MuCheckbox();
  });

  bench('property write — checked toggle', (): void => {
    const el = new MuCheckbox();
    el.checked = true;
    el.checked = false;
  });

  bench('property write — indeterminate', (): void => {
    const el = new MuCheckbox();
    el.indeterminate = true;
  });
});
