# Lit POC Component Library

A modern, accessible, and compositional web component library built with Lit 3 and TypeScript, following Minimal/MUI design principles.

## Table of Contents

- [Features](#features)
- [Components](#components)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Build](#build)
  - [Development Server](#development-server)
  - [Testing](#testing)
    - [Unit & Render Tests](#unit--render-tests)
    - [End-to-End Tests](#end-to-end-tests)
    - [Performance Tests](#performance-tests)
  - [Linting & Formatting](#linting--formatting)
  - [Static Docs Site](#static-docs-site)
- [Commit Rules](#commit-rules)
- [Project Structure](#project-structure)
- [Tooling](#tooling)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Lit 3 + TypeScript 5**: Strict, maintainable, and type-safe.
- **Minimal/MUI-inspired UI**: Shared styles, tokens, and typography for a consistent look.
- **Compositional Components**: Build complex UIs from small, reusable parts (e.g., `<mu-card>`, `<mu-card-header>`, etc.).
- **Strict Linting & Formatting**: ESLint, Prettier, and lit-analyzer for code quality.
- **Automated Testing**: Uses Vitest (unit, render, and performance benchmarks) and Playwright (E2E tests).
- **Component Explorer**: Storybook for viewing and interacting with components.
- **Static Docs Site**: Built with Eleventy and Vite for demos and API docs.
- **Commit Message Linting**: Enforces Conventional Commits via commitlint and Husky.

---

## Components

All components are available as individual subpath imports (`@your-scope/lit-poc/<component>`) or via the main entry point.

### Layout & Display

| Component        | Tag                           | Description                                                   |
| ---------------- | ----------------------------- | ------------------------------------------------------------- |
| Avatar           | `<mu-avatar>`                 | User avatar with image or initials fallback.                  |
| Badge            | `<mu-badge>`                  | Small status indicator overlaid on content.                   |
| Card             | `<mu-card>`                   | Content container with header, body, and actions slots.       |
| Chip             | `<mu-chip>`                   | Compact element for tags, filters, or actions.                |
| Divider          | `<mu-divider>`                | Horizontal or vertical separator line.                        |
| Icon             | `<mu-icon>`                   | Inline SVG icon wrapper.                                      |
| List / List Item | `<mu-list>`, `<mu-list-item>` | Vertical list container with optional leading/trailing slots. |
| Typography       | `<mu-typography>`             | Semantic text elements (h1–h6, body, caption, overline).      |

### Feedback & Status

| Component       | Tag                    | Description                                                 |
| --------------- | ---------------------- | ----------------------------------------------------------- |
| Alert           | `<mu-alert>`           | Contextual feedback banner (success, info, warning, error). |
| Linear Progress | `<mu-linear-progress>` | Horizontal progress bar (determinate or indeterminate).     |
| Skeleton        | `<mu-skeleton>`        | Animated placeholder for loading states.                    |
| Snackbar        | `<mu-snackbar>`        | Brief notification toasts with optional action.             |
| Spinner         | `<mu-spinner>`         | Circular progress indicator (determinate or indeterminate). |

### Form Inputs

| Component           | Tag                              | Description                                                |
| ------------------- | -------------------------------- | ---------------------------------------------------------- |
| Button              | `<mu-button>`                    | Interactive button with variants and states.               |
| Checkbox            | `<mu-checkbox>`                  | Binary toggle with indeterminate support.                  |
| Radio / Radio Group | `<mu-radio>`, `<mu-radio-group>` | Single-choice radio controls with group management.        |
| Select              | `<mu-select>`                    | Native-backed dropdown with validation support.            |
| Switch              | `<mu-switch>`                    | Toggle switch for boolean settings.                        |
| Text Field          | `<mu-text-field>`                | Single-line text input with label, hint, and error states. |

### Navigation

| Component  | Tag                                       | Description                                                        |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------ |
| App Bar    | `<mu-app-bar>`                            | Sticky application header with leading, title, and trailing slots. |
| Breadcrumb | `<mu-breadcrumb>`, `<mu-breadcrumb-item>` | Hierarchical navigation trail.                                     |
| Pagination | `<mu-pagination>`                         | Page navigation control with ellipsis support.                     |
| Tabs       | `<mu-tabs>`, `<mu-tab>`, `<mu-tab-panel>` | ARIA-compliant tabbed interface.                                   |

### Overlays & Disclosure

| Component | Tag                                     | Description                                            |
| --------- | --------------------------------------- | ------------------------------------------------------ |
| Accordion | `<mu-accordion>`, `<mu-accordion-item>` | Expandable/collapsible sections.                       |
| Dialog    | `<mu-dialog>`                           | Modal dialog with focus trapping and Escape-key close. |
| Drawer    | `<mu-drawer>`                           | Side panel that slides in from left or right.          |
| Tooltip   | `<mu-tooltip>`                          | Contextual hover/focus hint.                           |

### Theme

| Component      | Tag                   | Description                                             |
| -------------- | --------------------- | ------------------------------------------------------- |
| Theme Provider | `<mu-theme-provider>` | Sets CSS custom-property tokens for the component tree. |

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build
```

### Development Server

```bash
npm run serve
```

Open [http://localhost:8000/dev/index.html](http://localhost:8000/dev/index.html) to view the demo.

### Testing

#### Unit & Render Tests

Run all unit and render tests:

```bash
npm run test:unit
```

Watch unit tests during development:

```bash
npm run test:watch
```

#### End-to-End Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

#### Performance Tests

Run all component performance benchmarks:

```bash
npm run test:perf
```

Benchmarks are located alongside each component in `src/<component>/_tests/*.perf.test.ts` and are powered by [Vitest's built-in benchmark runner](https://vitest.dev/guide/features.html#benchmarking) (based on [tinybench](https://github.com/tinylibs/tinybench)).

Each suite measures two dimensions of cost per component:

| Benchmark                      | What it measures                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `instantiation`                | Overhead of `new MuXxx()` — Lit constructor + decorator setup                                    |
| `property writes — <scenario>` | Cost of setting one or more reactive properties (e.g. variant cycle, disabled toggle, all props) |

The output reports `hz` (operations per second), latency percentiles (`p75`, `p99`, `p999`), relative error margin, and a ranked summary — e.g.:

```text
✓ src/typography/_tests/mu-typography.perf.test.ts > mu-typography performance
  · instantiation                          790,011 hz   ±1.00%
  · property writes — full variant cycle   418,498 hz   ±0.95%

Summary
  instantiation
    1.89x faster than property writes — full variant cycle
```

Benchmarks run in the `happy-dom` environment to keep results fast and consistent across machines. Use them as a regression baseline when making changes to component logic or styles.

### Linting & Formatting

Check code quality and auto-fix issues:

```bash
npm run lint
npm run format
```

### Storybook

Run the interactive component explorer:

```bash
npm run storybook
```

Build Storybook for deployment:

```bash
npm run build-storybook
```

### Static Docs Site

Build and serve the documentation:

```bash
npm run docs
npm run docs:serve
```

---

## Commit Rules

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) using commitlint and Husky.

- **Pre-commit**: Runs Prettier, ESLint, and tests on staged files.
- **Commit message**: Must follow the format `type(scope): subject`, e.g.:

```text
feat(card): add header slot to card component
fix: correct button alignment in mu-card-actions
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

If your commit message does not follow the rules, the commit will be rejected.

---

## Project Structure

- `src/` — Source code for all components, unit/E2E tests (inside `_tests/` subfolders), story files (`*.stories.ts`), and shared styles.
- `dev/` — Demo HTML for local development.
- `docs/` — Static documentation site (generated).
- `.storybook/` — Storybook configuration.
- `.husky/` — Git hooks for linting, testing, and commit message checks.

---

## Tooling

- **Linting**: ESLint, lit-analyzer
- **Formatting**: Prettier
- **Pre-commit hooks**: Husky + lint-staged
- **Commit message linting**: commitlint
- **Testing**: Vitest (unit/render/benchmarks), Playwright (E2E)
- **Docs**: Eleventy, Vite
- **Component Workshop**: Storybook

---

## Accessibility (a11y)

This library is built with accessibility as a core requirement. All components must follow these rules:

- Use semantic HTML elements for structure and interaction (button, input, nav, etc.).
- All interactive controls must have an accessible name (visible text, aria-label, or aria-labelledby).
- Ensure all controls are keyboard accessible (Tab, Enter, Space, focus order).
- Provide visible focus indicators for all focusable elements.
- Use ARIA roles and attributes (role, aria-\*, aria-disabled, aria-checked, etc.) to expose state and structure.
- Use disabled and aria-disabled appropriately; disabled controls must not be focusable or actionable.
- All form fields must have associated labels (label, aria-label, or aria-labelledby).
- Use aria-live regions to announce dynamic content, errors, or status changes.
- Ensure color contrast meets WCAG AA requirements for all text and UI elements.
- Never use color as the only means of conveying information; provide icons or text alternatives.
- All images must have meaningful alt text or be marked decorative (aria-hidden or role="presentation").
- Announce validation errors and success states using aria-live or inline text.
- Manage focus for dialogs, overlays, and popovers (trap focus, return focus on close).
- Use role="dialog", aria-modal, and aria-labelledby for modal dialogs.
- Expose state changes via strongly-typed custom events for integration with assistive tech.
- Document accessibility features and keyboard interactions for each component.

**Component compliance:**

- `mu-avatar`: Uses semantic HTML, alt text for images, and is non-interactive.
- `mu-badge`: Visually hides internal elements appropriately or provides accessible labels for alerts.
- `mu-button`: Uses native `<button>`, supports accessible names via slot, keyboard accessible, and uses aria-disabled/disabled.
- `mu-card`: Uses generic flow layout containers with semantic landmarks/headers via compositional slots.
- `mu-chip`: Read-only or actionable with keyboard navigation, dispatches custom `delete` events cleanly.
- `mu-divider`: Typically uses `role="separator"` and is purely presentational unless marked otherwise.
- `mu-icon`: Decorative by default (`aria-hidden="true"`), not interactive.
- `mu-list`: Employs semantic native list roles (`list` and `listitem`) or native tags (`<ul>`, `<li>`).
- `mu-typography`: Renders exact semantic tags (`<h1>` to `<h6>`, `<p>`) to support proper document flow and screen reader landmarks.
- `mu-theme-provider`: Non-visual; wraps content to apply CSS custom-property tokens.
- `mu-checkbox`: Uses a native `<input type="checkbox">` for built-in state exposure; supports `indeterminate`; labelled via slot.
- `mu-radio` / `mu-radio-group`: Uses native `<input type="radio">`; `mu-radio-group` provides `role="radiogroup"` and `aria-labelledby`.
- `mu-switch`: Rendered as `role="switch"` with `aria-checked`; keyboard toggleable via Space.
- `mu-text-field`: Associates a visible `<label>` with the `<input>` via `id`/`for`; surfaces error text in an `aria-live` region.
- `mu-select`: Wraps a native `<select>` for full keyboard and screen-reader support; error exposed via `aria-describedby`.
- `mu-dialog`: Uses a native `<dialog>` for built-in focus trapping and Escape-key close; `aria-modal` and `aria-labelledby` applied.
- `mu-tooltip`: Shown on hover and keyboard focus; tied to the trigger via `aria-describedby`; role="tooltip".
- `mu-snackbar`: Content region is `aria-live="assertive"` or `role="status"` so announcements reach screen readers.
- `mu-skeleton`: Marked `aria-hidden="true"` and `role="presentation"`; completely invisible to assistive technology.
- `mu-spinner`: Exposes `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and conditionally `aria-valuenow`.
- `mu-linear-progress`: Sets `role="progressbar"` and full aria-value attributes on the host; attributes are removed in indeterminate mode.
- `mu-alert`: `role="alert"` for error severity (live assertive); `role="status"` for all others. Icon is `aria-hidden`.
- `mu-tabs` / `mu-tab` / `mu-tab-panel`: Follows the ARIA Tabs pattern — `role="tab"` + `aria-selected`; `role="tabpanel"` + `aria-labelledby`; roving tabindex for arrow-key navigation.
- `mu-accordion` / `mu-accordion-item`: `aria-expanded` on header buttons; `role="region"` with `aria-labelledby` on each content region.
- `mu-breadcrumb` / `mu-breadcrumb-item`: `<nav aria-label>` wrapper; `<ol>` list structure; `aria-current="page"` on the current item.
- `mu-pagination`: `<nav aria-label="Pagination">` wrapper; `aria-label="Page N"` on every page button; `aria-current="page"` on the active page; ellipsis markers are `aria-hidden`.
- `mu-app-bar`: Renders `<header role="banner">`, mapping to the `banner` ARIA landmark.
- `mu-drawer`: Uses a native `<dialog>` for focus trapping and Escape-key close; focus returns to the triggering element on close.

For full compliance, ensure you provide accessible labels and alt text when using these components. If you extend components with new features (e.g., interactive icons, dialogs), follow the rules above.

---

## Contributing

1. Create feature branches with descriptive names.
2. Write clear, conventional commit messages.
3. Ensure all lint, format, and tests pass before pushing.

---

## License

BSD-3-Clause (c) Google LLC

---

Let me know if you want to add usage examples, API docs, or further customization!
