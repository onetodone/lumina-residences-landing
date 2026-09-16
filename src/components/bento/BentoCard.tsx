'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { usePointerGlow } from '@/lib/hooks/usePointerGlow'

/** Static glass surface, no interaction — used by ExpandableCard's expanded panel. */
export const bentoSurfaceClassName = 'bento-surface backdrop-blur-xl shadow-card'

/** Surface + pointer-glow/hover-lift — used by BentoCard and ExpandableCard's compact trigger. */
export const bentoCardClassName = cn(
  bentoSurfaceClassName,
  'bento-interactive h-full w-full overflow-hidden rounded-card',
)

type BentoCardProps = ComponentPropsWithoutRef<'div'>

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(function BentoCard(
  { className, onPointerMove, onPointerLeave, ...props },
  ref,
) {
  const glow = usePointerGlow()

  return (
    <div
      ref={ref}
      className={cn(bentoCardClassName, className)}
      onPointerMove={(event) => {
        glow.onPointerMove(event)
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        glow.onPointerLeave(event)
        onPointerLeave?.(event)
      }}
      {...props}
    />
  )
})
