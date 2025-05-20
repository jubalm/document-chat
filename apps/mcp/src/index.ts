import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'
import { z } from 'zod'
import { createServer } from 'http'
import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js'

const server = new McpServer({
  name: 'Document MCP Server',
  version: '1.0.0',
})

// Add a tool: 'scrape_pdf_links' that fetches a URL and returns a list of PDF links
server.tool(
  'scrape_pdf_links',
  'Given a URL, fetch the web page and return a list of absolute URLs to all PDF documents linked from that page. Parameter: url (string, must be a valid URL). Returns: pdfLinks (array of strings).',
  { url: z.string().url() },
  async ({ url }, _extra) => {
    console.log('[scrape_pdf_links] Received url:', url)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      const html = await res.text()
      // Extract all PDF links (absolute or relative)
      const pdfLinks = [
        ...Array.from(html.matchAll(/<a\s+[^>]*href=["']([^"'>]+\.pdf)["'][^>]*>/gi))
          .map((match: RegExpMatchArray) => match[1])
          .map(link => link.startsWith('http') ? link : new URL(link, url).href),
        ...Array.from(html.matchAll(/<a\b(?=[^>]*\btitle=["'][^"'>]*Download PDF[^"'>]*)(?=[^>]*\bhref=["']([^"'>]+)["'])[^>]*>/gi))
          .map((match: RegExpMatchArray) => match[1])
          .map(link => link.startsWith('http') ? link : new URL(link, url).href)
      ]
        .filter((v, i, arr) => arr.indexOf(v) === i) // deduplicate
      console.log('[scrape_pdf_links] PDF links found:', pdfLinks)
      if (pdfLinks.length === 0) {
        return {
          content: [{ type: 'text', text: 'No PDF links found.' }]
        } satisfies CallToolResult
      }
      return {
        content: [{ type: 'text', text: pdfLinks.join('\n') }]
      } satisfies CallToolResult
    } catch (err) {
      console.error('[scrape_pdf_links] Error:', err)
      return {
        content: [{ type: 'text', text: `Error: ${err instanceof Error ? err.message : String(err)}` }]
      } satisfies CallToolResult
    }
  },
)

// Set up SSE transport for MCP
// We'll store active SSE transports by sessionId
const sseTransports = {} as Record<string, SSEServerTransport>

createServer((req, res) => {
  if (req.url?.startsWith('/sse')) {
    // Create a new SSE transport for this response
    const transport = new SSEServerTransport('/messages', res)
    sseTransports[transport.sessionId] = transport
    res.on('close', () => {
      delete sseTransports[transport.sessionId]
    })
    server.connect(transport)
    return
  }
  if (req.url?.startsWith('/messages') && req.method === 'POST') {
    // Handle POST messages for SSE
    const url = new URL(req.url, `http://${req.headers.host}`)
    const sessionId = url.searchParams.get('sessionId')
    if (sessionId && sseTransports[sessionId]) {
      let body = ''
      req.on('data', chunk => { body += chunk })
      req.on('end', () => {
        sseTransports[sessionId].handlePostMessage(req, res, JSON.parse(body))
      })
    } else {
      res.statusCode = 400
      res.end('No transport found for sessionId')
    }
    return
  }
  res.statusCode = 404
  res.end('Not Found')
}).listen(8787, () => {
  console.log('MCP SSE server listening on http://localhost:8787/sse')
})
