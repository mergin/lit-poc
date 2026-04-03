# mu-divider

A semantic separator component that renders a native `<hr>` element. Supports horizontal (block) and vertical (inline) orientations.

## Import

```ts
import './src/divider/mu-divider.js';
```

## Usage

```html
<!-- Horizontal (default) -->
<mu-divider></mu-divider>

<!-- Vertical (inside a flex container) -->
<div style="display: flex; height: 32px; align-items: center; gap: 8px;">
  <span>Section A</span>
  <mu-divider orientation="vertical"></mu-divider>
  <span>Section B</span>
</div>
```

## Properties

| Property      | Type                         | Default        | Description                           |
| ------------- | ---------------------------- | -------------- | ------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Controls the layout axis of the rule. |

## Accessibility

- Renders a native `<hr role="separator">` with `aria-orientation` set to match the `orientation` property.
- Color is driven by the `--mu-divider` CSS custom property (default `#e0e0e0`).
