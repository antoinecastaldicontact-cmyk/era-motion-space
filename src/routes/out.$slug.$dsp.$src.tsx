import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { PlatformIcon, useCoverAccent, type ServiceKey } from "../components/BioPage";
import { playlists } from "../data/playlists";

const DSP_LABELS: Record<ServiceKey, string> = {
  spotify: "Spotify",
  apple: "Apple Music",
  deezer: "Deezer",
};

function isServiceKey(value: string): value is ServiceKey {
  return value === "spotify" || value === "apple" || value === "deezer";
}

export const Route = createFileRoute("/out/$slug/$dsp/$src")({
  head: () => ({
    meta: [
      { title: "Opening… — ERA Music" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OutRoute,
});

function OutRoute() {
  const { slug, dsp } = Route.useParams();
  const playlist = playlists.find((entry) => entry.slug === slug);
  const service = isServiceKey(dsp) ? dsp : null;
  const dspUrl = playlist && service ? playlist[service] : "";
  const pageRef = useCoverAccent(playlist?.cover ?? "");

  useEffect(() => {
    if (!dspUrl) {
      window.location.replace(`/bio/${slug}`);
      return;
    }
    const timer = window.setTimeout(() => window.location.replace(dspUrl), 600);
    return () => window.clearTimeout(timer);
  }, [dspUrl, slug]);

  if (!playlist || !service || !dspUrl) return null;

  const label = DSP_LABELS[service];

  return (
    <main ref={pageRef} className="bio-page out-page">
      <div className="bio-backdrop" style={{ backgroundImage: `url(${playlist.cover})` }} aria-hidden="true" />
      <div className="bio-scrim" aria-hidden="true" />
      <div className="bio-grain" aria-hidden="true" />

      <section className="out-inner">
        <img src={playlist.cover} alt="" className="out-cover" />
        <p className="out-status" aria-live="polite">{`Opening ${label}…`}</p>
        <a className="bio-dsp bio-dsp-primary out-fallback" href={dspUrl}>
          <PlatformIcon platform={service} />
          <span className="bio-dsp-copy">
            <span>{`Open ${label}`}</span>
          </span>
          <span aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
