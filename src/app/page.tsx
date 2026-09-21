import { BentoGrid } from '@/components/bento/BentoGrid'
import { DeveloperCell } from '@/components/cells/DeveloperCell'
import { GalleryCell } from '@/components/cells/GalleryCell'
import { HeroCell } from '@/components/cells/HeroCell'
import { IconTileCell } from '@/components/cells/IconTileCell'
import { AppreciationStatCell, YieldStatCell } from '@/components/cells/InvestmentStatCell'
import { PaymentPlanCell } from '@/components/cells/InvestmentTimelineCell'
import { LocationCell } from '@/components/cells/LocationCell'
import { HandoverMetricCell, ResidencesMetricCell } from '@/components/cells/MetricCell'
import { TechnologyCell } from '@/components/cells/TechnologyCell'
import { UnitTypesCell } from '@/components/cells/UnitTypesCell'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { TourForm } from '@/components/sections/TourForm'
import { facilitiesAmenities } from '@/content/amenities'
import { investmentHighlights, investmentIntro } from '@/content/investment'

const facilitySpa = facilitiesAmenities.find((item) => item.id === 'spa')!
const facilityPerformance = facilitiesAmenities.find((item) => item.id === 'performance-studio')!
const facilityLounge = facilitiesAmenities.find((item) => item.id === 'lounge')!
const facilityCafe = facilitiesAmenities.find((item) => item.id === 'cafe')!
const turnkeyItem = investmentHighlights.find((item) => item.id === 'management')!

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-6 md:px-16 md:pt-36 md:pb-24">
      <BentoGrid>
        {/* Hero Grid */}
        <Reveal className="[grid-area:hero]">
          <HeroCell />
        </Reveal>
        <Reveal className="[grid-area:metric-a]" delay={0.05}>
          <ResidencesMetricCell />
        </Reveal>
        <Reveal className="[grid-area:metric-b]" delay={0.1}>
          <HandoverMetricCell />
        </Reveal>
        <Reveal className="[grid-area:location]" delay={0.15}>
          <LocationCell />
        </Reveal>

        {/* Lifestyle Grid */}
        <Reveal className="[grid-area:technology]">
          <TechnologyCell />
        </Reveal>
        <Reveal className="[grid-area:facility-1]" delay={0.05}>
          <IconTileCell id="facilities" item={facilitySpa} />
        </Reveal>
        <Reveal className="[grid-area:facility-2]" delay={0.1}>
          <IconTileCell item={facilityPerformance} />
        </Reveal>
        <Reveal className="[grid-area:facility-3]" delay={0.05}>
          <IconTileCell item={facilityLounge} />
        </Reveal>
        <Reveal className="[grid-area:facility-4]" delay={0.1}>
          <IconTileCell item={facilityCafe} />
        </Reveal>

        {/* Data Grid */}
        <Reveal className="[grid-area:invest-header]">
          <SectionHeader
            id="investment"
            eyebrow={investmentIntro.eyebrow}
            title={investmentIntro.heading}
            description={investmentIntro.description}
          />
        </Reveal>
        <Reveal className="[grid-area:invest-yield]">
          <YieldStatCell />
        </Reveal>
        <Reveal className="[grid-area:invest-appreciation]" delay={0.05}>
          <AppreciationStatCell />
        </Reveal>
        <Reveal className="[grid-area:invest-payment]" delay={0.1}>
          <PaymentPlanCell />
        </Reveal>
        <Reveal className="[grid-area:invest-turnkey]" delay={0.15}>
          <IconTileCell item={turnkeyItem} />
        </Reveal>

        {/* Layout Grid */}
        <Reveal className="[grid-area:unit-types]">
          <UnitTypesCell />
        </Reveal>

        {/* Gallery */}
        <Reveal className="[grid-area:gallery]">
          <GalleryCell />
        </Reveal>

        {/* Closing Grid */}
        <Reveal className="[grid-area:developer]">
          <DeveloperCell />
        </Reveal>
        <Reveal className="[grid-area:tour-form]" delay={0.05}>
          <TourForm />
        </Reveal>
      </BentoGrid>
    </div>
  )
}
