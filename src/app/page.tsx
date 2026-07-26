import Link from "next/link";
import { getAllPosts, getPostsByColumn } from "@/lib/posts";
import { getPostArt, getPostArtMap } from "@/lib/art";
import { COLUMNS, getColumn } from "@/lib/columns";
import { PostCard } from "@/components/PostCard";
import { PostArtwork } from "@/components/PostArtwork";
import { Hero } from "@/components/Hero";
import { verdictLabel } from "@/components/Verdict";

export default async function Home() {
  const posts = getAllPosts();
  const nightcap = getPostsByColumn("the-nightcap")[0];
  const nightcapColumn = getColumn("the-nightcap");
  const recent = posts.filter((p) => p.slug !== nightcap?.slug).slice(0, 6);

  // Sleeve art is resolved at build time; every lookup is fail-soft.
  const nightcapArt = nightcap ? await getPostArt(nightcap) : null;
  const recentArt = await getPostArtMap(recent);

  return (
    <>
      <Hero />

      {/* NOW SPINNING — the signature ritual gets the turntable, sleeve out. */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermillion" />
            </span>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
              Now Spinning · The Nightcap
            </h2>
          </div>

          {nightcap ? (
            /* 280px sits just above an IGDB cover's native 264px and well
               under AniList's 460px, so the sleeve stays crisp either way. */
            <div className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12">
              <Link
                href={`/posts/${nightcap.slug}`}
                className="group block"
                tabIndex={-1}
                aria-hidden="true"
              >
                <PostArtwork
                  art={nightcapArt}
                  column={nightcap.column}
                  title={nightcap.title}
                  sizes="(min-width: 768px) 280px, 90vw"
                  priority
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
              </Link>

              <div>
                <h3 className="font-body text-3xl font-semibold leading-tight sm:text-4xl">
                  <Link
                    href={`/posts/${nightcap.slug}`}
                    className="text-ink transition-colors hover:text-vermillion"
                  >
                    {nightcap.title}
                  </Link>
                </h3>
                {nightcap.excerpt && (
                  <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
                    {nightcap.excerpt}
                  </p>
                )}

                {nightcap.nightcap && (
                  <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-ink/20 pt-5">
                    {(
                      [
                        ["Game", nightcap.nightcap.game],
                        ["Anime", nightcap.nightcap.anime],
                        ["Track", nightcap.nightcap.track],
                      ] as const
                    )
                      .filter(([, v]) => Boolean(v))
                      .map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ochre">
                            {label}
                          </dt>
                          <dd className="mt-1 font-body text-sm leading-snug text-ink">
                            {value}
                          </dd>
                        </div>
                      ))}
                  </dl>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <span>{nightcap.readingTime}</span>
                  {nightcap.verdict && (
                    <span className="hanko rounded-[3px] px-2 py-0.5 text-paper">
                      {verdictLabel(nightcap.verdict)}
                    </span>
                  )}
                  <Link
                    href="/columns/the-nightcap"
                    className="brush-link hover:text-ink"
                  >
                    All Nightcaps →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-6 max-w-2xl font-body text-lg text-ink-soft">
              {nightcapColumn?.tagline} The signature ritual lands here weekly:
              one game, one anime, one track for your wind-down.
            </p>
          )}
        </div>
      </section>

      {/* LATEST — the crate. Sleeves out, at their own ratios. */}
      <section id="latest" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="mb-10 border-b-2 border-ink pb-3 font-poster text-3xl uppercase tracking-tight text-ink">
          Latest
        </h2>

        {recent.length > 0 ? (
          /* The crate holds exactly as many slots as there are records. A lone
             post turns on its side rather than sitting in a third of a row. */
          <div
            className={`grid items-start gap-x-8 gap-y-12 ${
              recent.length === 1
                ? ""
                : recent.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {recent.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                art={recentArt[post.slug] ?? null}
                layout={recent.length === 1 ? "lead" : "stack"}
                sizes={
                  recent.length === 1
                    ? "(min-width: 640px) 220px, 90vw"
                    : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 border-l-2 border-ochre py-6 pl-6">
            <p className="font-body text-xl italic text-ink-soft">
              Lounge&apos;s open. First posts are on the way.
            </p>
            <Link
              href="/columns/the-nightcap"
              className="brush-link font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink"
            >
              Start with the ritual →
            </Link>
          </div>
        )}
      </section>

      {/* THE COLUMNS — album back-cover tracklist. */}
      <section className="border-t-2 border-ink bg-indigo-deep text-paper">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="mb-8 font-poster text-3xl uppercase tracking-tight">
            The Columns
          </h2>

          <ol className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {COLUMNS.map((c, i) => (
              <li key={c.id} className="border-t border-paper/20">
                <Link
                  href={`/columns/${c.id}`}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-mono text-sm text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="font-body text-xl font-semibold transition-colors group-hover:text-ochre">
                      {c.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wide text-paper/55">
                      {c.tagline}
                    </span>
                  </span>
                  <span className="font-mono text-paper/40 transition-transform group-hover:translate-x-1 group-hover:text-ochre">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
