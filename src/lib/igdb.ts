// IGDB cover lookup (Twitch-backed, free). Server-only, called at build time.
// Needs TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET in .env.local. If they're
// missing or a request fails, every lookup returns null and the UI falls back
// to a placeholder — the build never breaks.

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const GAMES_URL = "https://api.igdb.com/v4/games";

let cachedToken: { token: string; expires: number } | null = null;
const coverCache = new Map<string, string | null>();

// `force` skips the cache so a 401 can retry with a freshly minted token.
async function getToken(force = false): Promise<string | null> {
  const id = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (!force && cachedToken && cachedToken.expires > Date.now() + 60_000) {
    return cachedToken.token;
  }
  try {
    const res = await fetch(
      `${TOKEN_URL}?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
      { method: "POST" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.access_token) return null;
    cachedToken = {
      token: data.access_token,
      expires: Date.now() + (data.expires_in ?? 3600) * 1000,
    };
    return cachedToken.token;
  } catch {
    return null;
  }
}

// IGDB documents a limit of about 4 requests a second, and nothing here used to
// pace itself, so a build fired lookups back to back. Every request now goes
// through one chain with a minimum gap to stay inside that limit.
//
// Known unresolved: during a build, a lookup can still come back 401
// "Authorization Failure" on the same token that served the preceding requests
// fine, and it stays 401 through every retry. The identical request sequence
// against the same credentials succeeds outside the build, so it is not the
// query, the ordering, or the request rate. Neither pacing nor re-minting the
// token fixes it. It fails soft to a blank sleeve, so it costs a cover and not
// a build. Worth another look if covers start disappearing in production.
const MIN_GAP_MS = 280;
let chain: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;

function schedule<T>(job: () => Promise<T>): Promise<T> {
  const run = chain.then(async () => {
    const wait = MIN_GAP_MS - (Date.now() - lastRequestAt);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastRequestAt = Date.now();
    return job();
  });
  // Keep the chain alive even if this job rejects.
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

// Retries throttled/transient failures with backoff, and refreshes the token
// once on a 401 in case it really was the credentials. Callers still get null
// on a genuine miss, and the build never breaks on a cover.
async function igdbFetch(
  id: string,
  body: string,
  attempts = 4,
): Promise<Response | null> {
  let token = await getToken();
  if (!token) return null;
  let refreshed = false;

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await schedule(() =>
        fetch(GAMES_URL, {
          method: "POST",
          headers: {
            "Client-ID": id,
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body,
        }),
      );
      if (res.ok) return res;

      if (res.status === 401 && !refreshed) {
        refreshed = true;
        const fresh = await getToken(true);
        if (fresh) token = fresh;
      } else if (res.status !== 401 && res.status !== 429 && res.status < 500) {
        // A real client error. Retrying won't change the answer.
        return null;
      }
    } catch {
      // Network hiccup — treat like a transient failure and retry.
    }
    if (attempt < attempts - 1) {
      await new Promise((r) => setTimeout(r, 400 * 2 ** attempt));
    }
  }
  return null;
}

// IGDB search happily ranks a costume pack or a "Limited Metal Edition" above
// the game itself, and taking the first result with a cover meant shipping DLC
// art. Prefer an exact name match; failing that, the shortest title, since
// editions and add-ons are the base name with something appended.
function pickCover(
  rows: Array<{ name?: string; cover?: { image_id?: string } }>,
  query: string,
): string | undefined {
  const withCover = rows.filter((g) => g.cover?.image_id);
  if (withCover.length === 0) return undefined;

  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const exact = withCover.find((g) => g.name && norm(g.name) === norm(query));
  if (exact) return exact.cover!.image_id;

  return withCover.reduce((best, g) =>
    (g.name?.length ?? Infinity) < (best.name?.length ?? Infinity) ? g : best,
  ).cover!.image_id;
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
  if (!id) {
    coverCache.set(cacheKey, null);
    return null;
  }

  const where = since
    ? ` where first_release_date >= ${Math.floor(Date.UTC(since, 0, 1) / 1000)} & cover != null;`
    : "";

  try {
    const res = await igdbFetch(
      id,
      `search "${query.replace(/"/g, "")}"; fields name,cover.image_id;${where} limit 5;`,
    );
    if (!res) {
      coverCache.set(cacheKey, null);
      return null;
    }
    const data: Array<{ name?: string; cover?: { image_id?: string } }> =
      await res.json();
    const imageId = pickCover(data, query);
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
  if (!id) {
    detailsCache.set(cacheKey, null);
    return null;
  }

  const where = since
    ? ` where first_release_date >= ${Math.floor(Date.UTC(since, 0, 1) / 1000)} & cover != null;`
    : "";

  try {
    const res = await igdbFetch(
      id,
      `search "${query.replace(/"/g, "")}"; ` +
        `fields name,summary,first_release_date,genres.name,` +
        `involved_companies.company.name,involved_companies.developer,` +
        `cover.image_id;${where} limit 5;`,
    );
    if (!res) {
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
