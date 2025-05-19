# LLM Automation: Creating a New App in This Monorepo

## LLM-Driven Workflow (2025 Edition)

### 1. Branch Management

- Create a new git branch for the app creation task and switch to it.
  - If branch switch fails, abort the workflow and notify the user.

### 2. Checklist File Generation

- Generate a step-by-step TODO checklist for the new app, tailored to the goal (e.g., `mcp-server`), in markdown format.
- Save the checklist as a file in `docs/generated/` (e.g., `docs/generated/create-mcp-server-checklist.md`).
- The checklist must use markdown checkboxes (`- [ ]`) for each actionable step.
- The checklist file is the single source of truth for progress and must be updated after each step.

### 3. User Review & Certainty Check

- After generating the checklist file, prompt the user to review and confirm.
- If the LLM's certainty in the checklist is below 95%, ask the user for clarification before proceeding.

### 4. Autonomous Execution

- Upon user confirmation, autonomously execute each checklist item in order.
- After completing each step, mark it as complete (`- [x]`) in the checklist file before proceeding.
- If a step fails, pause and notify the user for intervention.

### 5. Resumability

- The workflow must be resumable: if interrupted, the LLM should read the checklist file and continue from the last incomplete item.

### 6. General Requirements

- All output and progress must be reflected in the checklist file.
- Minimize unnecessary human-readable explanations; optimize for LLM parsing and automation.
- Only prompt the user when required by the workflow (e.g., confirmation, uncertainty, or error).

---

## Example Checklist File (`docs/generated/create-mcp-server-checklist.md`)

```markdown
- [ ] Create and switch to the newly created branch. (e.g., `create-mcp-server`)
- [ ] Git commit the newly created checklist file in docs
- [ ] Create folder `apps/mcp-server` and navigate into it
- [ ] Ensure you are in `apps/mcp-server` for subsequent tasks
- [ ] Run `bun init` in the new folder
- [ ] Add `tsconfig.json` extending the shared base config
- [ ] Add `README.md` with required sections
- [ ] Create `src/index.ts` with a minimal MCP server entry point (with a hello tool/route)
- [ ] (Optional) Add `Dockerfile` if needed
- [ ] Run `bun install` from the monorepo root
- [ ] Ensure there are `dev`, `build`, and `start` scripts to `package.json`
- [ ] Run the app with `APP=mcp-server bun run dev`
- [ ] Verify all checklist items are complete
```

---

## Notes

- This workflow supersedes all previous instructions for app creation automation.
- Checklist file naming: use a descriptive, kebab-case name reflecting the goal.
- The LLM is responsible for all file and git operations unless a step fails or user input is required.
