/**
 * PureBiome design tokens — TypeScript mirror of tokens.css.
 * Keep these in sync with ./tokens.css by hand for now; a later pass can
 * generate one from the other.
 */

export const palette = {
  ink: "#0E1411",
  bone: "#F6F1E7",
  cane: "#1F3B2D",
  culture: "#C9F26D",
  clay: "#C7A27A",
  signal: "#E5533D",
} as const;

export const fonts = {
  display: '"Fraunces", Georgia, "Times New Roman", serif',
  body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  18: 72,
  30: 120,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
} as const;

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  fast: 160,
  base: 280,
  slow: 400,
} as const;

export const layout = {
  container: 1240,
  gutter: 24,
} as const;

export type Palette = typeof palette;
export type Space = keyof typeof space;
