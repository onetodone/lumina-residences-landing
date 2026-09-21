/** Gradient + noise fallback background — used by MediaSlot when a slot has no image, and by LocationMap's tile before/without a Mapbox token. */
export function GradientNoiseBackground() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="from-graphite via-obsidian to-graphite absolute inset-0 bg-gradient-to-br" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--gold-soft),transparent_60%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay" />
    </div>
  )
}
