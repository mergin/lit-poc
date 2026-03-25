You are an expert in TypeScript, Lit 3, and web component development.
Write functional, maintainable, performant, and accessible code aligned with this
workspace conventions.

## Project Context

- Stack: Lit 3 + TypeScript 5.
- App structure lives under `src/` (not `projects/`).

## Deprecated Code and API Usage

- Do not use deprecated APIs, functions, classes, or patterns. Always prefer the latest recommended Lit 3 and TypeScript APIs.
- Do not use any code, import, or pattern marked with `@deprecated` in JSDoc or official documentation.
- When updating or refactoring, always replace deprecated usage with the current recommended alternative.

## TypeScript Best Practices

- Enable and enforce `strict` mode in `tsconfig.json`.
- Use explicit types for all public/protected properties, methods, and events.
- Prefer domain-specific types and interfaces for component APIs and events.
- Avoid `any`; use `unknown` if the type is truly uncertain, but refine as soon as possible.
- Prefer type inference for local variables when the type is obvious, but avoid ambiguous or implicit `any`.
- Use `readonly` for immutable properties and fields.
- Prefer `Record<K, V>`, `Partial<T>`, and utility types for flexible APIs.
- Use discriminated unions for state and event types where appropriate.
- Prefer functional transformations (`map`, `filter`, `reduce`, `flatMap`) over imperative loops.
- Keep functions small, pure, and focused on a single responsibility.
- Require explicit return types on all exported functions/methods (except constructors and Lit lifecycle hooks).
- Use `private`/`protected` for internal methods and fields; avoid leaking implementation details.
- Use `@property()` and `@state()` decorators with explicit types and concise JSDoc.
- Prefer `customEvent<T>()` patterns for strongly-typed custom events.
- Avoid global variables and side effects in modules.
- Use `as const` for literal values that should not widen.
- Prefer `unknown` over `any` for generic or external data, and always validate before use.
- Use `assert` functions and type guards to narrow types safely.
- Avoid type assertions (`as Type`) unless absolutely necessary and safe.
- Organize types and interfaces in dedicated files for large components or shared types.
- Document all public/protected APIs, events, and types with concise JSDoc.

## Testing — AAA Pattern

- All tests must follow the Arrange-Act-Assert (AAA) pattern for clarity and maintainability.
- Each test should be divided into clear sections:
  - **ARRANGE**: Set up all necessary preconditions, data, and mocks.
  - **ACT**: Execute the action or behavior under test.
  - **ASSERT**: Verify the expected outcomes using assertions.
  - **CLEANUP** (if needed): Restore state, remove side effects, or clean up DOM/test environment.
- Use line comments (`// ARRANGE`, `// ACT`, `// ASSERT`, `// CLEANUP`) to clearly mark each section in every test function.
- Avoid mixing code from different sections; keep each phase distinct and sequential.
- If a phase is not needed, include the comment for clarity (e.g., `// CLEANUP` if no cleanup is required).
- Prefer one assertion per test when possible; if multiple assertions are needed, group them under the `// ASSERT` section.
- Use helper functions for repeated setup or cleanup logic, but keep the AAA structure visible in each test.

## Accessibility

- Treat accessibility as a default requirement for all UI changes.
- Every interactive control (buttons, links, toggles, icon-only actions) must have an accessible name (`aria-label`, `aria-labelledby`, or visible text).
- Use semantic HTML elements (button, nav, main, header, footer, section, form, etc.) whenever possible.
- Avoid using non-interactive elements (div, span) as interactive controls; if unavoidable, ensure correct `role` and keyboard support.
- Ensure all interactive elements are keyboard accessible (tab order, Enter/Space activation, focus management).
- Provide visible focus indicators for all focusable elements; do not remove outlines unless replaced with an accessible alternative.
- Use `aria-live` regions for async loading/error states or dynamic content that needs to be announced by screen readers.
- Ensure all custom components expose their roles, states, and properties via ARIA attributes as needed.
- Use `aria-disabled` and `disabled` attributes appropriately; ensure disabled controls are not focusable or actionable.
- Ensure all form fields have associated labels (using `<label for>`, `aria-label`, or `aria-labelledby`).
- Support labeling and description via `aria-label`, `aria-labelledby`, and `aria-describedby` for custom controls.
- Ensure all images have meaningful `alt` text; mark decorative images as `aria-hidden="true"` or `role="presentation"`.
- Avoid using color as the only means of conveying information; provide text or icon alternatives.
- Ensure sufficient color contrast for text, icons, and UI elements (WCAG AA minimum).
- Announce validation errors and success states using `aria-live` or inline text.
- Manage focus appropriately when dialogs, popovers, or overlays open/close (trap focus, return focus on close).
- Use `role="dialog"`, `aria-modal`, and `aria-labelledby` for modal dialogs.
- Ensure all components are testable with screen readers and keyboard navigation.
- Document accessibility features and keyboard interactions for each component.

## Code Style — Prettier

- Follow `.prettierrc` strictly (2 spaces, single quotes, semicolons, trailing commas).
- Run `npm run format` for code under `src/**/*.{ts,html,scss}`.

## Code Style — ESLint

- All generated code must pass `npm run lint`.
- Remove unused imports/variables immediately.
- Do not add formatting rules that conflict with Prettier.

## Documentation

- Every method/function (public, protected, and private) must include JSDoc.
- Every interface and type alias declaration must include concise JSDoc.
- Every method/function JSDoc must include:
  - `@param` for each parameter.
  - `@returns` when the method/function returns a value.
- Every component `@property()` must include a brief comment describing purpose/behavior.
- Do not include TypeScript types in JSDoc tags (`@param` / `@returns`); rely on TypeScript signatures for typing.
- Keep documentation concise and behavior-oriented.
