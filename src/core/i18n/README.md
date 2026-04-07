# mu-locale-provider

Context provider for internationalisation (i18n). Wraps descendant components and supplies a `MuLocale` object that overrides built-in English strings for accessible labels, button labels, and other user-visible text.

## Import

```ts
import './src/core/i18n/mu-locale-provider.js';
import {defaultLocale} from './src/core/i18n/default-locale.js';
import type {MuLocale} from './src/core/i18n/default-locale.js';
```

Or via the package entry point:

```ts
import {MuLocaleProvider, localeContext, defaultLocale} from '@mu/components/locale-provider';
import type {MuLocale} from '@mu/components/locale-provider';
```

## Usage

### Default (English, no provider required)

All components work without a provider in the DOM — they fall back to the built-in `defaultLocale` automatically.

```html
<mu-chip
  label="React"
  deletable
></mu-chip>
<mu-badge content="5"><span>Messages</span></mu-badge>
<mu-snackbar
  message="Saved"
  open
></mu-snackbar>
```

### Custom locale

Wrap the components you want to localise inside `<mu-locale-provider>` and set the `.locale` property to an object that satisfies `MuLocale`.

```html
<mu-locale-provider id="provider">
  <mu-chip
    label="React"
    deletable
  ></mu-chip>
  <mu-badge content="5"><span>Nachrichten</span></mu-badge>
  <mu-snackbar
    message="Gespeichert"
    open
  ></mu-snackbar>
</mu-locale-provider>

<script type="module">
  import {defaultLocale} from './src/core/i18n/default-locale.js';

  document.getElementById('provider').locale = {
    ...defaultLocale,
    chip: {deleteLabel: (label) => `Entfernen ${label}`},
    snackbar: {closeLabel: 'Verwerfen'},
  };
</script>
```

### TypeScript — strongly typed locale

```ts
import {defaultLocale, type MuLocale} from './src/core/i18n/default-locale.js';

const germanLocale: MuLocale = {
  chip: {deleteLabel: (label: string): string => `Entfernen ${label}`},
  badge: {defaultLabel: (content: string | number): string => `Ausweis: ${content}`},
  dialog: {closeLabel: 'Schließen'},
  snackbar: {closeLabel: 'Verwerfen'},
};

const provider = document.querySelector('mu-locale-provider');
if (provider) {
  provider.locale = germanLocale;
}
```

## Properties

| Property | Type       | Default         | Description                                                          |
| -------- | ---------- | --------------- | -------------------------------------------------------------------- |
| `locale` | `MuLocale` | `defaultLocale` | Locale object provided to all descendant components via Lit Context. |

## The `MuLocale` Interface

```ts
interface MuLocale {
  /** Strings used by mu-chip. */
  chip: {
    /** Returns the aria-label for the delete button. Receives the chip label. */
    deleteLabel: (label: string) => string;
  };
  /** Strings used by mu-badge. */
  badge: {
    /** Returns the visually-hidden accessible label. Receives the badge content value. */
    defaultLabel: (content: string | number) => string;
  };
  /** Strings used by mu-dialog. */
  dialog: {
    /** Aria-label for the close button. */
    closeLabel: string;
  };
  /** Strings used by mu-snackbar. */
  snackbar: {
    /** Aria-label for the dismiss button. */
    closeLabel: string;
  };
}
```

## Default locale values

| Key                         | Default English value                                             |
| --------------------------- | ----------------------------------------------------------------- |
| `chip.deleteLabel(label)`   | `"Delete {label}"`                                                |
| `badge.defaultLabel(value)` | `"Badge content: {value}"` (or `"Badge content: new"` when empty) |
| `dialog.closeLabel`         | `"Close"`                                                         |
| `snackbar.closeLabel`       | `"Dismiss"`                                                       |

## Accessibility

- Components that consume locale strings (`mu-chip`, `mu-badge`, `mu-snackbar`) always have an accessible name regardless of locale.
- The provider itself renders only a `<slot>` and does not add any HTML structure or ARIA roles.
- All locale strings are passed as `aria-label` or visually-hidden text so that screen readers receive the localised copy.

## Slots

| Slot      | Description                                       |
| --------- | ------------------------------------------------- |
| (default) | Child components that consume the locale context. |
