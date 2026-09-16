import Image from 'next/image'
import type { MediaSlot as MediaSlotData } from '@/content/media'
import { cn } from '@/lib/utils'

type MediaSlotProps = {
  slot: MediaSlotData
  className?: string
  /** Slow scale animation (transform only, disabled under reduced motion) — for ambient background imagery. */
  kenBurns?: boolean
  priority?: boolean
  sizes?: string
}

/**
 * Renders the real image when `slot.src` is set, otherwise an elegant
 * gradient + noise fallback — every media slot must degrade gracefully
 * rather than showing a broken image (SPEC.md section 6).
 */
export function MediaSlot({ slot, className, kenBurns, priority, sizes = '100vw' }: MediaSlotProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', kenBurns && 'ken-burns')}
        />
      ) : (
        <div aria-hidden className={cn('absolute inset-0', kenBurns && 'ken-burns')}>
          <div className="from-graphite via-obsidian to-graphite absolute inset-0 bg-gradient-to-br" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--gold-soft),transparent_60%)]" />
          <div className="noise-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay" />
        </div>
      )}
    </div>
  )
}
