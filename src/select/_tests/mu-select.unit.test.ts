import {describe, it, expect, beforeEach} from 'vitest';
import {MuSelect} from '../mu-select.js';

describe('MuSelect — unit', (): void => {
  let el: MuSelect;

  beforeEach((): void => {
    // ARRANGE
    el = new MuSelect();
  });

  it('is an instance of MuSelect', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-select');

    // ASSERT
    expect(instance).toBeInstanceOf(MuSelect);

    // CLEANUP — none
  });

  it('defaults: empty value, label, placeholder', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.value).toBe('');
    expect(el.label).toBe('');
    expect(el.placeholder).toBe('');

    // CLEANUP — none
  });

  it('defaults: not disabled, not required, no error, empty options', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.error).toBe('');
    expect(el.options).toEqual([]);

    // CLEANUP — none
  });

  it('accepts value and label properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.value = 'us';
    el.label = 'Country';

    // ASSERT
    expect(el.value).toBe('us');
    expect(el.label).toBe('Country');

    // CLEANUP — none
  });

  it('accepts options array', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.options = [
      {value: 'a', label: 'Option A'},
      {value: 'b', label: 'Option B'},
    ];

    // ASSERT
    expect(el.options).toHaveLength(2);
    expect(el.options[0].value).toBe('a');

    // CLEANUP — none
  });

  it('accepts error and required properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.error = 'Required field';
    el.required = true;

    // ASSERT
    expect(el.error).toBe('Required field');
    expect(el.required).toBe(true);

    // CLEANUP — none
  });

  it('defaults: multiple is false', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.multiple).toBe(false);

    // CLEANUP — none
  });

  it('accepts multiple property and value as string array', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.multiple = true;
    el.value = ['a', 'b'];

    // ASSERT
    expect(el.multiple).toBe(true);
    expect(el.value).toEqual(['a', 'b']);

    // CLEANUP — none
  });
});
