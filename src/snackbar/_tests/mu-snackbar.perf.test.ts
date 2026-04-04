import {describe, bench} from 'vitest';
import {MuSnackbar} from '../mu-snackbar.js';

describe('MuSnackbar — performance', (): void => {
  bench('instantiation', (): void => {
    new MuSnackbar();
  });

  bench('property write — message', (): void => {
    const el = new MuSnackbar();
    el.message = 'Changes saved successfully';
  });

  bench('property write — open toggle', (): void => {
    const el = new MuSnackbar();
    el.open = true;
    el.open = false;
  });
});
