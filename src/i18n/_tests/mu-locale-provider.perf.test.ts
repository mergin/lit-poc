import {describe, bench} from 'vitest';
import {MuLocaleProvider} from '../mu-locale-provider.js';
import {defaultLocale} from '../default-locale.js';
import type {MuLocale} from '../default-locale.js';

const customLocale: MuLocale = {
  chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
  badge: {defaultLabel: (content: string | number): string => `Ausweis: ${content}`},
  dialog: {closeLabel: 'Schließen'},
  snackbar: {closeLabel: 'Verwerfen'},
};

describe('MuLocaleProvider — performance', (): void => {
  bench('instantiation', (): void => {
    new MuLocaleProvider();
  });

  bench('property write — locale: defaultLocale', (): void => {
    const el = new MuLocaleProvider();
    el.locale = defaultLocale;
  });

  bench('property write — locale: customLocale', (): void => {
    const el = new MuLocaleProvider();
    el.locale = customLocale;
  });

  bench('property write — locale toggle default→custom→default', (): void => {
    const el = new MuLocaleProvider();
    el.locale = customLocale;
    el.locale = defaultLocale;
  });
});
