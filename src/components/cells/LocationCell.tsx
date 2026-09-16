import { BentoCard } from '@/components/bento/BentoCard'
import { locationMarkers, siteMarker } from '@/content/location'
import { eyebrowClassName } from './cell-styles'

const VIEW_WIDTH = 350
const VIEW_HEIGHT = 100

/** Location cell: stylized SVG map (no external map API) with animated markers and travel times (SPEC.md section 4B.8). */
export function LocationCell() {
  return (
    <BentoCard className="relative flex min-h-[220px] flex-col justify-start p-6">
      <div className="relative z-10">
        <h2 className={eyebrowClassName}>Location</h2>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="absolute inset-0 h-full w-full"
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

        <g>
          <rect
            x={siteMarker.x - 2.4}
            y={siteMarker.y - 2.4}
            width="4.8"
            height="4.8"
            transform={`rotate(45 ${siteMarker.x} ${siteMarker.y})`}
            className="fill-gold"
          />
          <text x={siteMarker.x + 7} y={siteMarker.y - 2} className="fill-foreground text-[6px] font-medium">
            {siteMarker.label}
          </text>
        </g>

        {locationMarkers.map((marker) => (
          <g key={marker.id}>
            <circle cx={marker.x} cy={marker.y} r="4" className="map-marker-ping fill-gold/50" />
            <circle cx={marker.x} cy={marker.y} r="2" className="fill-gold" />
            <text x={marker.x + 6} y={marker.y - 1} className="fill-foreground text-[6px] font-medium">
              {marker.label}
            </text>
            <text x={marker.x + 6} y={marker.y + 6} className="fill-muted-foreground text-[5.5px]">
              {marker.travelTime}
            </text>
          </g>
        ))}
      </svg>
    </BentoCard>
  )
}
