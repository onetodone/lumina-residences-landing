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
  heroPoster: slot('Lumina Residences twin towers at dusk, viewed from the harbor', 1920, 1080),
  heroVideo: { src: null as string | null },
  aura: slot('Aura rooftop restaurant interior at night, city lights beyond', 1200, 1500),
  wellness: slot('Infinity pool and wellness club at dusk', 1200, 1500),
  smartHomeApp: slot('Resident app climate and lighting controls on a phone screen', 750, 1624),
  architecture: slot('Facade detail of the Lumina Residences North tower', 1200, 1500),
  gallery: Array.from({ length: 8 }, (_, index) => slot(`Lumina Residences gallery image ${index + 1}`, 1600, 1200)),
}
