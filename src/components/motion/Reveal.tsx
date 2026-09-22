'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { duration, easeLuxury } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Fades/slides an element in (transform + opacity only) once it scrolls into
 * view. The `reveal` class carries no styling of its own - it's a `:has()`
 * hook (see globals.css) so the Technology cell's smart-home panel can lift
 * this wrapper's z-index above the page-wide effects overlay for the brief
 * window its own opacity animation would otherwise trap the panel behind it.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: duration.base, ease: easeLuxury, delay }}
      className={cn('reveal h-full', className)}
    >
      {children}
    </motion.div>
  )
}
