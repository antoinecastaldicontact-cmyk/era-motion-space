import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "../assets/era-logo.png.asset.json";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — ERA Music" },
      { name: "description", content: "The ERA Music manifesto." },
      { property: "og:title", content: "Manifesto — ERA Music" },
      { property: "og:description", content: "The ERA Music manifesto." },
    ],
  }),
  component: Manifesto,
});

const PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo.",
  "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum, aenean lacinia bibendum nulla sed consectetur.",
  "Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.",
  "Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
  "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
];

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
    </main>
  );
}
