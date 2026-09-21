import { createFileRoute } from "@tanstack/react-router";

import { BioPage, PlaylistNotFound } from "../components/BioPage";
import { playlists } from "../data/playlists";
import { normalizePlaylistSource } from "../lib/track";
import { playlistHead } from "../lib/playlist-head";

export const Route = createFileRoute("/bio/$slug/$src")({
  head: ({ params }) => playlistHead(params.slug),
  component: BioSrcRoute,
});

function BioSrcRoute() {
  const { slug, src } = Route.useParams();
  const playlist = playlists.find((entry) => entry.slug === slug);

  if (!playlist) return <PlaylistNotFound />;
  return <BioPage playlist={playlist} src={normalizePlaylistSource(src)} />;
}
