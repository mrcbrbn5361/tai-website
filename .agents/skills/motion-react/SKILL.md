---
name: motion-react
description: Guidelines for Motion for React micro-interactions, layout transitions, and interactive components
---

# Motion for React Component Interaction Guide

## 1. Scope & Package Import
Always import from `motion/react`:
```typescript
import { motion, AnimatePresence } from "motion/react";
```
Do NOT import from `framer-motion`.

## 2. When to Use Motion vs GSAP
- **Motion**: Micro-interactions, button hover states, magnetic spring pull, modal dialogues, drawer expansions, audio visualizer bar heights, tab switches, dropdown states.
- **GSAP**: Macro-timeline orchestration, multi-section scroll scrub, and complex pinned storytelling.
- **Rule**: Never nest or mix GSAP tweens directly on the same DOM element animated by `motion.*`.

## 3. Recommended Spring Configurations
- **Crisp UI Snapping**: `{ type: "spring", stiffness: 400, damping: 30 }`
- **Fluid Metallic Glide**: `{ type: "spring", stiffness: 220, damping: 25 }`
- **Dramatic Modal Pop**: `{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }`

## 4. AnimatePresence Discipline
- Always supply unique, stable `key` props to direct children of `<AnimatePresence>`.
- Use `mode="wait"` when switching single-item cards or tabs to prevent double-height layout jumps.
- Include `exit` definitions for graceful fade and translate down.
