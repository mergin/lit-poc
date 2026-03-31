# mu-button Stories

## Basic Usage

```html
<mu-button>Default</mu-button>
<mu-button color="primary">Primary</mu-button>
<mu-button color="secondary">Secondary</mu-button>
<mu-button color="success">Success</mu-button>
<mu-button color="error">Error</mu-button>
```

## Sizes

```html
<mu-button size="small">Small</mu-button>
<mu-button size="medium">Medium</mu-button>
<mu-button size="large">Large</mu-button>
```

## Variants

```html
<mu-button variant="contained">Contained</mu-button>
<mu-button variant="outlined">Outlined</mu-button>
<mu-button variant="icon">
  <mu-icon name="star"></mu-icon>
</mu-button>
```

## Disabled

```html
<mu-button disabled>Disabled</mu-button>
<mu-button
  color="primary"
  disabled
  >Primary Disabled</mu-button
>
```

## With Icon

```html
<mu-button>
  <mu-icon
    name="check_circle"
    slot="icon"
  ></mu-icon>
  With Icon
</mu-button>
```
