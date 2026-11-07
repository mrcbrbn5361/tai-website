export type ReleaseType = "EP" | "Single" | "Collaboration";

export interface Release {
  id: string;
  title: string;
  type: ReleaseType;
  year: string;
  duration?: string;
  collaborators?: string[];
  coverImage: string;
  spotifyUri: string;
  spotifyWebUrl: string;
  description: string;
  tracklist?: string[];
  bpm?: number;
  featured?: boolean;
}

export const RELEASES_DATA: Release[] = [
  {
    id: "kvpsul",
    title: "KVPSUL",
    type: "EP",
    year: "2024",
    duration: "4 Tracks",
    coverImage: "/images/kvpsul-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "A metallic sonic capsule of futuristic Turkish rage trap, heavy distorted basslines, and hyper-kinetic synths.",
    tracklist: ["KVPSUL Intro", "Turuncu Tesla", "Sert", "Karanlık"],
    bpm: 148,
    featured: true
  },
  {
    id: "oscar",
    title: "OSCAR",
    type: "EP",
    year: "2023",
    duration: "5 Tracks",
    coverImage: "/images/oscar-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "High-contrast nocturnal project detailing street realism, nocturnal drives, and uncompromising production aesthetics.",
    tracklist: ["Oscar", "Rol Model", "Tony Hawk", "Midnight Outro"],
    bpm: 154,
    featured: true
  },
  {
    id: "turuncu-tesla",
    title: "TURUNCU TESLA",
    type: "Collaboration",
    year: "2024",
    duration: "2:44",
    collaborators: ["EVRENESI"],
    coverImage: "/images/kvpsul-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Breakout collaboration with EVRENESI delivering relentless punchlines and signature rage distortion.",
    bpm: 150,
    featured: true
  },
  {
    id: "ch-denim",
    title: "CH DENIM",
    type: "Collaboration",
    year: "2024",
    duration: "2:32",
    collaborators: ["13 Killoki"],
    coverImage: "/images/video-archive.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Chrome Hearts aesthetics meet gritty subterranean flows alongside 13 Killoki.",
    bpm: 142,
    featured: true
  },
  {
    id: "swag",
    title: "SWAG",
    type: "Collaboration",
    year: "2023",
    duration: "2:50",
    collaborators: ["Swirf", "13 Killoki"],
    coverImage: "/images/oscar-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Triple-threat underground anthem showcasing rapid-fire delivery and subterranean bass.",
    bpm: 156,
    featured: false
  },
  {
    id: "malibu-sut",
    title: "MALİBU SÜT",
    type: "Single",
    year: "2023",
    duration: "2:18",
    coverImage: "/images/hero-atmosphere.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Hypnotic, woozy night-drive single with reverberant melodies and rolling 808s.",
    bpm: 136,
    featured: false
  },
  {
    id: "beni-yak",
    title: "Beni Yak",
    type: "Single",
    year: "2023",
    duration: "2:41",
    coverImage: "/images/kvpsul-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Melodic aggression and introspective cadence over razor-sharp hi-hats.",
    bpm: 145,
    featured: false
  },
  {
    id: "rol-model",
    title: "ROL MODEL",
    type: "Single",
    year: "2023",
    duration: "2:25",
    coverImage: "/images/oscar-cover.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "High-octane performance single confronting scene cliches with biting wit.",
    bpm: 152,
    featured: false
  },
  {
    id: "yamyam",
    title: "YAMYAM",
    type: "Collaboration",
    year: "2023",
    duration: "2:47",
    collaborators: ["Kum"],
    coverImage: "/images/video-archive.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Genre-bending crossover track with Kum melding indie-grit and underground trap cadence.",
    bpm: 140,
    featured: false
  },
  {
    id: "adimlar",
    title: "Adımlar",
    type: "Collaboration",
    year: "2022",
    duration: "2:55",
    collaborators: ["Azure Wrath"],
    coverImage: "/images/hero-atmosphere.jpg",
    spotifyUri: "spotify:artist:5dFeNfQoaHSqzgS8tyXVKR",
    spotifyWebUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
    description: "Atmospheric dark soundscape with Azure Wrath featuring complex layered vocal textures.",
    bpm: 138,
    featured: false
  }
];
