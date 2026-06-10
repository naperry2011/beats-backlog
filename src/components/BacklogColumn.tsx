import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { verdictLabel } from "@/components/Verdict";
import { getGameCover } from "@/lib/igdb";

// The Backlog is a save-select screen. Gaming home base, rendered in the site's
// woodblock-and-letterpress type — never a pixel-font arcade cliché (§6).
// The pile isn't "games I never finished" — it's conversations still open.

const CRT_BG =
  "radial-gradient(95% 55% at 50% -10%, rgba(224,167,46,0.16), transparent 60%)," +
  "linear-gradient(180deg, #16131d 0%, #100d17 55%, #0a0810 100%)";

const AMBER = "#e0a72e";
const TEXT = "#efe6d2";
const SOFT = "#ab9f86";

// The conversations still open (blueprint §5 / §11). Curated, not fake stats.
// `query` is the title used to look up cover art on IGDB.
const SAGAS = [
  { name: "Final Fantasy VII", query: "Final Fantasy VII Rebirth", status: "In the chamber", note: "A conversation since '97. Rebirth's loaded and waiting.", pct: 18 },
  { name: "Star Wars: Jedi", query: "Star Wars Jedi Survivor", status: "In progress", note: "Fallen Order → Survivor. The saga that grew up with me.", pct: 64 },
  { name: "Death Stranding", query: "Death Stranding", status: "On deck", note: "Strand by strand — the start of a Kojima arc.", pct: 8 },
  { name: "Resident Evil", query: "Resident Evil 4", since: 2023, status: "Paused", note: "Still checking the corners.", pct: 45 },
  { name: "Silent Hill", query: "Silent Hill 2", status: "Paused", note: "The fog never quite lifted.", pct: 33 },
  { name: "Metal Gear Solid", query: "Metal Gear Solid Delta Snake Eater", since: 2024, status: "Saved", note: "Still on the codec, decades later.", pct: 82 },
];

function initials(name: string): string {
  return name
    .split(/[\s:]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Box art, or a hand-set placeholder when no cover is available.
function Cover({ url, name }: { url: string | null; name: string }) {
  // Cover dimensions vary slightly per game — object-contain guarantees the
  // full box art is always visible (letterboxed on the card's dark ground).
  return (
    <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded bg-black/40 ring-1 ring-white/15 sm:w-20">
      {url ? (
        <Image src={url} alt={`${name} cover`} fill sizes="80px" className="object-contain" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: "rgba(224,167,46,0.08)" }}
        >
          <span className="font-poster text-xl" style={{ color: AMBER, opacity: 0.7 }}>
            {initials(name)}
          </span>
        </div>
      )}
    </div>
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

function SaveSlot({
  file,
  name,
  status,
  note,
  pct,
  cover,
}: {
  file: string;
  name: string;
  status: string;
  note: string;
  pct: number;
  cover: string | null;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#e0a72e]/40">
      <Cover url={cover} name={name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: AMBER }}>
            {file}
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
            {status}
          </span>
        </div>
        <h3 className="mt-2 font-body text-xl font-semibold leading-tight" style={{ color: TEXT }}>
          {name}
        </h3>
        <p className="mt-1 font-body text-sm leading-snug" style={{ color: SOFT }}>
          {note}
        </p>
        {/* Decorative save-progress bar. */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: AMBER, opacity: 0.85 }} />
        </div>
      </div>
    </div>
  );
}

export async function BacklogColumn({ posts }: { posts: PostMeta[] }) {
  const covers = await Promise.all(
    SAGAS.map((s) => getGameCover(s.query, s.since)),
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ background: CRT_BG, color: TEXT }}>
      {/* Faint CRT scanlines. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* ---- Hero ---- */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-12 pt-20 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: AMBER }}>
          Gaming home base · save select
        </p>
        <h1 className="mt-3 font-poster text-6xl uppercase tracking-tight ink-press sm:text-7xl" style={{ color: TEXT }}>
          The Backlog
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed" style={{ color: SOFT }}>
          Not the games I never finished — the conversations I started as a kid
          and never hung up. FF7, Resident Evil, Silent Hill, Metal Gear. Picking
          the controller back up, in public.
        </p>
        <p className="mt-8 font-mono text-sm uppercase tracking-[0.3em]" style={{ color: AMBER }}>
          <a href="#pile" className="hover:underline">
            Continue?
          </a>
          <span className="blink ml-1">▌</span>
        </p>
      </section>

      {/* ---- Worlds in progress ---- */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 py-10">
        <h2
          className="mb-5 flex items-baseline justify-between border-b-2 pb-3"
          style={{ borderColor: AMBER }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: AMBER }}>
            Worlds in progress
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
            Conversations still open
          </span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAGAS.map((s, i) => (
            <SaveSlot
              key={s.name}
              file={`FILE ${String(i + 1).padStart(2, "0")}`}
              name={s.name}
              status={s.status}
              note={s.note}
              pct={s.pct}
              cover={covers[i]}
            />
          ))}
        </div>
      </section>

      {/* ---- The pile (posts) ---- */}
      <section id="pile" className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-6">
        <h2
          className="mb-2 flex items-baseline justify-between border-b-2 pb-3"
          style={{ borderColor: AMBER }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: AMBER }}>
            Recent saves
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
            {posts.length} on file
          </span>
        </h2>

        {posts.length > 0 ? (
          <ul>
            {posts.map((post, i) => (
              <li key={post.slug} className="border-b border-white/10">
                <Link href={`/posts/${post.slug}`} className="group block px-1 py-6 transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm" style={{ color: AMBER }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-body text-2xl font-semibold leading-tight" style={{ color: TEXT }}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 max-w-2xl font-body" style={{ color: SOFT }}>
                          {post.excerpt}
                        </p>
                      )}
                      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide" style={{ color: SOFT }}>
                        {post.date && <span>Last save: {formatDate(post.date)}</span>}
                        {post.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime}</span>
                          </>
                        )}
                        {post.verdict && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span style={{ color: AMBER }}>{verdictLabel(post.verdict)}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 py-16 text-center">
            <p className="font-mono text-sm uppercase tracking-[0.3em]" style={{ color: SOFT }}>
              — — No data — —
            </p>
            <p className="mt-3 font-body text-xl italic" style={{ color: SOFT }}>
              Save file&apos;s loading. Start a new game soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
