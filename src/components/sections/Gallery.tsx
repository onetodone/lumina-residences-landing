'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { eyebrowClassName } from '@/components/cells/cell-styles'
import { MediaSlot } from '@/components/media/MediaSlot'
import { media } from '@/content/media'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useHydrated } from '@/lib/hooks/useHydrated'
import { duration, easeLuxury } from '@/lib/motion'
import { cn } from '@/lib/utils'

const GALLERY_LENGTH = media.gallery.length

// Cycles through a few aspect ratios so the multi-column layout reads as a masonry grid.
const ASPECT_CLASSES = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]']

function nextIndex(index: number) {
  return (index + 1) % GALLERY_LENGTH
}

function previousIndex(index: number) {
  return (index - 1 + GALLERY_LENGTH) % GALLERY_LENGTH
}

/** Masonry image grid with a keyboard-accessible lightbox (SPEC.md section 4D). */
export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const mounted = useHydrated()
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dialogRef = useFocusTrap<HTMLDivElement>(activeIndex !== null)

  const close = () => {
    const openedFrom = activeIndex
    setActiveIndex(null)
    if (openedFrom !== null) buttonRefs.current[openedFrom]?.focus()
  }

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current === null ? current : nextIndex(current)))
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current === null ? current : previousIndex(current)))
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close() reads activeIndex via state setter, not a stale closure
  }, [activeIndex])

  return (
    <section id="gallery" className="mx-auto max-w-[1440px] px-6 py-24 md:px-16">
      <span className={eyebrowClassName}>Gallery</span>
      <h2 className="text-foreground mt-2 font-serif text-3xl md:text-4xl">A closer look</h2>

      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4">
        {media.gallery.map((slot, index) => (
          <button
            key={index}
            ref={(element) => {
              buttonRefs.current[index] = element
            }}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image: ${slot.alt}`}
            className={cn(
              'group rounded-card relative mb-4 block w-full break-inside-avoid overflow-hidden',
              ASPECT_CLASSES[index % ASPECT_CLASSES.length],
            )}
          >
            <MediaSlot slot={slot} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
            <span
              aria-hidden
              className="bg-obsidian/0 group-hover:bg-obsidian/20 absolute inset-0 transition-colors duration-(--duration-fast)"
            />
          </button>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                key="gallery-lightbox"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={media.gallery[activeIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.fast, ease: easeLuxury }}
                className="bg-obsidian/95 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm md:p-10"
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close gallery"
                  className="text-muted-foreground hover:text-foreground absolute top-4 right-4 inline-flex size-10 items-center justify-center"
                >
                  <X aria-hidden className="size-6" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current === null ? current : previousIndex(current)))}
                  aria-label="Show previous image"
                  className="text-muted-foreground hover:text-foreground absolute left-2 inline-flex size-10 items-center justify-center md:left-6"
                >
                  <ChevronLeft aria-hidden className="size-7" />
                </button>

                <div className="relative aspect-[4/3] w-full max-w-4xl">
                  <MediaSlot slot={media.gallery[activeIndex]} sizes="90vw" priority />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current === null ? current : nextIndex(current)))}
                  aria-label="Show next image"
                  className="text-muted-foreground hover:text-foreground absolute right-2 inline-flex size-10 items-center justify-center md:right-6"
                >
                  <ChevronRight aria-hidden className="size-7" />
                </button>

                <p className="text-muted-foreground absolute bottom-4 text-sm">
                  {activeIndex + 1} / {GALLERY_LENGTH}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
