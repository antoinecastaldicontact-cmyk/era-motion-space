import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { BioPage, PlaylistNotFound } from "../components/BioPage";
import { playlists } from "../data/playlists";
import { getPlaylistSource } from "../lib/track";
import { playlistHead } from "../lib/playlist-head";

export const Route = createFileRoute("/bio/$slug/")({
  head: ({ params }) => playlistHead(params.slug),
  component: BioSlugRoute,
});

function BioSlugRoute() {
  const { slug } = Route.useParams();
  const playlist = playlists.find((entry) => entry.slug === slug);

  useEffect(() => {
    const src = getPlaylistSource(window.location.search);
    if (src !== "direct") {
      window.location.replace(`/bio/${slug}/${src}`);
    }
  }, [slug]);

  if (!playlist) return <PlaylistNotFound />;
  return <BioPage playlist={playlist} src="direct" />;
}
