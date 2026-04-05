import {expect, test, describe} from 'vitest';
import {MuLocaleProvider, localeContext} from '../mu-locale-provider';
import {defaultLocale} from '../default-locale';

describe('mu-locale-provider unit', () => {
  test('MuLocaleProvider is defined', () => {
    // ARRANGE
    const el = document.createElement('mu-locale-provider');

    // ACT
    // (no action needed)

    // ASSERT
    expect(el).toBeInstanceOf(MuLocaleProvider);
  });

  test('default locale chip.deleteLabel returns correct string', () => {
    // ARRANGE
    // (using defaultLocale directly)

    // ACT
    const result = defaultLocale.chip.deleteLabel('My Tag');

    // ASSERT
    expect(result).toBe('Delete My Tag');
  });

  test('default locale badge.defaultLabel returns correct string', () => {
    // ARRANGE
    // (using defaultLocale directly)

    // ACT
    const result = defaultLocale.badge.defaultLabel(5);

    // ASSERT
    expect(result).toBe('Badge content: 5');
  });

  test('default locale badge.defaultLabel uses "new" when content is empty', () => {
    // ARRANGE
    // (using defaultLocale directly)

    // ACT
    const result = defaultLocale.badge.defaultLabel('');

    // ASSERT
    expect(result).toBe('Badge content: new');
  });

  test('default locale snackbar.closeLabel is "Dismiss"', () => {
    // ARRANGE
    // (using defaultLocale directly)

    // ACT
    const label = defaultLocale.snackbar.closeLabel;

    // ASSERT
    expect(label).toBe('Dismiss');
  });

  test('default locale dialog.closeLabel is "Close"', () => {
    // ARRANGE
    // (using defaultLocale directly)

    // ACT
    const label = defaultLocale.dialog.closeLabel;

    // ASSERT
    expect(label).toBe('Close');
  });

  test('localeContext is defined', () => {
    // ARRANGE
    // (no arrangement needed)

    // ACT
    // (no action needed)

    // ASSERT
    expect(localeContext).toBeDefined();
  });

  test('MuLocaleProvider defaults to defaultLocale', () => {
    // ARRANGE
    const el = new MuLocaleProvider();

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.locale).toBe(defaultLocale);
  });
});
