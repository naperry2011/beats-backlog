import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getPostArtMap } from "@/lib/art";
import { PostArtwork } from "@/components/PostArtwork";
import { verdictLabel } from "@/components/Verdict";

// Worth Your Hours? is a time-and-motion bureau (§5). The only currency that
// matters now is hours against payoff, so every review gets filed as a punch
// card: stamped, punched, racked. No numbers, no stars — the Verdict is the
// only mark on the card.
//
// Everything printed on a card is real authored data (date, reading time, the
// Pour's time-to-finish, the Verdict). Nothing here invents an hour count.

const BUREAU_BG =
  "radial-gradient(70% 42% at 50% 0%, rgba(178,58,37,0.16), transparent 62%)," +
  "var(--color-paper)";

const RED = "#b23a25";

// The wall clock, stopped at 9:41pm — the hour the house goes quiet and the
// limited hours actually start. Deliberately still: a sweeping hand would be
// ambient decoration, and this column is about time you already spent.
function PunchClock({ className }: { className?: string }) {
  const cx = 80;
  const cy = 78;

  return (
    <svg viewBox="0 0 160 200" className={className} aria-hidden="true">
      {/* case */}
      <rect
        x="14"
        y="12"
        width="132"
        height="132"
        rx="10"
        fill="var(--color-card)"
        stroke="var(--color-ink)"
        strokeWidth="3"
      />
      {/* face */}
      <circle
        cx={cx}
        cy={cy}
        r="52"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <circle cx={cx} cy={cy} r="46" fill="none" stroke={RED} strokeWidth="1" opacity="0.5" />

      {/* hour ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const outer = 46;
        const inner = i % 3 === 0 ? 37 : 41;
        return (
          <line
            key={i}
            x1={cx + outer * Math.sin(a)}
            y1={cy - outer * Math.cos(a)}
            x2={cx + inner * Math.sin(a)}
            y2={cy - inner * Math.cos(a)}
            stroke="var(--color-ink)"
            strokeWidth={i % 3 === 0 ? 2.4 : 1.2}
            strokeLinecap="round"
          />
        );
      })}

      {/* hands at 9:41 */}
      <line
        x1={cx}
        y1={cy}
        x2="55.6"
        y2="68.9"
        stroke="var(--color-ink)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy}
        x2="45.3"
        y2="93.5"
        stroke="var(--color-ink)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="4" fill={RED} />

      {/* card slot, with a card halfway in */}
      <rect
        x="42"
        y="150"
        width="76"
        height="8"
        rx="2"
        fill="var(--color-ink)"
        opacity="0.85"
      />
      <rect
        x="52"
        y="158"
        width="56"
        height="30"
        rx="2"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <line x1="60" y1="168" x2="100" y2="168" stroke={RED} strokeWidth="1.6" opacity="0.7" />
      <line x1="60" y1="176" x2="88" y2="176" stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

// The punched edge of a time card: holes bitten out so the paper shows through.
function Perforation() {
  return (
    <span
      aria-hidden="true"
      className="hidden w-7 shrink-0 border-r border-dashed border-ink/25 sm:block"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-paper) 40%, transparent 42%)",
        backgroundSize: "16px 26px",
        backgroundPosition: "center 12px",
      }}
    />
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

// One row of the card's ledger. Only rendered when there's real data for it.
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft/75">
        {label}
      </dt>
      <dd className="mt-1 font-body text-sm leading-snug text-ink">{value}</dd>
    </div>
  );
}

export async function WorthYourHoursColumn({ posts }: { posts: PostMeta[] }) {
  const art = await getPostArtMap(posts);

  return (
    <div
      className="relative w-full overflow-hidden text-ink"
      style={{ background: BUREAU_BG }}
    >
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden px-5 pb-14 pt-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-2 select-none font-poster text-[7rem] uppercase leading-none tracking-tight sm:text-[10rem]"
          style={{ color: RED, opacity: 0.08 }}
        >
          Worth it?
        </span>

        <div className="relative mx-auto max-w-3xl text-center">
          <PunchClock className="reveal mx-auto w-28 sm:w-32" />
          <p
            className="reveal mt-6 font-mono text-[11px] uppercase tracking-[0.35em]"
            style={{ color: RED, animationDelay: "0.06s" }}
          >
            Reviews, dad-filtered
          </p>
          <h1
            className="reveal ink-press mt-3 font-poster text-5xl uppercase leading-[0.92] tracking-tight sm:text-7xl"
            style={{ animationDelay: "0.12s" }}
          >
            Worth Your Hours?
          </h1>
          <p
            className="reveal mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "0.18s" }}
          >
            Rated by the only currency that matters now: time spent against
            payoff. No 1 to 10, no stars. Just whether it earns the hours you
            actually have. The Verdict caps every one.
          </p>
        </div>
      </section>

      {/* ---- The rack ---- */}
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <h2 className="mb-8 border-b-2 border-ink pb-3 font-poster text-3xl uppercase tracking-tight">
          The Reviews
        </h2>

        {posts.length > 0 ? (
          <ul className="space-y-7">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex border-2 border-ink bg-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <Perforation />

                  <div className="min-w-0 flex-1">
                    {/* card header strip */}
                    <div className="flex items-center justify-between gap-4 bg-ink px-4 py-2 text-paper">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
                        Card No. {String(i + 1).padStart(3, "0")}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/65">
                        Filed {formatDate(post.date)}
                      </span>
                    </div>

                    <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
                      <div className="min-w-0">
                        <h3 className="font-body text-2xl font-semibold leading-tight transition-colors group-hover:text-vermillion">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 font-body leading-relaxed text-ink-soft">
                            {post.excerpt}
                          </p>
                        )}

                        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/20 pt-4 sm:grid-cols-3">
                          {post.readingTime && (
                            <Field label="Read" value={post.readingTime} />
                          )}
                          {post.pour?.timeToFinish && (
                            <Field
                              label="Time to finish"
                              value={post.pour.timeToFinish}
                            />
                          )}
                          {post.pour?.mood && (
                            <Field label="Mood" value={post.pour.mood} />
                          )}
                        </dl>
                      </div>

                      <div className="flex shrink-0 flex-col items-center gap-4 sm:w-[84px]">
                        <PostArtwork
                          art={art[post.slug] ?? null}
                          column={post.column}
                          title={post.title}
                          sizes="84px"
                          className="w-full"
                        />
                        {post.verdict && (
                          /* The rubber stamp: struck at an angle, the only
                             mark this column ever gives. */
                          <span
                            className="rotate-[-7deg] border-2 px-2 py-1 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.12em]"
                            style={{ color: RED, borderColor: RED }}
                          >
                            {verdictLabel(post.verdict)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          /* An unpunched card still in the rack. */
          <div className="flex border-2 border-dashed border-ink/40 bg-card/50">
            <Perforation />
            <div className="min-w-0 flex-1 px-6 py-14 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft/70">
                Card No. 001
              </p>
              <p className="mt-4 font-body text-2xl italic leading-snug text-ink-soft">
                On the clock. First verdict soon.
              </p>
              <Link
                href="/columns/the-nightcap"
                className="brush-link mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: RED }}
              >
                Start with the Nightcap →
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
