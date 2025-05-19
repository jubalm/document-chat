# Project Conventions

This document outlines the coding conventions and project structure guidelines for this monorepo.

## 1. Monorepo Structure

- **`apps/`**: Contains individual applications.
  - Each application resides in its own subdirectory (e.g., `apps/chat/`, `apps/auth/`).
  - **To create a new app, always use Bun to initialize the project:**
    ```sh
    bun init
    ```
    This ensures consistent structure, scripts, and configuration across the monorepo. After running `bun init`, update the generated files to follow the monorepo conventions (e.g., set `tsconfig.json` to extend the base config, add a `README.md`, etc.).
  - Standard app structure includes:
    - `src/`: Main source code for the application.
    - `package.json`: Project manifest, dependencies, and scripts.
    - `tsconfig.json`: TypeScript configuration, typically extending the base configuration.
    - `README.md`: App-specific documentation.
    - `Dockerfile`: (Optional) For containerizing the application.
    - `public/`: (Optional, for frontend apps) Static assets like images, HTML, and CSS.
- **`packages/`**: Contains shared libraries or utilities used across multiple applications.
  - `packages/shared-utils/`: For common utility functions or modules.
  - `packages/tsconfig/`: Contains base TypeScript configurations (e.g., `tsconfig.base.json`) that app-specific `tsconfig.json` files should extend.
- **`docs/`**: Contains project-wide documentation.
  - `docs/examples/`: Example usage or setup guides.
  - `docs/structure.md`: (Assumed) Detailed explanation of the monorepo structure.
  - `docs/conventions.md`: This file.

## 2. Technology Stack

- **Runtime/Package Manager**: [Bun](https://bun.sh/) is the primary tool for managing dependencies, running scripts, and executing code.
  - Use `bun install` for installing dependencies.
  - Use `bun run <script>` for executing scripts defined in `package.json`.
  - Use `bun init` for initializing new packages/apps.
- **Language**: [TypeScript](https://www.typescriptlang.org/) is the required programming language for all apps in this monorepo. **JavaScript-only apps are not permitted.** Every app must include a `tsconfig.json` that extends the shared base config in `packages/tsconfig/tsconfig.base.json`.
  - Adhere to the configurations defined in the respective `tsconfig.json` files.
  - Strive for strong typing and leverage TypeScript features for robust code.
- **Frontend (if applicable)**:
  - Apps like `chat` and `platform` use React (inferred from `.tsx` files and common patterns like `App.tsx`).
  - Entry points are typically `src/index.ts` or `src/frontend.tsx`.
  - HTML files (e.g., `index.html`) and CSS (e.g., `index.css`) are often placed in `src/` or `public/`.

## 3. Running Apps in the Monorepo

- **To run any app, use the root-level scripts with the `APP` environment variable.**
- The scripts are defined in the root `package.json` as:
  ```json
  "scripts": {
    "dev": "bun --cwd=apps/$APP run dev",
    "start": "bun --cwd=apps/$APP run start"
  }
  ```
- **Usage:**
  - Development: `APP=chat bun run dev`
  - Production: `APP=platform bun run start`
  - Replace `chat` or `platform` with any app directory under `apps/`.
- **Important:**
  - You must run these scripts from the project root directory (where the root `package.json` is located).
  - If you run from any other directory, you will get errors like `Script not found` or `ENOENT: Could not change directory`.
  - Always check your current directory with `pwd` before running root-level scripts.
- Do **not** run `bun run src/index.ts` from the monorepo root or other directories unless explicitly documented for that app.
- The MCP server listens on port 3000 at the root path (`/`). Use curl or HTTP tools to test it as described in its README.

> **Troubleshooting:**
>
> - If you see errors like `Script not found` or `ENOENT: Could not change directory`, make sure you are in the project root.
> - Root-level scripts only work from the root directory.

## 4. Naming Conventions

- **Folders and Files**: Use `kebab-case` for folder and file names (e.g., `shared-utils`, `new-app.md`).
  - Exception: Component files in React (e.g., `ChatInput.tsx`, `Button.tsx`) use `PascalCase`.
- **Variables and Functions**: Use `camelCase` (e.g., `getUser`, `isLoading`).
- **Classes and Interfaces**: Use `PascalCase` (e.g., `class UserSession`, `interface AuthResponse`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `const MAX_USERS = 100;`).

## 5. Coding Style

- **Formatting**: Consistent code formatting is encouraged. Consider integrating a formatter like Prettier or using Biome (Bun's built-in formatter).
- **Linting**: Use a linter like ESLint to enforce code quality and catch potential errors.
- **Comments**:
  - Write clear and concise comments to explain complex logic or non-obvious code.
  - Use JSDoc/TSDoc for documenting functions, classes, and interfaces, especially for shared packages.

## 6. Dependencies

- **App-specific dependencies**: Declare in the `package.json` of the respective app in `apps/`.
- **Shared dependencies**: If a utility or library is used by multiple apps, consider creating a shared package in `packages/`.

## 7. Scripts in `package.json`

- **`dev`**: For starting a development server or running the app in watch mode.
- **`build`**: For creating a production build of the application.
- **`start`**: For running the production build.
- **`test`**: For running automated tests.
- **`lint`**: For running the linter.
- **`format`**: For formatting the codebase.

## 8. Docker

- If an application requires containerization, include a `Dockerfile` in its root directory.
- Follow best practices for writing efficient and secure Dockerfiles.

## 9. Documentation

- **`README.md`**: Each app and shared package must have a `README.md` explaining its purpose, setup, and usage. **PRs for new apps without a README will not be accepted.**
- **`docs/`**: Maintain general project documentation in the root `docs/` folder.

## 10. Documentation for New Apps

- Every new app must include a `README.md` with:
  - App purpose/description
  - How to install dependencies
  - How to run the app (from root and app directory)
  - How to test the app (with example commands)
  - Any important endpoints, ports, or usage notes
- Use the template in `docs/examples/new-app.md` for consistency.
- **All new apps must use TypeScript.**

# Monorepo App Scripts

## Usage

### Development

To start the development server for an app:

```sh
APP=chat bun run dev
```

Replace `chat` with the name of any app directory under `apps/` (e.g., `platform`, `auth`, `mcp-hello`).

### Production/Start

To start an app in production mode:

```sh
APP=platform bun run start
```

### Notes

- The `APP` environment variable is required and should match a folder name in `apps/`.
- The scripts are defined in the root `package.json`:
  ```json
  "scripts": {
    "dev": "bun --cwd=apps/$APP run dev",
    "start": "bun --cwd=apps/$APP run start"
  }
  ```
- You can add more scripts following this pattern if needed.

---

For more examples or troubleshooting, see the individual app README files.

---

This document is a living guide. Please update it as conventions evolve or new ones are established.
