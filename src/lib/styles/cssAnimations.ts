// src/lib/styles/cssAnimations.ts

/**
 * Provides mappings to CSS classes for dynamic underline animations.
 * The corresponding CSS classes (including ::before pseudo-elements and hover effects)
 * must be defined globally or imported where used.
 *
 * Example CSS (should be in a global or component stylesheet):
 * .dynamic-underline-left::before { ... transform-origin: top left; ... }
 * .dynamic-underline-left:hover::before { transform: scaleX(1); }
 * etc.
 *
 * Color for the underline is typically handled by additional classes that
 * target the ::before pseudo-element's background-color,
 * as seen in Navigation.css (e.g., .nav-text-color-default.dynamic-underline-left::before).
 */
export const underlineStyles = {
  left: 'dynamic-underline-left',
  right: 'dynamic-underline-right',
  // If there are other underline variants, they can be added here.
} as const;
