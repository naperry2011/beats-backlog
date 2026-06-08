# Architecture

System design at a glance. Pair with CODE_MAP.md (file map) and DATA_FLOW.md (system flows).

## System Overview

Static-first content site: a writing publication rendered entirely as prerendered HTML (SSG). Content is MDX on disk; the only external call is IGDB for game covers, made at build time. No database, no runtime server logic.

**Style:** Static site (Next.js App Router, SSG)
**Hosting:** Vercel (intended; free tier)

## Core Components

### App Shell & Theme
- Responsibility: HTML shell, fonts, global chrome, design tokens + pattern/motion classes
- Tech: Next.js layout, next/font, Tailwind v4
- Key files: src/app/layout.tsx, src/app/globals.css, src/components/Nav.tsx, src/components/Footer.tsx
- Depends on: columns.ts (Nav links)

### Content Layer
- Responsibility: post discovery, frontmatter parsing, reading-time, content types
- Tech: node:fs, gray-matter, reading-time
- Key files: src/lib/posts.ts, content/posts/*.mdx
- Depends on: filesystem

### MDX Pipeline
- Responsibility: compile .mdx, map MDX tags to components
- Tech: @next/mdx, remark-gfm, remark-frontmatter
- Key files: next.config.ts, mdx-components.tsx
- Depends on: Content Layer (bodies), Verdict/ThePour/Divider

### Columns System
- Responsibility: per-column identity + rendering (themed shell + bespoke worlds)
- Key files: src/lib/columns.ts, src/lib/columnThemes.ts, src/app/columns/[column]/page.tsx, src/components/ColumnLayout.tsx, ColumnSeal.tsx, NightcapColumn.tsx, ComfortModeColumn.tsx, BacklogColumn.tsx
- Depends on: Content Layer, IGDB Covers (Nightcap/Backlog)

### IGDB Covers
- Responsibility: Twitch auth, IGDB search, cover URL resolution, caching, fail-soft nulls
- Key files: src/lib/igdb.ts
- Depends on: Twitch OAuth, IGDB API, env vars

### Pages
- Responsibility: route composition — home, post, about, tribute
- Key files: src/app/page.tsx (+ Hero.tsx), src/app/posts/[slug]/page.tsx, src/app/about/page.tsx, src/app/tribute/page.tsx

## Data Flow (Critical Path)

1. Build starts — App Router collects routes
2. posts.ts reads content/posts/*.mdx (frontmatter → PostMeta) — Content Layer
3. Routes render: home/columns/post pull PostMeta; post page dynamic-imports compiled MDX — MDX Pipeline
4. Backlog/Nightcap call igdb.ts → Twitch token → IGDB search → cover URL (or null) — IGDB Covers
5. Pages prerender to static HTML; next/image optimizes local + images.igdb.com assets

## Data Stores

- None. Content lives in `content/posts/*.mdx`; images in `src/images/` and `public/`.
- In-memory caches (token, covers) exist only per build process.

## External Integrations

- Twitch (id.twitch.tv) — OAuth client_credentials token for IGDB
- IGDB (api.igdb.com) — game search; covers from images.igdb.com
- Google Fonts via next/font — Anton, Newsreader, Space Mono (self-hosted at build)

## Security Boundaries

- Secrets: TWITCH_CLIENT_ID / TWITCH_CLIENT_SECRET in `.env.local` (gitignored), used server/build-side only — never shipped to client.
- No auth, no user data, no runtime endpoints.

## Known Constraints / Trade-offs

- Content changes require a rebuild (no runtime CMS).
- IGDB covers depend on build-time network + creds; absence degrades to placeholders.
- globals.css class/token names are an untyped contract shared across components.
- Single `next dev` per project dir (dev/preview servers conflict).
