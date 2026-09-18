'use client'

import { useState } from 'react'
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

  return (
    <BentoCard
      className="relative flex flex-col justify-end p-6 md:p-10"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <HeroMedia />
      <div aria-hidden className="from-obsidian via-obsidian/55 absolute inset-0 bg-gradient-to-t to-transparent" />

      <motion.div layout transition={{ duration: duration.base, ease: easeLuxury }} className="relative z-10">
        <motion.h1
          layout
          transition={{ duration: duration.base, ease: easeLuxury }}
          className="text-foreground max-w-2xl font-serif text-4xl leading-[1.05] md:text-6xl xl:text-7xl"
        >
          <KineticText text={siteConfig.name} />
        </motion.h1>
        <motion.p
          layout
          transition={{ duration: duration.base, ease: easeLuxury }}
          className="text-gold mt-3 max-w-md font-serif text-xl italic md:text-2xl"
        >
          <KineticText text={siteConfig.tagline} delay={0.3} />
        </motion.p>

        {/*
          Mounted only on hover, so the resting layout reserves no space for it
          (no empty gap). This block sits at the bottom of the card (see the
          `justify-end` above), so mounting/unmounting it shifts the heading and
          tagline above and the buttons below too — they're all `layout`
          motion elements so that reflow is smoothly transform-animated instead
          of snapping.

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
            {hovered && (
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
          className="mt-8 flex flex-wrap gap-4"
        >
          <MagneticButton>
            <Button
              size="lg"
              variant="outline"
              aria-disabled="true"
              title="Coming soon"
              className="bg-obsidian/50 text-foreground shadow-card border-white/20 backdrop-blur-md"
            >
              Download Brochure
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="lg" aria-disabled="true" title="Coming soon" className="shadow-card">
              Register Interest
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </BentoCard>
  )
}
