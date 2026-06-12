"use client";

import { useState } from "react";
import Image from "next/image";
import type { GameDetails } from "@/lib/igdb";

// The interactive half of The Backlog's save-select screen. Press a save file
// and it loads — the card expands into the full memory-card readout, with the
// game's details baked in at build time (no runtime API; instant).

const AMBER = "#e0a72e";
const TEXT = "#efe6d2";
const SOFT = "#ab9f86";

export interface SaveSlotData {
  file: string;
  name: string;
  status: string;
  note: string;
  pct: number;
  details: GameDetails | null;
}

function initials(name: string): string {
  return name
    .split(/[\s:]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Cover({
  url,
  name,
  wide,
}: {
  url: string | null;
  name: string;
  wide?: boolean;
}) {
  const width = wide ? "w-24 sm:w-32" : "w-16 sm:w-20";
  if (url) {
    return (
      <Image
        src={url}
        alt={`${name} cover`}
        width={264}
        height={374}
        sizes={wide ? "128px" : "80px"}
        className={`h-auto ${width} shrink-0 self-start rounded ring-1 ring-white/15`}
      />
    );
  }
  return (
    <div
      className={`flex aspect-[3/4] ${width} shrink-0 items-center justify-center self-start rounded ring-1 ring-white/15`}
      style={{ backgroundColor: "rgba(224,167,46,0.08)" }}
    >
      <span className="font-poster text-xl" style={{ color: AMBER, opacity: 0.7 }}>
        {initials(name)}
      </span>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: AMBER, opacity: 0.85 }} />
    </div>
  );
}

export function SaveSlotGrid({ slots }: { slots: SaveSlotData[] }) {
  const [openFile, setOpenFile] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((s) => {
        const open = openFile === s.file;
        const d = s.details;

        if (open) {
          // ---- Loaded save file: the full memory-card readout. ----
          return (
            <div
              key={s.file}
              className="reveal rounded-lg border bg-white/[0.04] p-5 shadow-[0_0_45px_-15px_rgba(224,167,46,0.5)] sm:col-span-2 lg:col-span-3"
              style={{ borderColor: "rgba(224,167,46,0.5)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: AMBER }}>
                  {s.file} — loaded
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenFile(null);
                  }}
                  aria-expanded="true"
                  className="rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(224,167,46,0.5)", color: AMBER }}
                >
                  ▣ Close file
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-5 sm:flex-row">
                <Cover url={d?.coverUrl ?? null} name={s.name} wide />
                <div className="min-w-0 flex-1">
                  <h3 className="font-body text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: TEXT }}>
                    {d?.name ?? s.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
                    {[d?.year, d?.developer].filter(Boolean).join(" · ") || "Archive data unavailable"}
                  </p>

                  {d && d.genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.genres.map((g) => (
                        <span
                          key={g}
                          className="rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                          style={{ borderColor: "rgba(224,167,46,0.35)", color: AMBER }}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 line-clamp-5 max-w-2xl font-body text-sm leading-relaxed" style={{ color: SOFT }}>
                    {d?.summary ??
                      "No save data found in the archive — the conversation continues anyway."}
                  </p>

                  {/* My side of the conversation. */}
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: AMBER }}>
                      My save · {s.status}
                    </p>
                    <p className="mt-1 font-body text-base italic" style={{ color: TEXT }}>
                      {s.note}
                    </p>
                    <div className="mt-3 max-w-sm">
                      <ProgressBar pct={s.pct} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // ---- Collapsed save slot. ----
        return (
          <button
            key={s.file}
            type="button"
            onClick={() => setOpenFile(s.file)}
            aria-expanded="false"
            className="group flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-left transition-all duration-200 hover:border-[#e0a72e]/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_-12px_rgba(224,167,46,0.45)]"
          >
            <Cover url={d?.coverUrl ?? null} name={s.name} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: AMBER }}>
                  {s.file}
                </span>
                <span className="relative shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="transition-opacity group-hover:opacity-0" style={{ color: SOFT }}>
                    {s.status}
                  </span>
                  <span
                    className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: AMBER }}
                    aria-hidden="true"
                  >
                    ▸ Load?<span className="blink">▌</span>
                  </span>
                </span>
              </span>
              <span className="mt-2 block font-body text-xl font-semibold leading-tight" style={{ color: TEXT }}>
                {s.name}
              </span>
              <span className="mt-1 block font-body text-sm leading-snug" style={{ color: SOFT }}>
                {s.note}
              </span>
              <span className="mt-3 block">
                <ProgressBar pct={s.pct} />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
