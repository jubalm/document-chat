# MCP TypeScript SDK

## Overview

The Model Context Protocol (MCP) allows applications to provide context for LLMs in a standardized way. This TypeScript SDK makes it easy to:

- Build MCP servers that expose resources, prompts, and tools
- Use standard transports like stdio

## Installation

```sh
bun add @modelcontextprotocol/sdk
```

## Quick Start: Minimal MCP Server

This is the pattern used to use when building mcp apps:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new McpServer({
  name: 'Hello MCP',
  version: '1.0.0',
})

// Add a resource (optional)
server.resource('hello', 'hello://main', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: 'Hello from MCP!',
    },
  ],
}))

// Start the server using stdio transport
const transport = new StdioServerTransport()
await server.connect(transport)
```

## Running Your Server

From the monorepo root:

```sh
APP=mcp-hello bun run dev
```

## Notes

- The `mcp-hello` app uses the stdio transport for communication.
- You can add more resources, tools, or prompts as needed using the same server instance.
- For more advanced usage, see the full MCP SDK documentation.
