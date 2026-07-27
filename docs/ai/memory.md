# Project Memory

Running history of what's been built and current state. Update after major changes.

## Current State

**Status:** Active Development
**Last Updated:** 2026-06-08
**Version:** pre-launch; committed to git (initial commit on `main`)

### What's Working
- Next.js 16 (App Router) + TypeScript + Tailwind v4 + MDX skeleton; `npm run build` passes.
- Global shell: Anton/Newsreader/Space Mono fonts, woodblock-and-vinyl theme, grain + pattern toolkit (hanko, seigaiha, halftone, tape, brush-link), motion (reveal, blink, aurora, spin-slow).
- Home: ukiyo-e hero (vinyl-as-rising-sun over a seigaiha sea), Now Spinning, Latest, Columns tracklist.
- MDX content pipeline: `content/posts/*.mdx` → gray-matter + reading-time loader; post page renders body + Verdict + Pour.
- All 8 columns have identity. Bespoke worlds: The Nightcap (late-night ritual, hanko kanji seals 遊/観/聴), Comfort Mode (café — roaster badge, coffee rings, menu), The Backlog (save-select — IGDB covers, CRT scanlines, "CONTINUE?"). Other 6 use the themed `ColumnLayout` + `ColumnSeal`.
- Tribute page (Jordan "Panda" Wright): immersive Purple Rain night, real photo, Nerddom United crest + official emblem, "When Doves Cry — named, not played," real eulogy copy + dates.
- IGDB game covers: Twitch OAuth → IGDB search, graceful null fallback; covers on Backlog save slots + Nightcap game pick.

### Known Issues
- Twitch credentials were shared in chat and live in `.env.local` — **rotate before launch**, add to Vercel env on deploy.
- `globals.css` class/token names are an untyped contract — renames can silently break className usages.
- IGDB cover matching can pick wrong editions for shared titles (mitigated with a per-saga `since` year filter).
- No decorative/ambient motion chrome on this project: the user rejects marquees and tickers as "AI slop." The planned Next Round "open-mic marquee" needs a different device.

### In Progress
- Nothing actively mid-edit. Candidate next work below.

## Implementation History

### 2026-07-26 — Visual uplift (shared surfaces + reading page)
**What was built:** Hero recomposed as an asymmetric split so the sun-record
scene sits on the first screen. New `lib/art.ts` + `PostArtwork` put real cover
art (IGDB/AniList/iTunes) on the home page, post cards, reading page, and the
themed `ColumnLayout`, with a white-label monogram sleeve as the fallback. Home
page regrouped into four distinct layout families. Reading page got a
record-sleeve header, a struck drop cap, and pull quotes. The scrolling ticker
above the masthead was deleted at the user's request ("AI slop"); header is now
56px.
**Why:** The surface was strongly art-directed but the structure underneath was
conventional, and the cover-art pipeline built in June was unused on every
high-traffic surface.
**Bugs fixed:** AniList's `large` field serves the /medium/ file (107px wide) —
switched to `extraLarge` (460px), which also fixes the bespoke Nightcap column.
Italic hero headline was clipping the "g" descender.
**Files affected:** src/lib/art.ts (new), src/components/PostArtwork.tsx (new),
Hero, Nav, Footer, PostCard, ColumnLayout, page.tsx, posts/[slug]/page.tsx,
globals.css, lib/anilist.ts, lib/posts.ts

### 2026-06-08 — Scaffold + look
**What was built:** Next.js/MDX/Tailwind skeleton (steps 1–3); palette, fonts, Champloo shell, columns, Verdict/Pour.
**Why:** Stand up the writing-first site from the blueprint.
**Files affected:** src/app/*, src/components/*, src/lib/*, content/posts/*

### 2026-06-08 — Expressive redesign
**What was built:** "Aged record-sleeve zine" art direction — sun-record hero, hanko, seigaiha, halftone, late-night footer.
**Why:** First clean version read as generic/"AI"; user wants bold, authentic design.

### 2026-06-08 — Bespoke pages
**What was built:** Tribute (Purple Rain), Nightcap, Comfort Mode (café), Backlog (save-select); per-column theming system; printed-mark seals replacing generic icons.

### 2026-06-08 — IGDB covers
**What was built:** `src/lib/igdb.ts` (Twitch OAuth + cover lookup); covers on Backlog + Nightcap; release-year pinning for remakes (RE4, MGS Δ).

## Architecture Evolution

Static-first Next.js App Router site, no database. Content is MDX files in `content/posts/`, read at build via `src/lib/posts.ts`. Columns are data-driven (`src/lib/columns.ts` + `columnThemes.ts`); the column route branches to bespoke components for Nightcap/Comfort/Backlog and a themed `ColumnLayout` for the rest. Only external integration is IGDB (via Twitch OAuth) for game covers, fetched at build. Target host: Vercel. See architecture.md and CODE_MAP.md for detail.

## Lessons Learned

- Art direction (composition, texture, printed-mark motifs) — not font choice — is what separated "authentic" from "AI-generic" here.
- IGDB names remakes identically to originals; pin specific editions with a release-year (`since`) filter, not search strings.
- Next 16 defaults to Turbopack; pass remark plugins to `@next/mdx` in string form so they serialize.
- Only one `next dev` per project dir. The dev server now defaults to `:3007` (`npm run dev -- -p 3007`, set in `.claude/launch.json`), so a second server started on that port will conflict with the preview tool.
