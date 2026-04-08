import {bench, describe} from 'vitest';
import {MuAccordion} from '../mu-accordion';
import {MuAccordionItem} from '../mu-accordion-item';

describe('mu-accordion performance', () => {
  bench('MuAccordion instantiation', () => {
    // ARRANGE / ACT
    new MuAccordion();
  });

  bench('MuAccordionItem instantiation', () => {
    // ARRANGE / ACT
    new MuAccordionItem();
  });

  bench('expanded toggle', () => {
    // ARRANGE
    const el = new MuAccordionItem();

    // ACT
    el.expanded = true;
    el.expanded = false;
  });
});
