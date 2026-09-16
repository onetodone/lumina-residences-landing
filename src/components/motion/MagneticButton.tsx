'use client'

import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  /** Fraction of the pointer offset from center the button travels. */
  strength?: number
}

/**
 * Wraps a primary CTA and pulls it toward the pointer. Values are motion
 * values updated via .set() (no React re-render per pointermove), and the
 * pull is skipped entirely under reduced motion.
 */
export function MagneticButton({ children, className, strength = 0.3 }: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  )
}
