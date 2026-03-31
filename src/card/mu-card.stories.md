# mu-card Stories

## Basic Usage

```html
<mu-card>
  <div slot="header">Card Header</div>
  <div>Card content goes here.</div>
  <div slot="actions">
    <mu-button>Action</mu-button>
  </div>
</mu-card>
```

## With All Slots

```html
<mu-card>
  <div slot="header">Header</div>
  <div slot="content">Content slot</div>
  <div slot="actions">
    <mu-button color="primary">Save</mu-button>
    <mu-button color="error">Delete</mu-button>
  </div>
</mu-card>
```

## Multiple Cards

```html
<mu-card>
  <div slot="header">First Card</div>
  <div>First card content.</div>
</mu-card>
<mu-card>
  <div slot="header">Second Card</div>
  <div>Second card content.</div>
</mu-card>
```
