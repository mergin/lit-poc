import {describe, bench} from 'vitest';
import {MuPopover} from '../mu-popover.js';

describe('MuPopover — perf', () => {
  bench('instantiation', () => {
    new MuPopover();
  });

  bench('property write — open', () => {
    const el = new MuPopover();
    el.open = true;
  });

  bench('property write — placement', () => {
    const el = new MuPopover();
    el.placement = 'top';
  });
});
