import { z } from 'zod'

// Zod schema for OpenAI-style chat messages
export const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
})
export const MessageArraySchema = z.array(MessageSchema)
