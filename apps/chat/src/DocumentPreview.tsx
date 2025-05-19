import { useEffect, useRef, useContext } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { DocumentContentContext } from "./App"
import { cn, markdownToHtml } from './utils'

export function DocumentPreview() {
  const editorRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const { content, setContent } = useContext(DocumentContentContext)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current) return

    // Prevent multiple Quill instances
    if (editorRef.current.querySelector(".ql-editor")) return

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      readOnly: false,
      placeholder: 'Start typing...',
      modules: {
        toolbar: {
          container: toolbarRef.current,
        },
      },
    })
    quillRef.current = quill

    // Update context on text change
    quill.on("text-change", () => {
      setContent(quill.getText())
    })

    // Set initial content
    setContent(quill.getText())

    // cleanup clipboard pasted html content
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      delta.ops.forEach((op) => {
        console.log("op", op)
        if (op.attributes) {
          delete op.attributes.background
          delete op.attributes.color
          delete op.attributes.style
          delete op.attributes.className
        }
      })
      return delta
    })

    return () => {
      // Remove Quill editor DOM nodes on unmount
      if (!editorRef.current) return
      editorRef.current.innerHTML = ""
    }
  }, [editorRef, toolbarRef, setContent])

  // Set Quill content when context changes (for external loads)
  useEffect(() => {
    if (!quillRef.current) return
    // Only update if content is different from editor
    const current = quillRef.current.getText().trim()
    if (content && content.trim() !== current) {
      markdownToHtml(content).then(html => {
        quillRef.current!.root.innerHTML = html
      })
    }
  }, [content])

  return (
    <div className="h-full w-full grid gap-y-3">
      <div className='contain-size'>
        <div className="grid h-full overflow-auto pb-4">
          <div className='flex items-center justify-center sticky top-6 z-10'>
            <div ref={toolbarRef} className={cn(
              'border-0! [&_.ql-fill]:fill-foreground! [&_.ql-stroke]:stroke-foreground! [&_.ql-picker-label]:text-foreground! [&_.ql-picker-options]:bg-muted-background! [&_.ql-picker-options]:text-foreground! [&_.ql-picker-options]:border-muted-background! [&_.ql-picker-options]:border-0! [&_.ql-picker-item]:text-foreground! [&_.ql-picker-item:hover]:bg-muted-background/50! [&_.ql-picker-item.ql-selected]:bg-muted-background/50!',

              'bg-muted-background shadow-lg rounded-full px-8'
            )}>
              <span className="ql-formats">
                <button className="ql-header" value="1"></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-header" value="3"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>
              <span className="ql-formats">
                <select className="ql-align"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-color"></button>
                <button className="ql-background"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
          </div>
          <div ref={editorRef} />
        </div>
      </div>
    </div>
  )
}
