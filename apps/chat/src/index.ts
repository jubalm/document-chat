import { serve } from "bun"
import index from "./index.html"
import { createOpenAI } from '@ai-sdk/openai'
import { CoreMessage, Message, streamText } from 'ai'
import { MessageArraySchema } from './schema'

// Custom provider for IONOS or other OpenAI-compatible endpoints
const customOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `
You are a helpful assistant and researcher. Your job is to help the user with their document or research topics of interest.

Instructions:
- If the document is blank or empty, politely ask the user what topic they would like help with or what they want to research.
- If the document contains content, analyze the document and help the user with that topic. Offer to research more information, provide summaries, suggestions, or answer questions related to the document's subject.
- Always be proactive, supportive, and concise in your responses.
- If the user asks for editing or formatting help, provide clear step-by-step instructions for using a WYSIWYG editor.

Below is the current content of the document for your reference:

`

serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    '/api/document/company-policy': async req => {
      return new Response(Bun.file('public/company-policy.md'), {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
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

        const messages = [{
          role: "system",
          content: SYSTEM_PROMPT,
        }, ...parsedMessage.data] satisfies CoreMessage[] | Omit<Message, "id">[]

        try {
          const result = streamText({
            model: customOpenAI('meta-llama/Meta-Llama-3.1-8B-Instruct'),
            messages,
            // enable abort signal to cancel the request
            abortSignal: req.signal,
          })
          return result.toDataStreamResponse({
            sendReasoning: true
          })
        } catch (err) {
          if ((err instanceof Error) && err.name === 'AbortError') {
            return new Response('Stream aborted by client', { status: 499 })
          }
          console.error("/api/chat error:", err)
          return Response.json({ error: err instanceof Error ? (err.stack || err.message) : String(err) }, { status: 500 })
        }
      },
    },

    '/documents/:filename': index,

  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})
