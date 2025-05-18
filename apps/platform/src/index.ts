import { serve } from "bun"
import index from "./index.html"

serve({
  routes: {
    // Serve index.html for all unmatched routes
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello from platform backend!",
          method: "GET",
        })
      },
    },
  },

  port: process.env.PORT ? Number(process.env.PORT) : 3002,

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
})

console.log("Platform service running!")
