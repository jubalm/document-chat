# mcp

A Model Context Protocol (MCP) server for exposing resources, prompts, and tools to LLMs in a standardized way.

## Setup

```bash
bun install
```

## Usage

```bash
APP=mcp bun run dev
```

## Features

- MCP server using @modelcontextprotocol/sdk
- Stdio transport for communication
- Extensible with custom resources and tools

## Development

- Main entry: `src/index.ts`
- See `docs/mcp-servers.md` for SDK usage and examples

## License

MIT
