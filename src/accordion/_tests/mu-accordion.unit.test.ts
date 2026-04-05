import {expect, test, describe} from 'vitest';
import {MuAccordion} from '../mu-accordion';
import {MuAccordionItem} from '../mu-accordion-item';

describe('mu-accordion unit', () => {
  test('MuAccordion is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-accordion');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuAccordion);
  });

  test('MuAccordionItem is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-accordion-item');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuAccordionItem);
  });

  test('allowMultiple defaults to false', () => {
    // ARRANGE
    const el = new MuAccordion();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.allowMultiple).toBe(false);
  });

  test('MuAccordionItem defaults', () => {
    // ARRANGE
    const el = new MuAccordionItem();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.expanded).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.heading).toBe('');
  });
});
