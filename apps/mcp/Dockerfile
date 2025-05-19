# syntax=docker/dockerfile:1
FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
CMD ["bun", "run", "dev"]
