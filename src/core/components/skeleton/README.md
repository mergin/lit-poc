# mu-skeleton

A placeholder preview component that mimics the shape of content while it is loading.

## Usage

```html
<mu-skeleton variant="text"></mu-skeleton>
<mu-skeleton
  variant="circular"
  width="48px"
  height="48px"
></mu-skeleton>
<mu-skeleton
  variant="rectangular"
  width="300px"
  height="150px"
></mu-skeleton>
```

## Properties

| Property    | Type                                    | Default   | Description                          |
| ----------- | --------------------------------------- | --------- | ------------------------------------ |
| `variant`   | `'text' \| 'circular' \| 'rectangular'` | `'text'`  | Shape of the skeleton placeholder.   |
| `width`     | `string`                                | `''`      | CSS width override.                  |
| `height`    | `string`                                | `''`      | CSS height override.                 |
| `animation` | `'pulse' \| 'wave' \| false`            | `'pulse'` | Animation type; `false` disables it. |

## Accessibility

The skeleton element is marked `aria-hidden="true"` and `role="presentation"` so it is invisible to assistive technology.
