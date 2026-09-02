# WORKFLOW.md

## The drill
Feature: Create Project form. Built twice — once from a single vague prompt ("Add a form to create a new project"), once from a precise prompt with file references, constraints, and a required test-and-verify step. Two branches: `round-1-vague-prompt`, `round-2-precise-prompt`.

## What actually differed

**Correctness.** Round 1 built a fully working form, but persisted data to `localStorage` — meaning every "saved" project lives only in one browser, invisible to the actual signed-in user model the rest of the app uses. Round 2 built a real server-side API route with Supabase-session auth and a `user_id`-scoped insert, matching the pattern already established in this codebase. Round 2 is correct architecture; round 1 is a toy that happens to run.

**The mistake I caught:** round 1 violated an existing project rule without flagging it. `.cursorrules` already specifies Supabase + row-level security as the persistence model, and the AI's own summary even admitted "Auth and Supabase are not set up yet... not row-level security" — but it chose to silently ship a localStorage workaround instead of stopping to ask, or building the real thing. A vague prompt let it pick the path of least resistance and explain the shortcut after the fact instead of before.

**Accessibility.** Both rounds were, honestly, similarly strong here — labeled inputs, `aria-live` error regions, `aria-invalid` — likely because these patterns are now common defaults in current models' training, not because precision earned it. This was the one place the drill didn't produce a clear before/after difference, which is itself worth noting: not every quality dimension responds to prompt precision the same way.

**Edge cases.** Round 2's precise prompt explicitly named three test cases (valid input, empty name, over 60 characters) and got exactly three passing tests back — no more, no less. Round 1 produced 4 passing tests unprompted, but I can't verify what they actually covered without auditing them, since I never asked for anything specific. That's the risk of unprompted test generation: quantity without a specified target.

**Review effort.** This is the real lesson. Round 1 felt fast (one sentence, done in under a minute) but left a silent architectural violation I'd have shipped if I hadn't been looking for it. Round 2 took longer to write and review — but the review was verifying correct things (does this insert respect RLS? do the three named tests exist?) instead of hunting for what might be silently wrong. Slower and more confident beat fast and blind.

**One real complication:** Cursor hit its usage limit partway through round 2, after scaffolding the app and schema but before writing the form, route, or tests. Rather than wait, I had the same precise prompt's spec implemented by hand instead of re-running it in Cursor. The outcome should match what Cursor would've produced from that exact prompt, but it's a real free-tier limitation worth planning around: precise prompts needing more agent time are also the ones most likely to hit a usage wall mid-task.