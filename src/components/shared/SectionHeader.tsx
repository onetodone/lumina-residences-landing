import type { ReactNode } from 'react'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeader({ id, eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div id={id} className={cn('mt-4 flex flex-col gap-6 px-5 md:px-6', className)}>
      <div className="max-w-2xl">
        <p className={eyebrowClassName}>{eyebrow}</p>
        <h2 className="text-foreground mt-2 font-serif text-xl md:text-2xl">{title}</h2>
        {description && <p className="text-muted-foreground mt-2 max-w-xl text-sm">{description}</p>}
      </div>
    </div>
  )
}
