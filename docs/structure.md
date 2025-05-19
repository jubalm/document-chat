# Monorepo Structure

This repository is organized as a monorepo. Here is an overview of the main directories and their purposes:

## Root

- `package.json`, `bun.lock`, `pnpm-lock.yaml`: Root-level configuration and lock files.

## apps/

Contains all application projects. Each app has its own directory, e.g.:

- `auth/`: Authentication service
- `chat/`: Chat application
- `platform/`: Platform frontend or backend

Each app typically contains:

- `src/`: Source code (TypeScript/JavaScript)
- `package.json`: App-specific dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `README.md`: App-specific documentation
- Other config files as needed (e.g., Dockerfile, bunfig.toml)

## packages/

Shared code and utilities for use across multiple apps.

- `shared-utils/`: Example of a shared package

## tsconfig/

Centralized TypeScript configuration for the monorepo.

- `tsconfig.base.json`: Base config to be extended by apps/packages

## docs/

Documentation for the monorepo, including guides and examples.

- `examples/`: Step-by-step guides (e.g., creating a new app)

---

### Adding a New App

- Place new apps in the `apps/` directory.
- Follow the guide in `docs/examples/new-app.md` for setup steps.

### Shared Code

- Place reusable code in `packages/` and import it in your apps as needed.

### TypeScript

- Extend the base config in `tsconfig/tsconfig.base.json` for consistency.

---

For more details, see individual app READMEs and the guides in `docs/`.
