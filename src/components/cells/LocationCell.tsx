'use client'

import dynamic from 'next/dynamic'
import { BentoCard } from '@/components/bento/BentoCard'
import { pointsOfInterest, siteLocation } from '@/config/mapLocations'
import { GradientNoiseBackground } from '@/components/media/GradientNoiseBackground'
import { eyebrowClassName } from './cell-styles'

/**
 * Loaded on demand: mapbox-gl adds ~740 KB of JS that's mostly unused until this
 * card is actually interacted with, so it shouldn't be in the initial bundle.
 */
const LocationMap = dynamic(() => import('./LocationMap').then((mod) => mod.LocationMap), {
  ssr: false,
  loading: () => <GradientNoiseBackground />,
})

export function LocationCell() {
  return (
    <BentoCard id="location" className="min-h-[240px] md:min-h-0">
      <LocationMap />

      <div className="pointer-events-none relative z-20 flex h-full flex-col justify-between p-5 md:p-6">
        <div>
          <h2 className={eyebrowClassName}>Location</h2>
          <h3 className="text-foreground mt-1 font-serif text-lg md:text-xl">{siteLocation.name}</h3>
        </div>

        <p className="text-muted-foreground text-xs">
          {pointsOfInterest.length} curated places nearby — tap the map to explore
        </p>
      </div>
    </BentoCard>
  )
}
