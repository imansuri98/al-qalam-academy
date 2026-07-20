@AGENTS.md

---

# Al Qalam Academy — Project Guide

## Overview

Al Qalam Academy (معهد القلم) is a Classical Arabic grammar (Qawa'id) self-study platform. Students learn Fusha Arabic through structured chapters with interactive, feedback-driven exercises. Content is authored in Sanity CMS and delivered via a Next.js frontend with user accounts and progress tracking backed by PostgreSQL.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, React 19, RSC) |
| Language | TypeScript (strict) |
| Database | PostgreSQL 15 (via Drizzle ORM) |
| CMS | Sanity v6 (headless, self-hosted studio at `/studio`) |
| Auth | NextAuth v5 (Credentials provider, JWT sessions) |
| Styling | Tailwind CSS v4 + Framer Motion |
| Fonts | Amiri (Arabic headings), Noto Sans Arabic (body) |
| Deployment | Docker (standalone Next.js output + PostgreSQL) |

**IMPORTANT**: This is Next.js **16** — APIs, conventions, and file structure differ from earlier versions. Read the relevant guides in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout: fonts, SessionProvider, Navigation, dark mode
│   ├── globals.css                    # Tailwind v4 import + CSS custom properties
│   ├── (auth)/
│   │   ├── login/page.tsx             # Login page
│   │   └── register/page.tsx          # Registration page
│   ├── (course)/
│   │   ├── page.tsx                   # Course overview (RSC, ISR every 10s) — chapter listing with progress
│   │   └── chapters/[slug]/page.tsx   # Chapter detail (RSC) — fetches chapter + user progress
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts # NextAuth handlers
│   │   ├── register/route.ts          # POST — create user (bcrypt hash)
│   │   └── progress/route.ts          # GET/POST — user exercise progress (upsert)
│   └── studio/[[...tool]]/page.tsx    # Sanity Studio embedded at /studio
├── components/
│   ├── Navigation.tsx                 # Sticky nav bar (client component, useSession)
│   ├── ChapterClient.tsx              # Chapter detail + exercise UI (client component)
│   └── exercises/
│       ├── MCQExercise.tsx           # Multiple choice
│       ├── FillInBlankExercise.tsx   # Fill in the blank
│       ├── DragAndDropExercise.tsx   # Sentence builder (drag & drop)
│       ├── TranslateExercise.tsx     # Translation (AR↔EN)
│       └── IrabExercise.tsx          # I'rab case ending + grammatical role quiz
├── lib/
│   └── db.ts                          # Drizzle schema + DB connection (users, userProgress)
├── auth.ts                            # NextAuth config (credentials, JWT callbacks)
└── sanity/
    ├── schemas/
    │   ├── index.ts                   # Schema type registry
    │   ├── chapter.ts                 # Chapter document schema
    │   ├── exercise.ts                # Exercise document schema (7 types)
    │   ├── vocabulary.ts              # Vocabulary word schema
    │   └── grammarRule.ts             # Grammar rule schema
    └── lib/
        ├── client.ts                  # Sanity JS client (server-side fetch)
        ├── queries.ts                 # GROQ queries (chapters list + chapter by slug)
        └── fetch.ts                   # TypeScript fetch helpers + interfaces

scripts/
└── seed.ts                            # Seeds Sanity with sample chapter + exercises
```

## Key Architecture Decisions

### Content Flow
1. **Sanity Studio** (`/studio`) — authors create Chapters, Exercises, Vocabulary, and GrammarRule documents
2. **Server Components** fetch from Sanity via `src/sanity/lib/fetch.ts` on the server
3. **Client Components** receive serialized data as props — never call Sanity directly

### Exercise System
- Exercises are reference-linked from Chapters (via Sanity references)
- 7 exercise types: `mcq`, `fill_in_blank`, `drag_and_drop`, `translate_ar_en`, `translate_en_ar`, `irab`, `matching`
- Each exercise component receives `{ exerciseId, questionText, options, explanation, onComplete }` props
- `onComplete(score, maxScore)` is called when the user finishes — the parent handles local state + API persistence
- Exercises are **sequentially locked** (must complete previous to unlock next)

### Database Schema
- `users` table: id (UUID), name, email (unique), password (bcrypt hashed), created_at
- `user_progress` table: id (UUID), user_id (FK→users), chapter_slug, exercise_id, score, max_score, completed_at
- Unique constraint on (user_id, chapter_slug, exercise_id) — upsert on re-completion

### Auth Flow
- NextAuth v5 with Credentials provider
- JWT-based sessions (not database sessions)
- `auth()` called in RSCs; `useSession()` in client components
- Protected routes check `session?.user?.id`

### Styling Conventions
- Tailwind v4 with CSS-based config (no `tailwind.config.ts`)
- Dark mode via `dark:` variants (works with system/browser preference)
- Arabic text uses `dir="rtl"` + `font-amiri` class (Amiri font, larger sizes for readability)
- Cards use `backdrop-blur-md` + semi-transparent backgrounds
- Gradient hero: `bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900`

## Local Development

```bash
# Start PostgreSQL (Docker)
docker compose up db -d

# Install dependencies
npm install

# Run database migrations
npx drizzle-kit push

# Seed Sanity with sample data (requires SANITY_API_WRITE_TOKEN)
npm run seed

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Required | Default |
|---|---|---|
| `DATABASE_URL` | Yes | `postgresql://postgres:postgres_password@localhost:5432/alqalam` |
| `NEXTAUTH_SECRET` | Yes | — |
| `NEXTAUTH_URL` | No | `http://localhost:3000` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | `mockproj1` (no-op when not connected) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | `2024-03-19` |
| `SANITY_API_WRITE_TOKEN` | For seeding | — |

## Docker Deployment

The app uses Next.js `output: "standalone"` with a multi-stage Docker build. The `docker-compose.yml` defines two services:
- `db`: PostgreSQL 15 Alpine with healthcheck
- `web`: Next.js app, depends on healthy db

## Coding Conventions

- Path alias: `@/*` → `./src/*`
- Arabic text detection: `/[\\u0600-\\u06FF]/.test(text)`
- Font variable names: `--font-amiri` (serif/Arabic), `--font-noto-arabic` (sans-serif)
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- RSC-first: prefer server components for data fetching; client components receive props
- Rich text from Sanity is rendered via the `PortableTextRenderer` component (auto-RTL detection)
- API routes return `NextResponse.json()` with appropriate status codes
