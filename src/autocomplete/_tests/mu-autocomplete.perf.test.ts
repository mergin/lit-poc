import {describe, bench} from 'vitest';
import {MuAutocomplete} from '../mu-autocomplete.js';

describe('MuAutocomplete — perf', () => {
  bench('instantiation', () => {
    new MuAutocomplete();
  });

  bench('property write — value', () => {
    const el = new MuAutocomplete();
    el.value = 'us';
  });

  bench('property write — options (100 items)', () => {
    const el = new MuAutocomplete();
    el.options = Array.from({length: 100}, (_, i) => ({value: `opt-${i}`, label: `Option ${i}`}));
  });

  bench('property write — disabled', () => {
    const el = new MuAutocomplete();
    el.disabled = true;
  });
});
