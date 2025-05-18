# syntax=docker/dockerfile:1
FROM oven/bun:1.2.13 AS base

WORKDIR /app

# Copy package and lock files first for better caching
COPY package.json bun.lock bunfig.toml ./

# Install dependencies
RUN bun install

# Copy the rest of the source code
COPY . .

# Build the app (outputs to dist/)
RUN bun run build.ts

# Use a minimal runtime image
FROM oven/bun:1.2.13 AS runtime
WORKDIR /app

# Copy built app and dependencies
COPY --from=base /app /app

# Expose Bun's default port
EXPOSE 3000

# Set environment variables (override as needed)
ENV NODE_ENV=production

# Start the Bun server
CMD ["bun", "src/index.ts"]
