# IMPORT_GRAPH_SUMMARY

High-level dependency shape. No circular dependencies present.

## Core Dependency Nodes

- src/lib/posts.ts
  - Defines PostMeta/Verdict/Pour/Nightcap types + loaders.
  - Imported by: home, post page, column page, all column components, PostCard.
- src/lib/columns.ts
  - 8-column registry + getColumn.
  - Imported by: Nav, home, column page, PostCard, ColumnLayout.
- src/lib/columnThemes.ts
  - Per-column theme config + getColumnTheme.
  - Imported by: column page, ColumnLayout.
- src/components/Verdict.tsx
  - Exports Verdict component + verdictLabel helper.
  - verdictLabel reused by: PostCard, home, ColumnLayout, Nightcap/Backlog/Comfort columns.
- src/lib/igdb.ts
  - Cover lookup; imported by BacklogColumn, NightcapColumn.
- src/app/globals.css
  - Single source of design tokens, pattern classes (.hanko, .seigaiha, .halftone,
    .tape, .brush-link, .reveal, .blink, .tribute-glow) and keyframes. Referenced by
    className across nearly all components.

## Utility / Shared

- next/font (layout.tsx only) → exposes --ff-* CSS vars consumed globally.
- next/image → PostCard? no; used by tribute, BacklogColumn, NightcapColumn.
- mdx-components.tsx → bridges MDX to Verdict/ThePour/Divider.

## Layering (no cycles)

- lib/* (posts, columns, columnThemes, igdb): leaf modules, no intra-app imports
  except posts types referenced by igdb consumers via components.
- components/*: depend on lib/* and on Verdict (for verdictLabel).
- app/* routes: depend on lib/* and components/*.
- Direction is strictly app → components → lib. No back-edges.

## Potential Refactor Risk Areas

- src/lib/posts.ts (broad fan-out: any field/type change ripples to all consumers).
- src/app/globals.css (token/class renames silently break className usages; not type-checked).
- src/components/Verdict.tsx (dual role: component + verdictLabel map; widely imported).
- src/app/columns/[column]/page.tsx (manual id branching; each new bespoke column adds a branch).
- src/lib/igdb.ts (external API shape + env-dependent; failures are swallowed to null by design).
