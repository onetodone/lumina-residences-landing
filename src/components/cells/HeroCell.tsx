import Link from 'next/link'
import { BentoCard } from '@/components/bento/BentoCard'
import { KineticText } from '@/components/motion/KineticText'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/content/site'
import { eyebrowClassName } from './cell-styles'
import { HeroMedia } from './HeroMedia'

export function HeroCell() {
  return (
    <BentoCard className="relative flex flex-col justify-end p-6 md:p-10">
      <HeroMedia />
      <div aria-hidden className="from-obsidian via-obsidian/55 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10">
        <p className={eyebrowClassName}>Harbor Quarter · Aveline</p>
        <h1 className="text-foreground mt-4 max-w-2xl font-serif text-4xl leading-[1.05] md:text-6xl xl:text-7xl">
          <KineticText text={siteConfig.name} />
        </h1>
        <p className="text-gold mt-3 max-w-md font-serif text-xl italic md:text-2xl">
          <KineticText text={siteConfig.tagline} delay={0.3} />
        </p>
        <MagneticButton className="mt-8">
          <Button size="lg" nativeButton={false} render={<Link href="#tour">Schedule a Private Tour</Link>} />
        </MagneticButton>
      </div>
    </BentoCard>
  )
}
