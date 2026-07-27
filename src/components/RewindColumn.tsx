import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getPostArtMap } from "@/lib/art";
import { PostArtwork } from "@/components/PostArtwork";
import { verdictLabel } from "@/components/Verdict";

// Rewind is the back of the crate in a used record shop, late, magenta light
// off the wall. Records pulled out and played with grown ears (§5). The whole
// column is music, so the sleeve does the talking: every entry leads with its
// own cover art rather than a spine.

const CRATE_BG =
  "radial-gradient(85% 50% at 50% -8%, rgba(214,71,143,0.18), transparent 60%)," +
  "radial-gradient(60% 40% at 8% 100%, rgba(192,138,30,0.10), transparent 60%)," +
  "linear-gradient(180deg, #20102a 0%, #170b20 55%, #0e0716 100%)";

const MAGENTA = "#d6478f";
const OCHRE = "#c9922e";
const TEXT = "#f0e6da";
const SOFT = "#b39bc4";

// The crate, with a tabbed divider card standing proud of the sleeves. The
// divider is the signature mark here, the way the hanko is on the Nightcap.
function Crate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 180" className={className} aria-hidden="true">
      {/* sleeves behind, leaning back at slightly different angles */}
      {[
        { x: 34, r: -3 },
        { x: 60, r: -1.5 },
        { x: 150, r: 1.5 },
        { x: 176, r: 3 },
      ].map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y="44"
          width="52"
          height="86"
          rx="2"
          fill="#241730"
          stroke={TEXT}
          strokeWidth="1.6"
          opacity="0.5"
          transform={`rotate(${s.r} ${s.x + 26} 90)`}
        />
      ))}

      {/* the divider card, tab up */}
      <path
        d="M96 60 h68 v70 h-68 z"
        fill="#efe6d2"
        stroke={MAGENTA}
        strokeWidth="2"
      />
      <path
        d="M112 44 h36 v16 h-36 z"
        fill="#efe6d2"
        stroke={MAGENTA}
        strokeWidth="2"
      />
      <text
        x="130"
        y="56"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.6"
        fill="#1c0f18"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        REWIND
      </text>
      {/* ruled lines on the card, like a hand-written section divider */}
      <line x1="106" y1="80" x2="154" y2="80" stroke={MAGENTA} strokeWidth="1.4" opacity="0.55" />
      <line x1="106" y1="92" x2="146" y2="92" stroke="#1c0f18" strokeWidth="1.1" opacity="0.3" />
      <line x1="106" y1="104" x2="150" y2="104" stroke="#1c0f18" strokeWidth="1.1" opacity="0.3" />

      {/* the crate itself */}
      <path
        d="M18 122 h224 v42 a4 4 0 0 1 -4 4 H22 a4 4 0 0 1 -4 -4 z"
        fill="#1a1024"
        stroke={OCHRE}
        strokeWidth="2.4"
      />
      <line x1="18" y1="136" x2="242" y2="136" stroke={OCHRE} strokeWidth="1.2" opacity="0.45" />
    </svg>
  );
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function RewindColumn({ posts }: { posts: PostMeta[] }) {
  const art = await getPostArtMap(posts);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: CRATE_BG, color: TEXT }}
    >
      {/* Groove texture: concentric rings, faint, like light off a record. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 0%, transparent 0 3px, rgba(240,230,218,0.7) 3px 4px)",
        }}
      />

      {/* ---- Hero ---- */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-12 pt-16 text-center">
        <Crate className="reveal mx-auto w-56 sm:w-64" />

        <p
          className="reveal mt-7 font-mono text-[11px] uppercase tracking-[0.35em]"
          style={{ color: MAGENTA, animationDelay: "0.06s" }}
        >
          Records, revisited
        </p>
        <h1
          className="reveal ink-press mt-3 font-poster text-7xl uppercase tracking-tight sm:text-8xl"
          style={{ color: TEXT, animationDelay: "0.12s" }}
        >
          Rewind
        </h1>
        <p
          className="reveal mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed"
          style={{ color: SOFT, animationDelay: "0.18s" }}
        >
          Albums pulled back out of the crate and played with grown ears. The
          ones you wore out, the ones you missed, and the ones that turned out
          to be about something else the whole time.
        </p>
      </section>

      {/* ---- The crate ---- */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-4">
        <h2
          className="mb-8 border-b-2 pb-3 font-poster text-3xl uppercase tracking-tight"
          style={{ borderColor: MAGENTA, color: TEXT }}
        >
          The Crate
        </h2>

        {posts.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group grid grid-cols-[88px_1fr] items-start gap-5 py-6 transition-colors hover:bg-white/[0.04] sm:grid-cols-[112px_1fr] sm:gap-6"
                >
                  <PostArtwork
                    art={art[post.slug] ?? null}
                    column={post.column}
                    title={post.title}
                    tone="night"
                    sizes="112px"
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                  />

                  <div className="min-w-0">
                    <h3
                      className="font-body text-2xl font-semibold leading-tight transition-colors group-hover:text-[#d6478f]"
                      style={{ color: TEXT }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        className="mt-2 font-body leading-relaxed"
                        style={{ color: SOFT }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                    <p
                      className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wide"
                      style={{ color: SOFT }}
                    >
                      {post.date && <span>Filed {formatDate(post.date)}</span>}
                      {post.readingTime && <span>{post.readingTime}</span>}
                      {post.verdict && (
                        <span style={{ color: MAGENTA }}>
                          {verdictLabel(post.verdict)}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="border border-dashed px-6 py-16 text-center"
            style={{ borderColor: "rgba(214,71,143,0.35)" }}
          >
            <p className="font-body text-2xl italic" style={{ color: SOFT }}>
              Crate&apos;s still being dug through. First record soon.
            </p>
            <Link
              href="/columns/the-nightcap"
              className="brush-link mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: MAGENTA }}
            >
              Start with the Nightcap →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
