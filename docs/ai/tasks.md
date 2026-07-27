# Tasks

Active work. Update as items are completed and new work is identified.

## Sprint / Iteration

**Range:** 2026-06-08 →
**Goal:** Distinct, authentic identity per page; then real content + editorial pages.

## In Progress

- [ ] (none actively mid-edit)

## Columns Campaign (agreed 2026-06-11: premium pass first, then 5 new worlds, On Tap full watchlist)

- [x] Phase 1 — premium pass: Nightcap (CJK hanko font, staggered reveals, past-round art), Comfort Mode (steam, hovers, today's special), Backlog (Load? hover) — 2026-06-11
- [x] Phase 2 — Rewind — 2026-06-11, rebuilt 2026-07-26 (see Rewind section)
- [x] Phase 2 — Respect Due (candlelit hall of honor) — 2026-06-11
- [x] Bonus — Backlog engagement: click a save slot → game detail panel (getGameDetails in igdb.ts + client SaveSlotGrid; build-time data, instant UI) — 2026-06-11
- [x] Phase 2 — Worth Your Hours? (time-and-motion bureau; reviews filed as
      punch cards, stopped clock at 9:41, verdict as a rubber stamp) — 2026-07-26
- [ ] Phase 2 — Next Round (open-mic stage; NOT a marquee, see below) — M ← NEXT
- [ ] Phase 2 — On Tap (taproom + live IGDB watchlist, ISR daily) — L
- [ ] Phase 3 — `/columns` index (record-crate contact sheet) — S

## Visual Uplift (2026-07-26) — shared surfaces + reading page

- [x] Hero recomposed as an asymmetric split so the sun-record scene shares the
      first screen with the copy (was landing ~970px down, cut off on laptops)
- [x] Sleeve art on the main surfaces: `lib/art.ts` resolves one cover per post
      from IGDB/AniList/iTunes; `PostArtwork` renders it at native ratio with a
      white-label monogram sleeve as the fallback
- [x] Optional `art: { game | anime | album }` post frontmatter; Nightcap posts
      derive art from their own picks, so no content edits were needed
- [x] Home section rhythm: four distinct layout families instead of three
      repeats of header-plus-bordered-rows; Latest grid takes exactly as many
      columns as there are posts
- [x] Reading page: record-sleeve header, drop cap, real pull quotes
      (this closes the "Article/reading page polish" item)
- [x] Removed the scrolling ticker strip above the masthead — user's call,
      "AI slop." Header went 92px → 56px. `.marquee-track` CSS deleted with it.
- [x] Bug: AniList `large` serves the /medium/ file (107px). Switched to
      `extraLarge` (460px) — also fixes covers in the bespoke Nightcap column.
- [x] Bug: italic hero headline was clipping the descender in "nostalgia,"
- [x] Nav height brought under the 80px cap (now 56px)

## Rewind is a music column now (2026-07-26)

Perry's call: Rewind is music-focused, not games. The video-store world was
retired with it.

- [x] Rebuilt as the back of a used record shop's crate: tabbed divider card as
      the signature mark, groove texture, crate in ochre under magenta light
- [x] Entries lead with cover art via `PostArtwork` (the VHS spine ignored
      artwork entirely, wrong for an all-music column)
- [x] Retired the video-store language and deleted `.vhs-jitter` /
      `.tracking-band` from globals.css, nothing else used them
- [x] `columns.ts` tagline/description and `columnThemes.ts` strings updated;
      both still described games and video
- [x] Snake Eater moved out of Rewind to The Backlog, closing paragraph
      rewritten to the Backlog thesis, slug renamed (live URL changed)

## Content (2026-07-26) — first real posts

- [x] Baldur's Gate 3 (Worth Your Hours?, Worth the Spin) — the cost is
      continuity, not hours
- [x] Digimon Story: Time Stranger (Worth Your Hours?, Worth the Spin) —
      deliberate counterweight to the BG3 piece; replaced a Hades placeholder
- [x] Metal Gear Solid 3 (The Backlog, Worth the Spin) — the game didn't
      change, you did
- [x] Prince, self-titled 1979 (Rewind, Heavy Rotation) — argued through owning
      it on vinyl
- [ ] Ghost of Tsushima — queued, needs column + verdict from Perry
- [ ] Replace the two remaining placeholders that say so in their own body
      text: `in-living-color.mdx` and `nightcap-001.mdx` — M

> Drafting rule: subjects come from the games Perry has actually finished, and
> the Verdict is his call, never invented. Structure and framing can be drafted.

## Cover pipeline

- [x] IGDB ranks costume packs and Limited Metal Editions above the base game,
      and taking the first result with a cover shipped DLC art. Now prefers an
      exact name match, then the shortest title. Verified no regressions:
      8 covers unchanged, MGS3 corrected to the 2004 release. — 2026-07-26
- [x] Pace IGDB through one chain at 280ms; retry 429/5xx; re-mint token on 401
- [x] Resolve post art sequentially rather than unbounded `Promise.all`

## Open Questions

- [ ] IGDB can return 401 for a lookup mid-build on a token that just served
      the preceding requests, and stays 401 through every retry. The same
      sequence against the same credentials succeeds outside the build, so it
      is not the query, the ordering, or the rate limit; pacing and re-minting
      the token both failed to fix it. Fails soft to a blank sleeve. Revisit if
      covers start dropping in production. — P2

## Up Next (after campaign)

- [ ] About manifesto page — rewrite from plain text into the real "why" — S
- [ ] Decide: strip em-dashes site-wide, or keep them in article prose? UI
      chrome is already clear of them; author copy and `columnThemes` manifestos
      were left alone deliberately — S

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
