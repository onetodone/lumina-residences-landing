'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { OneBedPlan } from '@/components/floor-plans/OneBedPlan'
import { StudioPlan } from '@/components/floor-plans/StudioPlan'
import { TwoBedPlan } from '@/components/floor-plans/TwoBedPlan'
import { floorPlans, type FloorPlanType } from '@/content/floor-plans'
import { cn } from '@/lib/utils'
import { eyebrowClassName } from './cell-styles'

const PLAN_COMPONENTS: Record<FloorPlanType, typeof StudioPlan> = {
  studio: StudioPlan,
  '1-bed': OneBedPlan,
  '2-bed': TwoBedPlan,
}

const navButtonClassName =
  'border-border text-muted-foreground hover:text-foreground hover:border-gold/40 inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-(--duration-fast)'

/** Floor Plans cell: horizontal scroll-snap carousel of the 3 apartment types with area, description, and an SVG plan (NEW_STRUCTURE.md "Floor Plans"). */
export function FloorPlansCell() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <BentoCard id="floor-plans" className="flex min-w-0 flex-col p-6 md:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className={eyebrowClassName}>Floor Plans</h2>
          <h3 className="text-foreground mt-2 font-serif text-xl md:text-2xl">Spaces that Breathe</h3>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous floor plan"
            className={navButtonClassName}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next floor plan"
            className={navButtonClassName}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
        Choose from 3 bespoke layouts. Every residence features warm oak flooring, matte-finish bespoke cabinetry, and
        spa-inspired bathrooms with brushed gunmetal fixtures.
      </p>

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Floor plan carousel, scroll or use arrow keys to browse"
        className="scrollbar-hidden focus-visible:ring-ring/50 rounded-card mt-6 flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-2 outline-none focus-visible:ring-3"
      >
        {floorPlans.map((plan) => {
          const Plan = PLAN_COMPONENTS[plan.type]
          return (
            <article
              key={plan.type}
              className={cn(
                'border-border rounded-control w-[220px] shrink-0 snap-start border bg-white/[0.03] p-5 sm:w-[260px]',
              )}
            >
              <Plan className="h-auto w-full" />
              <h4 className="text-foreground mt-3 font-serif text-lg">{plan.name}</h4>
              <p className="text-muted-foreground mt-1 text-xs">{plan.description}</p>
              <p className="border-border text-muted-foreground mt-3 border-t pt-3 text-sm">{plan.areaSqm} m²</p>
            </article>
          )
        })}
      </div>
    </BentoCard>
  )
}
