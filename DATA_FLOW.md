# DATA_FLOW

All flows resolve at build time (SSG). No runtime DB or request-time fetching
except IGDB lookups, which occur during render/build.

## Post Listing

Source: content/posts/*.mdx (frontmatter)
Transport: filesystem read (node:fs)
Processor: src/lib/posts.ts (gray-matter parse + reading-time)
Storage: none (in-memory PostMeta[])
Downstream Consumers: home page, column pages, post page header

## Post Body Rendering

Source: content/posts/[slug].mdx
Transport: dynamic import (compiled by @next/mdx)
Processor: remark-gfm + remark-frontmatter; mdx-components.tsx mapping
Storage: none (prerendered HTML)
Downstream Consumers: /posts/[slug] route

## Column Dispatch

Source: route param `column`
Transport: function call
Processor: columns/[column]/page.tsx → getColumn + getColumnTheme + getPostsByColumn
Storage: none
Downstream Consumers: NightcapColumn | ComfortModeColumn | BacklogColumn | ColumnLayout

## Game Cover Lookup (IGDB)

Source: game title strings (BacklogColumn SAGAS, Nightcap frontmatter.nightcap.game)
Transport: HTTPS — Twitch OAuth token, then IGDB POST search
Processor: src/lib/igdb.ts (getGameCover; module-level token + cover cache)
Storage: in-memory Map cache (per process); images served from images.igdb.com
Downstream Consumers: BacklogColumn save slots, NightcapColumn game pour row
Fallback: missing creds / error → null → placeholder UI

## Tribute Images

Source: src/images/tribute/*.jpg (static imports)
Transport: next/image build optimization
Storage: optimized assets in build output
Downstream Consumers: /tribute route

## Theme & Fonts

Source: globals.css @theme tokens; next/font/google
Transport: CSS variables; self-hosted font files
Processor: Tailwind v4 (@tailwindcss/postcss)
Downstream Consumers: all routes/components
