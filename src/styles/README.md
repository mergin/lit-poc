# Design Tokens

This directory contains all design tokens for the `lit-poc` component library.
Tokens are defined in TypeScript (`tokens.ts`) for type-safe JS/TS consumption
and in JSON (`tokens.json`) for [Style Dictionary](https://amzn.github.io/style-dictionary/)
tooling and cross-platform export.

---

## Usage

### CSS (via `mu-theme-provider`)

Wrap your application with `<mu-theme-provider>` to inject all tokens as CSS
custom properties. The provider handles color tokens (light/dark modes) and
injects spacing, elevation, motion, and shape tokens as static `:host` rules.

```html
<mu-theme-provider mode="light">
  <!-- your app -->
</mu-theme-provider>
```

### CSS (standalone stylesheet)

Import the pre-built stylesheet for frameworks that prefer plain CSS:

```css
@import 'lit-poc/tokens.css';
```

Or in HTML:

```html
<link
  rel="stylesheet"
  href="node_modules/lit-poc/dist/tokens.css"
/>
```

### JavaScript / TypeScript

Import token maps directly for dynamic theming or documentation tooling:

```typescript
import {
  spacingTokens,
  elevationTokens,
  motionTokens,
  shapeTokens,
  lightTokens,
  darkTokens,
} from 'lit-poc/tokens';
```

---

## Token Scales

### Spacing (`--mu-spacing-*`)

Base unit: **4 px**. Multipliers follow a numeric T-shirt scale.

| Token             | Value |
| ----------------- | ----- |
| `--mu-spacing-0`  | 0px   |
| `--mu-spacing-1`  | 4px   |
| `--mu-spacing-2`  | 8px   |
| `--mu-spacing-3`  | 12px  |
| `--mu-spacing-4`  | 16px  |
| `--mu-spacing-5`  | 20px  |
| `--mu-spacing-6`  | 24px  |
| `--mu-spacing-8`  | 32px  |
| `--mu-spacing-10` | 40px  |
| `--mu-spacing-12` | 48px  |
| `--mu-spacing-16` | 64px  |

### Elevation (`--mu-elevation-*`)

Material-style layered box-shadow values. Higher numbers = more "lifted".

| Token              | Value                                                      |
| ------------------ | ---------------------------------------------------------- |
| `--mu-elevation-0` | none                                                       |
| `--mu-elevation-1` | `0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)`     |
| `--mu-elevation-2` | `0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23)`     |
| `--mu-elevation-3` | `0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23)`   |
| `--mu-elevation-4` | `0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)` |

### Motion (`--mu-duration-*`, `--mu-easing-*`)

Duration tokens correspond roughly to perceived interaction weight.
All duration tokens are overridden to `0ms` when
`@media (prefers-reduced-motion: reduce)` is active.

#### Durations

| Token                    | Value |
| ------------------------ | ----- |
| `--mu-duration-shortest` | 150ms |
| `--mu-duration-shorter`  | 200ms |
| `--mu-duration-short`    | 250ms |
| `--mu-duration-standard` | 300ms |
| `--mu-duration-complex`  | 375ms |

#### Easing curves

| Token                    | Value                          |
| ------------------------ | ------------------------------ |
| `--mu-easing-standard`   | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--mu-easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)`   |
| `--mu-easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)`   |
| `--mu-easing-sharp`      | `cubic-bezier(0.4, 0, 0.6, 1)` |

### Shape (`--mu-radius-*`)

Named border-radius scale. Use `--mu-radius-full` for pill / fully-rounded shapes.

| Token              | Value  |
| ------------------ | ------ |
| `--mu-radius-none` | 0px    |
| `--mu-radius-sm`   | 2px    |
| `--mu-radius-md`   | 4px    |
| `--mu-radius-lg`   | 8px    |
| `--mu-radius-xl`   | 12px   |
| `--mu-radius-full` | 9999px |

---

## Build

Run Style Dictionary to regenerate `dist/tokens.css` and `dist/tokens.json`:

```bash
npm run build:tokens
```

This is run automatically as part of the release process.
