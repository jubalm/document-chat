# syntax=docker/dockerfile:1

# ---- Install dependencies (root context) ----
FROM oven/bun:latest AS deps
WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
RUN bun install

# ---- Build app ----
FROM oven/bun:latest AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY ./ ./apps/chat
RUN bun run build

# ---- Run app ----
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/apps/chat .
COPY --from=builder /app/node_modules ./node_modules
CMD ["bun", "src/index.ts"]
