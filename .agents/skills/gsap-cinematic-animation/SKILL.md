---
name: gsap-cinematic-animation
description: Standards for GSAP timelines, ScrollTrigger, typography reveals, and cinematic choreography
---

# GSAP Cinematic Animation System

## 1. Principles
GSAP is the macro-director of the experience. It drives time-sequenced entrances, scroll-anchored reveals, scrubbed parallax layers, and text split reveals.

## 2. Setup & React Integration
Always register GSAP plugins safely on client mount:
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
```

## 3. Best Practices & Memory Management
- **Scope with `useGSAP` or `gsap.context`**: Always encapsulate timeline creation inside a ref container so all triggers and tweens are automatically reverted when unmounted:
  ```typescript
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    // GSAP animations here
  }, { scope: containerRef });
  ```
- **Never Hijack Native Scrolling**: Native wheel and touch momentum must remain intact.
- **ScrollTrigger Refresh**: Refresh ScrollTrigger after dynamic asset loads or layout state changes: `ScrollTrigger.refresh()`.
- **Pre-allocation & Compositor Properties**: Animate `x`, `y`, `xPercent`, `yPercent`, `scale`, `opacity`, `clipPath`, and `rotation`. Never animate `width`, `height`, `top`, `left`, or `margin`.

## 4. Specific Choreographies
- **Intro Loading Sequence**: Blackout veil, TAI letter stagger reveal, progress counter `0% -> 100%`, scale explosion, and seamless curtain raise revealing Hero.
- **Hero Title Split / Cascade**: Massive letters slide up from an inverted clip path with slight rotation and stagger (`stagger: 0.08, ease: "power4.out"`).
- **Parallax Artwork**: Background layers translate at `yPercent: -20`, while foreground elements translate at `yPercent: -5` on scroll scrub.
- **Horizontal Archive Marquee**: Continuous seamless translation loop using GSAP quickSetter or infinite tween.
