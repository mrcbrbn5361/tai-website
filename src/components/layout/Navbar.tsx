"use client";

import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { ARTIST_DATA } from "@/src/data/artist";

interface NavbarProps {
  onPlayBeats?: () => void;
  isPlaying?: boolean;
}

export function Navbar({ onPlayBeats, isPlaying }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#hero"
          className="text-2xl font-black tracking-tighter text-zinc-100 hover:text-[#ccff00] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>TAI</span>
          <span className="text-[#ccff00] text-xs font-mono font-normal tracking-widest uppercase">
            / TR
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <a
            href="#music"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Discography
          </a>
          <a
            href="#videos"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Archive
          </a>
          <a
            href="#about"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Identity
          </a>
          <a
            href="#sound"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Frequency
          </a>
          <a
            href="#contact"
            className="hover:text-zinc-100 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Connect
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={ARTIST_DATA.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-mono font-medium text-black bg-[#ccff00] hover:bg-[#b8e600] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>SPOTIFY ARTIST</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#090909] px-6 py-6 flex flex-col gap-4 font-mono text-sm tracking-wider">
          <a
            href="#music"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-[#ccff00] py-1"
          >
            DISCOGRAPHY
          </a>
          <a
            href="#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-[#ccff00] py-1"
          >
            VIDEO ARCHIVE
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-[#ccff00] py-1"
          >
            ARTIST IDENTITY
          </a>
          <a
            href="#sound"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-[#ccff00] py-1"
          >
            FREQUENCY LAB
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-[#ccff00] py-1"
          >
            CONNECT & INQUIRIES
          </a>

          <div className="pt-2 border-t border-zinc-800">
            <a
              href={ARTIST_DATA.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-center text-xs font-mono font-medium text-black bg-[#ccff00] hover:bg-[#b8e600] flex items-center justify-center gap-2"
            >
              <span>LISTEN ON SPOTIFY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
