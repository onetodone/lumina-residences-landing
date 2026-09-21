'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { usePointerGlow } from '@/lib/hooks/usePointerGlow'

const bentoCardBaseClassName = 'bento-surface shadow-card h-full w-full overflow-hidden rounded-card'

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Set to false to skip the hover lift/glow (`.bento-interactive`). The
   * lift applies `transform` to this root element, which opens a new
   * stacking context on hover — any descendant relying on `z-index` to
   * stay above a fixed sibling elsewhere in the page (e.g. `SmartHomePanel`
   * staying above `SmartHomeEffects`) would get trapped inside it the
   * moment the card is hovered, since a descendant's z-index can never
   * escape its own ancestor's stacking context. Default true.
   */
  hoverLift?: boolean
  /**
   * Set to false to skip the `backdrop-blur-xl` glass effect. Unlike
   * `hoverLift`, this one traps descendant z-index *unconditionally*, not
   * just on hover — `backdrop-filter` (any value other than `none`) opens
   * its own stacking context the same way `transform`/`opacity<1`/`filter`
   * do, permanently, regardless of hover state. Default true.
   */
  backdropBlur?: boolean
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(function BentoCard(
  { className, hoverLift = true, backdropBlur = true, onPointerMove, onPointerLeave, ...props },
  ref,
) {
  const glow = usePointerGlow()

  return (
    <div
      ref={ref}
      className={cn(
        bentoCardBaseClassName,
        backdropBlur && 'backdrop-blur-xl',
        hoverLift && 'bento-interactive',
        className,
      )}
      onPointerMove={(event) => {
        if (hoverLift) glow.onPointerMove(event)
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        if (hoverLift) glow.onPointerLeave(event)
        onPointerLeave?.(event)
      }}
      {...props}
    />
  )
})
