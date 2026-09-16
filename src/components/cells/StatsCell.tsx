import { BentoCard } from '@/components/bento/BentoCard'
import { Counter } from '@/components/motion/Counter'
import { completion, keyFigures } from '@/content/stats'
import { eyebrowClassName } from './cell-styles'

export function StatsCell() {
  return (
    <BentoCard className="flex flex-col justify-center gap-6 p-6 md:p-8">
      <span className={eyebrowClassName}>Key Figures</span>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
        {keyFigures.map((figure) => (
          <div key={figure.id}>
            <dt className="sr-only">{figure.label}</dt>
            <dd className="text-foreground font-serif text-3xl md:text-4xl">
              <Counter value={figure.value} decimals={figure.decimals} suffix={figure.suffix} />
            </dd>
            <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">{figure.label}</p>
          </div>
        ))}
        <div>
          <dt className="sr-only">{completion.caption}</dt>
          <dd className="text-foreground font-serif text-3xl md:text-4xl">{completion.label}</dd>
          <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">{completion.caption}</p>
        </div>
      </dl>
    </BentoCard>
  )
}
