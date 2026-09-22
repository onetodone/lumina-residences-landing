import { BentoCard } from '@/components/bento/BentoCard'
import { Reveal } from '@/components/motion/Reveal'
import { SmartHomePanel } from '@/components/smart-home/SmartHomePanel'
import { technologyHighlights, technologyIntro } from '@/content/technology'
import { eyebrowClassName, featureIcons } from './cell-styles'

export function TechnologyCell() {
  return (
    <BentoCard className="flex h-full flex-col gap-6 p-5 md:flex-row md:gap-8 md:p-6">
      <div className="flex flex-1 flex-col gap-5">
        <div>
          <h2 className={eyebrowClassName}>{technologyIntro.eyebrow}</h2>
          <h3 className="text-foreground mt-2 font-serif text-xl md:text-2xl">{technologyIntro.heading}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{technologyIntro.description}</p>
        </div>
        <ul className="flex flex-col gap-4">
          {technologyHighlights.map((item, index) => {
            const Icon = featureIcons[item.icon]
            return (
              <li key={item.id}>
                <Reveal delay={index * 0.08} className="flex items-start gap-3">
                  {Icon && <Icon aria-hidden className="text-gold mt-0.5 size-4 shrink-0" />}
                  <div>
                    <p className="text-foreground text-sm font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>

      <SmartHomePanel />
    </BentoCard>
  )
}
