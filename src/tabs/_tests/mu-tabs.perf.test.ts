import {bench, describe} from 'vitest';
import {MuTabs} from '../mu-tabs';
import {MuTab} from '../mu-tab';
import {MuTabPanel} from '../mu-tab-panel';

describe('mu-tabs performance', () => {
  bench('MuTabs instantiation', () => {
    // ARRANGE / ACT
    new MuTabs();
  });

  bench('MuTab instantiation', () => {
    // ARRANGE / ACT
    new MuTab();
  });

  bench('MuTabPanel instantiation', () => {
    // ARRANGE / ACT
    new MuTabPanel();
  });

  bench('selectedIndex assignment', () => {
    // ARRANGE
    const el = new MuTabs();

    // ACT
    el.selectedIndex = 1;
    el.selectedIndex = 2;
    el.selectedIndex = 0;
  });
});
