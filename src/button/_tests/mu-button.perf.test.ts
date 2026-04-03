import {bench, describe} from 'vitest';
import {MuButton} from '../mu-button';

describe('mu-button performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuButton();
  });

  bench('property writes — all props', () => {
    // ARRANGE
    const el = new MuButton();

    // ACT
    el.size = 'large';
    el.variant = 'outlined';
    el.color = 'secondary';
    el.disabled = false;
  });

  bench('property writes — disabled state toggle', () => {
    // ARRANGE
    const el = new MuButton();

    // ACT
    el.disabled = true;
    el.disabled = false;
  });

  bench('property writes — variant cycle', () => {
    // ARRANGE
    const el = new MuButton();

    // ACT
    el.variant = 'contained';
    el.variant = 'outlined';
    el.variant = 'icon';
  });
});
