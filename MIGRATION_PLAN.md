# Library Migration Plan

This document describes an incremental source-structure migration for the library. The plan is written to be followed by GitHub Copilot or a human contributor without breaking the published API during intermediate steps.

## Progress Tracker

- [x] **Phase 1** — Create Domain Folders
- [x] **Phase 2** — Move Adapters First
  - [x] `src/react` → `src/adapters/react`
  - [x] `src/angular` → `src/adapters/angular`
  - [x] `src/vue` → `src/adapters/vue`
  - [x] `src/svelte` → `src/adapters/svelte`
- [x] **Phase 3** — Move SSR and Tokens
  - [x] `src/ssr` → `src/platform/ssr`
  - [x] `src/styles/tokens.ts` → `src/tokens/tokens.ts`
  - [x] `src/styles/tokens.json` → `src/tokens/tokens.json`
- [x] **Phase 4** — Move Shared Core Domains
  - [x] `src/i18n` → `src/core/i18n`
  - [x] Shared styles → `src/core/styles`
- [x] **Phase 5** — Move Components in Batches
  - [x] Batch A: `avatar`, `badge`, `divider`, `icon`, `typography`
  - [x] Batch B: `button`, `checkbox`, `radio`, `switch`, `text-field`, `select`
  - [x] Batch C: `card`, `chip`, `alert`, `snackbar`, `skeleton`, `spinner`, `linear-progress`
  - [x] Batch D: `tabs`, `breadcrumb`, `pagination`, `dialog`, `drawer`, `tooltip`, `menu`, `popover`, `app-bar`
  - [x] Batch E: `accordion`, `autocomplete`, `data-table`, `file-upload`, `rating`, `slider`, `stepper`
- [x] **Phase 6** — Update Primary Barrels and Build Entries
- [x] **Phase 7** — Introduce Internal-Only Modules
- [ ] **Phase 8** — Remove Compatibility Layers

## Goal

Reorganize the library into clearer domains while preserving the current public package contract.

Target source layout:

```text
src/
  core/
    components/
    i18n/
    styles/
    index.ts
  adapters/
    react/
    angular/
    vue/
    svelte/
  platform/
    ssr/
  tokens/
    index.ts
    tokens.ts
    tokens.json
  internal/
    utils/
    types/
```

## Non-Negotiable Rules

1. Do not break any existing package subpath exports in `package.json` while the migration is in progress.
2. Keep all tests, stories, and README files colocated with their component folders.
3. Use compatibility re-export files when moving source paths so downstream imports can continue working during transition.
4. Do not change the external API unless a separate explicit task requires it.
5. After each migration phase, run validation before moving to the next phase.

## Current Public Contract

The public package surface is defined by `package.json` exports. At minimum, preserve these entries during migration:

- `lit-poc`
- `lit-poc/react`
- `lit-poc/angular`
- `lit-poc/vue`
- `lit-poc/svelte`
- `lit-poc/ssr`
- `lit-poc/tokens`
- all component subpaths such as `lit-poc/button`, `lit-poc/dialog`, `lit-poc/data-table`, etc.

## Validation Commands

Run these commands after each completed phase:

```bash
npm run build
npm run lint
npm test
```

If the phase touches Storybook- or docs-related imports, also run:

```bash
npm run build-storybook
npm run docs
```

## Phase 1: Create Domain Folders

Objective: introduce the new directory structure with minimal behavior change.

Tasks:

1. Create these folders if they do not already exist:
   - `src/core/components`
   - `src/core/i18n`
   - `src/core/styles`
   - `src/adapters/react`
   - `src/adapters/angular`
   - `src/adapters/vue`
   - `src/adapters/svelte`
   - `src/platform/ssr`
   - `src/tokens`
   - `src/internal/utils`
   - `src/internal/types`
2. Do not move component folders yet.
3. Do not update public exports yet.

Exit criteria:

1. The new folders exist.
2. No behavior changes have been introduced.
3. Build, lint, and tests still pass.

## Phase 2: Move Adapters First

Objective: isolate framework-specific wrappers from core components.

Move:

1. `src/react` -> `src/adapters/react`
2. `src/angular` -> `src/adapters/angular`
3. `src/vue` -> `src/adapters/vue`
4. `src/svelte` -> `src/adapters/svelte`

Requirements:

1. Leave compatibility files at the old locations:
   - `src/react/index.ts`
   - `src/angular/index.ts`
   - `src/vue/index.ts`
   - `src/svelte/index.ts`
2. Each compatibility file should re-export from the new location.
3. Preserve colocated `_tests` directories with each adapter package.

Exit criteria:

1. Old import paths still work.
2. `package.json` does not need to change yet if compatibility files remain in place.
3. Build, lint, and tests pass.

## Phase 3: Move SSR and Tokens

Objective: make non-component runtime utilities first-class domains.

Move:

1. `src/ssr/index.ts` -> `src/platform/ssr/index.ts`
2. `src/styles/tokens.ts` -> `src/tokens/tokens.ts`
3. `src/styles/tokens.json` -> `src/tokens/tokens.json`

Create:

1. `src/tokens/index.ts` that exports token utilities from `./tokens.js`

Requirements:

1. Keep compatibility files at:
   - `src/ssr/index.ts`
   - `src/styles/tokens.ts`
2. If any code imports token types or values from the old location, update imports gradually or keep re-exports until the final cleanup phase.
3. Update any build tooling only if necessary after compatibility files are added.

Exit criteria:

1. `lit-poc/ssr` remains functional.
2. `lit-poc/tokens` remains functional.
3. Build, lint, and tests pass.

## Phase 4: Move Shared Core Domains

Objective: group core runtime concerns without yet moving every component.

Move:

1. `src/i18n` -> `src/core/i18n`
2. shared styling modules from `src/styles` -> `src/core/styles`

Recommended candidates:

1. `shared-styles.ts`
2. theme-related shared CSS or helper files

Requirements:

1. Keep compatibility re-exports at old paths if components still import from them.
2. Do not remove old locations until all imports have been migrated.

Exit criteria:

1. Core shared modules now live under `src/core`.
2. Existing component imports still resolve.
3. Build, lint, and tests pass.

## Phase 5: Move Components in Batches

Objective: move publishable web components under `src/core/components` with minimal churn.

Move component folders in the following order:

### Batch A: Low-risk display primitives

1. `avatar`
2. `badge`
3. `divider`
4. `icon`
5. `typography`

### Batch B: Core form controls

1. `button`
2. `checkbox`
3. `radio`
4. `switch`
5. `text-field`
6. `select`

### Batch C: Common layout and feedback

1. `card`
2. `chip`
3. `alert`
4. `snackbar`
5. `skeleton`
6. `spinner`
7. `linear-progress`

### Batch D: Navigation and overlays

1. `tabs`
2. `breadcrumb`
3. `pagination`
4. `dialog`
5. `drawer`
6. `tooltip`
7. `menu`
8. `popover`
9. `app-bar`

### Batch E: Complex components

1. `accordion`
2. `autocomplete`
3. `data-table`
4. `file-upload`
5. `rating`
6. `slider`
7. `stepper`

Requirements for every batch:

1. Move the entire folder, including:
   - source file
   - colocated `README.md`
   - colocated `*.stories.ts`
   - `_tests/`
2. Leave a compatibility re-export file at the old source entry location when needed.
3. Update imports only for the moved batch.
4. Validate before starting the next batch.

Exit criteria for each batch:

1. Moved components resolve from both old internal paths and new paths.
2. Public package entry points still work.
3. Build, lint, and tests pass.

## Phase 6: Update Primary Barrels and Build Entries

Objective: point the repo at the new structure instead of relying on compatibility layers.

Update these files:

1. `src/index.ts`
2. `package.json`
3. `vite.lib.config.ts`
4. `vite.docs.config.ts`
5. `custom-elements-manifest.config.js`
6. any TS config or tooling globs that assume the old flat `src/*` layout

Requirements:

1. Keep package export keys unchanged unless there is an intentional breaking change.
2. Update paths behind each export to target the new folders.
3. Ensure Storybook, docs, analyzer, and tests still discover moved files.

Exit criteria:

1. Public exports resolve directly to new paths.
2. Compatibility files are still available for one cleanup phase.
3. Build, lint, tests, Storybook build, and docs build pass.

## Phase 7: Introduce Internal-Only Modules

Objective: separate implementation helpers from the public API.

Tasks:

1. Move non-public helpers into `src/internal/utils` or `src/internal/types`.
2. Ensure no public exports point into `src/internal`.
3. Update internal imports to reference `src/internal` explicitly.

Exit criteria:

1. Public and private code boundaries are obvious from the folder structure.
2. No user-facing docs point at internal modules.
3. Build, lint, and tests pass.

## Phase 8: Remove Compatibility Layers

Objective: clean up temporary re-export files once all internal paths are migrated.

Tasks:

1. Search for imports that still target old source locations.
2. Update those imports to the new locations.
3. Remove compatibility files only after no internal references remain.

Do not remove compatibility files if:

1. build config still depends on them
2. story or test files still depend on them
3. docs examples still depend on them

Exit criteria:

1. No stale internal imports remain.
2. Temporary re-export files are gone.
3. Build, lint, tests, Storybook build, and docs build pass.

## Suggested File Mapping

Use this as the baseline mapping while migrating:

- `src/react/*` -> `src/adapters/react/*`
- `src/angular/*` -> `src/adapters/angular/*`
- `src/vue/*` -> `src/adapters/vue/*`
- `src/svelte/*` -> `src/adapters/svelte/*`
- `src/ssr/*` -> `src/platform/ssr/*`
- `src/styles/tokens.ts` -> `src/tokens/tokens.ts`
- `src/styles/tokens.json` -> `src/tokens/tokens.json`
- `src/i18n/*` -> `src/core/i18n/*`
- `src/styles/*` -> `src/core/styles/*` except token compatibility files
- `src/<component>/*` -> `src/core/components/<component>/*`

## Recommended Execution Rules for Copilot

1. Complete only one phase or one batch per change set.
2. Prefer small, verifiable moves over large refactors.
3. When moving files, preserve relative file naming and colocated tests/stories.
4. Update documentation only after each migration step is stable.
5. If a move causes breakage, restore compatibility with a re-export file instead of changing public APIs.
6. Stop after any failing validation and fix that phase before continuing.

## Final State Checklist

Before considering the migration complete, confirm all of the following:

1. All core components live under `src/core/components`.
2. All framework wrappers live under `src/adapters`.
3. SSR utilities live under `src/platform/ssr`.
4. Token exports live under `src/tokens`.
5. Shared non-public helpers live under `src/internal`.
6. `package.json` exports still provide the same public subpath API.
7. `npm run build` passes.
8. `npm run lint` passes.
9. `npm test` passes.
10. `npm run build-storybook` passes.
11. `npm run docs` passes.
