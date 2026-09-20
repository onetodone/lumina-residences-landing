import { BentoCard } from '@/components/bento/BentoCard'
import { siteConfig } from '@/content/site'
import { eyebrowClassName } from './cell-styles'

/** Developer cell: promotes the developer blurb (previously only in the Footer) into a proper Closing Grid tile (NEW_STRUCTURE.md "Developer"). */
export function DeveloperCell() {
  return (
    <BentoCard className="flex h-full flex-col justify-center gap-3 p-6 md:p-10">
      <span className={eyebrowClassName}>Developer</span>
      <h2 className="text-foreground font-serif text-2xl md:text-3xl">{siteConfig.developer}</h2>
      <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{siteConfig.developerBlurb}</p>
    </BentoCard>
  )
}
