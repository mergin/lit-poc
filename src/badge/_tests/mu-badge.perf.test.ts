import {bench, describe} from 'vitest';
import {MuBadge} from '../mu-badge';

describe('mu-badge performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuBadge();
  });

  bench('property writes — numeric content', () => {
    // ARRANGE
    const el = new MuBadge();

    // ACT
    el.content = 42;
    el.color = 'error';
    el.invisible = false;
    el.label = 'Unread messages: 42';
  });

  bench('property writes — dot badge (empty content)', () => {
    // ARRANGE
    const el = new MuBadge();

    // ACT
    el.content = '';
    el.color = 'success';
    el.invisible = false;
  });

  bench('property writes — hidden badge', () => {
    // ARRANGE
    const el = new MuBadge();

    // ACT
    el.content = 5;
    el.invisible = true;
  });
});
