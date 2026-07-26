import type { Metadata } from "next";
import { Anton, Newsreader, Noto_Serif_JP, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Wordmark + poster labels — Anton is a heavy woodtype/letterpress face, used
// big and uppercase for the gig-poster punch. PLACEHOLDER for final pick (§7).
const poster = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-poster",
  display: "swap",
});

// Titles + body — a warm, readable serif with real italics for long reads (§7).
const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-body",
  display: "swap",
});

// Labels / kickers — monospace for the liner-notes / turntable edge (§7).
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

// Hanko seals — a self-hosted Mincho so the kanji (遊/観/聴) render as
// woodblock serifs on every device, never a system sans fallback.
const seal = Noto_Serif_JP({
  weight: "600",
  variable: "--ff-seal",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Beats and Backlog",
  description:
    "A writing-first corner for video games, anime, and music: comfort, nostalgia, and limited hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poster.variable} ${body.variable} ${mono.variable} ${seal.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
