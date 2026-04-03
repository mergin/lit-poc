import {describe, bench} from 'vitest';
import {MuTextField} from '../mu-text-field.js';

describe('MuTextField — performance', (): void => {
  bench('instantiation', (): void => {
    new MuTextField();
  });

  bench('property write — value', (): void => {
    const el = new MuTextField();
    el.value = 'hello world';
  });

  bench('property write — error', (): void => {
    const el = new MuTextField();
    el.error = 'Required field';
  });
});
