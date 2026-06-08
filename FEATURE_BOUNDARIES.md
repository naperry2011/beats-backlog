# FEATURE_BOUNDARIES

## Content Layer (src/lib/posts.ts + content/posts)

Owns: post discovery, frontmatter parsing, reading-time, PostMeta/Verdict/Pour/Nightcap types
Does NOT Own: rendering, MDX compilation, routing
Communicates With: all route pages and column components (read-only)
Isolation Level: Strong

## Columns Registry & Theming (src/lib/columns.ts, columnThemes.ts)

Owns: the 8 columns' identity data (names, taglines, accents, monograms, voice)
Does NOT Own: post data, layout markup, image fetching
Communicates With: column route, ColumnLayout, Nav, home
Isolation Level: Strong

## Column Rendering (ColumnLayout, ColumnSeal, + bespoke columns)

Owns: how a column page looks (themed generic shell + Nightcap/Comfort/Backlog worlds)
Does NOT Own: column data, post loading, cover fetching logic
Communicates With: columns/[column] page (receives posts + theme), igdb.ts (covers)
Isolation Level: Moderate (bespoke columns selected by id branch in the route)

## MDX Pipeline (next.config.ts, mdx-components.tsx)

Owns: .mdx compilation, remark plugins, MDX→component mapping
Does NOT Own: frontmatter listing (gray-matter path), page composition
Communicates With: post route (dynamic import), content components
Isolation Level: Moderate (shared compile config affects all .mdx)

## Post Page (src/app/posts/[slug])

Owns: single-article composition (header + MDX body + Verdict + Pour)
Does NOT Own: MDX compile rules, post metadata source
Communicates With: posts.ts, columns.ts, Verdict, ThePour
Isolation Level: Strong

## IGDB Covers (src/lib/igdb.ts)

Owns: Twitch auth, IGDB search, cover URL resolution, caching, graceful nulls
Does NOT Own: where covers render, saga/game selection
Communicates With: BacklogColumn, NightcapColumn; external Twitch + IGDB
Isolation Level: Strong (single seam; swappable; env-gated)

## App Shell (layout.tsx, Nav, Footer, globals.css)

Owns: fonts, global chrome, design tokens, pattern/motion utility classes
Does NOT Own: page content, data
Communicates With: every route (wraps children); columns.ts (Nav links)
Isolation Level: Moderate (globals.css class/token names are an untyped contract)

## Static Pages (about, tribute)

Owns: self-contained page content + local styling; tribute owns its image assets
Does NOT Own: shared data or components beyond next/image
Communicates With: nothing app-internal (tribute uses src/images/tribute/*)
Isolation Level: Strong

## Home (src/app/page.tsx, Hero)

Owns: landing composition + the ukiyo-e hero scene
Does NOT Own: post/column data definitions
Communicates With: posts.ts, columns.ts, Hero, PostCard
Isolation Level: Moderate
