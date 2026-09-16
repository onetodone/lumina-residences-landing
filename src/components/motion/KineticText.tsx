'use client'

import { motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import { duration, easeLuxury } from '@/lib/motion'

type KineticTextProps = {
  text: string
  className?: string
  delay?: number
  splitBy?: 'word' | 'char'
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%' },
}

/**
 * Splits text into words/characters that reveal with a staggered
 * translateY + opacity animation. The full string is exposed once via
 * aria-label; the animated glyphs are aria-hidden to avoid double-reading.
 */
export function KineticText({ text, className, delay = 0, splitBy = 'word' }: KineticTextProps) {
  const parts = splitBy === 'word' ? text.split(' ') : text.split('')

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      transition={{ delayChildren: delay }}
      aria-label={text}
      className={cn('inline', className)}
    >
      {parts.map((part, index) => (
        <span key={index} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={item}
            transition={{ duration: duration.base, ease: easeLuxury }}
            className="inline-block"
          >
            {part === '' ? ' ' : part}
            {splitBy === 'word' && index < parts.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
