# Tasks

Active work. Update as items are completed and new work is identified.

## Sprint / Iteration

**Range:** 2026-06-08 →
**Goal:** Distinct, authentic identity per page; then real content + editorial pages.

## In Progress

- [ ] (none actively mid-edit)

## Columns Campaign (agreed 2026-06-11: premium pass first, then 5 new worlds, On Tap full watchlist)

- [x] Phase 1 — premium pass: Nightcap (CJK hanko font, staggered reveals, past-round art), Comfort Mode (steam, hovers, today's special), Backlog (Load? hover) — 2026-06-11
- [x] Phase 2 — Rewind (video-rental shelf / VHS) — 2026-06-11
- [x] Phase 2 — Respect Due (candlelit hall of honor) — 2026-06-11
- [x] Bonus — Backlog engagement: click a save slot → game detail panel (getGameDetails in igdb.ts + client SaveSlotGrid; build-time data, instant UI) — 2026-06-11
- [ ] Phase 2 — Worth Your Hours? (time-clock bureau) — M ← NEXT
- [ ] Phase 2 — Next Round (open-mic marquee) — M
- [ ] Phase 2 — On Tap (taproom + live IGDB watchlist, ISR daily) — L
- [ ] Phase 3 — `/columns` index (record-crate contact sheet) — S

> Note: 4 commits sitting on local `main` ahead of origin (premium pass,
> Rewind, Respect Due + Backlog details, docs) — user pushes/deploys himself.

## Up Next (after campaign)

- [ ] Article/reading page polish — drop caps, pull quotes, margin notes, record-sleeve header — M
- [ ] About manifesto page — rewrite from plain text into the real "why" — S

## Blocked

- [ ] (none)

## Recently Completed

- [x] Covers pass 2: crop fix (native ratios), anime covers (AniList), album art (iTunes) — 2026-06-09
- [x] Vercel: project linked, Twitch env vars on Production, deployed (beats-backlog.vercel.app) — 2026-06-09
- [x] Pin RE4 Remake + MGS Δ: Snake Eater covers via release-year filter — 2026-06-08
- [x] IGDB cover integration (Twitch OAuth, graceful fallback) — 2026-06-08
- [x] The Backlog bespoke save-select world — 2026-06-08
- [x] Replace generic column icons with printed-mark seals; hanko kanji in Nightcap — 2026-06-08
- [x] Comfort Mode café; Nightcap late-night world — 2026-06-08
- [x] Home ukiyo-e hero; tribute page with real copy + dates — 2026-06-08
- [x] Scaffold + look + columns (build passes) — 2026-06-08

## Bugs

- [ ] (none open)

## Tech Debt

- [ ] Rotate Twitch credentials before launch (now live on Vercel Production too — update both .env.local and Vercel when rotating) — P1
- [ ] `globals.css` token/class names are an untyped contract — document or guard before large renames — P3
- [ ] Bespoke columns chosen by manual id branch in `columns/[column]/page.tsx` — fine for now; revisit if it grows — P3
- [ ] Source images duplicated in `image/` and `src/images/tribute/` — prune `image/` if unused — P3

## Housekeeping

- [x] Initial git commit — 2026-06-08
