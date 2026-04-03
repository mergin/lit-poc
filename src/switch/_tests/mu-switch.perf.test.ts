import {describe, bench} from 'vitest';
import {MuSwitch} from '../mu-switch.js';

describe('MuSwitch — performance', (): void => {
  bench('instantiation', (): void => {
    new MuSwitch();
  });

  bench('property write — checked toggle', (): void => {
    const el = new MuSwitch();
    el.checked = true;
    el.checked = false;
  });
});
