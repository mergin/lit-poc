import {describe, bench} from 'vitest';
import {MuRadio} from '../mu-radio.js';
import {MuRadioGroup} from '../mu-radio-group.js';

describe('MuRadio — performance', (): void => {
  bench('instantiation', (): void => {
    new MuRadio();
  });

  bench('property write — checked', (): void => {
    const el = new MuRadio();
    el.checked = true;
  });
});

describe('MuRadioGroup — performance', (): void => {
  bench('instantiation', (): void => {
    new MuRadioGroup();
  });
});
