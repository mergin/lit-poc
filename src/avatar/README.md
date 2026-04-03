# mu-avatar

A Minimal/MUI-style avatar component for user/profile images or initials. Supports three sizes, six color variants, and gracefully falls back from image to initials.

## Import

```ts
import './src/avatar/mu-avatar.js';
```

## Usage

```html
<!-- Image avatar -->
<mu-avatar
  src="/photo.jpg"
  alt="Jane Doe"
></mu-avatar>

<!-- Initials avatar -->
<mu-avatar
  initials="JD"
  color="secondary"
></mu-avatar>

<!-- Large avatar -->
<mu-avatar
  initials="AB"
  size="large"
  color="success"
></mu-avatar>
```

## Properties

| Property   | Type                                                                      | Default     | Description                                    |
| ---------- | ------------------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `src`      | `string \| null`                                                          | `null`      | Image URL. When set, renders an `<img>` tag.   |
| `alt`      | `string`                                                                  | `''`        | Alt text for the image (accessibility).        |
| `initials` | `string`                                                                  | `''`        | Fallback text shown when no image is provided. |
| `size`     | `'small' \| 'medium' \| 'large'`                                          | `'medium'`  | Controls the width/height of the avatar.       |
| `color`    | `'primary' \| 'secondary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Background color when showing initials.        |

## Accessibility

- When using `src`, always provide a meaningful `alt` description.
- Initials-only avatars are decorative by default; wrap in a parent with an `aria-label` if they convey identity.
