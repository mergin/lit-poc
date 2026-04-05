import {bench, describe} from 'vitest';
import {MuAlert} from '../mu-alert';

describe('mu-alert performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuAlert();
  });

  bench('severity property cycle', () => {
    // ARRANGE
    const el = new MuAlert();

    // ACT
    el.severity = 'success';
    el.severity = 'info';
    el.severity = 'warning';
    el.severity = 'error';
  });
});
