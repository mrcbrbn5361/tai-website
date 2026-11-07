"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Square, Volume2, VolumeX, SkipForward, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ARTIST_DATA } from "@/src/data/artist";

interface AudioControlDockProps {
  isPlaying: boolean;
  activeTrack: { title: string; bpm: number; baseFreq: number };
  volume: number;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onVolumeChange: (vol: number) => void;
  getFrequencySnapshot: () => { data: Uint8Array; average: number; bass: number };
  onBassEnergyUpdate?: (bass: number) => void;
}

export function AudioControlDock({
  isPlaying,
  activeTrack,
  volume,
  onTogglePlay,
  onNextTrack,
  onVolumeChange,
  getFrequencySnapshot,
  onBassEnergyUpdate
}: AudioControlDockProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bars, setBars] = useState<number[]>([15, 30, 20, 45, 60, 25, 40, 50, 35, 20, 15, 10]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const { data, bass } = getFrequencySnapshot();

      if (onBassEnergyUpdate) {
        onBassEnergyUpdate(bass);
      }

      // Update 12 bar heights
      if (isPlaying) {
        const step = Math.floor(data.length / 12);
        const newBars: number[] = [];
        for (let i = 0; i < 12; i++) {
          const val = data[i * step] || 0;
          // Scale from 0-255 to percentage 10-100%
          const pct = Math.max(12, Math.min(100, (val / 255) * 100));
          newBars.push(pct);
        }
        setBars(newBars);
      } else {
        // Subtle ambient idle breathing
        const time = Date.now() * 0.003;
        setBars((prev) =>
          prev.map((_, i) => 12 + Math.sin(time + i * 0.5) * 8)
        );
      }

      // Draw minimal mini-oscilloscope if canvas present
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const width = canvasRef.current.width;
          const height = canvasRef.current.height;
          ctx.clearRect(0, 0, width, height);

          ctx.lineWidth = 1.5;
          ctx.strokeStyle = isPlaying ? "#ccff00" : "#555555";
          ctx.beginPath();

          const sliceWidth = width / (data.length || 32);
          let x = 0;

          for (let i = 0; i < (data.length || 32); i++) {
            const v = isPlaying ? data[i] / 255.0 : 0.5 + Math.sin(Date.now() * 0.005 + i * 0.3) * 0.15;
            const y = height - v * height;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, getFrequencySnapshot, onBassEnergyUpdate]);

  return (
    <div
      role="region"
      aria-label="Audio Visualizer and Player"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 pointer-events-auto"
    >
      <div className="relative bg-[#0c0c0c]/90 backdrop-blur-md border border-zinc-800 shadow-2xl transition-all duration-300">
        {/* Toggle Collapse Tab */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -top-7 right-4 bg-[#0c0c0c] border-t border-x border-zinc-800 px-3 py-1 text-[11px] font-mono tracking-widest text-zinc-400 hover:text-[#ccff00] flex items-center gap-1.5 transition-colors cursor-pointer"
          aria-label={isCollapsed ? "Expand audio console" : "Collapse audio console"}
        >
          <span>{isCollapsed ? "EXPAND SOUND" : "MINIMIZE"}</span>
          {isCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <AnimatePresence initial={false}>
          {!isCollapsed ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-3.5 sm:p-4 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Track Info & Visualizer Bars */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={onTogglePlay}
                    className={`w-11 h-11 shrink-0 flex items-center justify-center transition-all ${
                      isPlaying
                        ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                        : "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-700"
                    }`}
                    aria-label={isPlaying ? "Stop audio preview" : "Play audio preview"}
                  >
                    {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 bg-[#ccff00]" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                        808 SYNTH ENGINE · {activeTrack.bpm} BPM
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-100 truncate">
                      {activeTrack.title}
                    </p>
                  </div>

                  {/* 12 Interactive Spectrum Bars */}
                  <div
                    className="flex items-end gap-1 h-7 px-2 border-l border-zinc-800/80 shrink-0"
                    aria-hidden="true"
                  >
                    {bars.map((h, i) => (
                      <div
                        key={i}
                        className={`w-1 transition-all duration-75 ${
                          isPlaying ? (i < 4 ? "bg-[#ccff00]" : "bg-zinc-200") : "bg-zinc-700"
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Oscilloscope & Utility Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-zinc-800/80 pt-2.5 sm:pt-0">
                  {/* Mini Oscilloscope canvas */}
                  <canvas
                    ref={canvasRef}
                    width={90}
                    height={28}
                    className="hidden md:block bg-zinc-950/60 border border-zinc-900 rounded-none shrink-0"
                    aria-hidden="true"
                  />

                  {/* Next Beat Preset */}
                  <button
                    onClick={onNextTrack}
                    className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title="Next Sub-bass Preset"
                    aria-label="Next beat preset"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}
                      className="text-zinc-400 hover:text-zinc-100 transition-colors"
                      aria-label={volume === 0 ? "Unmute" : "Mute"}
                    >
                      {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-16 accent-[#ccff00] h-1 bg-zinc-800 cursor-pointer"
                      aria-label="Volume slider"
                    />
                  </div>

                  {/* Direct Spotify Artist Link */}
                  <a
                    href={ARTIST_DATA.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-black bg-[#ccff00] hover:bg-[#b8e600] transition-colors shrink-0"
                  >
                    <span>SPOTIFY</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Minimized Bar */
            <div className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={onTogglePlay}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold transition-all ${
                    isPlaying ? "bg-[#ccff00] text-black" : "bg-zinc-800 text-zinc-300"
                  }`}
                  aria-label={isPlaying ? "Stop audio preview" : "Play audio preview"}
                >
                  {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="text-zinc-500">TAI 808 ·</span>
                  <span className="truncate max-w-[140px] sm:max-w-none">{activeTrack.title}</span>
                </div>
              </div>
              <a
                href={ARTIST_DATA.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-[#ccff00] hover:underline flex items-center gap-1"
              >
                OPEN ARTIST PROFILE
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
