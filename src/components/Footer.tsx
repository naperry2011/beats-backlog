import Link from "next/link";

// The front porch's quiet edge, late-night ground. The tribute is linked
// gently here, never as a loud nav button (blueprint §9).
export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      {/* Seigaiha tide line in ochre. */}
      <div className="seigaiha h-5 w-full text-ochre opacity-50" />

      <div className="mx-auto max-w-5xl px-5 py-14">
        <p className="font-poster text-4xl uppercase tracking-tight text-paper sm:text-5xl">
          Beats <span className="text-vermillion">&amp;</span> Backlog
        </p>
        <p className="mt-3 max-w-md font-body text-lg italic text-paper/70">
          The lounge is open. Pull up a chair.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
          <Link href="/about" className="brush-link hover:text-paper">
            About
          </Link>
          <Link href="/columns/the-nightcap" className="brush-link hover:text-paper">
            The Nightcap
          </Link>
          <Link href="/columns/the-backlog" className="brush-link hover:text-paper">
            The Backlog
          </Link>
          <span className="text-paper/40">Discord — soon</span>
          <span className="text-paper/40">Newsletter — soon</span>
          <Link
            href="/tribute"
            className="text-[#b18cd6] transition-colors hover:text-[#cbb0e8]"
          >
            For Panda
          </Link>
        </div>

        <p className="mt-10 border-t border-paper/15 pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/45">
          BNB · Est. 2026 · Video games, anime &amp; music · Made after bedtime
        </p>
      </div>
    </footer>
  );
}
