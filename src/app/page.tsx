import { BentoGrid } from '@/components/bento/BentoGrid'
import { Reveal } from '@/components/motion/Reveal'
import { HeroCell } from '@/components/cells/HeroCell'
import { StatsCell } from '@/components/cells/StatsCell'
import { ResidencesCell } from '@/components/cells/ResidencesCell'
import { DiningCell } from '@/components/cells/DiningCell'
import { WellnessCell } from '@/components/cells/WellnessCell'
import { SmartHomeCell } from '@/components/cells/SmartHomeCell'
import { ArchitectureCell } from '@/components/cells/ArchitectureCell'
import { LocationCell } from '@/components/cells/LocationCell'
import { ConciergeCell } from '@/components/cells/ConciergeCell'

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
          <WellnessCell />
        </Reveal>

        <Reveal className="[grid-area:smart-home]" delay={0.1}>
          <SmartHomeCell />
        </Reveal>

        <Reveal className="[grid-area:architecture]" delay={0.15}>
          <ArchitectureCell />
        </Reveal>

        <Reveal className="[grid-area:location]" delay={0.2}>
          <LocationCell />
        </Reveal>

        <Reveal className="[grid-area:concierge]" delay={0.25}>
          <ConciergeCell />
        </Reveal>
      </BentoGrid>
    </div>
  )
}
