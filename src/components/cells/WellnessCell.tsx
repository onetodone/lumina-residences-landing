import { MediaSlot } from '@/components/media/MediaSlot'
import { Reveal } from '@/components/motion/Reveal'
import { BentoCard } from '@/components/bento/BentoCard'
import { wellnessAmenities } from '@/content/amenities'
import { media } from '@/content/media'
import { amenityIcons, eyebrowClassName } from './cell-styles'

/** Wellness cell: dark moody imagery with the amenity list revealed line by line (SPEC.md section 4B.5). */
export function WellnessCell() {
  return (
    <BentoCard className="relative flex flex-col justify-end p-6 md:p-8">
      <MediaSlot slot={media.wellness} className="absolute inset-0" sizes="(min-width: 1280px) 33vw, 50vw" />
      <div aria-hidden className="from-obsidian via-obsidian/70 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10">
        <span className={eyebrowClassName}>Wellness</span>
        <p className="text-foreground mt-2 font-serif text-xl">A quiet floor dedicated to recovery</p>

        <ul className="mt-4 flex flex-col gap-3">
          {wellnessAmenities.map((amenity, index) => {
            const Icon = amenityIcons[amenity.icon]
            return (
              <li key={amenity.id}>
                <Reveal delay={index * 0.08} className="flex items-start gap-3">
                  {Icon && <Icon aria-hidden className="text-gold mt-0.5 size-4 shrink-0" />}
                  <div>
                    <p className="text-foreground text-sm font-medium">{amenity.name}</p>
                    <p className="text-muted-foreground text-xs">{amenity.description}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </BentoCard>
  )
}
