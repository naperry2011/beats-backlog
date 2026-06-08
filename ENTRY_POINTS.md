# ENTRY_POINTS

Next.js App Router. Entry points are route segments + build/runtime config.
All routes are statically prerendered (SSG); no servers, workers, or crons.

## Root Layout

Path: src/app/layout.tsx
Responsibility: HTML shell, font variables, global Nav + Footer, imports globals.css
Invokes: Nav, Footer
Depends On: next/font/google, src/components/Nav, src/components/Footer

## Home Route

Path: src/app/page.tsx
Responsibility: Landing — hero, featured Nightcap, latest posts, columns tracklist
Invokes: Hero, PostCard, verdictLabel
Depends On: src/lib/posts, src/lib/columns, src/components/Hero, src/components/PostCard

## Post Route

Path: src/app/posts/[slug]/page.tsx
Responsibility: Render one MDX post; Verdict + Pour from frontmatter
Invokes: dynamic import("../../../../content/posts/${slug}.mdx"), Verdict, ThePour
Depends On: src/lib/posts, src/lib/columns
Static: generateStaticParams (from getAllSlugs), dynamicParams=false

## Column Route

Path: src/app/columns/[column]/page.tsx
Responsibility: Dispatch per column to a bespoke or themed layout
Invokes: NightcapColumn | ComfortModeColumn | BacklogColumn | ColumnLayout
Depends On: src/lib/columns, src/lib/columnThemes, src/lib/posts
Static: generateStaticParams (from COLUMNS), dynamicParams=false

## About Route

Path: src/app/about/page.tsx
Responsibility: Static manifesto page
Depends On: none (self-contained)

## Tribute Route

Path: src/app/tribute/page.tsx
Responsibility: Memorial page; static image imports, local styling
Invokes: next/image
Depends On: src/images/tribute/*

## MDX Components Provider

Path: mdx-components.tsx (project root)
Responsibility: Required by @next/mdx; maps MDX tags to components
Invokes: Verdict, ThePour, Divider

## Build / Runtime Config

Path: next.config.ts
Responsibility: MDX compilation (remark plugins), .mdx pageExtensions, IGDB image host
Depends On: @next/mdx

Path: package.json scripts
- dev: next dev (project runs on `next dev -p 3007` during development)
- build: next build (SSG; IGDB covers fetched at build time)
- start: next start
