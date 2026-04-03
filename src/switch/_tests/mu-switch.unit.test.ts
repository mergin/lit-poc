import {describe, it, expect, beforeEach} from 'vitest';
import {MuSwitch} from '../mu-switch.js';

describe('MuSwitch — unit', (): void => {
  let el: MuSwitch;

  beforeEach((): void => {
    // ARRANGE
    el = new MuSwitch();
  });

  it('is an instance of MuSwitch', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-switch');

    // ASSERT
    expect(instance).toBeInstanceOf(MuSwitch);

    // CLEANUP — none
  });

  it('defaults: unchecked, not disabled, value "on"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.checked).toBe(false);
    expect(el.disabled).toBe(false);
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

  it('accepts disabled, name, value, and label properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.disabled = true;
    el.name = 'theme';
    el.value = 'dark';
    el.label = 'Dark mode';

    // ASSERT
    expect(el.disabled).toBe(true);
    expect(el.name).toBe('theme');
    expect(el.value).toBe('dark');
    expect(el.label).toBe('Dark mode');

    // CLEANUP — none
  });
});
