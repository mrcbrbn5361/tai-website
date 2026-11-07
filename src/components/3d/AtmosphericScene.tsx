"use client";

import { Suspense, useState, useEffect, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { ChromeArtifact } from "./ChromeArtifact";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

interface AtmosphericSceneProps {
  bassEnergy?: number;
  mousePos?: { x: number; y: number };
}

function FallbackBackdrop() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-72 h-72 rounded-full border border-zinc-800 bg-radial from-zinc-800/30 via-zinc-950/20 to-transparent animate-pulse" />
    </div>
  );
}

function SceneInner({ bassEnergy, mousePos }: AtmosphericSceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.8}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -4, -3]}
        intensity={0.6}
        color="#888888"
      />
      <pointLight
        position={[0, 2, 2]}
        intensity={0.8}
        color="#ccff00"
        distance={6}
      />
      <ChromeArtifact bassEnergy={bassEnergy} mousePos={mousePos} />
      <ParticleField count={180} bassEnergy={bassEnergy} />
    </>
  );
}

export const AtmosphericScene = memo(function AtmosphericScene({
  bassEnergy = 0,
  mousePos = { x: 0, y: 0 }
}: AtmosphericSceneProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
    // Probe for WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  if (!hasMounted) {
    return <FallbackBackdrop />;
  }

  if (!webGlSupported || reducedMotion) {
    return <FallbackBackdrop />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <Suspense fallback={<FallbackBackdrop />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          className="w-full h-full"
        >
          <SceneInner bassEnergy={bassEnergy} mousePos={mousePos} />
        </Canvas>
      </Suspense>
    </div>
  );
});
