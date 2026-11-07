"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progressVal, setProgressVal] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Animate progress value smoothly from 0 to 100 in 1.4s
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = Math.round(progressObj.value);
          setProgressVal(current);
          if (counterRef.current) {
            counterRef.current.innerText = `${current}%`;
          }
        }
      });

      // Stagger letter reveals
      tl.fromTo(
        ".intro-char",
        { y: 80, opacity: 0, skewY: 10 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power4.out"
        },
        "-=1.2"
      );

      // Flash glitch pulse on full load
      tl.to(
        textRef.current,
        {
          scale: 1.05,
          color: "#ccff00",
          duration: 0.15,
          yoyo: true,
          repeat: 1
        },
        "+=0.1"
      );

      // Curtain slide up wipe
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut"
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#f5f5f5] select-none overflow-hidden"
    >
      {/* Film grain and scanlines */}
      <div className="absolute inset-0 film-grain pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 font-mono text-xs text-zinc-500 hover:text-[#ccff00] uppercase tracking-widest transition-colors cursor-pointer"
        aria-label="Skip introductory animation"
      >
        [ SKIP INTRO ]
      </button>

      {/* Main Cinematic Title */}
      <div className="relative text-center px-4 overflow-hidden">
        <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-zinc-400 mb-3">
          TURKISH UNDERGROUND ARCHITECTURE
        </div>
        <h1
          ref={textRef}
          className="text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tighter leading-none flex items-center justify-center gap-1 font-sans"
        >
          <span className="intro-char inline-block">T</span>
          <span className="intro-char inline-block">A</span>
          <span className="intro-char inline-block text-[#ccff00]">I</span>
        </h1>
        <p className="mt-4 text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
          KVPSUL · OSCAR · JUNGE
        </p>
      </div>

      {/* Bottom Progress Meter */}
      <div className="absolute bottom-12 w-full max-w-xs px-6">
        <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 mb-2">
          <span>INITIALIZING CORE</span>
          <span ref={counterRef} className="tabular-nums text-[#ccff00]">
            {progressVal}%
          </span>
        </div>
        <div className="w-full h-0.5 bg-zinc-800 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-[#ccff00] transition-all duration-75"
            style={{ width: `${progressVal}%` }}
          />
        </div>
      </div>
    </div>
  );
}
