import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Beats and Backlog",
  description:
    "A place that pays respect — honoring those before, lifting those coming up.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
        About
      </h1>
      <div className="mt-6 space-y-4 font-body text-lg leading-relaxed text-ink">
        <p>
          Beats and Backlog is a writing-first corner for video games, anime,
          and music, told from the point of view of a 90s kid who grew up — a
          tired dad who still loves this stuff.
        </p>
        <p>
          The whole place runs on one lens: comfort, nostalgia, and limited
          hours. What&apos;s worth it. What hits the nostalgia nerve. What helps
          you wind down. North star: <em>Samurai Champloo</em> — cool,
          unhurried, soaked in the music, reverent without being stiff.
        </p>
        <p>
          It&apos;s a place that pays respect: honor to the ones who built the
          culture, and a door held open for the ones coming up.
        </p>
      </div>
    </div>
  );
}
