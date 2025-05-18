import { useChat } from '@ai-sdk/react'
import { useEffect, useRef, useMemo, useState } from 'react'
import Button from "./Button"
import { markdownToHtml } from './utils'

function UserMessage({ content }: { content: string }) {
  return (
    <div className="bg-white/5 text-gray-300 rounded-lg px-3 py-2 place-self-end max-w-[80%] text-sm">
      {content}
    </div>
  )
}

function AssistantMessage({ content }: { content: string }) {
  const [html, setHtml] = useState<string>("")
  useEffect(() => {
    let cancelled = false
    async function convertAndSetHtml() {
      const result = await markdownToHtml(content)
      if (!cancelled) setHtml(result)
    }
    convertAndSetHtml()
    return () => { cancelled = true }
  }, [content])
  return (
    <div
      className="text-foreground py-2 max-w-[90%] prose prose-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat',
  })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Use useMemo for isBusy
  const isBusy = useMemo(() => status === 'submitted' || status === 'streaming', [status])

  return (
    <div className="h-full w-full grid grid-rows-[min-content_1fr_min-content] gap-y-2">
      <h2 className="text-2xl font-bold px-2 text-foreground">Chat</h2>
      <div className="grid contain-size">
        <div ref={containerRef} className='overflow-auto h-full min-h-0 place-content-end'>
          {messages.map((msg) => {
            switch (msg.role) {
              case 'user':
                return <UserMessage key={msg.id} content={msg.content} />
              case 'assistant':
                return <AssistantMessage key={msg.id} content={msg.content} />
              case 'system':
                return <div key={msg.id} className="text-muted-foreground text-sm">{msg.content}</div>
              case 'data':
                return <div key={msg.id} className="text-muted-foreground text-sm">{msg.content}</div>
              default:
                return null
            }
          })}
        </div>
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 rounded px-4 py-2 border bg-muted-background/50 border-muted-background focus:border-foreground/30 outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          disabled={isBusy}
        />
        <Button type="submit" isBusy={isBusy}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
        </Button>
      </form>
    </div>
  )
}
