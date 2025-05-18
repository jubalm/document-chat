# TURBO_MIGRATION.md

## Turborepo Monorepo Migration Checklist

- [x] 1. **Plan monorepo structure and create folder layout**
- [x] 2. **Move current app into `/apps/document-chat`**
- [x] 3. **Scaffold `/apps/provisioning-app`**
- [x] 4. **Set up root `package.json` and `pnpm-workspace.yaml`**
- [x] 5. **Install Turborepo and pnpm**
- [x] 6. **Add `turbo.json` configuration**
- [ ] 7. **Update Dockerfile location and context**
- [ ] 8. **Update scripts and dependencies**
- [ ] 9. **Test monorepo build and dev commands**
- [ ] 10. **(Optional) Create `/packages/shared-utils` for shared code**

---

## Step 1: Plan monorepo structure and create folder layout ✅

**Action:**

- Decided on the following structure:
  ```
  /apps
    /document-chat
    /provisioning-app
  /packages
    /shared-utils (optional)
  turbo.json
  package.json
  pnpm-workspace.yaml
  ```

**Review:**

- Next, I moved the current app into `/apps/document-chat`.

---

## Step 2: Move current app into `/apps/document-chat` ✅

**Action:**

- All source code, config files, and the Dockerfile are now in `/apps/document-chat`.
- Paths and structure are confirmed in the workspace.

**Review:**

- Next, I scaffolded `/apps/provisioning-app`.

---

## Step 3: Scaffold `/apps/provisioning-app` ✅

**Action:**

- Created `/apps/provisioning-app` with a minimal README.

**Review:**

- Next, I set up the root `package.json` and `pnpm-workspace.yaml` for workspace management.

---

## Step 4: Set up root `package.json` and `pnpm-workspace.yaml` ✅

**Action:**

- Added a root `package.json` with workspaces for `apps/*` and `packages/*`.
- Added `pnpm-workspace.yaml` with the same patterns.

**Review:**

- Next, I installed Turborepo and pnpm in the workspace.

---

## Step 5: Install Turborepo and pnpm ✅

**Action:**

- Ran `pnpm install` at the root to install dependencies and set up the workspace.
- Confirmed that Turborepo is available as a dev dependency.

**Review:**

- Next, I will add a `turbo.json` configuration file for Turborepo pipeline management.

---

## Step 6: Add `turbo.json` configuration ✅

**Action:**

- Created `turbo.json` at the root with a basic pipeline for build and dev scripts.

**Review:**

- Next, I will update the Dockerfile location and context if needed, and ensure all references are correct for the monorepo structure.

---

## Next Step

**Step 7:** Update Dockerfile location and context.

- Ensure the Dockerfile for `document-chat` is in `/apps/document-chat` and references the correct paths.
- Update any build scripts or CI configs to use the new path.

---

_I will proceed to Step 7 and update this file accordingly._
