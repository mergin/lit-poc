import {bench, describe} from 'vitest';
import {MuChipInput} from '../mu-chip-input.js';

describe('MuChipInput — performance', (): void => {
  bench('instantiation', (): void => {
    // ARRANGE / ACT
    new MuChipInput();
  });

  bench('property writes with initial chips', (): void => {
    // ARRANGE
    const el = new MuChipInput();

    // ACT
    el.chips = ['TypeScript', 'Lit', 'Web Components'];
    el.placeholder = 'Add tag\u2026';
    el.disabled = false;
  });

  bench('adding a chip to an existing array of 10', (): void => {
    // ARRANGE
    const el = new MuChipInput();
    el.chips = Array.from({length: 10}, (_: unknown, i: number): string => `Tag ${i}`);

    // ACT
    el.chips = [...el.chips, 'New Tag'];
  });
});
