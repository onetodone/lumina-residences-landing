'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePointerGlow } from '@/lib/hooks/usePointerGlow'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useHydrated } from '@/lib/hooks/useHydrated'
import { duration, easeLuxury } from '@/lib/motion'
import { bentoCardClassName, bentoSurfaceClassName } from './BentoCard'

type ExpandableCardProps = {
  /** Unique per instance — drives the shared layout animation between the compact trigger and the expanded panel. */
  layoutId: string
  /** Accessible name for the expanded panel (dialog) and its close button. */
  label: string
  trigger: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Compact BentoCard that expands (shared layoutId) into a fixed overlay
 * panel. Only one of trigger/panel is ever mounted at a time, so the grid
 * cell simply goes empty while expanded — row heights are fixed (see
 * `.bento-grid` in globals.css), so the grid itself never reflows.
 */
export function ExpandableCard({ layoutId, label, trigger, children, className }: ExpandableCardProps) {
  const [open, setOpen] = useState(false)
  const mounted = useHydrated()
  const wasOpenRef = useRef(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useFocusTrap<HTMLDivElement>(open)
  const titleId = useId()
  const glow = usePointerGlow()

  // The trigger unmounts while the panel is open, so focus can only be
  // restored to it once it has remounted — do that from an effect rather
  // than synchronously in a close handler.
  useEffect(() => {
    if (wasOpenRef.current && !open) triggerRef.current?.focus()
    wasOpenRef.current = open
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {!open && (
        <motion.button
          ref={triggerRef}
          type="button"
          layout
          layoutId={layoutId}
          onPointerMove={glow.onPointerMove}
          onPointerLeave={glow.onPointerLeave}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={false}
          transition={{ duration: duration.base, ease: easeLuxury }}
          className={cn(bentoCardClassName, 'block text-left', className)}
        >
          {trigger}
        </motion.button>
      )}

      {/*
        Portaled to document.body: a Reveal (or any motion.div) ancestor
        keeps a `transform` inline style even at rest, and CSS makes any
        transformed ancestor the containing block for `position: fixed`
        descendants — so nested inside the grid, "fixed" would size against
        that ancestor's box instead of the viewport. Backdrop and panel are
        siblings so neither is a `motion` ancestor of the other's projection.
      */}
      {mounted &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:p-10',
              !open && 'pointer-events-none',
            )}
          >
            <AnimatePresence>
              {open && (
                <>
                  <motion.div
                    key="backdrop"
                    aria-hidden
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration.fast, ease: easeLuxury }}
                    className="bg-obsidian/80 fixed inset-0 backdrop-blur-sm"
                  />
                  <motion.div
                    key="panel"
                    ref={panelRef}
                    layout
                    layoutId={layoutId}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    transition={{ duration: duration.base, ease: easeLuxury }}
                    className={cn(
                      bentoSurfaceClassName,
                      'rounded-panel shadow-elevated relative w-full max-w-3xl overflow-y-auto p-6 md:p-10',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={`Close ${label}`}
                      className="text-muted-foreground hover:text-foreground rounded-control absolute top-4 right-4 inline-flex size-10 items-center justify-center transition-colors duration-(--duration-fast)"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                    <h2 id={titleId} className="sr-only">
                      {label}
                    </h2>
                    {children}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </>
  )
}
