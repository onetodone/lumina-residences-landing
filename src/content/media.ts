export type MediaSlot = {
  src: string | null
  alt: string
  width: number
  height: number
}

function slot(alt: string, width: number, height: number, src: string | null = null): MediaSlot {
  return { src, alt, width, height }
}

export const media = {
  heroPoster: slot(
    'Lumina Residences twin towers at dusk, viewed from the harbor',
    1920,
    1080,
    '/media/hero-poster.jpg',
  ),
  heroVideo: { src: '/media/hero-video.mp4' as string | null },
  facilities: slot('The Sanctuary Spa and wellness deck at dusk', 1200, 1500),
}
