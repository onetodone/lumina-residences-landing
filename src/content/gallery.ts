import { media } from './media'

export type GallerySpan = 'hero' | 'normal'

export type GalleryImage = {
  /** Also used as the grid-area name at md+ (explicit layout) — see `.gallery-grid` in globals.css. */
  id: string
  media: (typeof media)['gallery01']
  /** Mobile-only span (dense auto-flow, 2 columns) — see `spanClassName` in `GalleryCell.tsx`. */
  span: GallerySpan
}

/**
 * Gallery cell images, placed after Floor Plans, in upload order
 * (`gallery01`..`gallery09`) — matches the numbering used when the grid
 * layout was specified. `facade` is the one oversized hero tile in the
 * `.gallery-grid` layout; everything else is a single cell there.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'facade', media: media.gallery01, span: 'hero' },
  { id: 'balcony', media: media.gallery02, span: 'normal' },
  { id: 'living', media: media.gallery03, span: 'normal' },
  { id: 'kitchen', media: media.gallery04, span: 'normal' },
  { id: 'sofa', media: media.gallery05, span: 'normal' },
  { id: 'cafe', media: media.gallery06, span: 'normal' },
  { id: 'coworking', media: media.gallery07, span: 'normal' },
  { id: 'spa', media: media.gallery08, span: 'normal' },
  { id: 'studio', media: media.gallery09, span: 'normal' },
]
