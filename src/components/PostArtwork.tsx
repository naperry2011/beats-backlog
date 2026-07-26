// A post's sleeve. Real cover art when one of the services found it, rendered
// at its own ratio so the art fills edge to edge with no bars. When there's no
// cover, the sleeve is still a sleeve: the column's mark struck on a tinted
// ground, the way a white-label promo comes out of the crate.

import Image from "next/image";
import type { PostArt } from "@/lib/art";
import { ART_RATIO } from "@/lib/art";
import { getColumn } from "@/lib/columns";
import { getColumnTheme } from "@/lib/columnThemes";

// Matches --color-vermillion, for the columns that run bespoke and so carry no
// entry in the theme registry.
const DEFAULT_ACCENT = "#b23a25";

function mark(columnId: string): { accent: string; monogram: string } {
  const theme = getColumnTheme(columnId);
  if (theme) return { accent: theme.accent, monogram: theme.monogram };

  const name = getColumn(columnId)?.name ?? columnId;
  const monogram = name
    .split(/\s+/)
    .filter((w) => w.toLowerCase() !== "the")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  return { accent: DEFAULT_ACCENT, monogram: monogram || "BB" };
}

// The frame reads as a printed edge on paper and as a lit edge at night, so
// the same sleeve drops into a warm column or a late-night one.
const FRAME = {
  paper: "border-2 border-ink bg-paper-deep",
  night: "border border-white/20 bg-white/[0.04]",
} as const;

export function PostArtwork({
  art,
  column,
  title,
  sizes,
  tone = "paper",
  priority = false,
  className = "",
}: {
  art: PostArt | null;
  column: string;
  title: string;
  sizes: string;
  tone?: keyof typeof FRAME;
  priority?: boolean;
  className?: string;
}) {
  const { accent, monogram } = mark(column);
  const ratio = art ? ART_RATIO[art.kind] : "1 / 1";

  return (
    <div
      className={`relative overflow-hidden ${FRAME[tone]} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {art ? (
        <Image
          src={art.url}
          alt={`Cover art for ${art.subject}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        /* A white-label promo: halftone stock, a struck keyline, the column's
           mark in the middle. Not a missing image, a blank sleeve. */
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: `${accent}22` }}
          aria-hidden="true"
        >
          <div
            className="halftone absolute inset-0 opacity-[0.22]"
            style={{ color: accent }}
          />
          <div
            className="absolute inset-[7%] border"
            style={{ borderColor: accent, opacity: 0.35 }}
          />
          <span
            className="relative font-poster text-5xl uppercase leading-none tracking-tight sm:text-6xl"
            style={{ color: accent, opacity: 0.9 }}
          >
            {monogram}
          </span>
        </div>
      )}

      {/* Printed inner keyline, so cover and blank sleeve share one frame. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(236,225,196,0.28)]"
      />
      {!art && <span className="sr-only">{title}</span>}
    </div>
  );
}
