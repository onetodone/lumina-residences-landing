import type { ReactNode } from 'react'
import { BentoCard } from '@/components/bento/BentoCard'
import { Counter } from '@/components/motion/Counter'
import { completion, keyFigures } from '@/content/stats'
import { eyebrowClassName } from './cell-styles'

type MetricCellProps = {
  eyebrow: string
  value: ReactNode
  label: string
}

function MetricCell({ eyebrow, value, label }: MetricCellProps) {
  return (
    <BentoCard className="flex h-full flex-col justify-center gap-2 p-5 md:p-6">
      <span className={eyebrowClassName}>{eyebrow}</span>
      <p className="text-foreground font-serif text-3xl md:text-4xl">{value}</p>
      <p className="text-muted-foreground text-xs tracking-wide uppercase">{label}</p>
    </BentoCard>
  )
}

const residencesFigure = keyFigures.find((figure) => figure.id === 'residences')!

export function ResidencesMetricCell() {
  return (
    <MetricCell
      eyebrow="Key Figures"
      value={
        <Counter value={residencesFigure.value} decimals={residencesFigure.decimals} suffix={residencesFigure.suffix} />
      }
      label={residencesFigure.label}
    />
  )
}

export function HandoverMetricCell() {
  return <MetricCell eyebrow="Handover" value={completion.label} label={completion.caption} />
}
