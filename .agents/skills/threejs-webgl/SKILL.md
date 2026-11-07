---
name: threejs-webgl
description: Instructions for isolated Three.js and React Three Fiber atmospheric scenes, procedural geometry, and fallbacks
---

# Three.js & WebGL Visual Guidelines

## 1. Role in TAI Experience
Three.js creates atmospheric underground depth: floating metallic chrome shards, dark spatial dust, reactive frequency particles, and volumetric spotlight cones. It amplifies the artist's brand without ever blocking content readability or site navigation.

## 2. Key Technical Directives
- **Isolated Client-Only Canvas**: Always mount in a Client Component with dynamic import `ssr: false` or client mount guard.
- **Graceful WebGL Fallback**: If WebGL is unsupported or errors out, render an evocative CSS animated radial gradient and particle overlay seamlessly.
- **Render-On-Demand or Throttled Animation Loop**:
  - Keep particle count light (150–400 points on desktop, 80 on mobile).
  - Use `requestAnimationFrame` with delta time.
  - Zero allocation inside the render tick: pre-allocate `Vector3`, `Matrix4`, and temporary buffers outside the loop.
- **Procedural PBR Chrome & Metals**:
  - `MeshStandardMaterial` or `MeshPhysicalMaterial` with `metalness: 0.9`, `roughness: 0.15`, and environmental lighting.
  - Procedural geometric sculptures (distorted icosahedron, metallic chrome rings, floating audio prisms).
- **Cleanup on Unmount**:
  - Recursively dispose geometries, materials, and textures in `useEffect` cleanup.
