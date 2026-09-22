import { Building2 } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { GradientNoiseBackground } from '@/components/media/GradientNoiseBackground'
import { siteConfig } from '@/content/site'
import { eyebrowClassName } from './cell-styles'

export function DeveloperInfo() {
  return (
    <BentoCard className="flex h-full flex-col md:flex-row md:items-stretch">
      <div className="flex flex-col justify-center gap-3 p-6 md:w-1/2 md:p-10 xl:w-[45%]">
        <span className={eyebrowClassName}>Developer</span>
        <h2 className="text-foreground font-serif text-2xl md:text-3xl">{siteConfig.developer}</h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{siteConfig.developerBlurb}</p>
      </div>

      <div aria-hidden className="relative hidden min-h-40 flex-1 items-center justify-center md:flex">
        <GradientNoiseBackground />
        <Building2 className="text-gold/20 relative size-20 xl:size-24" strokeWidth={1} />
      </div>
    </BentoCard>
  )
}
