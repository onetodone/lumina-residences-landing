'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BentoCard } from '@/components/bento/BentoCard'
import { KineticText } from '@/components/motion/KineticText'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/content/site'
import { duration, easeLuxury } from '@/lib/motion'
import { HeroMedia } from './HeroMedia'

export function HeroCell() {
  const [hovered, setHovered] = useState(false)
  // Assumed true (matches the desktop-first default below) until the effect
  // below corrects it — touch devices have no hover, so the description
  // must default to visible there instead of waiting for a hover that will
  // never come.
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setCanHover(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const showDetails = hovered || !canHover

  return (
    <BentoCard
      // min-h on mobile fills the viewport below the page's top padding
      // (pt-28 in page.tsx, which already clears the fixed header) so the
      // hero reaches the bottom of the screen; md+ reverts to the grid's
      // own row sizing.
      className="relative flex min-h-[calc(100dvh-10rem)] flex-col justify-end p-6 md:min-h-0 md:p-10"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <HeroMedia />
      <div aria-hidden className="from-obsidian via-obsidian/55 absolute inset-0 bg-gradient-to-t to-transparent" />

      <motion.div layout transition={{ duration: duration.base, ease: easeLuxury }} className="relative z-10">
        <motion.h1
          layout
          transition={{ duration: duration.base, ease: easeLuxury }}
          className="text-foreground max-w-2xl font-serif text-3xl leading-[1.05] md:text-6xl xl:text-7xl"
        >
          <KineticText text={siteConfig.name} />
        </motion.h1>
        <motion.p
          layout
          transition={{ duration: duration.base, ease: easeLuxury }}
          className="text-gold mt-3 max-w-md font-serif text-lg italic md:text-2xl"
        >
          <KineticText text={siteConfig.tagline} delay={0.3} />
        </motion.p>

        {/*
          Mounted on hover for fine/hover-capable pointers (desktop), so the
          resting layout reserves no space for it there (no empty gap); on
          touch devices (`!canHover`, no hover to trigger it) it's mounted
          from the start instead. This block sits at the bottom of the card
          (see the `justify-end` above), so mounting/unmounting it shifts the
          heading and tagline above and the buttons below too — they're all
          `layout` motion elements so that reflow is smoothly
          transform-animated instead of snapping.

          `mode="popLayout"` pulls the paragraph out of flow the instant it
          starts exiting, so this wrapper (and the siblings below) start
          collapsing/sliding back immediately instead of waiting for its
          fade-out to finish. But since the popped paragraph then sits frozen
          at its old position, `overflow-hidden` + `layout` on THIS wrapper is
          what actually keeps it from visually spilling over the buttons as
          they slide up through it — it clips the paragraph to whatever height
          this wrapper has shrunk to at any given instant, so it's cropped
          away in step with the collapse no matter how the two transitions'
          timings line up (its own fast exit fade is just the finishing touch).
        */}
        <motion.div layout transition={{ duration: duration.base, ease: easeLuxury }} className="overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {showDetails && (
              <motion.p
                key="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: duration.base, ease: easeLuxury } }}
                exit={{ opacity: 0, transition: { duration: duration.fast, ease: easeLuxury } }}
                className="text-foreground/85 mt-4 max-w-md text-sm leading-relaxed text-shadow-sm"
              >
                {siteConfig.details}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          layout
          transition={{ duration: duration.base, ease: easeLuxury }}
          className="mt-6 flex flex-nowrap gap-2 md:mt-8 md:gap-4"
        >
          <MagneticButton className="min-w-0 flex-1 md:flex-none">
            <Button
              size="lg"
              variant="outline"
              aria-disabled="true"
              title="Coming soon"
              className="bg-obsidian/50 text-foreground shadow-card min-h-10 w-full truncate border-white/20 px-3 text-xs backdrop-blur-md md:min-h-12 md:w-auto md:px-8 md:text-sm"
            >
              Download Brochure
            </Button>
          </MagneticButton>
          <MagneticButton className="min-w-0 flex-1 md:flex-none">
            <Button
              size="lg"
              aria-disabled="true"
              title="Coming soon"
              className="shadow-card min-h-10 w-full truncate px-3 text-xs md:min-h-12 md:w-auto md:px-8 md:text-sm"
            >
              Register Interest
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </BentoCard>
  )
}
