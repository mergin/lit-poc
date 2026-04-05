import {bench, describe} from 'vitest';
import {MuDrawer} from '../mu-drawer';

describe('mu-drawer performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuDrawer();
  });

  bench('open toggle', () => {
    // ARRANGE
    const el = new MuDrawer();

    // ACT
    el.open = true;
    el.open = false;
  });

  bench('placement assignment', () => {
    // ARRANGE
    const el = new MuDrawer();

    // ACT
    el.placement = 'right';
    el.placement = 'left';
  });
});
