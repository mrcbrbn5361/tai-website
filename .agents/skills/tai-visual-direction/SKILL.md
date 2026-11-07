---
name: tai-visual-direction
description: Art direction, typography, palette, texture, and underground music video aesthetics for TAI
---

# TAI Visual Direction & Art Direction Guide

## 1. Aesthetic DNA
TAI represents contemporary Turkish underground rap with cinematic atmosphere, heavy basslines, gritty urban realism, and sharp metallic industrial styling. The website translates this identity into a dark, visceral, editorial digital playground.

## 2. Color Palette & Lighting Hierarchy
- **Canvas Void**: `#050505` (deep pitch black)
- **Graphite Surfaces**: `#0D0D0D` (cards and media backplates), `#141414` (hairline borders)
- **Primary Typography**: `#F5F5F5` (crisp bone white)
- **Secondary Typography**: `#929292` (muted neutral concrete)
- **Metallic Chrome**: `#B8B8B8` (specular reflections, chrome badges, brushed steel)
- **Fluorescent Accent**: `#CCFF00` (acid electric lime — used strictly for high-priority accents: active track indicators, play trigger, sound wave highlights)

## 3. Typographic Systems
- **Display / Brand Face**: Bold, condensed, unapologetic geometric grotesque (e.g., `font-sans uppercase tracking-tighter`). Massive scale for hero headlines (`text-7xl sm:text-9xl md:text-[14vw] font-black leading-[0.85]`).
- **Body & Editorial**: Neutral, high-legibility sans (`tracking-normal leading-relaxed text-zinc-300`).
- **Data & Telemetry**: Monospace (`font-mono text-xs uppercase tracking-widest text-zinc-400`). All track times and catalog IDs must use `tabular-nums`.

## 4. Texture & Analog Distortion
- **SVG Film Grain**: Lightweight SVG noise filter overlay with subtle opacity (`opacity-[0.045] pointer-events-none`).
- **Scanline & Vignette**: Radial dark gradient falloff at edges and subtle 1px horizontal raster lines.
- **Spotlight Glow**: Subtle radial gradient following the cursor on desktop (`radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(204,255,0,0.06), transparent 70%)`).
- **Chromatic Glitch & Hover Displacements**: Controlled CSS skew and glitch offsets triggered on hover over key release art and headers.

## 5. Anti-Slop Discipline
- No generic SaaS cards with 16px border-radius and pastel glow.
- Sharp or micro-rounded geometry (`rounded-none` or `rounded-sm`).
- No empty mockups or dead buttons. Real links to verified Spotify artist profile (`https://open.spotify.com/artist/5dFeNfQoaHSqzgS8tyXVKR`).
