import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/images/tribute/jordan-panda.jpg";
import crest from "@/images/tribute/nerddom-crest.jpg";
import community from "@/images/tribute/nerddom-united.jpg";
import symbol from "@/images/tribute/nerddom-symbol.jpg";

export const metadata: Metadata = {
  title: "For Panda",
  description:
    "Jordan “Panda” Wright — and Nerddom United, the thing we built together.",
};

// The tribute (§9). An immersive Purple Rain night — it glows, it doesn't mourn.
// A subtle Batman nod for the people who knew him. "When Doves Cry" is named,
// never played: no Prince music is hosted anywhere; the absence is the tribute.
const PAGE_BG =
  "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(157,95,214,0.32), transparent 60%)," +
  "radial-gradient(ellipse 60% 45% at 85% 95%, rgba(123,63,184,0.20), transparent 60%)," +
  "linear-gradient(180deg, #1a0c33 0%, #120826 55%, #0b0418 100%)";

// A faint bat silhouette — the quiet nod.
function Bat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 50" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M50 14c-3-6-6-2-9-6-2 5-7 4-11 8 4-1 5 4 9 4-2 4 3 6 4 11 1-6 5-6 7-11 4 0 5-5 9-4-4-4-9-3-11-8-3 4-6 0-9 6h11z"
      />
      <path
        fill="currentColor"
        d="M50 16C40 16 30 10 18 18c6-1 8 4 14 4-6 3-10 9-22 10 14 2 22-6 30-6h20c8 0 16 8 30 6-12-1-16-7-22-10 6 0 8-5 14-4C70 10 60 16 50 16z"
      />
    </svg>
  );
}

// A small dove in flight, for "When Doves Cry."
function Dove({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 30c12-2 18-12 30-12 6 0 10 3 14 3-4 3-3 8-1 12-6-3-12-1-18 4 1-6-5-7-11-3 3-5-8-3-14-4z"
      />
    </svg>
  );
}

export default function TributePage() {
  return (
    <div
      className="relative w-full overflow-hidden text-[#e7dcf5]"
      style={{ background: PAGE_BG }}
    >
      {/* ---- Hero ---- */}
      <section className="relative mx-auto max-w-3xl px-5 pb-20 pt-24 text-center">
        {/* Aurora glow + bat watermark behind the portrait. */}
        <div
          className="tribute-glow pointer-events-none absolute left-1/2 top-16 -z-0 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(157,95,214,0.35)" }}
        />
        <Bat className="pointer-events-none absolute left-1/2 top-28 -z-0 w-72 -translate-x-1/2 text-[#9d5fd6] opacity-[0.07]" />

        <div className="relative">
          <Image
            src={portrait}
            alt="Jordan “Panda” Wright"
            placeholder="blur"
            priority
            sizes="(max-width: 640px) 70vw, 320px"
            className="reveal mx-auto h-80 w-auto rounded-2xl object-cover ring-1 ring-[#b98fe6]/40 shadow-[0_0_70px_-10px_rgba(157,95,214,0.7)]"
          />

          <p
            className="reveal mt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-[#b18cd6]"
            style={{ animationDelay: "0.1s" }}
          >
            In memory
          </p>
          <h1
            className="reveal mt-3 font-body text-5xl font-medium leading-tight text-[#f1e9d6] sm:text-6xl"
            style={{ animationDelay: "0.18s" }}
          >
            Jordan &ldquo;Panda&rdquo; Wright
          </h1>
          <p
            className="reveal mt-4 font-body text-lg italic text-[#cdbbe6]"
            style={{ animationDelay: "0.26s" }}
          >
            The name the people who loved him used.
          </p>
          <p
            className="reveal mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#9d83c4]"
            style={{ animationDelay: "0.32s" }}
          >
            September 27, 1991 — July 21, 2017
          </p>
        </div>
      </section>

      {/* ---- The words ---- */}
      <section className="relative mx-auto max-w-2xl px-5 pb-20 text-center">
        <div className="space-y-7 font-body text-xl leading-loose text-[#e2d6f3]">
          <p>
            Jordan was always himself — a kind soul, a gentle giant. He&apos;d
            give his last to anyone, even when he didn&apos;t have it to give.
          </p>
          <p>
            He loved his music, with Prince above all. He loved his games. And
            he was a man who understood what good food is.
          </p>
          <p>
            Panda meant the world to everyone who knew him. But to his mother,
            he <em>was</em> the world — her bright star.
          </p>
          <p>
            He&apos;s gone, but I do what I can to keep his name and his vision
            alive.
          </p>
        </div>
      </section>

      {/* ---- What we built together: Nerddom United ---- */}
      <section className="relative border-t border-white/10 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="reveal mb-8 flex justify-center">
            <Image
              src={symbol}
              alt="The official Nerddom United emblem — a silver seal with the NU monogram, ringed by “Nerddom United” and the motto “We die together, we respawn together, nerds for life.”"
              sizes="144px"
              className="h-32 w-32 rounded-full object-cover shadow-[0_0_55px_-10px_rgba(157,95,214,0.75)] ring-1 ring-[#b98fe6]/30"
            />
          </div>
          <p className="mb-10 text-center font-body text-base italic text-[#cdbbe6]">
            This symbol was Panda&apos;s own — he made it, and gave it to us.
          </p>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.35em] text-[#b18cd6]">
            What we built together
          </p>
          <h2 className="mt-3 text-center font-body text-4xl font-medium text-[#f1e9d6] sm:text-5xl">
            Nerddom United
          </h2>

          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <div className="reveal flex justify-center">
              <Image
                src={crest}
                alt="The Nerddom United crest — a crowned panda holding a katana beside Jordan, over a banner reading “We die together, we respawn together, nerds for life.”"
                sizes="(max-width: 768px) 80vw, 380px"
                className="w-72 rounded-2xl ring-1 ring-[#b98fe6]/30 shadow-[0_0_60px_-15px_rgba(157,95,214,0.6)] sm:w-80"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="font-body text-3xl font-medium italic leading-snug text-[#f1e9d6]">
                &ldquo;We die together, we respawn together.
                <br className="hidden sm:block" /> Nerds for life.&rdquo;
              </p>
              <p className="mt-6 font-body text-lg leading-relaxed text-[#cdbbe6]">
                Everything here grew around what he gave us. We keep building it
                in his name.
              </p>
              <p className="mt-6 font-mono text-xs leading-relaxed tracking-wide text-[#9d83c4]">
                The panda with the katana was never a coincidence — anime,
                games, and the music, all in one hand. The blend this whole
                place runs on, he was already living.
              </p>
            </div>
          </div>

          {/* Community band. */}
          <div className="reveal mt-14">
            <Image
              src={community}
              alt="Nerddom United community artwork — the panda mascot surrounded by the crew, captioned “From pixels to power — we are united.”"
              sizes="(max-width: 768px) 92vw, 640px"
              className="mx-auto w-full max-w-2xl rounded-2xl ring-1 ring-[#b98fe6]/20 shadow-[0_0_50px_-18px_rgba(157,95,214,0.5)]"
            />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[#9d83c4]">
              From pixels to power — we are united
            </p>
          </div>
        </div>
      </section>

      {/* ---- The music ---- */}
      <section className="relative border-t border-white/10 px-5 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <Dove className="mx-auto w-12 text-[#b18cd6]" />
          <p className="mt-6 font-body text-3xl font-medium italic text-[#f1e9d6]">
            When Doves Cry — named, not played.
          </p>
          <p className="mt-6 font-body text-base leading-relaxed text-[#bda9dc]">
            Prince was his favorite. Out of respect for Prince and his craft, no
            Prince music is hosted anywhere on this site — this page holds the
            memory in words and stillness. The absence is the tribute.
          </p>

          <p className="mt-16 font-body text-2xl font-medium text-[#f1e9d6]">
            We will always love you, Jordan.
          </p>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.4em] text-[#b18cd6]">
            Peace
          </p>

          <Bat className="mx-auto mt-14 w-8 text-[#7b5aa6] opacity-50" />
        </div>
      </section>
    </div>
  );
}
