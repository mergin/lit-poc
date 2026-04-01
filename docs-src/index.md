---
layout: page.11ty.cjs
title: MU Components ⌲ Home
---

# MU Components

A library of [Lit 3](https://lit.dev/) web components inspired by Material UI.
Four components are available: `<mu-avatar>`, `<mu-button>`, `<mu-card>`, and `<mu-icon>`.

## &lt;mu-avatar&gt;

Displays a user avatar with an image or fallback initials. Supports `src`, `alt`, `initials`, `size` (`small` | `medium` | `large`), and `color` properties.

<section class="columns">
  <div>

Render an avatar with initials:

```html
<mu-avatar
  initials="JD"
  size="medium"
></mu-avatar>
```

  </div>
  <div>

<mu-avatar initials="JD" size="medium"></mu-avatar>

  </div>
</section>

<section class="columns">
  <div>

Render an image avatar:

```html
<mu-avatar
  src="https://i.pravatar.cc/80"
  alt="User avatar"
  size="large"
>
</mu-avatar>
```

  </div>
  <div>

<mu-avatar src="https://i.pravatar.cc/80" alt="User avatar" size="large"></mu-avatar>

  </div>
</section>

## &lt;mu-button&gt;

A button with three variants: `contained` (default), `outlined`, and `icon`. Supports `size`, `color`, and `disabled`.

<section class="columns">
  <div>

```html
<mu-button>Save</mu-button>
<mu-button
  variant="outlined"
  color="secondary"
  >Cancel</mu-button
>
<mu-button disabled>Disabled</mu-button>
```

  </div>
  <div>

<mu-button>Save</mu-button>
<mu-button variant="outlined" color="secondary">Cancel</mu-button>
<mu-button disabled>Disabled</mu-button>

  </div>
</section>

<section class="columns">
  <div>

Use the `icon` variant with `<mu-icon>` for icon-only buttons:

```html
<mu-button
  variant="icon"
  aria-label="Add"
>
  <mu-icon name="add"></mu-icon>
</mu-button>
```

  </div>
  <div>

<mu-button variant="icon" aria-label="Add">
  <mu-icon name="add"></mu-icon>
</mu-button>

  </div>
</section>

## &lt;mu-card&gt;

A container with named slots: `header` (accepts `<mu-card-header>`), default content, and `actions`.

<section class="columns">
  <div>

```html
<mu-card>
  <mu-card-header
    slot="header"
    title="Card title"
    subtitle="Card subtitle"
  >
  </mu-card-header>
  <p>Card content goes here.</p>
  <mu-button
    slot="actions"
    variant="outlined"
    >Learn more</mu-button
  >
</mu-card>
```

  </div>
  <div>

<mu-card>
  <mu-card-header slot="header" title="Card title" subtitle="Card subtitle"></mu-card-header>
  <p>Card content goes here.</p>
  <mu-button slot="actions" variant="outlined">Learn more</mu-button>
</mu-card>

  </div>
</section>

## &lt;mu-icon&gt;

A Material Icons wrapper. Accepts a `name` (icon ligature), `size` (`small` | `medium` | `large`), and `color`.

<section class="columns">
  <div>

```html
<mu-icon name="home"></mu-icon>
<mu-icon
  name="star"
  color="warning"
  size="large"
></mu-icon>
<mu-icon
  name="check_circle"
  color="success"
></mu-icon>
```

  </div>
  <div>

<mu-icon name="home"></mu-icon>
<mu-icon name="star" color="warning" size="large"></mu-icon>
<mu-icon name="check_circle" color="success"></mu-icon>

  </div>
</section>
