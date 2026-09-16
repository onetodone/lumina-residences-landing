import { BentoCard } from '@/components/bento/BentoCard'
import { conciergeAndParking } from '@/content/amenities'
import { amenityIcons, eyebrowClassName } from './cell-styles'

/** Concierge & Parking cell: two compact nested sub-tiles (SPEC.md section 4B.9). */
export function ConciergeCell() {
  return (
    <BentoCard className="flex flex-col gap-4 p-6">
      <h2 className={eyebrowClassName}>Concierge & Parking</h2>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {conciergeAndParking.map((item) => {
          const Icon = amenityIcons[item.icon]
          return (
            <div
              key={item.id}
              className="border-border rounded-control flex flex-col gap-2 border bg-white/[0.03] p-3.5"
            >
              {Icon && <Icon aria-hidden className="text-gold size-4" />}
              <p className="text-foreground text-sm font-medium">{item.name}</p>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
          )
        })}
      </div>
    </BentoCard>
  )
}
