# Project Conventions

This document outlines the coding conventions, naming standards, and structural rules for this monorepo. For step-by-step guides or app creation instructions, see the `docs/guides/` directory.

## 1. Monorepo Structure

- **`apps/`**: Each app must be in its own subdirectory (e.g., `apps/chat/`, `apps/auth/`).
  - Required structure for every app:
    - `src/`: Main source code.
    - `package.json`: App manifest and scripts.
    - `tsconfig.json`: Must extend `../../packages/tsconfig/tsconfig.base.json`.
    - `README.md`: App documentation.
    - `Dockerfile`: (Optional) For containerization.
    - `public/`: (Optional, for frontend apps) Static assets.
- **`packages/`**: Shared libraries/utilities for use across apps.
  - `shared-utils/`: Common utilities.
  - `tsconfig/`: Base TypeScript config (`tsconfig.base.json`).
- **`docs/`**: Project-wide documentation, guides, and conventions.

## 2. Technology & Language

- **Runtime/Package Manager**: [Bun](https://bun.sh/) is required for all scripts and dependency management.
- **Language**: [TypeScript](https://www.typescriptlang.org/) is mandatory for all apps. No JavaScript-only apps.
- **Frontend**: Use React for frontend apps. Entry points are typically `src/index.ts` or `src/frontend.tsx`.

## 3. Naming Conventions

- **Folders/Files**: Use `kebab-case` (e.g., `shared-utils`, `new-app.md`).
  - Exception: React components use `PascalCase` (e.g., `ChatInput.tsx`).
- **Variables/Functions**: Use `camelCase` (e.g., `getUser`, `isLoading`).
- **Classes/Interfaces**: Use `PascalCase` (e.g., `UserSession`, `AuthResponse`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `MAX_USERS`).

## 4. Coding Style

- **Formatting**: Use a consistent code formatter (Prettier or Biome recommended).
- **Comments**: Write clear comments for complex logic. Use JSDoc/TSDoc for shared code.

## 5. Dependencies

- **App-specific**: Declare in the app's `package.json`.
- **Shared**: Place in a shared package under `packages/` if used by multiple apps.

## 6. Scripts

- Each app must define at least `dev`, `build`, and `start` scripts in its `package.json`.
- Root-level scripts use the `APP` environment variable to run any app (see guides for usage).

## 7. Documentation

- Every app and shared package must have a `README.md` describing its purpose, setup, and usage.
- General project documentation and guides belong in `docs/`.

---

### Troubleshooting

- Always run root-level scripts (e.g., `bun run dev`, `bun run start`) from the monorepo root directory.
- The `APP` environment variable must match a folder name in `apps/`.
- If you see errors like `Script not found` or `ENOENT: Could not change directory`, check that you are in the project root and that the app folder exists.
- Use `pwd` to confirm your current directory before running scripts.
- Root-level scripts only work from the root directory.
- For more detailed guides or troubleshooting, see `docs/guides/`.

---

For all how-to guides, setup steps, or app creation instructions, refer to `docs/guides/` or `docs/examples/`.
