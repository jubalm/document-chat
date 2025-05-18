import { serve } from "bun"
import index from "./index.html"
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { MessageArraySchema } from './schema'

// Custom provider for IONOS or other OpenAI-compatible endpoints
const customOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        })
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        })
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name
      return Response.json({
        message: `Hello, ${name}!`,
      })
    },

    "/api/chat": {
      async POST(req: Request) {
        // Validate message body
        const body = await req.json()
        const parsedMessage = MessageArraySchema.safeParse(body.messages)
        if (!parsedMessage.success) {
          console.error("/api/chat: Invalid messages input", parsedMessage.error)
          return Response.json({ error: "Invalid messages input: " + parsedMessage.error.message }, { status: 400 })
        }

        try {
          const result = streamText({
            model: customOpenAI('meta-llama/Meta-Llama-3.1-8B-Instruct'),
            messages: parsedMessage.data,
          })
          return result.toDataStreamResponse()
        } catch (err) {
          console.error("/api/chat error:", err)
          return Response.json({ error: err instanceof Error ? (err.stack || err.message) : String(err) }, { status: 500 })
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})
