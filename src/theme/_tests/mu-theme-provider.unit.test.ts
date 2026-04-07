import {describe, it, expect, beforeEach} from 'vitest';
import {MuThemeProvider} from '../mu-theme-provider.js';
import {lightTokens, darkTokens} from '../../tokens/index.js';

describe('MuThemeProvider — unit', (): void => {
  let el: MuThemeProvider;

  beforeEach((): void => {
    // ARRANGE
    el = new MuThemeProvider();
  });

  it('has a default mode of light', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.mode).toBe('light');

    // CLEANUP — none
  });

  it('accepts mode "dark"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.mode = 'dark';

    // ASSERT
    expect(el.mode).toBe('dark');

    // CLEANUP — none
  });

  it('accepts mode "light"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.mode = 'light';

    // ASSERT
    expect(el.mode).toBe('light');

    // CLEANUP — none
  });

  it('exports lightTokens with expected primary color', (): void => {
    // ARRANGE — none

    // ACT — none

    // ASSERT
    expect(lightTokens['--mu-primary']).toBe('#1976d2');

    // CLEANUP — none
  });

  it('exports darkTokens with expected primary color', (): void => {
    // ARRANGE — none

    // ACT — none

    // ASSERT
    expect(darkTokens['--mu-primary']).toBe('#90caf9');

    // CLEANUP — none
  });

  it('lightTokens and darkTokens have the same keys', (): void => {
    // ARRANGE — none

    // ACT
    const lightKeys = Object.keys(lightTokens).sort();
    const darkKeys = Object.keys(darkTokens).sort();

    // ASSERT
    expect(lightKeys).toEqual(darkKeys);

    // CLEANUP — none
  });
});
