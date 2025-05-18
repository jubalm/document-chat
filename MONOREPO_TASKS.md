# Monorepo App Renaming & Scaffolding Task List

## 1. App Renaming
- [x] 1.1 Rename `/apps/document-chat` to `/apps/chat`
- [x] 1.2 Rename `/apps/provisioning-app` to `/apps/platform`
- [x] 1.3 Update all references in configs, scripts, and docs to use new app names

## 2. Scaffold Platform App
- [x] 2.1 Create `/apps/platform` folder (if not already present after rename)
- [x] 2.2 Scaffold a new Bun app in `/apps/platform` (match structure/routing style of `/apps/chat`)
- [x] 2.3 Add minimal README and placeholder files for `/apps/platform`
- [x] 2.4 Add/update `package.json`, `tsconfig.json`, and entry points for `/apps/platform`
- [x] 2.5 Add Dockerfile and .dockerignore for `/apps/platform` (if needed)

## 3. Scaffold Auth App
- [x] 3.1 Create `/apps/auth` folder
- [x] 3.2 Scaffold a new Bun app in `/apps/auth` (structure similar to `/apps/chat`)
- [x] 3.3 Add minimal README and placeholder files for `/apps/auth`
- [x] 3.4 Add/update `package.json`, `tsconfig.json`, and entry points for `/apps/auth`
- [x] 3.5 Add Dockerfile and .dockerignore for `/apps/auth` (if needed)

## 4. Monorepo Config Updates
- [ ] 4.1 Update `pnpm-workspace.yaml` to include new/renamed app paths
- [ ] 4.2 Update `turbo.json` pipeline to reference new/renamed apps
- [ ] 4.3 Update root and per-app `.gitignore` and `.dockerignore` as needed

## 5. Validation
- [ ] 5.1 Run `pnpm install` to ensure workspace is valid
- [ ] 5.2 Run `pnpm turbo run build --filter=chat` and `--filter=platform` and `--filter=auth` to verify builds
- [ ] 5.3 Run each app locally to confirm routing and structure
