import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "../assets/era-logo.png.asset.json";

const DESCRIPTION =
  "Music is not the reward for the effort. It is the vehicle of it.";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — ERA Music" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Manifesto — ERA Music" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Manifesto,
});

const PARAGRAPHS = [
  "Music is not the reward for the effort. It is the vehicle of it.",
  "The right sound, at the right moment, does not make the effort easier. It makes it possible.",
  "There is a moment in every run when you could still stop, and you don't. That moment has a sound. We exist to sign it.",
  "Some run to be in the moment. Some run for no one. The music is the same. One is why it travels. The other is why it lasts.",
  "ERA is run by someone who runs. Early, alone, at cadence. Every record here was played there first.",
  "We will not tell you how hard to go. The effort is yours. The sound is ours.",
];

const SIGNATURE = ["Becoming has a sound.", "Music for Motion."];

function Manifesto() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-6 py-24 sm:py-32">
      <Link to="/" aria-label="ERA Music — home" className="inline-block">
        <img src={logo.url} alt="ERA Music" className="era-logo w-20" />
      </Link>
      <h1 className="mt-16 text-2xl font-medium tracking-[0.18em] uppercase sm:text-3xl">
        Manifesto
      </h1>
      <div className="mt-10 space-y-7 text-base leading-[1.9]">
        {PARAGRAPHS.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="mt-16 space-y-7 text-base leading-[1.9] opacity-70">
        {SIGNATURE.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </main>
  );
}
