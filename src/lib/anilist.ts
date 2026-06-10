// AniList anime cover lookup (free GraphQL API, no auth). Server-only, called
// at build time. Any failure returns null and the UI skips the cover — the
// build never breaks. Same fail-soft pattern as igdb.ts.

const ANILIST_URL = "https://graphql.anilist.co";

const coverCache = new Map<string, string | null>();

const QUERY = `
query ($search: String) {
  Media(search: $search, type: ANIME) {
    coverImage {
      large
    }
  }
}`;

// Returns a cover URL (s4.anilist.co) for the best anime match, or null.
export async function getAnimeCover(title: string): Promise<string | null> {
  if (coverCache.has(title)) return coverCache.get(title)!;

  try {
    const res = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { search: title } }),
    });
    if (!res.ok) {
      coverCache.set(title, null);
      return null;
    }
    const data = await res.json();
    const url: string | null = data?.data?.Media?.coverImage?.large ?? null;
    coverCache.set(title, url);
    return url;
  } catch {
    coverCache.set(title, null);
    return null;
  }
}
