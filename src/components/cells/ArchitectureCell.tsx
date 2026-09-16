import { Leaf } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { MediaSlot } from '@/components/media/MediaSlot'
import { media } from '@/content/media'
import { eyebrowClassName } from './cell-styles'

const facadeMaterials = 'Board-formed concrete, low-iron glass, and bronze-anodized aluminum fins'

/** Architecture cell: design concept, facade materials, sustainability notes (fictional, SPEC.md section 4B.7). */
export function ArchitectureCell() {
  return (
    <BentoCard className="relative flex flex-col justify-end p-6">
      <MediaSlot slot={media.architecture} className="absolute inset-0" sizes="(min-width: 1280px) 33vw, 50vw" />
      <div aria-hidden className="from-obsidian via-obsidian/70 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10">
        <span className={eyebrowClassName}>Architecture</span>
        <p className="text-foreground mt-2 font-serif text-xl">Light, mass, and quiet material honesty</p>
        <p className="text-muted-foreground mt-1 text-sm">{facadeMaterials}</p>
        <div className="border-gold/30 text-gold mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs tracking-wide">
          <Leaf aria-hidden className="size-3.5" />
          LEED Gold target
        </div>
      </div>
    </BentoCard>
  )
}
