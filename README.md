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
- **Automated Testing**: Uses @web/test-runner and @open-wc/testing.
- **Static Docs Site**: Built with Eleventy for demos and API docs.
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

Run all tests (dev and prod modes):

```bash
npm test
```

Watch tests during development:

```bash
npm run test:watch
```

### Linting & Formatting

Check code quality and auto-fix issues:

```bash
npm run lint
npm run format
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

- `src/` — Source code for all components and shared styles.
- `dev/` — Demo HTML for local development.
- `test/` — Test output and helpers.
- `docs/` — Static documentation site (generated).
- `.husky/` — Git hooks for linting, testing, and commit message checks.

---

## Tooling

- **Linting**: ESLint, lit-analyzer
- **Formatting**: Prettier
- **Pre-commit hooks**: Husky + lint-staged
- **Commit message linting**: commitlint
- **Testing**: @web/test-runner, @open-wc/testing
- **Docs**: Eleventy

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
