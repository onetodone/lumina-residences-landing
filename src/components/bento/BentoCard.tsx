'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { usePointerGlow } from '@/lib/hooks/usePointerGlow'

const bentoCardBaseClassName =
  'bento-surface bento-interactive shadow-card backdrop-blur-xl h-full w-full overflow-hidden rounded-card'

export const BentoCard = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function BentoCard(
  { className, onPointerMove, onPointerLeave, ...props },
  ref,
) {
  const glow = usePointerGlow()

  return (
    <div
      ref={ref}
      className={cn(bentoCardBaseClassName, className)}
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
