<!--
IMPORTANT FOR AUTOMATION/LLM:
- In this monorepo, an "app" is ALWAYS a subfolder of the existing `apps/` directory.
- DO NOT create a new workspace, project root, or use any project generator.
- All new apps must be created as subfolders under `apps/` (e.g., `apps/my-new-app`).
- The monorepo root and structure must NOT be changed or replaced.
- All instructions below assume you are working inside the existing monorepo root.
-->

# Creating a New App in the Monorepo

This guide explains how to start a new app in this monorepo using Bun.

## 1. Directory Structure

All apps should be placed in the `apps/` directory. Each app gets its own folder:

```
apps/
  your-new-app/
    src/
    package.json
    # ... the rest of the scaffolded app
```

## 2. Steps to Create a New App

1. **Create the app folder:**
   Ensure you are on the project root before running
   ```sh
   mkdir -p apps/your-new-app/src
   cd apps/your-new-app
   ```
2. **Initialize with Bun:**
   ```sh
   bun init --react=tailwind
   ```
   - Fill out the prompts as needed.
3. **Add TypeScript config:**
   - Create or update the new project's `tsconfig.json` referencing from `packages/tsconfig/tsconfig.base.json`
   - Example `tsconfig.json`:
     ```json
     {
       "extends": "../../tsconfig/tsconfig.base.json"
       // IMPORTANT: DO NOT REPEAT options already in base tsconfig
     }
     ```
4. **Add a README.md with Usage and Testing Instructions**

   Every new app should include a `README.md` that documents:

   - What the app does
   - How to install dependencies
   - How to run the app (from the monorepo root and from the app directory)
   - How to test the app (e.g., with curl or other tools)
   - Any important endpoints, ports, or conventions

   **Example `README.md` template:**

   ````markdown
   # <app-name>

   Describe what your app does here.

   ## Getting Started

   ### 1. Install dependencies

   ```sh
   bun install
   ```

   ### 2. Run the app (from monorepo root)

   ```sh
   APP=<app-name> bun run dev
   ```

   Or, from the app directory:

   ```sh
   cd apps/<app-name>
   bun run dev
   ```

   ### 3. Test the app

   Describe how to test the app (e.g., curl command, browser, etc.)

   ***

   > **Note:**
   >
   > - Document any important endpoints, ports, or usage notes here.
   ```

5. **Start coding in `src/`.**

## 3. Running the App from the Monorepo Root

You do **not** need to add a new script to the root `package.json` for each app. Instead, use the shared script with the `APP` environment variable:

```sh
APP=your-new-app bun run dev
```

This will run the app in `apps/your-new-app` using the root-level script:

```json
"dev": "bun --cwd=apps/$APP run dev"
```

> **Tip:** This convention ensures all apps are started consistently and avoids confusion about working directories.

## 4. Example: Minimal App Entry Point

Create `src/index.ts`:

```ts
console.log('Hello from your-new-app!')
```

## 5. Running the App

From the app directory:

```sh
bun run src/index.ts
```

---

For more conventions, see [../structure.md](structure.md) and [../conventions.md](conventions.md).
