import {bench, describe} from 'vitest';
import {MuDivider} from '../mu-divider';

describe('mu-divider performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuDivider();
  });

  bench('property writes — horizontal (default)', () => {
    // ARRANGE
    const el = new MuDivider();

    // ACT
    el.orientation = 'horizontal';
  });

  bench('property writes — vertical', () => {
    // ARRANGE
    const el = new MuDivider();

    // ACT
    el.orientation = 'vertical';
  });

  bench('property writes — orientation toggle', () => {
    // ARRANGE
    const el = new MuDivider();

    // ACT
    el.orientation = 'vertical';
    el.orientation = 'horizontal';
  });
});
