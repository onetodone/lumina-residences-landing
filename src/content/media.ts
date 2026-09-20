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
  gallery01: slot(
    'Lumina Residences exterior facade, viewed from the landscaped courtyard',
    2752,
    1536,
    '/media/lumina-exterior-01.jpg',
  ),
  gallery02: slot(
    'Lumina Residences exterior at dusk, glass and stone facade detail',
    2752,
    1536,
    '/media/lumina-exterior-02.jpg',
  ),
  gallery03: slot(
    'Residence living area with floor-to-ceiling windows and warm oak flooring',
    2752,
    1536,
    '/media/lumina-room-02.jpg',
  ),
  gallery04: slot(
    'Residence kitchen with a marble island, open-plan living area, and ensuite bathroom beyond',
    2752,
    1536,
    '/media/lumina-room-03.jpg',
  ),
  gallery05: slot(
    'Residence living and dining area with a sectional sofa and garden views',
    2752,
    1536,
    '/media/lumina-room-04.jpg',
  ),
  gallery06: slot('Artisan Café, the ground-floor specialty coffee bar', 2752, 1536, '/media/lumina-cafe.jpg'),
  gallery07: slot('Lumina Lounge & Co-Work resident workspace', 2752, 1536, '/media/lumina-coworking.jpg'),
  gallery08: slot('The Sanctuary Spa thermal suite', 2752, 1536, '/media/lumina-spa.jpg'),
  gallery09: slot(
    'Studio residence with a custom slatted room-divider, open-plan kitchen and living area, and an in-wall smart home panel',
    2752,
    1536,
    '/media/lumina-room-01.jpg',
  ),
}
