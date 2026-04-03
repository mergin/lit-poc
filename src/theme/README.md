# mu-theme-provider

A lightweight, zero-dependency Lit 3 web component that applies a consistent design-token theme to all descendant components by setting CSS custom properties directly on its host element.

## Overview

`<mu-theme-provider>` wraps your component tree and propagates color tokens via CSS custom property inheritance. Because custom properties cascade through shadow-DOM boundaries, all `mu-*` components nested inside the provider automatically pick up the active theme.

## Usage

```html
<!-- Light mode (default) -->
<mu-theme-provider>
  <mu-button>Hello</mu-button>
</mu-theme-provider>

<!-- Dark mode -->
<mu-theme-provider mode="dark">
  <mu-button>Hello</mu-button>
</mu-theme-provider>
```

```ts
import '@my-org/mu/theme-provider';

const provider = document.querySelector('mu-theme-provider');
provider.mode = 'dark'; // switch at runtime
```

## Properties

| Property | Type                | Default   | Description                                    |
| -------- | ------------------- | --------- | ---------------------------------------------- |
| `mode`   | `'light' \| 'dark'` | `'light'` | Active color scheme; reflects as an attribute. |

## CSS Custom Properties Provided

| Token                     | Light value | Dark value |
| ------------------------- | ----------- | ---------- |
| `--mu-primary`            | `#1976d2`   | `#90caf9`  |
| `--mu-primary-light`      | `#42a5f5`   | `#bbdefb`  |
| `--mu-primary-dark`       | `#1565c0`   | `#42a5f5`  |
| `--mu-primary-contrast`   | `#fff`      | `#000`     |
| `--mu-secondary`          | `#9c27b0`   | `#ce93d8`  |
| `--mu-secondary-light`    | `#ba68c8`   | `#f3e5f5`  |
| `--mu-secondary-dark`     | `#7b1fa2`   | `#ab47bc`  |
| `--mu-secondary-contrast` | `#fff`      | `#000`     |
| `--mu-error`              | `#d32f2f`   | `#ef9a9a`  |
| `--mu-warning`            | `#ed6c02`   | `#ffcc80`  |
| `--mu-info`               | `#0288d1`   | `#81d4fa`  |
| `--mu-success`            | `#2e7d32`   | `#a5d6a7`  |
| `--mu-bg-default`         | `#f9fafb`   | `#121212`  |
| `--mu-bg-paper`           | `#fff`      | `#1e1e1e`  |
| `--mu-divider`            | `#e0e0e0`   | `#424242`  |
| `--mu-text-primary`       | `#212b36`   | `#f5f5f5`  |
| `--mu-text-secondary`     | `#637381`   | `#bdbdbd`  |
| `--mu-text-disabled`      | `#919eab`   | `#757575`  |

## Without the provider — static CSS fallback

If you prefer not to use the provider, import the flat CSS file instead:

```html
<link
  rel="stylesheet"
  href="node_modules/@my-org/mu/dist/theme.css"
/>
```

This applies the light tokens to `:root` and automatically switches to dark tokens via `@media (prefers-color-scheme: dark)`.

## Accessibility

- The host uses `display: contents` so the provider element is invisible to layout and assistive technology.
- Switching `mode` at runtime causes no layout shift; only color custom properties are updated.
- Ensure sufficient contrast when customising tokens; all defaults meet WCAG AA.

## Testing

Three test suites cover this component:

- `_tests/mu-theme-provider.unit.test.ts` — token export and class property contracts
- `_tests/mu-theme-provider.render.test.ts` — DOM rendering, token application, and reactive updates
- `_tests/mu-theme-provider.e2e.test.ts` — Playwright integration tests via `dev/theme.html`
