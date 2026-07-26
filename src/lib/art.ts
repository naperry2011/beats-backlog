// Sleeve art for a post. Fans out to the three cover services already wired
// up (IGDB for games, AniList for anime, iTunes for records) and hands back a
// single resolved image plus the ratio it wants to be rendered at.
//
// Server-only, called at build time. Every lookup underneath is fail-soft, so
// a miss returns null and the UI falls back to a struck monogram sleeve. The
// build never breaks on a cover.

import type { PostMeta } from "./posts";
import { getGameCover } from "./igdb";
import { getAnimeCover } from "./anilist";
import { getAlbumArt } from "./itunes";

export type ArtKind = "game" | "anime" | "album";

export interface PostArt {
  url: string;
  kind: ArtKind;
  /** What was looked up, so the image can carry a real alt string. */
  subject: string;
}

// Box art and anime covers are portrait; records are square. Rendering each at
// its own ratio keeps covers filled edge to edge with no letterbox bars.
export const ART_RATIO: Record<ArtKind, string> = {
  game: "3 / 4",
  anime: "3 / 4",
  album: "1 / 1",
};

async function lookup(kind: ArtKind, subject: string): Promise<PostArt | null> {
  const url =
    kind === "game"
      ? await getGameCover(subject)
      : kind === "anime"
        ? await getAnimeCover(subject)
        : await getAlbumArt(subject);

  return url ? { url, kind, subject } : null;
}

// Explicit `art:` frontmatter wins. Otherwise a Nightcap's own picks stand in
// — the anime cover first, since it reads strongest at card size.
function candidates(post: PostMeta): Array<[ArtKind, string]> {
  const out: Array<[ArtKind, string]> = [];
  const push = (kind: ArtKind, subject?: string) => {
    if (subject) out.push([kind, subject]);
  };

  if (post.art) {
    push("anime", post.art.anime);
    push("game", post.art.game);
    push("album", post.art.album);
  }
  if (post.nightcap) {
    push("anime", post.nightcap.anime);
    push("game", post.nightcap.game);
    push("album", post.nightcap.track);
  }
  return out;
}

export async function getPostArt(post: PostMeta): Promise<PostArt | null> {
  for (const [kind, subject] of candidates(post)) {
    const art = await lookup(kind, subject);
    if (art) return art;
  }
  return null;
}

export async function getPostArtMap(
  posts: PostMeta[],
): Promise<Record<string, PostArt | null>> {
  const entries = await Promise.all(
    posts.map(async (p) => [p.slug, await getPostArt(p)] as const),
  );
  return Object.fromEntries(entries);
}
