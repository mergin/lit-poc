import {bench, describe} from 'vitest';
import {MuIcon} from '../mu-icon';

describe('mu-icon performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuIcon();
  });

  bench('property writes — named icon, medium size', () => {
    // ARRANGE
    const el = new MuIcon();

    // ACT
    el.name = 'home';
    el.size = 'medium';
    el.color = 'primary';
  });

  bench('property writes — named icon, large size', () => {
    // ARRANGE
    const el = new MuIcon();

    // ACT
    el.name = 'settings';
    el.size = 'large';
    el.color = 'secondary';
  });

  bench('property writes — size cycle', () => {
    // ARRANGE
    const el = new MuIcon();

    // ACT
    el.size = 'small';
    el.size = 'medium';
    el.size = 'large';
  });
});
