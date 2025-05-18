import { useEffect, useRef } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"

export function DocumentPreview() {
  const editorRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current) return

    // Prevent multiple Quill instances
    if (editorRef.current.querySelector(".ql-editor")) return

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      readOnly: false,
      modules: {
        toolbar: {
          container: toolbarRef.current,
        },
      },
    })

    // cleanup clipboard pasted html content
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      delta.ops.forEach((op) => {
        if (op.attributes) {
          delete op.attributes.background
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
  }, [editorRef, toolbarRef])

  return (
    <div className="h-full w-full grid gap-y-3 grid-rows-[min-content_1fr]">
      <div className='flex items-center'>
        <div ref={toolbarRef} className='border-0! [&_.ql-fill]:fill-foreground! [&_.ql-stroke]:stroke-foreground! [&_.ql-picker-label]:text-foreground! [&_.ql-picker-options]:bg-muted-background! [&_.ql-picker-options]:text-foreground! [&_.ql-picker-options]:border-muted-background! [&_.ql-picker-options]:border-0! [&_.ql-picker-item]:text-foreground! [&_.ql-picker-item:hover]:bg-muted-background/50! [&_.ql-picker-item.ql-selected]:bg-muted-background/50!'>
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
      <div className='contain-size'>
        <div className='w-full h-full overflow-auto'>
          <div className="min-h-full bg-muted-background text-foreground rounded-lg shadow-sm p-12">
            <div ref={editorRef} className="min-h-full border-0!" />
          </div>
        </div>
      </div>
    </div>
  )
}
