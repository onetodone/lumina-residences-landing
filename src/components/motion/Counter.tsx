'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type CounterProps = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

/**
 * Counts up to `value` when scrolled into view. The spring's value is
 * written straight to textContent on every tick (no setState per frame),
 * and jumps straight to the final value under reduced motion.
 */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 })

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      if (ref.current) ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
      return
    }
    motionValue.set(value)
  }, [isInView, prefersReducedMotion, motionValue, value, prefix, suffix, decimals])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
    })
  }, [springValue, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}
