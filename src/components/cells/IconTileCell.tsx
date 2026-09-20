import { BentoCard } from '@/components/bento/BentoCard'
import type { FeatureItem } from '@/content/types'
import { featureIcons } from './cell-styles'

type IconTileCellProps = {
  id?: string
  item: FeatureItem
}

/** A single icon-led item as its own square tile — used for the Facilities cluster and the Turnkey Management tile. */
export function IconTileCell({ id, item }: IconTileCellProps) {
  const Icon = featureIcons[item.icon]

  return (
    <BentoCard id={id} className="flex h-full flex-col justify-center gap-3 p-5 md:p-6">
      {Icon && <Icon aria-hidden className="text-gold size-5" />}
      <div>
        <p className="text-foreground font-serif text-lg">{item.name}</p>
        <p className="text-muted-foreground mt-1 text-xs">{item.description}</p>
      </div>
    </BentoCard>
  )
}
