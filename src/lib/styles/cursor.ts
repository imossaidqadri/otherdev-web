// src/lib/styles/cursor.ts

/**
 * Provides mappings to CSS classes for custom cursor styles.
 * The corresponding CSS classes must be defined globally or imported where used.
 * Example CSS (should be in a global stylesheet):
 * .cursor-arrow-left { cursor: url("/icons/arrow-left.svg") 30 30, auto; }
 * .cursor-arrow-right { cursor: url("/icons/arrow-right.svg") 30 30, auto; }
 */
export const cursorStyles = {
  arrowLeft: 'cursor-arrow-left',
  arrowRight: 'cursor-arrow-right',
  // Add other cursor styles here if needed
} as const;
