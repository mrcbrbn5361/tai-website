export interface ArtistProfile {
  name: string;
  alias: string;
  genre: string;
  origin: string;
  bio: string[];
  manifesto: string;
  spotifyArtistId: string;
  spotifyUrl: string;
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
  notableCollaborators: string[];
}

export const ARTIST_DATA: ArtistProfile = {
  name: "TAI",
  alias: "TAI JUNGE",
  genre: "Underground Rap / Rage / Alternative Trap",
  origin: "Istanbul, Turkey",
  manifesto:
    "Distorted 808s, raw midnight realism, and metallic sonic architecture. No industry concessions. Built from the underground out.",
  bio: [
    "TAI stands at the forefront of the new-wave Turkish underground rap movement, dismantling conventional soundscapes through high-velocity rage beats, visceral cadence, and nocturnal electronic grit.",
    "Emerging from the vanguard of modern Turkish rap producers and MCs—frequently collaborating with EVRENESI, 13 Killoki, Swirf, and Kum—TAI fuses raw street lyricism with cybernetic audio production.",
    "From conceptual EPs like 'KVPSUL' and 'OSCAR' to high-impact anthems such as 'TURUNCU TESLA' and 'CH DENIM', each project represents a focused sonic world engineered for maximum sub-bass resonance and cinematic impact."
  ],
  spotifyArtistId: "5dFeNfQoaHSqzgS8tyXVKR",
  spotifyUrl: "https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR",
  stats: [
    {
      label: "Discography",
      value: "11+",
      detail: "Verified Singles & EPs"
    },
    {
      label: "Audio Axis",
      value: "RAGE / TRAP",
      detail: "808 Bass & Synth Design"
    },
    {
      label: "Core Collective",
      value: "JUNGE",
      detail: "Underground Creative Unit"
    },
    {
      label: "Sonic Frequency",
      value: "140–165",
      detail: "Tempo Spectrum (BPM)"
    }
  ],
  notableCollaborators: [
    "EVRENESI",
    "13 Killoki",
    "Kum",
    "Swirf",
    "Azure Wrath"
  ]
};
