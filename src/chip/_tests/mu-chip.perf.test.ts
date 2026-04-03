import {bench, describe} from 'vitest';
import {MuChip} from '../mu-chip';

describe('mu-chip performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuChip();
  });

  bench('property writes — non-deletable chip', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    el.label = 'Label';
    el.color = 'primary';
    el.deletable = false;
    el.disabled = false;
  });

  bench('property writes — deletable chip', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    el.label = 'Removable Tag';
    el.color = 'secondary';
    el.deletable = true;
    el.disabled = false;
  });

  bench('property writes — disabled state toggle', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    el.disabled = true;
    el.disabled = false;
  });

  bench('property writes — color cycle', () => {
    // ARRANGE
    const el = new MuChip();

    // ACT
    el.color = 'default';
    el.color = 'error';
    el.color = 'success';
    el.color = 'warning';
    el.color = 'info';
  });
});
