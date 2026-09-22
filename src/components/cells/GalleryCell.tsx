'use client'

import { useEffect, useRef } from 'react'
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { BentoCard } from '@/components/bento/BentoCard'
import { MediaSlot } from '@/components/media/MediaSlot'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { galleryImages, type GallerySpan } from '@/content/gallery'
import { cn } from '@/lib/utils'

// Scoped with `max-md:` so these don't fight the explicit `grid-area` placement below 768px — see `.gallery-grid` in globals.css.
const spanClassName: Record<GallerySpan, string> = {
  normal: 'max-md:col-span-1 max-md:row-span-1',
  hero: 'max-md:col-span-2 max-md:row-span-2',
}

// One literal `md:[grid-area:*]` utility per image id (Tailwind needs the full class string to appear verbatim to generate it) — id doubles as the grid-area name, see content/gallery.ts.
const areaClassName: Record<string, string> = {
  facade: 'md:[grid-area:facade]',
  balcony: 'md:[grid-area:balcony]',
  living: 'md:[grid-area:living]',
  kitchen: 'md:[grid-area:kitchen]',
  sofa: 'md:[grid-area:sofa]',
  cafe: 'md:[grid-area:cafe]',
  coworking: 'md:[grid-area:coworking]',
  spa: 'md:[grid-area:spa]',
  studio: 'md:[grid-area:studio]',
}

/** Gallery cell: masonry grid of resident/amenity photos, opening in a Fancybox lightbox (toolbar: counter left, zoom/fullscreen/close right). Placed after Unit Types. */
export function GalleryCell() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    Fancybox.bind(container, '[data-fancybox="residence-gallery"]', {
      theme: 'dark',
      Hash: false,
      Carousel: {
        Toolbar: {
          display: {
            left: ['counter'],
            middle: [],
            right: ['zoomIn', 'zoomOut', 'close'],
          },
        },
      },
    })

    return () => Fancybox.unbind(container)
  }, [])

  return (
    <div id="gallery" className="flex flex-col gap-5">
      <SectionHeader eyebrow="Gallery" title="A Closer Look. Every Detail Matters." />

      <BentoCard className="p-5 md:p-6">
        <div ref={containerRef} className="gallery-grid">
          {galleryImages.map((image) => (
            <a
              key={image.id}
              href={image.media.src ?? undefined}
              data-fancybox="residence-gallery"
              data-caption={image.media.alt}
              aria-label={image.media.alt}
              className={cn(
                'border-border rounded-control focus-visible:ring-ring/50 group relative block overflow-hidden border outline-none focus-visible:ring-3',
                spanClassName[image.span],
                areaClassName[image.id],
              )}
            >
              <MediaSlot
                slot={image.media}
                className="motion-safe:transition-transform motion-safe:duration-(--duration-slow) motion-safe:group-hover:scale-105"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </a>
          ))}
        </div>
      </BentoCard>
    </div>
  )
}
