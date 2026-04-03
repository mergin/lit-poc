import {bench, describe} from 'vitest';
import {MuAvatar} from '../mu-avatar';

describe('mu-avatar performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuAvatar();
  });

  bench('property writes — all props', () => {
    // ARRANGE
    const el = new MuAvatar();

    // ACT
    el.src = 'https://example.com/avatar.jpg';
    el.alt = 'Jane Doe';
    el.initials = 'JD';
    el.size = 'large';
    el.color = 'secondary';
  });

  bench('property writes — initials only (no image)', () => {
    // ARRANGE
    const el = new MuAvatar();

    // ACT
    el.initials = 'AB';
    el.size = 'small';
    el.color = 'primary';
  });
});
