"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Square, ArrowDown, Disc3, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtmosphericScene } from "@/src/components/3d/AtmosphericScene";
import { ARTIST_DATA } from "@/src/data/artist";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

interface HeroSectionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  bassEnergy: number;
}

export function HeroSection({ isPlaying, onTogglePlay, bassEnergy }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  // Mouse move handler for spotlight and 3D parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });

    if (containerRef.current) {
      containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance reveal timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(".hero-char", {
        yPercent: 100,
        opacity: 0,
        skewY: 6,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      }, "-=0.6");

      tl.from(".hero-actions", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Parallax scroll on background image
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#050505] pt-12 pb-16 px-4 sm:px-8 border-b border-white/[0.08]"
      style={{
        background: `radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(204, 255, 0, 0.05), transparent 70%)`
      }}
    >
      {/* Background Image Layer with Parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-luminosity scale-105"
      >
        <Image
          src="/images/hero-atmosphere.jpg"
          alt="TAI Underground Stage Atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
      </div>

      {/* Atmospheric 3D Canvas Layer */}
      <AtmosphericScene bassEnergy={bassEnergy} mousePos={mousePos} />

      {/* Film Grain & Scanlines */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Top Meta Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400">
        <div className="hero-sub flex items-center gap-2">
          <span className="text-[#ccff00]">●</span>
          <span>ISTANBUL UNDERGROUND AXIS</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span>EST. 2021</span>
        </div>
        <div className="hero-sub hidden sm:flex items-center gap-2">
          <span>CATALOG: KVPSUL · OSCAR · JUNGE</span>
        </div>
      </div>

      {/* Center Dominant Typography */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto text-center py-12">
        <div className="hero-sub text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 mb-4">
          NEW WAVE TURKISH RAP / RAGE & HYPER-TRAP
        </div>

        <div className="overflow-hidden">
          <h1
            ref={headlineRef}
            className="text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] font-black tracking-tighter leading-[0.8] select-none uppercase font-sans text-white flex items-center justify-center gap-1 sm:gap-2"
          >
            <span className="hero-char inline-block">T</span>
            <span className="hero-char inline-block">A</span>
            <span className="hero-char inline-block text-[#ccff00] underline decoration-4 underline-offset-8">
              I
            </span>
          </h1>
        </div>

        <p className="hero-sub max-w-2xl mx-auto mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed text-balance">
          Distorted 808s, raw midnight realism, and metallic sonic architecture. 
          No industry concessions. Built from the underground out.
        </p>

        {/* Hero Interactive CTAs */}
        <div className="hero-actions mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onTogglePlay}
            className={`px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2.5 cursor-pointer ${
              isPlaying
                ? "bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                : "bg-white text-black hover:bg-[#ccff00] hover:text-black"
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>HALT 808 FREQUENCY</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>EXPERIENCE SOUNDSCAPE</span>
              </>
            )}
          </button>

          <a
            href="#music"
            className="px-6 py-3.5 text-xs font-mono font-medium tracking-wider uppercase text-zinc-300 border border-zinc-700 hover:border-zinc-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <Disc3 className="w-4 h-4 text-zinc-400" />
            <span>EXPLORE DISCOGRAPHY</span>
          </a>

          <a
            href={ARTIST_DATA.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3.5 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-[#ccff00] transition-colors flex items-center gap-1.5"
          >
            <span>SPOTIFY PROFILE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom KPI & Scroll Anchor */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-4 sm:gap-8">
          <div>
            <span className="text-zinc-500">FORMAT:</span>{" "}
            <span className="text-zinc-200">EP / SINGLES</span>
          </div>
          <div>
            <span className="text-zinc-500">PRODUCTION:</span>{" "}
            <span className="text-zinc-200">EVRENESI / JUNGE</span>
          </div>
          <div className="hidden md:block">
            <span className="text-zinc-500">SOUND:</span>{" "}
            <span className="text-[#ccff00]">808 HEAVY / 148 BPM</span>
          </div>
        </div>

        <a
          href="#music"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#ccff00] transition-colors cursor-pointer"
          aria-label="Scroll down to music section"
        >
          <span>SCROLL DISCOGRAPHY</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
