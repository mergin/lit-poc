import {bench, describe} from 'vitest';
import {MuPagination} from '../mu-pagination';

describe('mu-pagination performance', () => {
  bench('instantiation', () => {
    // ARRANGE / ACT
    new MuPagination();
  });

  bench('page assignment', () => {
    // ARRANGE
    const el = new MuPagination();
    el.count = 100;

    // ACT
    el.page = 1;
    el.page = 50;
    el.page = 100;
  });
});
