import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { verdictLabel } from "@/components/Verdict";
import { getGameCover } from "@/lib/igdb";
import { getAnimeCover } from "@/lib/anilist";
import { getAlbumArt } from "@/lib/itunes";

// The Nightcap gets its own late-night identity — lamp-lit, whiskey-warm, the
// "drink before bed" mood. The signature ritual: one game, one anime, one track
// for your wind-down (§5).
const NIGHT_BG =
  "radial-gradient(85% 55% at 50% -10%, rgba(217,164,65,0.20), transparent 60%)," +
  "radial-gradient(70% 45% at 88% 105%, rgba(90,42,130,0.28), transparent 60%)," +
  "linear-gradient(180deg, #1b1430 0%, #140d27 55%, #0d0820 100%)";

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M30 4a20 20 0 100 40 16 16 0 010-40z"
        opacity="0.9"
      />
    </svg>
  );
}

function Glass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      {/* lowball glass */}
      <path
        d="M10 14h28l-3 32a4 4 0 01-4 3.5H17a4 4 0 01-4-3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* the pour */}
      <path
        d="M12 30h24l-1.4 16a4 4 0 01-4 3.5H17.4a4 4 0 01-4-3.5z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* ice */}
      <rect
        x="18"
        y="33"
        width="9"
        height="9"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.7"
      />
    </svg>
  );
}

// A red artist's seal (落款 / hanko) — the mark in the corner of every ukiyo-e
// print. CJK serif (Mincho) fallbacks keep it woodblock, not system-sans.
const SEAL_FONT =
  '"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","MS Mincho",serif';

function Hanko({
  char,
  size = "lg",
}: {
  char: string;
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? "h-14 w-14 text-[2rem]" : "h-10 w-10 text-xl";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[4px] leading-none ${dim}`}
      style={{
        backgroundColor: "#c0392b",
        color: "#f4ecd8",
        transform: "rotate(-5deg)",
        boxShadow: "inset 0 0 0 2px rgba(244,236,216,0.45)",
        fontFamily: SEAL_FONT,
      }}
    >
      {char}
    </span>
  );
}

const PILLARS = [
  { kanji: "遊", label: "One game", note: "to lose an hour in" },
  { kanji: "観", label: "One anime", note: "to drift off to" },
  { kanji: "聴", label: "One track", note: "to set the room" },
];

// Native art ratios so nothing gets trimmed: IGDB box art is 264×374,
// anime posters run 2:3, album art is square.
const ART_RATIO: Record<string, string> = {
  game: "aspect-[3/4]",
  anime: "aspect-[2/3]",
  track: "aspect-square",
};

function PourRow({
  kanji,
  kind,
  value,
  cover,
}: {
  kanji: string;
  kind: string;
  value?: string;
  cover?: string | null;
}) {
  const ratio = ART_RATIO[kind.toLowerCase()] ?? "aspect-square";
  return (
    <div className="flex items-center gap-4 border-t border-[#d9a441]/20 py-4 first:border-t-0">
      <Hanko char={kanji} size="sm" />
      {cover && (
        <div className={`relative ${ratio} w-12 shrink-0 overflow-hidden rounded bg-black/40 ring-1 ring-white/15`}>
          <Image src={cover} alt={`${value ?? kind} cover`} fill sizes="48px" className="object-contain" />
        </div>
      )}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#caa6e0]">
          {kind}
        </p>
        <p className="font-body text-xl text-[#f4ecd8]">
          {value ?? <span className="italic text-[#9d83c4]">to be poured</span>}
        </p>
      </div>
    </div>
  );
}

export async function NightcapColumn({ posts }: { posts: PostMeta[] }) {
  const featured = posts[0];
  const past = posts.slice(1);
  const [gameCover, animeCover, trackArt] = await Promise.all([
    featured?.nightcap?.game ? getGameCover(featured.nightcap.game) : null,
    featured?.nightcap?.anime ? getAnimeCover(featured.nightcap.anime) : null,
    featured?.nightcap?.track ? getAlbumArt(featured.nightcap.track) : null,
  ]);

  return (
    <div
      className="relative w-full overflow-hidden text-[#efe6d2]"
      style={{ background: NIGHT_BG }}
    >
      {/* ---- Hero ---- */}
      <section className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 text-center">
        <div className="relative mb-6 flex justify-center">
          <Moon className="w-12 text-[#e9d8a6]" />
          <Glass className="reveal absolute -bottom-2 left-1/2 w-9 -translate-x-[140%] text-[#d9a441]" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#d9a441]">
          The signature ritual · weekly
        </p>
        <h1 className="mt-4 font-poster text-6xl uppercase tracking-tight text-[#f4ecd8] ink-press sm:text-7xl">
          The Nightcap
        </h1>
        <p className="mt-5 font-body text-xl italic leading-relaxed text-[#d9c9ea]">
          One game. One anime. One track. <br className="sm:hidden" />
          For your wind-down.
        </p>
        <p className="mx-auto mt-4 max-w-md font-body text-[#b7a6d4]">
          A nightcap is a drink before bed — and a small ritual. Three picks,
          one habit, last thing before the lights go out.
        </p>
      </section>

      {/* ---- The ritual: three pillars ---- */}
      <section className="mx-auto max-w-3xl px-5 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map(({ kanji, label, note }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-7 text-center"
            >
              <Hanko char={kanji} />
              <p className="mt-4 font-body text-lg font-semibold text-[#f4ecd8]">
                {label}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b7a6d4]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- This week's pour ---- */}
      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9a441] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d9a441]" />
          </span>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#caa6e0]">
            This week&apos;s pour
          </h2>
        </div>

        <div className="rounded-2xl border border-[#d9a441]/25 bg-black/20 p-6 shadow-[0_0_60px_-20px_rgba(217,164,65,0.5)] sm:p-8">
          {featured ? (
            <>
              {featured.verdict && (
                <span className="hanko inline-block rounded-[3px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper">
                  {verdictLabel(featured.verdict)}
                </span>
              )}
              <h3 className="mt-3 font-body text-2xl font-semibold leading-tight text-[#f4ecd8] sm:text-3xl">
                <Link
                  href={`/posts/${featured.slug}`}
                  className="transition-colors hover:text-[#d9a441]"
                >
                  {featured.title}
                </Link>
              </h3>

              <div className="mt-5">
                <PourRow kanji="遊" kind="Game" value={featured.nightcap?.game} cover={gameCover} />
                <PourRow kanji="観" kind="Anime" value={featured.nightcap?.anime} cover={animeCover} />
                <PourRow kanji="聴" kind="Track" value={featured.nightcap?.track} cover={trackArt} />
              </div>

              <Link
                href={`/posts/${featured.slug}`}
                className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-[#d9a441] hover:text-[#f4ecd8]"
              >
                Read the pour →
              </Link>
            </>
          ) : (
            <div className="py-6 text-center">
              <Glass className="mx-auto w-10 text-[#d9a441]" />
              <p className="mt-4 font-body text-xl italic text-[#d9c9ea]">
                Pull up a chair — the first pour is on its way.
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#b7a6d4]">
                One game · one anime · one track
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ---- Past rounds ---- */}
      {past.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-20">
          <h2 className="mb-2 border-b border-white/15 pb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#caa6e0]">
            Last call — past rounds
          </h2>
          <ul>
            {past.map((p) => (
              <li key={p.slug} className="border-b border-white/10">
                <Link
                  href={`/posts/${p.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="font-body text-lg text-[#efe6d2] transition-colors group-hover:text-[#d9a441]">
                    {p.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-[#b7a6d4]">
                    {p.readingTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
