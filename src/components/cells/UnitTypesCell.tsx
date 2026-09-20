import { BentoCard } from '@/components/bento/BentoCard'
import { MediaSlot } from '@/components/media/MediaSlot'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { unitTypes } from '@/content/unit-types'
import { cn } from '@/lib/utils'

export function UnitTypesCell() {
  return (
    <div id="unit-types" className="flex flex-col gap-5">
      <SectionHeader
        eyebrow="Unit Types"
        title="Spaces that Breathe"
        description="Choose from 3 bespoke layouts. Every residence features warm oak flooring, matte-finish bespoke cabinetry, and spa-inspired bathrooms with brushed gunmetal fixtures."
      />

      <div className="flex flex-col gap-5 md:gap-6">
        {unitTypes.map((plan, index) => {
          const reversed = index % 2 === 1
          return (
            <BentoCard
              key={plan.type}
              className={cn(
                'grid md:min-h-[460px] xl:min-h-[560px]',
                reversed
                  ? 'md:grid-cols-[45fr_55fr] lg:grid-cols-[35fr_65fr]'
                  : 'md:grid-cols-[55fr_45fr] lg:grid-cols-[65fr_35fr]',
              )}
            >
              <div className={cn('relative aspect-[4/3] md:aspect-auto', reversed && 'md:order-2')}>
                <MediaSlot slot={plan.media} sizes="(min-width: 768px) 65vw, 100vw" className="h-full" />
              </div>
              <div className={cn('flex flex-col justify-center p-8 md:p-10 xl:p-14', reversed && 'md:order-1')}>
                <h3 className="text-foreground font-serif text-2xl leading-tight md:text-3xl">{plan.name}</h3>
                <p className="text-muted-foreground mt-5 text-base leading-relaxed">{plan.description}</p>
                <p className="border-border text-gold mt-6 border-t pt-6 font-serif text-2xl md:text-3xl">
                  {plan.areaSqm} m²
                </p>
              </div>
            </BentoCard>
          )
        })}
      </div>
    </div>
  )
}
