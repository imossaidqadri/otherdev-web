// src/lib/styles/effects.ts

import React from 'react'; // Needed for React.CSSProperties

/**
 * Provides style objects for common mix-blend-mode effects.
 * These can be spread into a component's `style` prop.
 *
 * Example usage:
 * <div style={mixBlendModes.difference}>...</div>
 */
export const mixBlendModes = {
  difference: {
    mixBlendMode: 'difference',
    isolation: 'isolate', // isolation is often useful with mix-blend-mode
    willChange: 'transform', // From the original .header-blend-mode
  } as React.CSSProperties,
  // Add other common blend modes if needed, e.g.:
  // screen: { mixBlendMode: 'screen' } as React.CSSProperties,
  // multiply: { mixBlendMode: 'multiply' } as React.CSSProperties,
} as const;

/**
 * Provides a class name for a noise background effect.
 * The CSS class `.noise-bg` and its associated SVG filter (e.g., #noise-bg-fx)
 * must be defined globally for this to work.
 *
 * Example CSS (should be in a global stylesheet):
 * .noise-bg { opacity: 0.2; filter: url(#noise-bg-fx); }
 * And an SVG filter definition like:
 * <svg style="display:none">
 *   <filter id="noise-bg-fx">
 *     <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
 *   </filter>
 * </svg>
 */
export const visualEffects = {
  noiseBackground: 'noise-bg',
  // Add other reusable visual effect class names here
} as const;
