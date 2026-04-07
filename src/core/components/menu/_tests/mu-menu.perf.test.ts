import {describe, bench} from 'vitest';
import {MuMenu} from '../mu-menu.js';
import {MuMenuItem} from '../mu-menu-item.js';

describe('MuMenu — perf', () => {
  bench('MuMenu instantiation', () => {
    new MuMenu();
  });

  bench('MuMenuItem instantiation', () => {
    new MuMenuItem();
  });

  bench('MuMenu property write — open', () => {
    const el = new MuMenu();
    el.open = true;
  });

  bench('MuMenuItem property write — label', () => {
    const el = new MuMenuItem();
    el.label = 'Delete';
  });
});
