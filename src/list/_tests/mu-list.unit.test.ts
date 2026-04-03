import {expect, test, describe} from 'vitest';
import {MuList} from '../mu-list';
import {MuListItem} from '../mu-list-item';

describe('mu-list unit', () => {
  test('MuList is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-list');

    // ACT
    // (none)

    // ASSERT
    expect(el).toBeInstanceOf(MuList);
  });

  test('MuListItem is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-list-item');

    // ACT
    // (none)

    // ASSERT
    expect(el).toBeInstanceOf(MuListItem);
  });

  test('MuList defaults to not dense', () => {
    // ARRANGE
    const el = new MuList();

    // ACT
    // (none)

    // ASSERT
    expect(el.dense).toBe(false);
  });
});
