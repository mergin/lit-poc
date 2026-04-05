import {bench, describe} from 'vitest';
import {MuSkeleton} from '../mu-skeleton';

describe('mu-skeleton performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuSkeleton();
  });

  bench('variant property assignment', () => {
    // ARRANGE
    const el = new MuSkeleton();

    // ACT
    el.variant = 'circular';
    el.variant = 'rectangular';
    el.variant = 'text';
  });

  bench('animation property toggle', () => {
    // ARRANGE
    const el = new MuSkeleton();

    // ACT
    el.animation = 'wave';
    el.animation = false;
    el.animation = 'pulse';
  });
});
