"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ChromeArtifactProps {
  bassEnergy?: number;
  mousePos?: { x: number; y: number };
}

export function ChromeArtifact({ bassEnergy = 0, mousePos = { x: 0, y: 0 } }: ChromeArtifactProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating and mouse responsiveness
      const targetRotX = mousePos.y * 0.4 + Math.sin(t * 0.5) * 0.1;
      const targetRotY = mousePos.x * 0.5 + t * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);

      // Bass scale bump
      const baseScale = 1.0 + (bassEnergy * 0.35);
      const targetScale = new THREE.Vector3(baseScale, baseScale, baseScale);
      groupRef.current.scale.lerp(targetScale, 0.2);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.z = t * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = -t * 0.25;
      ringRef.current.rotation.y = t * 0.4;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Brutalist Chrome Icosahedron */}
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          metalness={0.96}
          roughness={0.12}
          color="#d4d4d8"
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Orbiting Chrome Industrial Torus Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.04, 16, 64]} />
        <meshStandardMaterial
          metalness={0.98}
          roughness={0.08}
          color="#f4f4f5"
          emissive="#ccff00"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Outer Angular Halo */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[2.4, 0]} />
        <meshBasicMaterial
          wireframe
          color="#b8b8b8"
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}
