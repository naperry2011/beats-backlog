import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COLUMNS, getColumn } from "@/lib/columns";
import { getPostsByColumn } from "@/lib/posts";
import { getColumnTheme } from "@/lib/columnThemes";
import { NightcapColumn } from "@/components/NightcapColumn";
import { ComfortModeColumn } from "@/components/ComfortModeColumn";
import { BacklogColumn } from "@/components/BacklogColumn";
import { RewindColumn } from "@/components/RewindColumn";
import { RespectDueColumn } from "@/components/RespectDueColumn";
import { ColumnLayout } from "@/components/ColumnLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ column: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ column: string }>;
}): Promise<Metadata> {
  const { column } = await params;
  const col = getColumn(column);
  if (!col) return {};
  return { title: `${col.name} — Beats and Backlog`, description: col.tagline };
}

export default async function ColumnPage({
  params,
}: {
  params: Promise<{ column: string }>;
}) {
  const { column } = await params;
  const col = getColumn(column);
  if (!col) notFound();

  const posts = getPostsByColumn(col.id);

  // The Nightcap has its own bespoke, late-night identity.
  if (col.id === "the-nightcap") {
    return <NightcapColumn posts={posts} />;
  }

  // Comfort Mode is a coffee house.
  if (col.id === "comfort-mode") {
    return <ComfortModeColumn posts={posts} />;
  }

  // The Backlog is a save-select screen.
  if (col.id === "the-backlog") {
    return <BacklogColumn posts={posts} />;
  }

  // Rewind is the neighborhood video store.
  if (col.id === "rewind") {
    return <RewindColumn posts={posts} />;
  }

  // Respect Due is a candlelit hall of honor.
  if (col.id === "respect-due") {
    return <RespectDueColumn posts={posts} />;
  }

  // Every other column renders through the themed layout (per-column identity).
  const theme = getColumnTheme(col.id);
  if (theme) {
    return <ColumnLayout column={col} posts={posts} theme={theme} />;
  }

  // Fallback (should not happen — all columns have a theme).
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-poster text-5xl uppercase tracking-tight text-ink">
        {col.name}
      </h1>
      <p className="mt-4 font-body text-ink-soft">{col.description}</p>
    </div>
  );
}
