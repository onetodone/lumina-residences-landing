'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSmartHome } from './SmartHomeContext'

const overlayTransitionClassName = 'transition-opacity duration-(--duration-slow) ease-luxury'

/** One full-viewport tint layer, faded in/out via opacity only. */
function EffectLayer({
  opacity,
  blockPointerEvents = false,
  className,
  children,
}: {
  opacity: number
  blockPointerEvents?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn('absolute inset-0', overlayTransitionClassName, className)}
      style={{ opacity, pointerEvents: blockPointerEvents && opacity > 0 ? 'auto' : 'none' }}
    >
      {children}
    </div>
  )
}

/**
 * Page-wide ambient effects driven by the smart-home widget's state (see
 * `SmartHomeContext`). Mounted once in the root layout, as a sibling of
 * `Header`/`main`/`Footer` rather than nested inside the bento grid, so
 * `fixed` resolves against the viewport instead of getting trapped by a
 * transformed ancestor (`BentoCard`'s hover lift would otherwise become its
 * containing block). The Security overlay is the only layer that captures
 * pointer events (it blocks interaction with the rest of the page while
 * armed); the Technology card itself rises above all of these layers (see
 * the `:has(.smart-home-panel-active)` rules in globals.css) while
 * `SmartHomePanel` is active, so the control panel always stays visible and
 * reachable.
 */
export function SmartHomeEffects() {
  const { lighting, armed, coldIntensity, warmIntensity } = useSmartHome()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <EffectLayer className="bg-obsidian" opacity={lighting === 'off' ? 0.98 : 0} />
      <EffectLayer
        className="bg-[radial-gradient(circle_at_50%_30%,var(--warm-lamp-tint),var(--warm-lamp-tint-deep)_100%)]"
        opacity={lighting === 'warm' ? 0.2 : 0}
      />

      <EffectLayer opacity={coldIntensity}>
        <div className="absolute inset-0 shadow-[inset_0_0_10vmin_var(--frost-tint)]" />
        <div className="cold-frost-edges absolute inset-0" />
      </EffectLayer>

      <EffectLayer opacity={warmIntensity}>
        <div className="absolute inset-0 shadow-[inset_0_0_10vmin_var(--ember-tint)]" />
      </EffectLayer>

      <EffectLayer className="security-lock-pattern bg-obsidian/85" opacity={armed ? 1 : 0} blockPointerEvents />
    </div>
  )
}
