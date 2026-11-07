---
name: motion-performance-accessibility
description: Reduced motion compliance, mobile optimizations, performance budgets, and accessibility
---

# Motion Performance & Accessibility Guidelines

## 1. Accessibility First
- **`prefers-reduced-motion` Compliance**:
  - Detect `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - When active, cancel GSAP parallax scrubs, kill 3D rotation loops, and render content in its final static state without motion triggers.
- **Screen Reader Support**:
  - All interactive buttons have descriptive `aria-label` tags (e.g. `aria-label="Play track preview for..."`, `aria-label="Open video modal"`).
  - High contrast text (`text-zinc-100` on `#050505` yields > 14:1 contrast ratio, far exceeding WCAG AAA).

## 2. Mobile Performance Budget
- Detect mobile screen widths (< 768px):
  - Disable heavy 3D mesh distortion or lower segment count to low poly.
  - Cut particle count in half.
  - Disable cursor-tracking spotlights (touch devices do not have hover cursors).
  - Use touch-friendly touch targets ($\ge 44\text{px}$).

## 3. Web Audio & Non-Intrusive Playback
- **Never Autoplay Audio**: Browsers block it and users hate it. Audio only triggers upon intentional click on the preview player.
- **Web Audio API Synth / Sound Engine**: Use procedural synthesizers or clean audio buffers for previews and visualizer waveforms without cross-origin iframe security issues.
