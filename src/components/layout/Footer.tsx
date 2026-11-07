"use client";

import { ARTIST_DATA } from "@/src/data/artist";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-base tracking-tighter">
            TAI
          </span>
          <span className="text-zinc-600">/</span>
          <span>ISTANBUL UNDERGROUND MOVEMENT</span>
          <span className="text-zinc-600">/</span>
          <span>JUNGE</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider">
          <a
            href={ARTIST_DATA.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ccff00] transition-colors"
          >
            Spotify
          </a>
          <a
            href="https://www.instagram.com/tai.jungeofficial/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ccff00] transition-colors"
          >
            Instagram
          </a>
          <a href="#hero" className="hover:text-white transition-colors">
            Return to Top ↑
          </a>
        </div>

        <div className="text-zinc-400 text-[11px]">
          &copy; {new Date().getFullYear()} TAI. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
