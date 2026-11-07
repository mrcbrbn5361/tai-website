"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface AudioEngineState {
  isPlaying: boolean;
  activeTrackTitle: string;
  volume: number;
  bpm: number;
  frequencyData: Uint8Array;
  averageFrequency: number;
  bassEnergy: number;
}

export function useAudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const tracks = [
    { title: "KVPSUL BASS ARCHITECTURE", bpm: 148, baseFreq: 45 },
    { title: "TURUNCU TESLA 808 DRIVE", bpm: 152, baseFreq: 50 },
    { title: "CH DENIM CHROME BEAT", bpm: 142, baseFreq: 42 }
  ];

  // Initialize Web Audio Context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // 32 frequency bins, ideal for fast visualizer
      const gainNode = ctx.createGain();
      gainNode.gain.value = volume;

      analyser.connect(gainNode);
      gainNode.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gainNode;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  }, [volume]);

  // Synthetic Beat Generator: creates a real underground rage trap pattern
  const playBeatStep = useCallback((step: number, baseFreq: number) => {
    const ctx = audioContextRef.current;
    const analyser = analyserRef.current;
    if (!ctx || !analyser) return;

    const now = ctx.currentTime;

    // Kick / 808 Sub-bass on steps 0, 4, 8, 11, 14
    const is808 = step % 4 === 0 || step === 11 || step === 14;
    if (is808) {
      const osc = ctx.createOscillator();
      const bassGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * 2.5, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.12);

      bassGain.gain.setValueAtTime(0.85, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      // Distortion wave shaper for authentic rage aesthetic
      const waveShaper = ctx.createWaveShaper();
      const n = 256;
      const curve = new Float32Array(n);
      const k = 18;
      for (let i = 0; i < n; i++) {
        const x = (i * 2) / n - 1;
        curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
      }
      waveShaper.curve = curve;

      osc.connect(bassGain);
      bassGain.connect(waveShaper);
      waveShaper.connect(analyser);

      osc.start(now);
      osc.stop(now + 0.4);
    }

    // Snare / Clap on beats 4 and 12
    if (step === 4 || step === 12) {
      const snareOsc = ctx.createOscillator();
      const snareGain = ctx.createGain();
      snareOsc.type = "triangle";
      snareOsc.frequency.setValueAtTime(190, now);
      snareOsc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

      snareGain.gain.setValueAtTime(0.5, now);
      snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      snareOsc.connect(snareGain);
      snareGain.connect(analyser);

      snareOsc.start(now);
      snareOsc.stop(now + 0.2);
    }

    // Hi-hat roll on every 16th step with accent
    const hatOsc = ctx.createOscillator();
    const hatGain = ctx.createGain();
    hatOsc.type = "sawtooth";
    hatOsc.frequency.setValueAtTime(7000 + Math.random() * 2000, now);

    const isAccent = step % 2 === 0;
    hatGain.gain.setValueAtTime(isAccent ? 0.08 : 0.035, now);
    hatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    hatOsc.connect(hatGain);
    hatGain.connect(analyser);

    hatOsc.start(now);
    hatOsc.stop(now + 0.045);
  }, []);

  const startPlayback = useCallback(() => {
    initAudio();
    setIsPlaying(true);
  }, [initAudio]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  // Scheduler Loop
  useEffect(() => {
    if (!isPlaying) return;

    const track = tracks[activeTrackIndex];
    // 16th notes interval = (60 / bpm) / 4 seconds
    const intervalMs = ((60 / track.bpm) / 4) * 1000;
    let step = 0;

    const id = window.setInterval(() => {
      playBeatStep(step, track.baseFreq);
      step = (step + 1) % 16;
    }, intervalMs);

    timerRef.current = id;

    return () => {
      window.clearInterval(id);
    };
  }, [isPlaying, activeTrackIndex, playBeatStep]);

  // Handle Volume Change
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        volume,
        audioContextRef.current.currentTime,
        0.05
      );
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Helper function to extract current frequency data
  const getFrequencySnapshot = useCallback((): {
    data: Uint8Array;
    average: number;
    bass: number;
  } => {
    if (!analyserRef.current || !dataArrayRef.current) {
      const mock = new Uint8Array(32);
      return { data: mock, average: 0, bass: 0 };
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
    const data = dataArrayRef.current;
    let sum = 0;
    let bassSum = 0;
    const bassBins = Math.min(6, data.length);

    for (let i = 0; i < data.length; i++) {
      sum += data[i];
      if (i < bassBins) bassSum += data[i];
    }

    const average = sum / data.length / 255;
    const bass = bassSum / bassBins / 255;

    return { data, average, bass };
  }, []);

  const nextTrack = useCallback(() => {
    setActiveTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  return {
    isPlaying,
    activeTrack: tracks[activeTrackIndex],
    trackIndex: activeTrackIndex,
    tracks,
    volume,
    setVolume,
    togglePlay,
    startPlayback,
    stopPlayback,
    nextTrack,
    getFrequencySnapshot
  };
}
