import {describe, bench} from 'vitest';
import {MuThemeProvider} from '../mu-theme-provider.js';

describe('MuThemeProvider — performance', (): void => {
  bench('instantiation', (): void => {
    new MuThemeProvider();
  });

  bench('property write — mode: dark', (): void => {
    const el = new MuThemeProvider();
    el.mode = 'dark';
  });

  bench('property write — mode toggle light→dark→light', (): void => {
    const el = new MuThemeProvider();
    el.mode = 'dark';
    el.mode = 'light';
  });
});
