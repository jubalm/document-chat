import { serve } from "bun"
import { readFile } from "fs/promises"

serve({
  async fetch(req) {
    const url = new URL(req.url)
    if (url.pathname === "/api/hello") {
      return new Response(JSON.stringify({ message: "Hello from platform backend!" }), {
        headers: { "Content-Type": "application/json" },
      })
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = await readFile("./src/index.html", "utf8")
      return new Response(html, { headers: { "Content-Type": "text/html" } })
    }
    if (url.pathname === "/frontend.tsx") {
      const js = await Bun.build({ entrypoints: ["./src/frontend.tsx"], outdir: "/tmp" })
      const out = await readFile(js.outputs[0].path, "utf8")
      return new Response(out, { headers: { "Content-Type": "application/javascript" } })
    }
    if (url.pathname === "/index.css") {
      const css = await readFile("./src/index.css", "utf8")
      return new Response(css, { headers: { "Content-Type": "text/css" } })
    }
    return new Response("Not found", { status: 404 })
  },
  port: process.env.PORT ? Number(process.env.PORT) : 3002,
})

console.log("Platform service running!")
