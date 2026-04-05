import {bench, describe} from 'vitest';
import {MuAppBar} from '../mu-app-bar';

describe('mu-app-bar performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuAppBar();
  });

  bench('elevation and color assignment', () => {
    // ARRANGE
    const el = new MuAppBar();

    // ACT
    el.elevation = 0;
    el.color = '#e91e63';
    el.elevation = 1;
  });
});
