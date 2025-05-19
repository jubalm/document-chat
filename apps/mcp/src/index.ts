import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { createServer } from 'http'

const server = new McpServer({
  name: 'Document MCP Server',
  version: '1.0.0',
})

// Add a hello resource
server.resource('hello', 'hello://main', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: 'Hello from MCP!',
    },
  ],
}))

// Add a tool: 'add' that sums two numbers
server.tool(
  'add',
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: 'text', text: String(a + b) }],
  }),
)

// Set up session-aware HTTP transport for MCP
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
})
await server.connect(transport)

// Node.js HTTP server for MCP endpoint (Bun node compatibility)
createServer((req, res) => {
  const url = req.url || ''
  if (url.startsWith('/mcp')) {
    transport.handleRequest(req, res)
    return
  }
  res.statusCode = 404
  res.end('Not Found')
}).listen(8787, () => {
  console.log('MCP HTTP server listening on http://localhost:8787/mcp')
})
