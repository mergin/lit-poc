import {describe, it, expect, beforeEach} from 'vitest';
import {MuTextField} from '../mu-text-field.js';

describe('MuTextField — unit', (): void => {
  let el: MuTextField;

  beforeEach((): void => {
    // ARRANGE
    el = new MuTextField();
  });

  it('is an instance of MuTextField', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-text-field');

    // ASSERT
    expect(instance).toBeInstanceOf(MuTextField);

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

  it('defaults type to "text"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.type).toBe('text');

    // CLEANUP — none
  });

  it('defaults: not disabled, not readonly, not required', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.disabled).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.required).toBe(false);

    // CLEANUP — none
  });

  it('defaults error and helperText to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');

    // CLEANUP — none
  });

  it('accepts all public properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.value = 'hello';
    el.label = 'Name';
    el.placeholder = 'Enter name';
    el.type = 'email';
    el.disabled = true;
    el.required = true;
    el.error = 'Required';
    el.helperText = 'Your full name';

    // ASSERT
    expect(el.value).toBe('hello');
    expect(el.label).toBe('Name');
    expect(el.placeholder).toBe('Enter name');
    expect(el.type).toBe('email');
    expect(el.disabled).toBe(true);
    expect(el.required).toBe(true);
    expect(el.error).toBe('Required');
    expect(el.helperText).toBe('Your full name');

    // CLEANUP — none
  });
});
