"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Sparkles, Clapperboard, MonitorPlay, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VIDEOS_DATA, VideoArchiveItem } from "@/src/data/videos";

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoArchiveItem | null>(null);

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ccff00] mb-2">
            <span>02</span>
            <span aria-hidden="true">/</span>
            <span>CINEMATOGRAPHY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
            VISUAL ARCHIVE
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            Anamorphic frames, midnight runs, brutalist architecture, and analog VHS tape documentation from TAI's visual universe.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
          <Clapperboard className="w-4 h-4 text-[#ccff00]" />
          <span>4K DIGITAL MASTER / 35MM GRAIN</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {VIDEOS_DATA.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group relative cursor-pointer bg-[#0c0c0c] border border-zinc-800/80 hover:border-[#ccff00]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Tag metadata */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-black/80 text-zinc-300 border border-zinc-800 backdrop-blur-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 text-[11px] font-mono tabular-nums px-2 py-0.5 bg-black/85 text-[#ccff00] border border-zinc-800 z-10">
                {video.duration}
              </div>

              {/* Custom Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-black/70 border border-zinc-700 group-hover:border-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-xl backdrop-blur-xs">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>

            {/* Video Meta Info */}
            <div className="p-6">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>{video.year}</span>
                <span>DIR. {video.director}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                {video.title}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                {video.subtitle}
              </p>
              <p className="text-sm text-zinc-300 mt-3 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-5xl bg-[#090909] border border-zinc-800 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#ccff00]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                    {activeVideo.title} · {activeVideo.year}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-800 transition-colors cursor-pointer"
                  aria-label="Close video player modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Display Container */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  fill
                  className="object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Atmospheric VHS / Anamorphic playback overlay */}
                <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />
                <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

                <div className="relative z-10 text-center px-6 py-12 max-w-lg bg-black/85 border border-zinc-800 p-8 backdrop-blur-md">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#ccff00] text-black flex items-center justify-center">
                    <MonitorPlay className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                    {activeVideo.title}
                  </h4>
                  <p className="text-xs font-mono text-[#ccff00] mb-4 uppercase">
                    DIR. {activeVideo.director} · {activeVideo.duration}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                    {activeVideo.description}
                  </p>

                  <a
                    href={`https://www.youtube.com/results?search_query=tai+${encodeURIComponent(activeVideo.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#b8e600] transition-colors"
                  >
                    <span>WATCH ON OFFICIAL YOUTUBE</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 bg-[#090909] border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>FORMAT: 4K ANAMORPHIC MASTER</span>
                <span className="text-[#ccff00]">AUDIO: LOSSLESS 24-BIT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
