'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { bentoSurfaceClassName } from '@/components/bento/BentoCard'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { OneBedPlan } from '@/components/floor-plans/OneBedPlan'
import { PenthousePlan } from '@/components/floor-plans/PenthousePlan'
import { StudioPlan } from '@/components/floor-plans/StudioPlan'
import { ThreeBedPlan } from '@/components/floor-plans/ThreeBedPlan'
import { TwoBedPlan } from '@/components/floor-plans/TwoBedPlan'
import { floorPlans } from '@/content/floor-plans'
import type { ResidenceType } from '@/data/types'
import { formatUsd } from '@/lib/format'
import { cn } from '@/lib/utils'

const PLAN_COMPONENTS: Record<ResidenceType, typeof StudioPlan> = {
  studio: StudioPlan,
  '1-bed': OneBedPlan,
  '2-bed': TwoBedPlan,
  '3-bed': ThreeBedPlan,
  penthouse: PenthousePlan,
}

const navButtonClassName =
  'border-border text-muted-foreground hover:text-foreground hover:border-gold/40 inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-(--duration-fast)'

/** Floor plan carousel: horizontal scroll-snap track of apartment types with area, price-from, and an SVG plan (SPEC.md section 4C). */
export function FloorPlans() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id="floor-plans" className="mx-auto max-w-[1440px] px-6 py-3 md:px-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className={eyebrowClassName}>Floor Plans</span>
          <h2 className="text-foreground mt-2 font-serif text-3xl md:text-4xl">Five ways to live at Lumina</h2>
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

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Floor plan carousel, scroll or use arrow keys to browse"
        className="scrollbar-hidden focus-visible:ring-ring/50 rounded-card mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 outline-none focus-visible:ring-3"
      >
        {floorPlans.map((plan) => {
          const Plan = PLAN_COMPONENTS[plan.type]
          return (
            <article
              key={plan.type}
              className={cn(bentoSurfaceClassName, 'rounded-card w-[280px] shrink-0 snap-start p-6 sm:w-[340px]')}
            >
              <Plan className="h-auto w-full" />
              <h3 className="text-foreground mt-4 font-serif text-xl">{plan.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{plan.description}</p>
              <div className="border-border mt-4 flex items-center justify-between border-t pt-4 text-sm">
                <span className="text-muted-foreground">{plan.areaSqm} m²</span>
                <span className="text-gold">From {formatUsd(plan.priceFromUsd)}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
