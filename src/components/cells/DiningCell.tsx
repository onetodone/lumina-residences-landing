'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { MediaSlot } from '@/components/media/MediaSlot'
import { Button } from '@/components/ui/button'
import { media } from '@/content/media'
import { duration, easeLuxury } from '@/lib/motion'
import { eyebrowClassName } from './cell-styles'

const fieldClassName =
  'rounded-control border-border bg-background/60 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 border px-3 py-2 text-sm outline-none focus-visible:ring-3'

/** Rooftop dining cell: Ken Burns imagery + an inline reservation micro-form. No real submission — SPEC.md section 4B.4. */
export function DiningCell() {
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <BentoCard className="relative flex flex-col justify-end p-6">
      <MediaSlot slot={media.aura} kenBurns className="absolute inset-0" />
      <div aria-hidden className="from-obsidian via-obsidian/65 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10">
        <span className={eyebrowClassName}>Aura</span>
        <p className="text-foreground mt-2 font-serif text-xl">Rooftop dining, 38th floor</p>
        <p className="text-muted-foreground mt-1 text-sm">
          Panoramic dining above the harbor, open to residents and their guests.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base, ease: easeLuxury }}
              className="mt-4 flex items-center gap-2"
            >
              <Check aria-hidden className="text-status-available size-4 shrink-0" />
              <p className="text-sm">
                Request received — we will confirm your table shortly.{' '}
                <button type="button" onClick={() => setSubmitted(false)} className="text-gold underline">
                  Make another request
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast, ease: easeLuxury }}
              onSubmit={onSubmit}
              className="mt-4 flex flex-wrap items-end gap-3"
            >
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs tracking-wide uppercase">Date</span>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={fieldClassName}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs tracking-wide uppercase">Guests</span>
                <input
                  required
                  type="number"
                  min={1}
                  max={12}
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                  className={`${fieldClassName} w-20`}
                />
              </label>
              <Button type="submit" size="sm">
                Reserve a table
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </BentoCard>
  )
}
