export type Playlist = {
  slug: string;
  spotifyId: string;
  spotifyTitle: string;
  title: string;
  description: string;
  cover: string;
  spotify: string;
  apple: string;
  deezer: string;
};

export const playlists: [Playlist] = [
  {
    slug: "edm-running-songs",
    spotifyId: "5ugaUSHdmdlUOrqBr94hoA",
    spotifyTitle:
      "EDM Running Songs 2026 🏃Energetic EDM to run | finding Running Motivation 🚀",
    title: "Running Songs",
    description: "The songs I run to.",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c828617f3bd292988eb90c1e5",
    spotify: "https://open.spotify.com/playlist/5ugaUSHdmdlUOrqBr94hoA",
    apple: "",
    deezer: "",
  },
];
