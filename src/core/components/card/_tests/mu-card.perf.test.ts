import {bench, describe} from 'vitest';
import {MuCard, MuCardHeader, MuCardContent, MuCardActions} from '../mu-card';

describe('mu-card performance', () => {
  describe('MuCard', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuCard();
    });
  });

  describe('MuCardHeader', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuCardHeader();
    });

    bench('property writes — title only', () => {
      // ARRANGE
      const el = new MuCardHeader();

      // ACT
      el.title = 'My Card Title';
    });

    bench('property writes — title and subtitle', () => {
      // ARRANGE
      const el = new MuCardHeader();

      // ACT
      el.title = 'My Card Title';
      el.subtitle = 'Supporting details go here';
    });
  });

  describe('MuCardContent', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuCardContent();
    });
  });

  describe('MuCardActions', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuCardActions();
    });
  });
});
