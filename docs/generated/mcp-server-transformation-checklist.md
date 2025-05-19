# MCP Server Transformation Checklist

- [ ] Create and switch to a new branch for MCP server transformation (e.g., `mcp-server-init`)
- [ ] Generate and commit this checklist file in `docs/generated/`
- [ ] Refactor `apps/mcp` to follow monorepo conventions: ensure `src/` directory exists and move main code to `src/index.ts`
- [ ] Add/extend `tsconfig.json` to extend the shared base config (`../../packages/tsconfig/tsconfig.base.json`)
- [ ] Add/verify `README.md` with setup, usage, and MCP server details
- [ ] Add/verify `Dockerfile` (optional, if containerization is needed)
- [ ] Install `@modelcontextprotocol/sdk` as a dependency in `apps/mcp`
- [ ] Implement a minimal MCP server in `src/index.ts` using the SDK and stdio transport
- [ ] Add at least one resource/tool to the MCP server (e.g., a hello resource)
- [ ] Ensure `dev`, `build`, and `start` scripts are present in `package.json`
- [ ] Run `bun install` from the monorepo root
- [ ] Test the MCP server with `APP=mcp bun run dev` or equivalent
- [ ] Update checklist and verify all items are complete
