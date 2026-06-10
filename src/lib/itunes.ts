// Album/track artwork via the iTunes Search API (free, no auth). Server-only,
// called at build time. Any failure returns null and the UI skips the cover.
// Same fail-soft pattern as igdb.ts.

const SEARCH_URL = "https://itunes.apple.com/search";

const artCache = new Map<string, string | null>();

// Returns 600×600 album art (*.mzstatic.com) for a track/album query
// (e.g. "Nujabes — Aruarian Dance"), or null.
export async function getAlbumArt(query: string): Promise<string | null> {
  if (artCache.has(query)) return artCache.get(query)!;

  // The em dash separator in our frontmatter ("Artist — Track") is just a
  // separator — strip it so the search terms stay clean.
  const term = query.replace(/[—–]/g, " ").replace(/\s+/g, " ").trim();

  try {
    const res = await fetch(
      `${SEARCH_URL}?term=${encodeURIComponent(term)}&media=music&limit=5`,
    );
    if (!res.ok) {
      artCache.set(query, null);
      return null;
    }
    const data: { results?: Array<{ artworkUrl100?: string }> } =
      await res.json();
    const art100 = data.results?.find((r) => r.artworkUrl100)?.artworkUrl100;
    // Artwork URLs are size-templated — swap 100x100 for 600x600.
    const url = art100 ? art100.replace("100x100", "600x600") : null;
    artCache.set(query, url);
    return url;
  } catch {
    artCache.set(query, null);
    return null;
  }
}
