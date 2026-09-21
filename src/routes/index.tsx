import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "../assets/era-logo.png.asset.json";
import { Typewriter } from "../components/Typewriter";

const PHRASES = [
  "Scores for film and image.",
  "Sound design for brands.",
  "Original music, made to move.",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ERA Music" },
      { name: "description", content: "ERA Music — music for motion." },
      { property: "og:title", content: "ERA Music" },
      { property: "og:description", content: "ERA Music — music for motion." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 px-6 text-center">
      <img
        src={logo.url}
        alt="ERA Music"
        width={1920}
        height={1080}
        className="era-logo w-44 sm:w-56"
      />
      <h1 className="text-lg font-medium tracking-[0.2em] uppercase sm:text-xl">
        Music for Motion
      </h1>
      <Typewriter phrases={PHRASES} />
      <Link
        to="/manifesto"
        className="border border-current/40 px-6 py-2 text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
      >
        Manifesto
      </Link>
    </main>
  );
}
