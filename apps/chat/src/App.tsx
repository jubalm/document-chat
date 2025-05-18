import { createContext, useState } from "react"
import { DocumentPreview } from "./DocumentPreview"
import { ChatInterface } from "./ChatInterface"
import "./index.css"

// Context for document content
export const DocumentContentContext = createContext<{
  content: string
  setContent: (c: string) => void
}>({ content: "", setContent: () => {} })

export function App() {
  const [content, setContent] = useState("")
  return (
    <DocumentContentContext.Provider value={{ content, setContent }}>
      <div className="dark min-h-screen h-full w-full grid grid-cols-[1fr_2fr] text-foreground bg-background gap-x-6 px-4">
        <ChatInterface />
        <DocumentPreview />
      </div>
    </DocumentContentContext.Provider>
  )
}

export default App
