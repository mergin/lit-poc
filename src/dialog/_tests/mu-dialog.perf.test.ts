import {describe, bench} from 'vitest';
import {MuDialog} from '../mu-dialog.js';

describe('MuDialog — performance', (): void => {
  bench('instantiation', (): void => {
    new MuDialog();
  });

  bench('property write — headline', (): void => {
    const el = new MuDialog();
    el.headline = 'Confirm deletion';
  });

  bench('property write — open toggle', (): void => {
    const el = new MuDialog();
    el.open = true;
    el.open = false;
  });
});
