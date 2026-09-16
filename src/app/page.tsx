import { BentoGrid } from '@/components/bento/BentoGrid'
import { BentoCard } from '@/components/bento/BentoCard'
import { Reveal } from '@/components/motion/Reveal'
import { HeroCell } from '@/components/cells/HeroCell'
import { StatsCell } from '@/components/cells/StatsCell'
import { ResidencesCell } from '@/components/cells/ResidencesCell'
import { DiningCell } from '@/components/cells/DiningCell'
import { eyebrowClassName } from '@/components/cells/cell-styles'

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-28 pb-24 md:px-16 md:pt-36">
      <BentoGrid>
        <Reveal className="[grid-area:hero]">
          <HeroCell />
        </Reveal>

        <Reveal className="[grid-area:stats]" delay={0.05}>
          <StatsCell />
        </Reveal>

        <Reveal className="[grid-area:residences]" delay={0.1}>
          <ResidencesCell />
        </Reveal>

        <Reveal className="[grid-area:aura]" delay={0.15}>
          <DiningCell />
        </Reveal>

        <Reveal className="[grid-area:wellness]" delay={0.05}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrowClassName}>Wellness</span>
            <p className="font-serif text-xl">Infinity pool · Gym · Cryo-sauna · Hammam · Yoga</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:smart-home]" delay={0.1}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrowClassName}>Smart Home</span>
            <p className="font-serif text-xl">Climate · Lighting · Blinds · Access</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:architecture]" delay={0.15}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrowClassName}>Architecture</span>
            <p className="font-serif text-xl">LEED Gold target facade</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:location]" delay={0.2}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrowClassName}>Location</span>
            <p className="font-serif text-xl">Beach 6 min · Business center 12 min · Airport 25 min</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:concierge]" delay={0.25}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrowClassName}>Concierge & Parking</span>
            <p className="font-serif text-xl">24/7 concierge · EV parking</p>
          </BentoCard>
        </Reveal>
      </BentoGrid>
    </div>
  )
}
