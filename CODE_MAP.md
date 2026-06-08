# CODE_MAP

Beats and Backlog — Next.js 16 (App Router) + TypeScript + Tailwind v4 + MDX.
Static-first publication site. No database.

## App Shell & Theme

Category: UI / Infra

Primary Files:
- src/app/layout.tsx (root layout, fonts via next/font, Nav + Footer wrap)
- src/app/globals.css (Tailwind v4 @theme tokens, patterns, motion keyframes)
- src/components/Nav.tsx
- src/components/Footer.tsx

Supporting Files:
- postcss.config.mjs
- tsconfig.json

External Integrations:
- Google Fonts (Anton, Newsreader, Space Mono) via next/font

## Home Page

Category: UI

Primary Files:
- src/app/page.tsx (hero + Now Spinning + Latest + Columns tracklist)
- src/components/Hero.tsx (ukiyo-e sun-record scene)

Supporting Files:
- src/components/PostCard.tsx
- src/components/Divider.tsx
- src/lib/posts.ts, src/lib/columns.ts

Entry Points:
- Route: / (static)

## MDX Content Pipeline

Category: Service / Infra

Primary Files:
- next.config.ts (createMDX + remark-gfm, remark-frontmatter; pageExtensions)
- mdx-components.tsx (MDX → component map: Verdict, ThePour, Divider)
- src/lib/posts.ts (fs read + gray-matter + reading-time loader)

Supporting Files:
- content/posts/*.mdx (in-living-color, nightcap-001)

External Integrations:
- Filesystem (content/posts at build time)

## Post (Article) Page

Category: UI

Primary Files:
- src/app/posts/[slug]/page.tsx (dynamic MDX import, generateStaticParams)

Supporting Files:
- src/components/Verdict.tsx (5 record-flavored verdicts)
- src/components/ThePour.tsx (liner-notes breakdown)
- src/lib/posts.ts, src/lib/columns.ts

Entry Points:
- Route: /posts/[slug] (SSG, dynamicParams=false)

## Columns System

Category: UI

Primary Files:
- src/app/columns/[column]/page.tsx (router: branches to bespoke or themed)
- src/lib/columns.ts (8-column registry)
- src/lib/columnThemes.ts (per-column mood/accent/monogram/voice)
- src/components/ColumnLayout.tsx (themed shell for the 6 generic columns)
- src/components/ColumnSeal.tsx (curved-text monogram stamp)

Bespoke Column Worlds:
- src/components/NightcapColumn.tsx (late-night ritual; hanko kanji seals)
- src/components/ComfortModeColumn.tsx (café; roaster badge, coffee rings)
- src/components/BacklogColumn.tsx (save-select; IGDB covers, scanlines)

Entry Points:
- Route: /columns/[column] (SSG, dynamicParams=false)

## Game Cover Integration (IGDB)

Category: Service

Primary Files:
- src/lib/igdb.ts (Twitch OAuth + IGDB cover lookup, in-memory cache)

Consumers:
- src/components/BacklogColumn.tsx (saga save-slot covers)
- src/components/NightcapColumn.tsx (game pick cover)

External Integrations:
- Twitch id.twitch.tv (OAuth client_credentials)
- IGDB api.igdb.com (game search)
- images.igdb.com (cover art; allowlisted in next.config.ts)

Config:
- .env.local (TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET); .env.local.example

## Static Pages

Category: UI

Primary Files:
- src/app/about/page.tsx
- src/app/tribute/page.tsx (immersive purple; next/image static imports)

Supporting Files:
- src/images/tribute/*.jpg (jordan-panda, nerddom-crest, nerddom-united, nerddom-symbol)
- image/*.jpg (source originals)

Entry Points:
- Routes: /about, /tribute (static)
