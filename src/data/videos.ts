export interface VideoArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  director: string;
  thumbnail: string;
  duration: string;
  description: string;
  aspectRatio: string;
  youtubeId?: string;
  tags: string[];
}

export const VIDEOS_DATA: VideoArchiveItem[] = [
  {
    id: "turuncu-tesla-visual",
    title: "TURUNCU TESLA",
    subtitle: "TAI feat. EVRENESI",
    year: "2024",
    director: "JUNGE VISUAL UNIT",
    thumbnail: "/images/video-archive.jpg",
    duration: "02:44",
    description: "Midnight urban high-speed chase visualizer across Istanbul overpasses, bathed in sodium vapor and taillight streaks.",
    aspectRatio: "16:9",
    tags: ["OFFICIAL VISUAL", "4K", "ANAMORPHIC"]
  },
  {
    id: "ch-denim-visual",
    title: "CH DENIM",
    subtitle: "TAI feat. 13 Killoki",
    year: "2024",
    director: "JUNGE VISUAL UNIT",
    thumbnail: "/images/hero-atmosphere.jpg",
    duration: "02:32",
    description: "Brutalist warehouse performance framed by monolithic concrete pillars and high-contrast volumetric spotlights.",
    aspectRatio: "16:9",
    tags: ["PERFORMANCE", "MONOCHROME", "LIVE"]
  },
  {
    id: "kvpsul-doc",
    title: "KVPSUL: THE CHROME SESSIONS",
    subtitle: "EP Documentary & Studio Tape",
    year: "2024",
    director: "UNDERGROUND TAPES",
    thumbnail: "/images/kvpsul-cover.jpg",
    duration: "04:12",
    description: "Behind-the-scenes analogue VHS footage documenting the beat synthesis and vocal tracking sessions for KVPSUL.",
    aspectRatio: "4:3",
    tags: ["VHS ARCHIVE", "STUDIO", "RAW"]
  },
  {
    id: "oscar-night-drive",
    title: "OSCAR: NOCTURNAL RUN",
    subtitle: "Cinematic Mood Piece",
    year: "2023",
    director: "JUNGE LABS",
    thumbnail: "/images/oscar-cover.jpg",
    duration: "03:15",
    description: "Low-frequency bass test accompanied by 35mm telephoto tracking shots across rainy metropolitan streets.",
    aspectRatio: "16:9",
    tags: ["SHORT FILM", "35MM", "BASS EDIT"]
  }
];
