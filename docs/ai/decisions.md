# Architecture Decisions

ADR log. Write entries when a decision is hard to reverse, affects multiple components, or future-you will ask "why did we do it this way?"

---

## ADR-001: Static-first Next.js + MDX, no database

**Date:** 2026-06-08
**Status:** Accepted

**Context**
Writing-first publication; "built to be owned, not rented." Wanted no vendor lock-in, simple hosting, low cost.

**Decision**
We will use Next.js 16 (App Router) + TypeScript + Tailwind v4, with posts as MDX files in `content/posts/`, compiled via `@next/mdx` (remark-gfm, remark-frontmatter) and listed via `gray-matter` + `reading-time`. Prerender everything (SSG). No DB at launch.

**Consequences**
- Positive: Git-versioned content, free static hosting (Vercel), full control.
- Negative: No runtime CMS; content changes need a rebuild.
- Neutral: Frontmatter is the content schema (PostMeta in `src/lib/posts.ts`).

**Alternatives considered**
- Contentlayer — rejected (unmaintained).
- Headless CMS / DB — deferred until member features exist.

---

## ADR-002: Bold, authentic art direction over generic UI

**Date:** 2026-06-08
**Status:** Accepted

**Context**
The first clean, minimal version read as generic "AI-built." The brand is *Samurai Champloo* — woodblock + hip-hop, zine-not-SaaS, texture as a feature.

**Decision**
We will use a printed-mark visual language — hanko seals, monograms, a café roaster badge, coffee-ring stains, seigaiha/halftone textures, letterpress numerals — and avoid stock/clip-art icons entirely. Each signature page gets its own "world."

**Consequences**
- Positive: Distinct, memorable, on-concept; hard to mistake for a template.
- Negative: More bespoke code per page; less reuse.
- Neutral: `globals.css` holds the shared pattern/motion vocabulary (untyped contract).

**Alternatives considered**
- Single shared template for all columns — rejected (felt generic).

---

## ADR-003: Per-column identity via theme config + id branch

**Date:** 2026-06-08
**Status:** Accepted

**Context**
8 columns need distinct identities without 8 hand-authored pages of uneven quality.

**Decision**
We will keep per-column identity data in `src/lib/columnThemes.ts` (mood, accent, monogram, voice) rendered by a shared `ColumnLayout` + `ColumnSeal`; signature columns (the-nightcap, comfort-mode, the-backlog) are selected by an explicit id branch in `columns/[column]/page.tsx` and render bespoke components.

**Consequences**
- Positive: Consistency for the many, bespoke depth for the few; easy to tune via config.
- Negative: Each new bespoke column adds a branch.

---

## ADR-004: IGDB (via Twitch OAuth) for game covers, fail-soft

**Date:** 2026-06-08
**Status:** Accepted

**Context**
Need game cover art (and later, On Tap release dates). IGDB is free, broad, commercial-OK with attribution; RAWG's free tier is non-commercial.

**Decision**
We will use `src/lib/igdb.ts` — Twitch `client_credentials` OAuth + IGDB search, fetched at build time, with token/cover in-memory caching. Missing creds or any error returns `null` → placeholder UI; the build never breaks. Specific editions are pinned with a release-year (`since`) filter.

**Consequences**
- Positive: Reusable for On Tap; resilient; no hard dependency at build.
- Negative: Requires Twitch app creds in env; covers only as good as IGDB matches.
- Neutral: `images.igdb.com` allowlisted in `next.config.ts` for next/image.

**Alternatives considered**
- RAWG — rejected (non-commercial free tier).
- Manual cover files — rejected (manual upkeep; chose automation).

---
