import {describe, bench} from 'vitest';
import {MuTooltip} from '../mu-tooltip.js';

describe('MuTooltip — performance', (): void => {
  bench('instantiation', (): void => {
    new MuTooltip();
  });

  bench('property write — label', (): void => {
    const el = new MuTooltip();
    el.label = 'Save document';
  });

  bench('property write — placement', (): void => {
    const el = new MuTooltip();
    el.placement = 'bottom';
  });
});
