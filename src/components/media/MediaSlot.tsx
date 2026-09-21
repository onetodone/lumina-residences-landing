import Image from 'next/image'
import type { MediaSlot as MediaSlotData } from '@/content/media'
import { cn } from '@/lib/utils'
import { GradientNoiseBackground } from './GradientNoiseBackground'

type MediaSlotProps = {
  slot: MediaSlotData
  className?: string
  priority?: boolean
  sizes?: string
}

/**
 * Renders the real image when `slot.src` is set, otherwise an elegant
 * gradient + noise fallback — every media slot must degrade gracefully
 * rather than showing a broken image (SPEC.md section 6).
 */
export function MediaSlot({ slot, className, priority, sizes = '100vw' }: MediaSlotProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />
      ) : (
        <GradientNoiseBackground />
      )}
    </div>
  )
}
