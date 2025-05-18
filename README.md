# document-chat

A modern Bun + React + Tailwind CSS v4 app for streaming AI chat with document preview, using an OpenAI-compatible backend.

---

## Features

- **Streaming AI chat** with multi-turn conversation
- **OpenAI-compatible backend** (supports custom providers like IONOS)
- **Markdown rendering** with sanitization (Marked + DOMPurify)
- **Beautiful, responsive UI** with Tailwind CSS v4 and Tailwind Typography
- **Document preview panel** for context-aware chat
- **Input validation** with Zod
- **Production-ready streaming** using Vercel AI SDK

## Screenshots

<!-- Optionally add a screenshot or GIF here -->

## Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root with:

```env
OPENAI_API_KEY=your-openai-or-ionos-key
OPENAI_API_BASE_URL=https://api.ionos.ai/openai/v1
```

Adjust the base URL for your provider if needed.

### 3. Start the development server

```bash
bun dev
```

### 4. Build and run for production

```bash
bun run build
bun start
```

## Usage

- Type a message in the chat box and press **Send**.
- The AI will stream its response in real time.
- The right panel previews a document (customize in `DocumentPreview.tsx`).

## Tech Stack

- [Bun](https://bun.sh) (runtime & server)
- [React](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Zod](https://zod.dev) (validation)
- [Marked](https://marked.js.org) + [DOMPurify](https://github.com/cure53/DOMPurify) (markdown & sanitization)

## Contributing

Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Acknowledgements

- [Bun](https://bun.sh)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [IONOS AI](https://www.ionos.com/ai)
- [Marked](https://marked.js.org)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Tailwind CSS](https://tailwindcss.com)
