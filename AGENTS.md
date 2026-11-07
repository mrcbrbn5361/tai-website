# AGENTS.md — TAI Cinematic Experience Architecture & Guidelines

This document governs the engineering standards, animation choreography, visual direction, and performance requirements for the official digital universe of Turkish underground rap artist **TAI**.

## Mandatory Operating Instructions for Coding Agents

1. **Read All Relevant Skills First**: Before implementing or extending any feature, inspect and adhere to the specialized skills located in `.agents/skills/`:
   - `.agents/skills/tai-visual-direction/SKILL.md` (Art direction, palette, typography, texture)
   - `.agents/skills/gsap-cinematic-animation/SKILL.md` (GSAP ScrollTrigger, timelines, cinematic entrances)
   - `.agents/skills/motion-react/SKILL.md` (Motion for React micro-interactions, layout springs)
   - `.agents/skills/threejs-webgl/SKILL.md` (React Three Fiber, isolated Canvas, shaders, fallbacks)
   - `.agents/skills/motion-performance-accessibility/SKILL.md` (Reduced motion, mobile budget, cleanup)

2. **Strict Animation Separation**:
   - Never attach both GSAP and Motion animations to the same DOM element.
   - GSAP handles macroscopic choreography: hero reveals, scroll-driven timelines, pinned storytelling, image parallax, marquee tickers.
   - Motion for React handles microscopic UI: button magnetic taps, modal scale transitions, drawer toggles, hover springs.

3. **No Unnecessary Animation Libraries**:
   - Stick strictly to `gsap` (+ `@gsap/react`), `motion/react`, and `three` / `@react-three/fiber` / `@react-three/drei`.
   - Do not install framer-motion (deprecated), anime.js, locomotive-scroll, or scroll-hijacking tools.

4. **Visual Consistency Across All Modules**:
   - Backgrounds: `#050505` (void), `#0D0D0D` / `#101010` (graphite surface).
   - Accents: Cyber fluorescent lime `#CCFF00` and burnished chrome/silver `#B8B8B8`.
   - Analog grain, scanline vignette, high-contrast monospace & condensed display typography.

5. **Phase-by-Phase Verification**:
   - Verify TypeScript compilation, lint checks, and browser layout integrity after each major module.
   - Prevent any memory leaks by cleaning up GSAP `ctx.revert()` and disposing of WebGL geometries and textures upon unmount.

6. **Real Interactive Functionality**:
   - Never replace functional components with static mockups or dead buttons.
   - Audio visualizer, release preview playback, modal video player, track filter, and Spotify deep-links must be fully operational.

7. **Clean Modular Architecture**:
   - Single source of truth for all artist and discography data in `src/data/`.
   - Keep 3D components dynamic or isolated in client leaves to keep the application fast and resilient.
