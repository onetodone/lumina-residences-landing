import type { PointerEvent } from 'react'

/**
 * Cursor-tracking glow: writes --glow-x/--glow-y directly on the element via
 * the DOM, bypassing React state so pointermove never triggers a re-render.
 */
export function usePointerGlow() {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty('--glow-x')
    event.currentTarget.style.removeProperty('--glow-y')
  }

  return { onPointerMove, onPointerLeave }
}
