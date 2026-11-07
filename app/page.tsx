"use client";

import { useState, useCallback } from "react";
import { CinematicLoader } from "@/src/components/intro/CinematicLoader";
import { Navbar } from "@/src/components/layout/Navbar";
import { HeroSection } from "@/src/components/hero/HeroSection";
import { MusicSection } from "@/src/components/music/MusicSection";
import { VideoSection } from "@/src/components/videos/VideoSection";
import { AboutSection } from "@/src/components/about/AboutSection";
import { FrequencyLab } from "@/src/components/sound/FrequencyLab";
import { ContactSection } from "@/src/components/contact/ContactSection";
import { Footer } from "@/src/components/layout/Footer";
import { AudioControlDock } from "@/src/components/audio/AudioControlDock";
import { useAudioVisualizer } from "@/src/hooks/useAudioVisualizer";

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [bassEnergy, setBassEnergy] = useState(0);

  const {
    isPlaying,
    activeTrack,
    trackIndex,
    tracks,
    volume,
    setVolume,
    togglePlay,
    startPlayback,
    nextTrack,
    getFrequencySnapshot
  } = useAudioVisualizer();

  const handlePreviewTrack = useCallback(
    (title: string, bpm?: number) => {
      startPlayback();
    },
    [startPlayback]
  );

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#ccff00] selection:text-black relative">
      {/* Cinematic Intro Sequence (Plays once on first arrival) */}
      {!introFinished && (
        <CinematicLoader onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Experience Container */}
      <div className={`transition-opacity duration-700 ${introFinished ? "opacity-100" : "opacity-0"}`}>
        {/* Navigation */}
        <Navbar onPlayBeats={togglePlay} isPlaying={isPlaying} />

        {/* Hero Section */}
        <HeroSection
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          bassEnergy={bassEnergy}
        />

        {/* Music / Discography */}
        <MusicSection
          onPlayPreviewTrack={handlePreviewTrack}
          activePreviewTitle={activeTrack.title}
          isPlayingPreview={isPlaying}
        />

        {/* Visual Archive / Music Videos */}
        <VideoSection />

        {/* About TAI / Identity */}
        <AboutSection />

        {/* Frequency Lab & Sub-bass Test */}
        <FrequencyLab
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          activeTrack={activeTrack}
          tracks={tracks}
          onSelectTrack={(idx) => {
            if (idx !== trackIndex) nextTrack();
          }}
          currentTrackIndex={trackIndex}
          bassEnergy={bassEnergy}
        />

        {/* Contact & Official Dispatch */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Collapsible Audio Control Dock */}
        <AudioControlDock
          isPlaying={isPlaying}
          activeTrack={activeTrack}
          volume={volume}
          onTogglePlay={togglePlay}
          onNextTrack={nextTrack}
          onVolumeChange={setVolume}
          getFrequencySnapshot={getFrequencySnapshot}
          onBassEnergyUpdate={setBassEnergy}
        />
      </div>
    </main>
  );
}
