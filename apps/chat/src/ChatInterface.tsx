import { Message, useChat } from '@ai-sdk/react'
import { useEffect, useRef, useMemo, useCallback, useState, useContext } from 'react'
import Button from "./Button"
import { markdownToHtml } from './utils'
import { ChatInput } from './ChatInput'
import { DocumentContentContext } from './App'
import { UIMessage } from 'ai'

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
  const { content: documentContent } = useContext(DocumentContentContext)
  const { messages, setMessages, input, handleInputChange, handleSubmit, status, stop } = useChat({ api: '/api/chat' })
  const containerRef = useRef<HTMLDivElement>(null)
  const prevMessagesLength = useRef(messages.length)

  const isBusy = useMemo(() => status === 'submitted' || status === 'streaming', [status])

  useEffect(() => {
    // If a new message was added, scroll to bottom
    if (containerRef.current && messages.length > prevMessagesLength.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    prevMessagesLength.current = messages.length
  }, [messages])

  // Custom submit handler to support abort and inject document context
  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBusy) {
      stop()
      return
    }

    // Inject system message with document content
    const foo: Message = {
      id: 'document-context',
      role: 'system',
      content: `The following is the current document content for context:\n\n${documentContent}`,
    }
    setMessages([foo, ...messages.filter((msg) => msg.id !== 'document-context')])

    handleSubmit(e)
  }

  return (
    <div className="h-full w-full py-4 grid grid-rows-[min-content_1fr_min-content] gap-y-2">
      <h2 className="text-2xl font-bold px-2 text-foreground">Chat</h2>
      <div className="grid contain-size">
        <div
          ref={containerRef}
          className='overflow-auto h-full min-h-0 flex flex-col-reverse place-content-end gap-y-1'
        >
          {messages.slice().reverse().map((msg) => {
            switch (msg.role) {
              case 'user':
                return <UserMessage key={msg.id} content={msg.content} />
              case 'assistant':
                console.log('parts', msg.parts)
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
      <form className="flex gap-2 items-end bg-muted-background/70 rounded px-2 py-2" onSubmit={handleCustomSubmit}>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          isBusy={isBusy}
          maxLines={6}
        />
        <Button type="submit" isBusy={isBusy} className="bg-transparent shadow-none border-none p-0 h-8 w-8 flex items-center justify-center">
          {isBusy ? 'Stop' : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
          )}
        </Button>
      </form>
    </div>
  )
}
