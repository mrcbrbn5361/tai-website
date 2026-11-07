export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  description: string;
  icon: string;
  isPrimary?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "spotify",
    platform: "Spotify",
    handle: "TAI",
    url: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Official Artist Profile, verified streaming discography & radar playlists.",
    icon: "Music2",
    isPrimary: true
  },
  {
    id: "instagram",
    platform: "Instagram",
    handle: "@tai.jungeofficial",
    url: "https://www.instagram.com/tai.jungeofficial/",
    description: "Direct visual dispatches, studio leaks, upcoming drop announcements.",
    icon: "Instagram",
    isPrimary: true
  },
  {
    id: "youtube",
    platform: "YouTube",
    handle: "TAI Official",
    url: "https://www.youtube.com/results?search_query=tai+kvpsul+turuncu+tesla",
    description: "Official visualizers, live performance sessions, and music videos.",
    icon: "Youtube",
    isPrimary: false
  },
  {
    id: "apple-music",
    platform: "Apple Music",
    handle: "TAI",
    url: "https://music.apple.com/us/search?term=TAI+KVPSUL",
    description: "Spatial audio masters, lossless catalog & curated selections.",
    icon: "Disc",
    isPrimary: false
  }
];
