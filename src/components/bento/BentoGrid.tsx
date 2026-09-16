import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type BentoGridProps = ComponentPropsWithoutRef<'div'>

/**
 * 1-column flow on mobile, named grid-template-areas on md/xl (see
 * `.bento-grid` in globals.css). Children must be authored in mobile
 * reading order — assign each one's position at md/xl via a
 * `[grid-area:<name>]` utility class, e.g. `[grid-area:hero]`.
 */
export function BentoGrid({ className, ...props }: BentoGridProps) {
  return <div className={cn('bento-grid gap-5', className)} {...props} />
}
