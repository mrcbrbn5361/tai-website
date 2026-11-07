"use client";

import { Play, Square, Activity } from "lucide-react";

interface FrequencyLabProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  activeTrack: { title: string; bpm: number; baseFreq: number };
  tracks: { title: string; bpm: number; baseFreq: number }[];
  onSelectTrack: (index: number) => void;
  currentTrackIndex: number;
  bassEnergy: number;
}

export function FrequencyLab({
  isPlaying,
  onTogglePlay,
  activeTrack,
  tracks,
  onSelectTrack,
  currentTrackIndex,
  bassEnergy
}: FrequencyLabProps) {
  return (
    <section id="sound" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ccff00] mb-2">
            <span>04</span>
            <span aria-hidden="true">/</span>
            <span>SONIC ENGINEERING</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
            FREQUENCY LAB
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            Experience TAI's signature underground 808 sub-bass, wave-shaped distortion, and rhythmic tempo spectrum synthesized live in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Activity className="w-4 h-4 text-[#ccff00]" />
          <span>WEB AUDIO API OSCILLATOR & ANALYSER</span>
        </div>
      </div>

      {/* Main Interactive Studio Console */}
      <div className="bg-[#0b0b0b] border border-zinc-800 p-6 sm:p-10 relative overflow-hidden">
        {/* Glow backdrop */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: isPlaying ? "rgba(204, 255, 0, 0.15)" : "transparent"
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Sound Preset Selector */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-3">
              SELECT FREQUENCY PROFILE
            </span>

            {tracks.map((tr, idx) => (
              <button
                key={tr.title}
                onClick={() => onSelectTrack(idx)}
                className={`w-full text-left p-4 border transition-all cursor-pointer flex items-center justify-between ${
                  currentTrackIndex === idx
                    ? "bg-[#141414] border-[#ccff00] text-white"
                    : "bg-[#090909] border-zinc-800/80 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    <span>PRESET 0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#ccff00]">{tr.bpm} BPM</span>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-tight">
                    {tr.title}
                  </div>
                </div>

                <div className="font-mono text-xs tabular-nums text-zinc-400">
                  {tr.baseFreq} Hz SUB
                </div>
              </button>
            ))}

            {/* Play / Halt Trigger */}
            <div className="pt-4">
              <button
                onClick={onTogglePlay}
                className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isPlaying
                    ? "bg-[#ccff00] text-black shadow-[0_0_25px_rgba(204,255,0,0.5)]"
                    : "bg-white text-black hover:bg-[#ccff00]"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>STOP SOUND EMITTER</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>LAUNCH SYNTH ENGINE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Live Telemetry & Frequency Meter */}
          <div className="lg:col-span-7 bg-[#060606] border border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-6 font-mono text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${isPlaying ? "bg-[#ccff00] animate-ping" : "bg-zinc-600"}`} />
                  <span>SYNTH STATUS: {isPlaying ? "ACTIVE" : "STANDBY"}</span>
                </span>
                <span className="text-zinc-400">SUB-BASS ENERGY: {Math.round(bassEnergy * 100)}%</span>
              </div>

              {/* Dynamic Bass Power Meter */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>808 DISTORTION LEVEL</span>
                  <span className="text-[#ccff00]">{isPlaying ? "DYNAMIC RAGE" : "0 dB"}</span>
                </div>
                <div className="w-full h-3 bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-zinc-600 via-zinc-200 to-[#ccff00] transition-all duration-75"
                    style={{ width: `${isPlaying ? Math.max(20, bassEnergy * 100) : 5}%` }}
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block mb-1">TUNED FREQUENCY</span>
                  <span className="text-white font-bold">{activeTrack.baseFreq} Hz</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">METRONOME</span>
                  <span className="text-white font-bold">{activeTrack.bpm} BPM</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">SYNTHESIS</span>
                  <span className="text-[#ccff00] font-bold">WAVESHAPED SINE</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>ZERO EXTERNAL AUDIO ASSET DEPENDENCY</span>
              <span>100% BROWSER GENERATIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
