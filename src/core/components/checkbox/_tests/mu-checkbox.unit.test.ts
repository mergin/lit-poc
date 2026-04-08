import {describe, it, expect, beforeEach} from 'vitest';
import {MuCheckbox} from '../mu-checkbox.js';

describe('MuCheckbox — unit', (): void => {
  let el: MuCheckbox;

  beforeEach((): void => {
    // ARRANGE
    el = new MuCheckbox();
  });

  it('is an instance of MuCheckbox', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-checkbox');

    // ASSERT
    expect(instance).toBeInstanceOf(MuCheckbox);

    // CLEANUP — none
  });

  it('defaults: unchecked, not indeterminate, not disabled', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.disabled).toBe(false);

    // CLEANUP — none
  });

  it('defaults value to "on" and name to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.value).toBe('on');
    expect(el.name).toBe('');

    // CLEANUP — none
  });

  it('accepts checked property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.checked = true;

    // ASSERT
    expect(el.checked).toBe(true);

    // CLEANUP — none
  });

  it('accepts indeterminate property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.indeterminate = true;

    // ASSERT
    expect(el.indeterminate).toBe(true);

    // CLEANUP — none
  });

  it('accepts disabled property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.disabled = true;

    // ASSERT
    expect(el.disabled).toBe(true);

    // CLEANUP — none
  });

  it('accepts label, name, and value properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.label = 'Accept';
    el.name = 'terms';
    el.value = 'yes';

    // ASSERT
    expect(el.label).toBe('Accept');
    expect(el.name).toBe('terms');
    expect(el.value).toBe('yes');

    // CLEANUP — none
  });
});
