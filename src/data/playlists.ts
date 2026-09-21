export type Playlist = {
  slug: string;
  spotifyId: string;
  spotifyTitle: string;
  title: string;
  description: string;
  hook: string;
  body: string;
  artists: string;
  moments: string[];
  cover: string;
  spotify: string;
  apple: string;
  deezer: string;
  stats?: {
    spotify?: string;
    apple?: string;
    deezer?: string;
  };
};

export const playlists: Playlist[] = [
  {
    slug: "edm-running-songs",
    spotifyId: "5ugaUSHdmdlUOrqBr94hoA",
    spotifyTitle:
      "EDM Running Songs 2026 🏃Energetic EDM to run | finding Running Motivation 🚀",
    title: "EDM Running Songs",
    description: "The songs I run to.",
    hook: "the songs everyone's running to this season.",
    body: "You press play at the door. By the second song, the sun feels warmer. By the fifth, you're taking the long way home.",
    artists: "126 songs. David Guetta, Robin Schulz, Ofenbach, MEDUZA, Tiësto and more.",
    moments: [
      "for golden hour",
      "for the weekend 5K",
      "for the sunday you almost stayed in",
    ],
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c828617f3bd292988eb90c1e5",
    spotify: "https://open.spotify.com/playlist/5ugaUSHdmdlUOrqBr94hoA",
    apple: "",
    deezer: "",
  },
  {
    slug: "high-energy-running-songs",
    spotifyId: "0pDP8njArqxBYGavr3sJSH",
    spotifyTitle:
      "High Energy Running Songs EDM ⚡ | 125-160 BPM | Running Lock-In",
    title: "High Energy Running Songs",
    description: "The songs I run to when I want it loud.",
    hook: "the songs for the days you want it loud.",
    body: "Headphones in, volume up, and the street turns into your own music video. The tempo your feet already know.",
    artists: "64 songs. 125 to 160 BPM.",
    moments: [
      "for the first sunny saturday",
      "for the playlist you'll send to the group chat",
      "for the treadmill that needs help",
    ],
    cover:
      "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000d72cbc3ad1ab33b6e2f6ed99832a",
    spotify: "https://open.spotify.com/playlist/0pDP8njArqxBYGavr3sJSH",
    apple: "",
    deezer: "",
  },
  {
    slug: "evening-run-playlist",
    spotifyId: "65M1aM0mOu6bZjqvBILTDw",
    spotifyTitle:
      "Evening Run Playlist 🌇 Sunset Miles | Summer Running Music",
    title: "Evening Run Playlist",
    description: "The songs I run to when the day is done.",
    hook: "the songs for the run after a long day.",
    body: "The sky goes orange, the city slows down, and the day finally lets go of you. Slower, warmer, made for the last light.",
    artists: "100 songs. Sunset tempo.",
    moments: [
      "for sunset",
      "for the long way home",
      "for the summer evenings that don't end",
    ],
    cover:
      "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000d72cc04756193d14fe2fe9e7ce0c",
    spotify: "https://open.spotify.com/playlist/65M1aM0mOu6bZjqvBILTDw",
    apple: "",
    deezer: "",
  },
];
