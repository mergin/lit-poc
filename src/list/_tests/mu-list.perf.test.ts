import {bench, describe} from 'vitest';
import {MuList} from '../mu-list';
import {MuListItem} from '../mu-list-item';

describe('mu-list performance', () => {
  describe('MuList', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuList();
    });

    bench('property writes — dense mode toggle', () => {
      // ARRANGE
      const el = new MuList();

      // ACT
      el.dense = true;
      el.dense = false;
    });
  });

  describe('MuListItem', () => {
    bench('instantiation', () => {
      // ARRANGE / ACT
      new MuListItem();
    });

    bench('property writes — disabled state toggle', () => {
      // ARRANGE
      const el = new MuListItem();

      // ACT
      el.disabled = true;
      el.disabled = false;
    });
  });
});
