# Lit POC Component Library

A modern, accessible, and compositional web component library built with Lit 3 and TypeScript, following Minimal/MUI design principles.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Build](#build)
  - [Development Server](#development-server)
  - [Testing](#testing)
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
- **Automated Testing**: Uses Vitest (Unit/Render tests) and Playwright (E2E tests).
- **Component Explorer**: Storybook for viewing and interacting with components.
- **Static Docs Site**: Built with Eleventy and Vite for demos and API docs.
- **Commit Message Linting**: Enforces Conventional Commits via commitlint and Husky.

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

Run all unit tests:

```bash
npm run test:unit
```

Watch unit tests during development:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run test:e2e
```

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
- **Testing**: Vitest, Playwright
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
