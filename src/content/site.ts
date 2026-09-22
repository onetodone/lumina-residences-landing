export const siteConfig = {
  name: 'Lumina Residences',
  nameShort: 'Lumina',
  tagline: 'Elevated Living. Defined by Design.',
  details:
    'Discover Lumina Residences — an exclusive boutique development where minimalist aesthetics meet intelligent living, framed by 3.2m floor-to-ceiling windows. Experience a sanctuary of restrained luxury, meticulously crafted for the modern urbanite.',
  description:
    'A fictional luxury real-estate landing page built as a front-end portfolio case by OneToDone (Anton Holubeu): a Bento Grid 2.0 layout, shared-layout motion, and glassmorphism UI in Next.js, TypeScript, and Tailwind CSS.',
  developer: 'Aura Development Group',
  developerBlurb:
    'Pioneering the next generation of real estate. Aura Development Group specializes in boutique, design-led residential projects that challenge the status quo.',
}

/** The real studio behind this case — used in SEO metadata, structured data, and the footer credit. */
export const studioConfig = {
  name: 'OneToDone',
  founder: 'Anton Holubeu',
  role: 'Web Developer Back-end, Front-end, and UI engineering studio',
  telegram: 'https://t.me/onetodone',
  linkedin: 'https://www.linkedin.com/in/anton-holubeu/',
}

export const navLinks = [
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Investment', href: '#investment' },
  { label: 'Unit Types', href: '#unit-types' },
  { label: 'Contact', href: '#tour' },
] as const

export const ctaLabel = 'Book a Tour'
