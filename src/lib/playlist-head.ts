import { playlists } from "../data/playlists";

export function playlistHead(slug: string) {
  const playlist = playlists.find((entry) => entry.slug === slug);

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
    links: [{ rel: "canonical", href: `https://eramusic.io/bio/${playlist.slug}` }],
  };
}
