// Mirrors the --duration-*/--ease-luxury CSS custom properties in globals.css, for motion/react transitions that need numeric values.
export const duration = {
  fast: 0.2,
  base: 0.6,
  slow: 0.9,
} as const

export const easeLuxury = [0.16, 1, 0.3, 1] as const
