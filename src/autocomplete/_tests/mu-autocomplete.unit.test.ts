import {describe, it, expect, beforeEach} from 'vitest';
import {MuAutocomplete} from '../mu-autocomplete.js';

describe('MuAutocomplete — unit', () => {
  let el: MuAutocomplete;

  beforeEach(() => {
    // ARRANGE
    el = new MuAutocomplete();
  });

  it('should be an instance of MuAutocomplete', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el).toBeInstanceOf(MuAutocomplete);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el.value).toBe('');
    expect(el.label).toBe('');
    expect(el.options).toEqual([]);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.placeholder).toBe('');
    expect(el.minChars).toBe(1);
    expect(el.name).toBe('');
    // CLEANUP — none
  });

  it('should accept value', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.value = 'us';
    // ASSERT
    expect(el.value).toBe('us');
    // CLEANUP — none
  });

  it('should accept options', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.options = [{value: 'us', label: 'United States'}];
    // ASSERT
    expect(el.options.length).toBe(1);
    expect(el.options[0].value).toBe('us');
    // CLEANUP — none
  });

  it('should accept disabled', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.disabled = true;
    // ASSERT
    expect(el.disabled).toBe(true);
    // CLEANUP — none
  });

  it('should accept minChars', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.minChars = 3;
    // ASSERT
    expect(el.minChars).toBe(3);
    // CLEANUP — none
  });

  it('should be form-associated', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(
      (MuAutocomplete as typeof MuAutocomplete & {formAssociated: boolean}).formAssociated
    ).toBe(true);
    // CLEANUP — none
  });
});
