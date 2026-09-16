import { BentoCard } from '@/components/bento/BentoCard'
import { Counter } from '@/components/motion/Counter'
import { completion, keyFigures } from '@/content/stats'
import { eyebrowClassName } from './cell-styles'

export function StatsCell() {
  return (
    <BentoCard className="flex flex-col justify-center gap-6 p-6 md:p-8">
      <h2 className={eyebrowClassName}>Key Figures</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
        {keyFigures.map((figure) => (
          // flex-col-reverse keeps the value visually first (dt must precede dd in the DOM for a valid dl group).
          <div key={figure.id} className="flex flex-col-reverse">
            <dt className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">{figure.label}</dt>
            <dd className="text-foreground font-serif text-3xl md:text-4xl">
              <Counter value={figure.value} decimals={figure.decimals} suffix={figure.suffix} />
            </dd>
          </div>
        ))}
        <div className="flex flex-col-reverse">
          <dt className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">{completion.caption}</dt>
          <dd className="text-foreground font-serif text-3xl md:text-4xl">{completion.label}</dd>
        </div>
      </dl>
    </BentoCard>
  )
}
