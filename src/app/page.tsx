import { BentoGrid } from '@/components/bento/BentoGrid'
import { BentoCard } from '@/components/bento/BentoCard'
import { ExpandableCard } from '@/components/bento/ExpandableCard'
import { Reveal } from '@/components/motion/Reveal'
import { Counter } from '@/components/motion/Counter'
import { KineticText } from '@/components/motion/KineticText'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { Button } from '@/components/ui/button'

const eyebrow = 'text-gold text-xs tracking-[0.2em] uppercase'

const availableResidences = [
  { unit: 'N-1204', beds: '2 Bed', floor: 12, status: 'Available' },
  { unit: 'S-0806', beds: '1 Bed', floor: 8, status: 'Available' },
  { unit: 'N-2701', beds: '3 Bed', floor: 27, status: 'Reserved' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-32 pb-24 md:px-16 md:pt-40">
      <p className={eyebrow}>Harbor Quarter · Aveline</p>
      <h1 className="text-foreground mt-4 max-w-3xl font-serif text-4xl md:text-6xl">
        <KineticText text="Lumina Residences" />
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl">
        Sprint 2 demo grid: BentoGrid, BentoCard, ExpandableCard, and the motion helpers, laid out with placeholder
        cells so all three breakpoints can be checked before real content lands in Sprint 4–5.
      </p>

      <BentoGrid className="mt-16">
        <Reveal className="[grid-area:hero]">
          <BentoCard className="flex flex-col justify-between p-6 md:p-8">
            <span className={eyebrow}>Hero</span>
            <div>
              <p className="font-serif text-2xl md:text-3xl">Elevated Living</p>
              <MagneticButton className="mt-6">
                <Button>Schedule a Private Tour</Button>
              </MagneticButton>
            </div>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:stats]" delay={0.05}>
          <BentoCard className="flex flex-col justify-center gap-1 p-6">
            <span className={eyebrow}>Key figures</span>
            <p className="font-serif text-4xl">
              <Counter value={214} />
            </p>
            <p className="text-muted-foreground text-sm">Residences</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:residences]" delay={0.1}>
          <ExpandableCard
            layoutId="residences-card"
            label="Residences & Availability"
            className="p-6 text-left"
            trigger={
              <div className="flex h-full flex-col justify-between">
                <span className={eyebrow}>Residences</span>
                <div>
                  <p className="font-serif text-xl">3 units available</p>
                  <p className="text-muted-foreground text-sm">Tap to filter by bedrooms, price, and tower</p>
                </div>
              </div>
            }
          >
            <span className={eyebrow}>Residences</span>
            <h3 className="mt-2 font-serif text-3xl">Availability</h3>
            <ul className="mt-8 flex flex-col gap-3">
              {availableResidences.map((residence) => (
                <li
                  key={residence.unit}
                  className="border-border flex items-center justify-between border-b pb-3 text-sm"
                >
                  <span>
                    {residence.unit} · {residence.beds} · Floor {residence.floor}
                  </span>
                  <span className={residence.status === 'Available' ? 'text-status-available' : 'text-status-reserved'}>
                    {residence.status}
                  </span>
                </li>
              ))}
            </ul>
          </ExpandableCard>
        </Reveal>

        <Reveal className="[grid-area:aura]" delay={0.15}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Aura</span>
            <p className="font-serif text-xl">Rooftop dining, 38th floor</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:wellness]" delay={0.05}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Wellness</span>
            <p className="font-serif text-xl">Infinity pool · Gym · Cryo-sauna · Hammam · Yoga</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:smart-home]" delay={0.1}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Smart Home</span>
            <p className="font-serif text-xl">Climate · Lighting · Blinds · Access</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:architecture]" delay={0.15}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Architecture</span>
            <p className="font-serif text-xl">LEED Gold target facade</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:location]" delay={0.2}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Location</span>
            <p className="font-serif text-xl">Beach 6 min · Business center 12 min · Airport 25 min</p>
          </BentoCard>
        </Reveal>

        <Reveal className="[grid-area:concierge]" delay={0.25}>
          <BentoCard className="flex flex-col justify-between p-6">
            <span className={eyebrow}>Concierge & Parking</span>
            <p className="font-serif text-xl">24/7 concierge · EV parking</p>
          </BentoCard>
        </Reveal>
      </BentoGrid>
    </div>
  )
}
