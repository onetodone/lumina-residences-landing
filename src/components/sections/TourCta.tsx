import { eyebrowClassName, featureIcons } from '@/components/cells/cell-styles'
import { Reveal } from '@/components/motion/Reveal'
import { tourBenefits, tourCtaIntro } from '@/content/tour'
import { TourForm } from './TourForm'

export function TourCta() {
  return (
    <div id="tour" className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      <div className="flex h-full flex-col justify-center gap-6 px-1">
        <div>
          <span className={eyebrowClassName}>{tourCtaIntro.eyebrow}</span>
          <h2 className="text-foreground mt-3 font-serif text-3xl leading-[1.05] md:text-4xl xl:text-5xl">
            {tourCtaIntro.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed md:text-base">
            {tourCtaIntro.description}
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {tourBenefits.map((benefit, index) => {
            const Icon = featureIcons[benefit.icon]
            return (
              <li key={benefit.id}>
                <Reveal delay={index * 0.08} className="flex items-start gap-3">
                  {Icon && <Icon aria-hidden className="text-gold mt-0.5 size-4 shrink-0" />}
                  <span className="text-foreground/90 text-sm leading-relaxed">{benefit.text}</span>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
      <TourForm />
    </div>
  )
}
