import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { siApplemusic, siDeezer, siSpotify } from "simple-icons";

import logo from "../assets/era-logo.png.asset.json";
import { playlists, type Playlist } from "../data/playlists";
import { getPlaylistSource, trackClick } from "../lib/track";

type ServiceKey = "spotify" | "apple" | "deezer";

const icons = {
  spotify: siSpotify,
  apple: siApplemusic,
  deezer: siDeezer,
};

function getPlaylist(slug: string) {
  return playlists.find((playlist) => playlist.slug === slug);
}

function PlatformIcon({ platform }: { platform: ServiceKey }) {
  return (
    <svg className="bio-dsp-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={icons[platform].path} fill="currentColor" />
    </svg>
  );
}

export const Route = createFileRoute("/bio/$slug")({
  head: ({ params }) => {
    const playlist = getPlaylist(params.slug);
    if (!playlist) {
      return {
        meta: [
          { title: "Playlist not found — ERA Music" },
          { name: "description", content: "This ERA Music playlist is unavailable." },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const title = `${playlist.title} — ERA Music`;
    return {
      meta: [
        { title },
        { name: "description", content: playlist.hook },
        { property: "og:title", content: title },
        { property: "og:description", content: playlist.hook },
        { property: "og:type", content: "website" },
        { property: "og:image", content: playlist.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: playlist.cover },
      ],
    };
  },
  component: BioRoute,
});

function BioRoute() {
  const { slug } = Route.useParams();
  const playlist = getPlaylist(slug);

  if (!playlist) return <PlaylistNotFound />;
  return <PlaylistPage playlist={playlist} />;
}

function PlaylistNotFound() {
  return (
    <main className="bio-not-found">
      <Link to="/" aria-label="ERA Music — home">
        <img src={logo.url} alt="ERA Music" className="era-logo" />
      </Link>
      <Link to="/">Back home</Link>
    </main>
  );
}

function PlaylistPage({ playlist }: { playlist: Playlist }) {
  const pageRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [copied, setCopied] = useState(false);
  const source = useMemo(
    () => (typeof window === "undefined" ? "direct" : getPlaylistSource(window.location.search)),
    [],
  );

  const services = useMemo(
    () =>
      ([
        { key: "spotify", label: "Listen on Spotify", href: playlist.spotify, primary: true },
        { key: "apple", label: "Listen on Apple Music", href: playlist.apple, primary: false },
        { key: "deezer", label: "Listen on Deezer", href: playlist.deezer, primary: false },
      ] as const).filter((service) => service.href),
    [playlist],
  );

  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry?.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(actions);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = playlist.cover;
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context || !page) return;
        context.drawImage(image, 0, 0, 32, 32);
        const pixels = context.getImageData(0, 0, 32, 32).data;
        let winner = { score: -1, r: 245, g: 245, b: 242 };
        for (let index = 0; index < pixels.length; index += 16) {
          const r = pixels[index] ?? 0;
          const g = pixels[index + 1] ?? 0;
          const b = pixels[index + 2] ?? 0;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max ? (max - min) / max : 0;
          const lightness = (max + min) / 510;
          const score = saturation * (1 - Math.abs(lightness - 0.55));
          if (score > winner.score && lightness > 0.2 && lightness < 0.85) {
            winner = { score, r, g, b };
          }
        }
        page.style.setProperty("--bio-accent", `rgb(${winner.r} ${winner.g} ${winner.b})`);
        page.style.setProperty("--bio-accent-rgb", `${winner.r} ${winner.g} ${winner.b}`);
      } catch {
        // Cross-origin covers retain the off-white fallback accent.
      }
    };
  }, [playlist.cover]);

  async function sharePlaylist() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: playlist.title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main ref={pageRef} className="bio-page">
      <div className="bio-backdrop" style={{ backgroundImage: `url(${playlist.cover})` }} aria-hidden="true" />
      <div className="bio-scrim" aria-hidden="true" />
      <div className="bio-grain" aria-hidden="true" />

      <section className="bio-hero" aria-labelledby="playlist-title">
        <img className="bio-cover bio-enter bio-enter-1" src={playlist.cover} alt={`${playlist.title} playlist cover`} width={320} height={320} crossOrigin="anonymous" />
        <h1 id="playlist-title" className="bio-title bio-enter bio-enter-2">{playlist.title}</h1>
        <p className="bio-hook bio-enter bio-enter-3">{playlist.hook}</p>

        <div ref={actionsRef} className="bio-actions" aria-label="Listen to this playlist">
          {services.map((service, index) => (
            <a
              key={service.key}
              href={service.href}
              target="_blank"
              rel="noreferrer"
              className={`bio-dsp bio-enter bio-enter-${index + 4} ${service.primary ? "bio-dsp-primary" : "bio-dsp-glass"}`}
              onClick={() => trackClick(playlist.slug, service.key, source)}
            >
              <PlatformIcon platform={service.key} />
              <span className="bio-dsp-copy">
                <span>{service.label}</span>
                {playlist.stats?.[service.key] ? <small className="bio-dsp-stat">{playlist.stats[service.key]}</small> : null}
              </span>
              <span aria-hidden="true" />
            </a>
          ))}
        </div>
        <span className="bio-scroll-cue" aria-hidden="true" />
      </section>

      <section className="bio-story" aria-label="About this playlist">
        <p className="bio-body">{playlist.body}</p>
        <p className="bio-artists">{playlist.artists}</p>
        <div className="bio-moments" aria-label="Made for">
          {playlist.moments.map((moment) => <span className="bio-chip" key={moment}>{moment}</span>)}
        </div>
        <button type="button" className="bio-share" onClick={sharePlaylist} aria-live="polite">
          {copied ? "link copied" : "send it to the friend you run with."}
        </button>
        <footer className="bio-footer">
          <Link to="/" aria-label="ERA Music — home" className="bio-home">
            <img src={logo.url} alt="ERA Music" className="era-logo" />
          </Link>
          <span>Selected by ERA Music. Music for Motion.</span>
        </footer>
      </section>

      <aside className={`bio-sticky ${showSticky ? "bio-sticky-visible" : ""}`} aria-hidden={!showSticky}>
        <div className="bio-sticky-inner">
          <img src={playlist.cover} alt="" className="bio-sticky-cover" />
          <span className="bio-sticky-title">{playlist.title}</span>
          <a
            href={playlist.spotify}
            target="_blank"
            rel="noreferrer"
            tabIndex={showSticky ? 0 : -1}
            className="bio-sticky-listen"
            onClick={() => trackClick(playlist.slug, "spotify", source)}
          >
            <PlatformIcon platform="spotify" />
            Listen
          </a>
        </div>
      </aside>
    </main>
  );
}