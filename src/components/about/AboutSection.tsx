"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { ARTIST_DATA } from "@/src/data/artist";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ccff00] mb-2">
        <span>03</span>
        <span aria-hidden="true">/</span>
        <span>ARTIST IDENTITY</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans mb-12">
        THE ARCHITECTURE
      </h2>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Manifesto & Portrait Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative aspect-4/5 w-full bg-[#0c0c0c] border border-zinc-800 overflow-hidden group">
            <Image
              src="/images/hero-atmosphere.jpg"
              alt="TAI Underground Stage Performance"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/85 backdrop-blur-md border border-zinc-800">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#ccff00] block mb-1">
                ORIGIN & JURISDICTION
              </span>
              <p className="text-sm font-bold text-white uppercase">
                {ARTIST_DATA.origin}
              </p>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="p-6 bg-[#0c0c0c] border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <span className="text-zinc-500">ARTIST:</span>
              <span className="text-white font-bold">{ARTIST_DATA.name} ({ARTIST_DATA.alias})</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <span className="text-zinc-500">GENRE:</span>
              <span className="text-zinc-200">{ARTIST_DATA.genre}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">COLLABORATORS:</span>
              <span className="text-[#ccff00]">{ARTIST_DATA.notableCollaborators.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Right: Editorial Text & Statistics */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="p-6 sm:p-8 bg-[#0c0c0c] border border-zinc-800 mb-8 relative">
              <Quote className="w-8 h-8 text-[#ccff00]/40 mb-4" />
              <p className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight leading-relaxed italic">
                "{ARTIST_DATA.manifesto}"
              </p>
            </div>

            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
              {ARTIST_DATA.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* KPI Data Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-800/80">
            {ARTIST_DATA.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-[#090909] border border-zinc-800/80">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  {stat.label}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
