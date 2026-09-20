import { BentoCard } from '@/components/bento/BentoCard'
import { investmentHighlights } from '@/content/investment'
import { eyebrowClassName, featureIcons } from './cell-styles'

const paymentItem = investmentHighlights.find((item) => item.id === 'payment-plan')!

/** Flexible Payment Plan tile — 40% construction / 60% handover as a horizontal timeline (NEW_STRUCTURE.md "Investment Model"). */
export function PaymentPlanCell() {
  const Icon = featureIcons[paymentItem.icon]

  return (
    <BentoCard className="flex h-full flex-col justify-center gap-4 p-5 md:p-6">
      <div className="flex items-center gap-2">
        {Icon && <Icon aria-hidden className="text-gold size-5" />}
        <p className={eyebrowClassName}>{paymentItem.name}</p>
      </div>

      <div aria-hidden className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div className="bg-gold-soft h-full" style={{ width: '40%' }} />
        <div className="bg-gold h-full" style={{ width: '60%' }} />
      </div>
      <dl className="flex justify-between text-xs">
        <div>
          <dt className="text-muted-foreground tracking-wide uppercase">During construction</dt>
          <dd className="text-foreground mt-0.5 font-serif text-lg">40%</dd>
        </div>
        <div className="text-right">
          <dt className="text-muted-foreground tracking-wide uppercase">On handover</dt>
          <dd className="text-foreground mt-0.5 font-serif text-lg">60%</dd>
        </div>
      </dl>

      <p className="text-muted-foreground text-xs">{paymentItem.description}</p>
    </BentoCard>
  )
}
