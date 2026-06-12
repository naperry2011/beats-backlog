// IGDB cover lookup (Twitch-backed, free). Server-only, called at build time.
// Needs TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET in .env.local. If they're
// missing or a request fails, every lookup returns null and the UI falls back
// to a placeholder — the build never breaks.

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const GAMES_URL = "https://api.igdb.com/v4/games";

let cachedToken: { token: string; expires: number } | null = null;
const coverCache = new Map<string, string | null>();

async function getToken(): Promise<string | null> {
  const id = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (cachedToken && cachedToken.expires > Date.now() + 60_000) {
    return cachedToken.token;
  }
  try {
    const res = await fetch(
      `${TOKEN_URL}?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
      { method: "POST" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expires: Date.now() + (data.expires_in ?? 3600) * 1000,
    };
    return cachedToken.token;
  } catch {
    return null;
  }
}

// Returns a t_cover_big URL for the best match of `query`, or null.
// `since` (a year) filters to releases on/after that year — use it to pin a
// remake when a title is shared with its original (e.g. Resident Evil 4).
export async function getGameCover(
  query: string,
  since?: number,
): Promise<string | null> {
  const cacheKey = since ? `${query}@${since}` : query;
  if (coverCache.has(cacheKey)) return coverCache.get(cacheKey)!;

  const id = process.env.TWITCH_CLIENT_ID;
  const token = await getToken();
  if (!id || !token) {
    coverCache.set(cacheKey, null);
    return null;
  }

  const where = since
    ? ` where first_release_date >= ${Math.floor(Date.UTC(since, 0, 1) / 1000)} & cover != null;`
    : "";

  try {
    const res = await fetch(GAMES_URL, {
      method: "POST",
      headers: {
        "Client-ID": id,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: `search "${query.replace(/"/g, "")}"; fields name,cover.image_id;${where} limit 5;`,
    });
    if (!res.ok) {
      coverCache.set(cacheKey, null);
      return null;
    }
    const data: Array<{ cover?: { image_id?: string } }> = await res.json();
    const imageId = data.find((g) => g.cover?.image_id)?.cover?.image_id;
    const url = imageId
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
      : null;
    coverCache.set(cacheKey, url);
    return url;
  } catch {
    coverCache.set(cacheKey, null);
    return null;
  }
}

export async function getGameCovers(
  queries: string[],
): Promise<Record<string, string | null>> {
  const entries = await Promise.all(
    queries.map(async (q) => [q, await getGameCover(q)] as const),
  );
  return Object.fromEntries(entries);
}

// Fuller record for the "load this save file" detail view. Same fail-soft
// rules: any miss → null, the build never breaks. No numeric ratings — the
// site doesn't do scores, ours or anyone else's.
export interface GameDetails {
  name: string;
  summary: string | null;
  year: number | null;
  genres: string[];
  developer: string | null;
  coverUrl: string | null;
}

const detailsCache = new Map<string, GameDetails | null>();

export async function getGameDetails(
  query: string,
  since?: number,
): Promise<GameDetails | null> {
  const cacheKey = since ? `${query}@${since}#d` : `${query}#d`;
  if (detailsCache.has(cacheKey)) return detailsCache.get(cacheKey)!;

  const id = process.env.TWITCH_CLIENT_ID;
  const token = await getToken();
  if (!id || !token) {
    detailsCache.set(cacheKey, null);
    return null;
  }

  const where = since
    ? ` where first_release_date >= ${Math.floor(Date.UTC(since, 0, 1) / 1000)} & cover != null;`
    : "";

  try {
    const res = await fetch(GAMES_URL, {
      method: "POST",
      headers: {
        "Client-ID": id,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body:
        `search "${query.replace(/"/g, "")}"; ` +
        `fields name,summary,first_release_date,genres.name,` +
        `involved_companies.company.name,involved_companies.developer,` +
        `cover.image_id;${where} limit 5;`,
    });
    if (!res.ok) {
      detailsCache.set(cacheKey, null);
      return null;
    }
    const data: Array<{
      name?: string;
      summary?: string;
      first_release_date?: number;
      genres?: Array<{ name?: string }>;
      involved_companies?: Array<{
        developer?: boolean;
        company?: { name?: string };
      }>;
      cover?: { image_id?: string };
    }> = await res.json();

    const g = data.find((x) => x.cover?.image_id) ?? data[0];
    if (!g?.name) {
      detailsCache.set(cacheKey, null);
      return null;
    }

    const details: GameDetails = {
      name: g.name,
      summary: g.summary ?? null,
      year: g.first_release_date
        ? new Date(g.first_release_date * 1000).getUTCFullYear()
        : null,
      genres: (g.genres ?? [])
        .map((x) => x.name)
        .filter((x): x is string => Boolean(x))
        .slice(0, 4),
      developer:
        g.involved_companies?.find((c) => c.developer)?.company?.name ?? null,
      coverUrl: g.cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg`
        : null,
    };
    detailsCache.set(cacheKey, details);
    return details;
  } catch {
    detailsCache.set(cacheKey, null);
    return null;
  }
}
