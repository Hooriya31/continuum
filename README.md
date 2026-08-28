# Continuum

**Your work shouldn't disappear when your focus does.**

An AI-powered work-memory tool. Before you stop working on something, write a quick note about what you did, what's next, and what's still unresolved. AI structures it into a clean project status. When you come back — hours or days later — Continuum gives you a short briefing so you can pick up exactly where you left off, instead of reconstructing your train of thought from scratch.

Built as my capstone project for the FlyRank AI Fluency — Frontend AI Engineering track (FE-01 through FE-11).

## The problem
Switching between tasks — studying, coding, writing, designing — means losing context. An hour (or a day) later, you're stuck asking "wait, what exactly was I doing?" To-do lists remember *what* you need to do. Continuum remembers *why* — the reasoning, the open questions, the half-made decisions.

## Who it's for
Students, developers, freelancers, and anyone juggling multiple unfinished projects at once.

## Status
🚧 In development — Week 1 (environment setup).

## Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Auth + Database:** Supabase (Postgres, row-level security so users only ever see their own data)
- **AI:** LLM API (Gemini free tier), called server-side only via a Next.js API route — the key never reaches the browser
- **Deployment:** Vercel

## Planned features
- [ ] Create a project, write a free-text "save context" note before stopping work
- [ ] AI structures the note into: Completed / Next Steps / Open Questions / Context Summary
- [ ] "Welcome back" resume briefing generated when you return to a project
- [ ] Timeline of past saved sessions per project
- [ ] Accessible components (keyboard nav, semantic HTML, screen-reader support)
- [ ] Explicit error/empty/edge-case handling — AI calls fail safely, never silently
- [ ] Unit/integration tests, ≥50% component coverage
- [ ] Lighthouse + accessibility audit (WCAG 2.1 AA)
- [ ] Deployed on Vercel with a documented deployment checklist and rollback plan

## Privacy & cost by design
- Row-level security in Supabase — your data is never visible to other users
- API key stays server-side, never exposed to the client
- AI is called at most twice per work session (save + resume), not a constant chat loop, to keep usage low and the app sustainable to run for free
- Per-user rate limiting to prevent runaway API usage

## Getting started

There is no app in this repo yet — Status is Week 1 (environment setup), so there is no `package.json` and `npm install` will fail. Come back here once the Next.js scaffold is committed.

When the app exists, you will need:

- Node.js 20 LTS (or current LTS)
- A [Supabase](https://supabase.com) project (auth + Postgres)
- A [Gemini API key](https://aistudio.google.com/apikey) (server-side only; never put it in client code)

Then:

```bash
npm install
npm run dev
```

Copy env vars into `.env.local` (do not commit it). An `.env.example` with the exact names will be added with the scaffold.

## License
MIT — see [LICENSE](./LICENSE).
