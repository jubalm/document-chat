import { DocumentPreview } from "./DocumentPreview"
import { ChatInterface } from "./ChatInterface"
import "./index.css"

export function App() {
  return (
    <div className="dark min-h-screen h-full w-full grid grid-cols-[1fr_2fr] p-4
     text-foreground bg-background gap-4">
      <ChatInterface />
      <DocumentPreview />
    </div>
  )
}

export default App
