import { Suspense } from 'react'
import { bentoCardClassName } from '@/components/bento/BentoCard'
import { cn } from '@/lib/utils'
import { eyebrowClassName } from './cell-styles'
import { ResidencesPanel } from './ResidencesPanel'

function ResidencesSkeleton() {
  return (
    <div aria-hidden className={cn(bentoCardClassName, 'flex flex-col justify-between p-6')}>
      <span className={eyebrowClassName}>Residences</span>
      <div className="flex flex-col gap-2">
        <div className="h-9 w-28 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        <div className="h-4 w-44 animate-pulse rounded bg-white/5 motion-reduce:animate-none" />
      </div>
    </div>
  )
}

/**
 * `ResidencesPanel` reads `useSearchParams`, so it is wrapped in `<Suspense>`
 * here — required so the page stays statically renderable (SPEC.md section 5).
 */
export function ResidencesCell() {
  return (
    <Suspense fallback={<ResidencesSkeleton />}>
      <ResidencesPanel />
    </Suspense>
  )
}
