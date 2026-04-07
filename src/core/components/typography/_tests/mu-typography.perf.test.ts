import {bench, describe} from 'vitest';
import {MuTypography} from '../mu-typography';

describe('mu-typography performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuTypography();
  });

  bench('property writes — heading variants', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    el.variant = 'h1';
    el.variant = 'h2';
    el.variant = 'h3';
    el.variant = 'h4';
    el.variant = 'h5';
    el.variant = 'h6';
  });

  bench('property writes — body variants', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    el.variant = 'body1';
    el.variant = 'body2';
  });

  bench('property writes — inline variants', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    el.variant = 'caption';
    el.variant = 'overline';
  });

  bench('property writes — full variant cycle', () => {
    // ARRANGE
    const el = new MuTypography();

    // ACT
    el.variant = 'h1';
    el.variant = 'h2';
    el.variant = 'h3';
    el.variant = 'h4';
    el.variant = 'h5';
    el.variant = 'h6';
    el.variant = 'body1';
    el.variant = 'body2';
    el.variant = 'caption';
    el.variant = 'overline';
  });
});
