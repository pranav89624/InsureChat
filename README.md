<div style="display: flex; align-items: center;">  <img src="./public/icon.svg" alt="InsureChat" width="40" height="40"/> <h1 style="margin-left: 12px; margin-top: 20px;">InsureChat</h1>
</div>

*Your assistant for quick claim updates and policy answers.*

Modern insurance concierge powered by Next.js, MongoDB Atlas, and Google Gemini. InsureChat helps customers track claim status, answer insurance FAQs, and guide their next steps through a conversational UI.



[![Next.js badge](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript badge](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB badge](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Gemini badge](https://img.shields.io/badge/Google-Gemini-orange)](https://cloud.google.com/gemini)
[![Vercel badge](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Features

- **Claim status concierge** – Recognizes claim IDs (e.g. `C12345`) and returns the latest status, payout, and next steps.
- **Insurance FAQ assistant** – Uses semantic search + Gemini to craft grounded answers from a curated knowledge base.
- **Chat-first UI** – Responsive layout with typing indicators, quick actions, and shift+enter multiline support.
- **SEO & PWA ready** – Structured data, Open Graph cards, `robots` + `sitemap`, and a web manifest for installability.
- **Single data store** – Claims, FAQs, and vector embeddings live together in MongoDB for simpler ops.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.6
- **Database:** MongoDB Atlas + Mongoose models
- **AI:** Google Gemini (text + embeddings)
- **Styling:** Tailwind CSS with custom glassmorphism theme
- **Deployment target:** Vercel (or any Node-compatible host)

---

## Why Next.js and MongoDB?

I chose **Next.js (with TypeScript)** because it gives me both frontend and backend in the same codebase. The chat UI, API routes, and deployment can all live together, which makes development easier and hosting on Vercel straightforward.

For storage, I used **MongoDB**. Normally, RAG setups use a dedicated **vector database**. In this case, the dataset is very small.  
So instead of adding the overhead of another service, I stored the embeddings directly in MongoDB and ran cosine similarity checks in memory. This keeps the system simple while still showing how RAG works in practice. If the dataset grew larger, a vector DB would make sense, but here it’s not needed.

---

## Project Structure

```
.
├─ app/
│  ├─ api/
│  │  ├─ chat/route.ts          # RAG pipeline endpoint
│  │  └─ claim-status/route.ts  # Direct claim lookup
│  ├─ layout.tsx                # Root metadata + layout
│  ├─ head.tsx                  # Theme color & JSON-LD
│  └─ page.tsx                  # Chat experience
├─ components/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ ChatMessage.tsx
│  └─ TypingIndicator.tsx
├─ lib/
│  ├─ siteConfig.ts            # Shared SEO + branding config
│  ├─ mongodb.ts
│  ├─ gemini.ts
│  └─ vectorSearch.ts
├─ models/
│  ├─ Claim.ts
│  └─ FAQ.ts
├─ scripts/
│  └─ seed.ts                  # Populates sample claims + FAQs
└─ public/
   ├─ icon.svg
   ├─ logo-insurechat.svg
   └─ manifest.json
```

## Getting Started

### 1. Prerequisites

- Node.js 18 or newer
- MongoDB Atlas cluster (or local Mongo instance)
- Gemini API key (Google AI Studio)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create `.env` in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SITE_URL=https://your-production-domain (optional until deploy)
```

### 4. Seed sample data

```bash
npm run seed
```

Generates ≈50 claims and ≈50 FAQ entries with embeddings so the assistant can respond immediately.

### 5. Run the dev server

```bash
npm run dev
```

Visit <http://localhost:3000> and start chatting.

## How it Works (Architecture)

1. **Intent detection** – Incoming messages are inspected for claim IDs.
2. **Claim retrieval** – When a claim ID is present, data is fetched directly via `Claim` model.
3. **RAG flow** – Otherwise, Gemini generates an embedding which is compared (cosine similarity) against FAQ vectors stored in MongoDB.
4. **Response generation** – Top-matching FAQ content is provided to Gemini to compose a grounded answer.
5. **Fallbacks** – If the question is out-of-scope, InsureChat politely declines.

---

## Architecture Diagrams

```txt
  +-------------------+
  |     Frontend      |
  |  (Next.js + UI)   |
  +-------------------+
            |
            v
  +-------------------+
  |   API Routes      |
  |  (Next.js App)    |
  +-------------------+
    |            |
    v            v
  +-------+   +-------------------+
  | Mongo |   |    Gemini API     |
  |  DB   |   | (Embeddings + LLM)|
  +-------+   +-------------------+
    |            ^
    v            |
  Claim Lookup   |  FAQ + Context
    Response     |  RAG Response
                  |
                  v
            +-------------------+
            |  Chatbot Reply    |
            +-------------------+
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run seed` | Seed MongoDB with demo claims + FAQs |

## SEO & PWA Touches

- `app/layout.tsx` defines Open Graph, Twitter, robots, and canonical metadata.
- `app/head.tsx` injects Organization JSON-LD and sets the theme color.
- `app/robots.ts` and `app/sitemap.ts` expose crawl-friendly routes.
- `public/manifest.json` + `icon.svg` enable install prompts in modern browsers.

## Deploying

1. Push to GitHub: <https://github.com/pranav89624/InsureChat>
2. Import the repo into Vercel (or your platform of choice).
3. Define the same environment variables (`MONGODB_URI`, `GEMINI_API_KEY`, `NEXT_PUBLIC_SITE_URL`).
4. Trigger a build – Next.js will produce `/robots.txt`, `/sitemap.xml`, and hydrate the chat experience.

## Troubleshooting

- **MongoDB auth errors:** Ensure `MONGODB_URI` includes credentials and that your IP allowlist covers the hosting environment.
- **Gemini quota or auth issues:** Re-check the API key in Google AI Studio and confirm it has access to the `gemini-embedding-001` model.
- **Seed script fails:** Both env vars must be set; the Mongo connection string should name the database (e.g. `mongodb+srv://.../insurechat`).

## License

[MIT](LICENSE) © 2025 Pranav Verma
