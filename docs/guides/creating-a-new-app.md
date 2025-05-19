# LLM Automation: How To Add or Create New App In This Monorepo

## Instructions for the LLM

You are tasked with creating a step-by-step TODO list for setting up a new app in this monorepo, based on the template and instructions below. Your TODO list should be actionable, clear, and follow the monorepo's conventions.

### Template for TODO List

1. Create the app folder under `apps/` and navigate into it.
2. Initialize the app with Bun (`bun init` or `bun init --react=tailwind` for frontend).
3. Add a `tsconfig.json` that extends the shared base config.
4. Add a `README.md` with required sections.
5. Create the `src/` directory and add `src/index.ts` with a minimal entry point.
6. Install dependencies from the monorepo root (`bun install`).
7. Run the app from the monorepo root using the `APP` environment variable.
8. Confirm all checklist items are complete (see below).

### Checklist

- [ ] Folder created under `apps/`
- [ ] Ran `bun init` inside the new folder
- [ ] `tsconfig.json` extends the shared base config
- [ ] `README.md` present and filled out
- [ ] `src/index.ts` exists
- [ ] Installed dependencies with `bun install`
- [ ] App runs with `APP=your-new-app bun run dev`

### LLM Response Requirements

- Output the TODO list in a clear, numbered format.
- After generating the TODO list, confirm that you are ready to execute the steps autonomously.
- If you are uncertain about any step or need clarification, include your question(s) immediately after the TODO list, before proceeding with execution. Wait for amendments or confirmation before starting.
- Once confirmed, proceed to execute the TODO list autonomously, step by step.

---

## Example LLM Output

**TODO List:**

1. Create folder `apps/example-app` and navigate into it
2. Run `bun init`
3. Add `tsconfig.json` extending the shared base config
4. Add `README.md` with required sections
5. Create `src/index.ts` with a hello world
6. Run `bun install` from the monorepo root
7. Run the app with `APP=example-app bun run dev`
8. Verify all checklist items are complete

**Confirmation:**
Ready to execute the above steps. If any clarification is needed, please specify before I begin.
