import { Fingerprint, Lightbulb, Thermometer, type LucideIcon } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { Counter } from '@/components/motion/Counter'
import { Reveal } from '@/components/motion/Reveal'
import { keyFigures } from '@/content/stats'
import { technologyHighlights, technologyIntro } from '@/content/technology'
import { eyebrowClassName, featureIcons } from './cell-styles'

const ecosystemFigure = keyFigures.find((figure) => figure.id === 'ecosystem')!
// The "Integrated Smart Home" bullet is folded into the big ecosystem stat above, so it's dropped from the list.
const bullets = technologyHighlights.filter((item) => item.id !== 'smart-home')

const appPanelRows: { label: string; icon: LucideIcon }[] = [
  { label: 'Lighting', icon: Lightbulb },
  { label: 'Climate', icon: Thermometer },
  { label: 'Security', icon: Fingerprint },
]

/** Decorative "Lumina App" panel mock — inline markup, no external image, standing in for a smart-home app screenshot. */
function SmartHomePanel() {
  return (
    <div aria-hidden className="border-border rounded-control w-full shrink-0 border bg-white/[0.03] p-4 md:w-48">
      <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">Lumina App</p>
      <ul className="mt-4 flex flex-col gap-3.5">
        {appPanelRows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-3">
            <span className="text-foreground/80 flex items-center gap-2 text-xs">
              <row.icon aria-hidden className="text-gold size-3.5" />
              {row.label}
            </span>
            <span className="bg-gold/70 relative inline-flex h-4 w-8 items-center rounded-full">
              <span className="bg-obsidian absolute right-0.5 size-3 rounded-full" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TechnologyCell() {
  return (
    <BentoCard className="flex h-full flex-col gap-6 p-6 md:flex-row md:gap-8 md:p-8">
      <div className="flex flex-1 flex-col gap-5">
        <div>
          <h2 className={eyebrowClassName}>{technologyIntro.eyebrow}</h2>
          <h3 className="text-foreground mt-2 font-serif text-xl md:text-2xl">{technologyIntro.heading}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{technologyIntro.description}</p>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-foreground font-serif text-4xl md:text-5xl">
            <Counter
              value={ecosystemFigure.value}
              decimals={ecosystemFigure.decimals}
              suffix={ecosystemFigure.suffix}
            />
          </p>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">{ecosystemFigure.label}</p>
        </div>

        <ul className="flex flex-col gap-4">
          {bullets.map((item, index) => {
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
