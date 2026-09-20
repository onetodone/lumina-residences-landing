import type { ReactNode } from 'react'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, description, actions, align = 'left', className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-6',
        align === 'center' && 'md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'text-center')}>
        <p className={eyebrowClassName}>{eyebrow}</p>
        <h2 className="text-foreground mt-2 font-serif text-xl md:text-2xl">{title}</h2>
        {description && <p className="text-muted-foreground mt-2 max-w-xl text-sm">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
