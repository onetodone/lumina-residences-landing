import { BentoCard } from '@/components/bento/BentoCard'
import { locationMarkers, siteMarker } from '@/content/location'
import { eyebrowClassName } from './cell-styles'

const VIEW_WIDTH = 350
const VIEW_HEIGHT = 100

const cbdMarker = locationMarkers.find((marker) => marker.id === 'cbd')!

export function LocationCell() {
  return (
    <BentoCard id="location" className="relative flex h-full flex-col justify-between p-5 md:p-6">
      <div className="relative z-10">
        <h2 className={eyebrowClassName}>Location</h2>
        <h3 className="text-foreground mt-1 font-serif text-lg md:text-xl">The Nexus District</h3>
      </div>

      <p className="text-muted-foreground relative z-10 text-xs">
        <span className="text-gold font-medium">{cbdMarker.travelTime}</span> to {cbdMarker.label}
      </p>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} className="fill-graphite" />
        <path d="M0,70 C60,50 120,90 180,65 C240,40 300,75 350,55 L350,100 L0,100 Z" className="fill-obsidian" />
        <path
          d="M0,70 C60,50 120,90 180,65 C240,40 300,75 350,55"
          className="stroke-gold/40"
          strokeWidth="0.6"
          fill="none"
        />
        <ellipse cx="235" cy="72" rx="70" ry="16" className="fill-gold/10" />

        <rect
          x={siteMarker.x - 2.4}
          y={siteMarker.y - 2.4}
          width="4.8"
          height="4.8"
          transform={`rotate(45 ${siteMarker.x} ${siteMarker.y})`}
          className="fill-gold"
        />
        <circle cx={cbdMarker.x} cy={cbdMarker.y} r="4" className="map-marker-ping fill-gold/50" />
        <circle cx={cbdMarker.x} cy={cbdMarker.y} r="2" className="fill-gold" />
      </svg>
    </BentoCard>
  )
}
