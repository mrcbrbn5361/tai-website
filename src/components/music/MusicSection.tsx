"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Disc3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RELEASES_DATA, Release } from "@/src/data/releases";
import { ARTIST_DATA } from "@/src/data/artist";

interface MusicSectionProps {
  onPlayPreviewTrack?: (title: string, bpm?: number) => void;
  activePreviewTitle?: string;
  isPlayingPreview?: boolean;
}

export function MusicSection({
  onPlayPreviewTrack,
  activePreviewTitle,
  isPlayingPreview
}: MusicSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(RELEASES_DATA[0]);
  const [showEmbed, setShowEmbed] = useState<boolean>(false);

  const filters = ["ALL", "EP", "Collaboration", "Single"];

  const filteredReleases = RELEASES_DATA.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.type === activeFilter;
  });

  return (
    <section id="music" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ccff00] mb-2">
            <span>01</span>
            <span aria-hidden="true">/</span>
            <span>SONIC ARCHIVE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
            DISCOGRAPHY
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            Stream official releases, EPs, and underground collaborative master tracks across Spotify and digital streaming platforms.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101010] border border-zinc-800">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#ccff00] text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {filter === "ALL" ? "ALL (10)" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Release Spotlight Hero Grid */}
      {selectedRelease && (
        <div className="mb-16 bg-[#0c0c0c] border border-zinc-800/80 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Artwork Column */}
            <div className="lg:col-span-5 relative aspect-square w-full max-w-md mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <Image
                src={selectedRelease.coverImage}
                alt={`${selectedRelease.title} Cover Artwork`}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 z-20 bg-black/85 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#ccff00] border border-zinc-800">
                CATALOGUE · {selectedRelease.year}
              </div>
            </div>

            {/* Release Meta Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-3">
                  <span className="text-[#ccff00] uppercase font-bold">{selectedRelease.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedRelease.year}</span>
                  {selectedRelease.duration && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{selectedRelease.duration}</span>
                    </>
                  )}
                  {selectedRelease.bpm && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{selectedRelease.bpm} BPM</span>
                    </>
                  )}
                </div>

                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4">
                  {selectedRelease.title}
                </h3>

                {selectedRelease.collaborators && selectedRelease.collaborators.length > 0 && (
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 mb-4">
                    FEATURING:{" "}
                    <span className="text-zinc-200">
                      {selectedRelease.collaborators.join(", ")}
                    </span>
                  </p>
                )}

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {selectedRelease.description}
                </p>

                {selectedRelease.tracklist && (
                  <div className="mb-6 border-t border-zinc-800/80 pt-4">
                    <span className="text-xs font-mono uppercase text-zinc-400 block mb-2">
                      TRACKLIST SPECIFICATION:
                    </span>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                      {selectedRelease.tracklist.map((track, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#ccff00]">{i + 1}.</span>
                          <span>{track}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/80">
                <button
                  onClick={() =>
                    onPlayPreviewTrack?.(
                      selectedRelease.title,
                      selectedRelease.bpm || 148
                    )
                  }
                  className="px-5 py-3 text-xs font-mono font-bold tracking-wider text-black bg-[#ccff00] hover:bg-[#b8e600] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PREVIEW SYNTH BEAT</span>
                </button>

                <a
                  href={selectedRelease.spotifyWebUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 text-xs font-mono font-medium tracking-wider text-zinc-200 bg-zinc-900 border border-zinc-700 hover:border-zinc-400 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                  <span>PLAY ON SPOTIFY</span>
                </a>

                <button
                  onClick={() => setShowEmbed(!showEmbed)}
                  className="px-4 py-3 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  {showEmbed ? "HIDE EMBED" : "SHOW SPOTIFY EMBED"}
                </button>
              </div>

              {/* Spotify Official Embed Frame */}
              {showEmbed && (
                <div className="mt-6 border border-zinc-800 bg-black p-2">
                  <iframe
                    src="https://open.spotify.com/embed/artist/5dFeNfQoaHSqzgS8tyXVKR?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="TAI Spotify Artist Embed"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Releases */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredReleases.map((rel) => {
            const isSelected = selectedRelease?.id === rel.id;
            return (
              <motion.div
                key={rel.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedRelease(rel)}
                className={`group cursor-pointer bg-[#0e0e0e] border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? "border-[#ccff00] ring-1 ring-[#ccff00]/40"
                    : "border-zinc-800/80 hover:border-zinc-600"
                }`}
              >
                {/* Artwork Thumbnail */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={rel.coverImage}
                    alt={`${rel.title} Cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase text-zinc-300 border border-zinc-800">
                    {rel.type}
                  </div>
                  {rel.featured && (
                    <div className="absolute top-2 left-2 bg-[#ccff00] text-black px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1.5">
                      <span>{rel.year}</span>
                      {rel.bpm && <span className="tabular-nums">{rel.bpm} BPM</span>}
                    </div>

                    <h4 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors truncate">
                      {rel.title}
                    </h4>

                    {rel.collaborators && (
                      <p className="text-xs text-zinc-400 mt-1 truncate">
                        ft. {rel.collaborators.join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="text-[11px] text-zinc-400 group-hover:text-white transition-colors">
                      INSPECT TRACK
                    </span>
                    <a
                      href={rel.spotifyWebUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:text-[#ccff00] transition-colors"
                      title="Open in Spotify"
                      aria-label={`Open ${rel.title} in Spotify`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
