import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "../assets/era-logo.png.asset.json";
import { playlists } from "../data/playlists";

const playlist = playlists[0];

export function trackClick(slug: string, dsp: string, src: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("era:playlist-click", {
      detail: { slug, dsp, src },
    }),
  );

  const analyticsWindow = window as Window & {
    plausible?: (event: string, options: { props: Record<string, string> }) => void;
  };
  analyticsWindow.plausible?.("Playlist Click", {
    props: { slug, dsp, src },
  });
}

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 fill-current">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.42a.75.75 0 0 1-1.03.25c-2.82-1.72-6.38-2.11-10.56-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.51-.59 11.67 1.34.35.21.46.67.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.55-11.97-1.39a.94.94 0 1 1-.55-1.79c4.37-1.33 9.79-.69 13.5 1.58.44.27.58.85.31 1.29Zm.13-3.4C14.31 7.45 7.92 7.24 4.23 8.36A1.12 1.12 0 1 1 3.58 6.2c4.24-1.29 11.3-1.04 15.75 1.6a1.12 1.12 0 0 1-1.15 1.94Z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 fill-current">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
  </svg>
);

const DeezerIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 fill-current">
    <path d="M2 16h4v3H2v-3Zm0-4h4v3H2v-3Zm5 4h4v3H7v-3Zm0-8h4v3H7V8Zm0 4h4v3H7v-3Zm5 4h4v3h-4v-3Zm0-8h4v3h-4V8Zm5 8h5v3h-5v-3Zm0-4h5v3h-5v-3ZM12 4h4v3h-4V4Z" />
  </svg>
);

export const Route = createFileRoute("/bio/$slug")({
  head: () => ({
    meta: [
      { title: "Running Songs — ERA Music" },
      { name: "description", content: playlist.description },
      { property: "og:title", content: "Running Songs — ERA Music" },
      { property: "og:description", content: playlist.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: playlist.cover },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: playlist.cover },
    ],
  }),
  component: Bio,
});

function Bio() {
  const services = [
    { key: "spotify", label: "Listen on Spotify", href: playlist.spotify, icon: SpotifyIcon, primary: true },
    { key: "apple", label: "Listen on Apple Music", href: playlist.apple, icon: AppleIcon, primary: false },
    { key: "deezer", label: "Listen on Deezer", href: playlist.deezer, icon: DeezerIcon, primary: false },
  ].filter((service) => service.href);

  return (
    <main className="bio-page">
      <div
        className="bio-backdrop"
        style={{ backgroundImage: `url(${playlist.cover})` }}
        aria-hidden="true"
      />
      <div className="bio-scrim" aria-hidden="true" />

      <section className="bio-content" aria-labelledby="playlist-title">
        <img
          className="bio-cover bio-enter bio-enter-1"
          src={playlist.cover}
          alt={`${playlist.title} playlist cover`}
          width={320}
          height={320}
        />
        <h1 id="playlist-title" className="bio-title bio-enter bio-enter-2">
          {playlist.title}
        </h1>
        <p className="bio-description bio-enter bio-enter-3">{playlist.description}</p>

        <div className="bio-actions" aria-label="Listen to this playlist">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={service.key}
                href={service.href}
                target="_blank"
                rel="noreferrer"
                className={`bio-dsp bio-enter bio-enter-${index + 4} ${service.primary ? "bio-dsp-primary" : "bio-dsp-glass"}`}
                onClick={() => trackClick(playlist.slug, service.key, "bio")}
              >
                <Icon />
                <span>{service.label}</span>
              </a>
            );
          })}
        </div>

        <Link to="/" aria-label="ERA Music — home" className="bio-home bio-enter bio-enter-7">
          <img src={logo.url} alt="ERA Music" className="era-logo" />
        </Link>
      </section>
    </main>
  );
}
