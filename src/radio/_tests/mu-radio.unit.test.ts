import {describe, it, expect, beforeEach} from 'vitest';
import {MuRadio} from '../mu-radio.js';
import {MuRadioGroup} from '../mu-radio-group.js';

describe('MuRadio — unit', (): void => {
  let el: MuRadio;

  beforeEach((): void => {
    // ARRANGE
    el = new MuRadio();
  });

  it('is an instance of MuRadio', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-radio');

    // ASSERT
    expect(instance).toBeInstanceOf(MuRadio);

    // CLEANUP — none
  });

  it('defaults: unchecked, not disabled, empty name and value', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.name).toBe('');
    expect(el.value).toBe('');

    // CLEANUP — none
  });

  it('accepts checked, name, and value properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.checked = true;
    el.name = 'fruit';
    el.value = 'apple';

    // ASSERT
    expect(el.checked).toBe(true);
    expect(el.name).toBe('fruit');
    expect(el.value).toBe('apple');

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
});

describe('MuRadioGroup — unit', (): void => {
  let group: MuRadioGroup;

  beforeEach((): void => {
    // ARRANGE
    group = new MuRadioGroup();
  });

  it('is an instance of MuRadioGroup', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-radio-group');

    // ASSERT
    expect(instance).toBeInstanceOf(MuRadioGroup);

    // CLEANUP — none
  });

  it('defaults: empty label, not required', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(group.label).toBe('');
    expect(group.required).toBe(false);

    // CLEANUP — none
  });

  it('accepts label and required properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    group.label = 'Choose one';
    group.required = true;

    // ASSERT
    expect(group.label).toBe('Choose one');
    expect(group.required).toBe(true);

    // CLEANUP — none
  });
});
