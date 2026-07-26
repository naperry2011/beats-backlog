import Link from "next/link";
import { COLUMNS } from "@/lib/columns";

// A small, curated nav — not every column shouts. The signature ritual and the
// home-base columns sit up top; the rest live on their landing pages.
const PRIMARY = ["the-nightcap", "the-backlog", "comfort-mode", "on-tap"];

export function Nav() {
  const links = COLUMNS.filter((c) => PRIMARY.includes(c.id));

  return (
    <header className="sticky top-0 z-40">
      {/* Masthead. Kept under 80px tall so it never eats the first screen. */}
      <div className="border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group inline-flex items-baseline gap-1.5">
            <span className="font-poster text-[1.7rem] uppercase leading-none tracking-tight text-ink ink-press">
              Beats
            </span>
            <span className="hanko h-6 w-6 rounded-[3px] font-poster text-base leading-none transition-transform group-hover:rotate-3">
              &amp;
            </span>
            <span className="font-poster text-[1.7rem] uppercase leading-none tracking-tight text-ink ink-press">
              Backlog
            </span>
          </Link>

          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em]">
            {links.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/columns/${c.id}`}
                  className="brush-link text-ink-soft transition-colors hover:text-ink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
