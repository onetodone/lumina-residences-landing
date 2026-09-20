import { BentoCard } from '@/components/bento/BentoCard'
import { investmentHighlights } from '@/content/investment'
import { eyebrowClassName, featureIcons } from './cell-styles'

type InvestmentStatCardProps = {
  id?: string
  icon: string
  figure: string
  label: string
  description: string
}

/** Decorative ascending sparkline — hints at growth without pulling in a chart library. */
function Sparkline() {
  return (
    <svg viewBox="0 0 80 24" aria-hidden className="text-gold/70 mt-auto h-6 w-full">
      <polyline
        points="0,20 16,16 32,17 48,9 64,10 80,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InvestmentStatCard({ id, icon, figure, label, description }: InvestmentStatCardProps) {
  const Icon = featureIcons[icon]

  return (
    <BentoCard id={id} className="flex h-full flex-col gap-2 p-5 md:p-6">
      {Icon && <Icon aria-hidden className="text-gold size-5" />}
      <p className="text-foreground font-serif text-3xl md:text-4xl">{figure}</p>
      <div>
        <p className={eyebrowClassName}>{label}</p>
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      </div>
      <Sparkline />
    </BentoCard>
  )
}

const yieldItem = investmentHighlights.find((item) => item.id === 'yield')!
const appreciationItem = investmentHighlights.find((item) => item.id === 'appreciation')!

export function YieldStatCell() {
  return (
    <InvestmentStatCard
      id="investment"
      icon={yieldItem.icon}
      figure="8–10%"
      label={yieldItem.name}
      description={yieldItem.description}
    />
  )
}

export function AppreciationStatCell() {
  return (
    <InvestmentStatCard
      icon={appreciationItem.icon}
      figure="+15%"
      label={appreciationItem.name}
      description={appreciationItem.description}
    />
  )
}
