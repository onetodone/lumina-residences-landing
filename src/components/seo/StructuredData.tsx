import { siteConfig, studioConfig } from '@/content/site'

/**
 * JSON-LD for the case. Deliberately typed as CreativeWork (not
 * RealEstateAgent/Organization) since Lumina Residences and its in-story
 * developer are fictional — only the real author/studio info below is factual.
 */
export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${siteConfig.name} — Portfolio Case`,
    description: siteConfig.description,
    ...(siteUrl && { url: siteUrl }),
    genre: 'Web design & front-end development portfolio case',
    keywords: 'Next.js, React, TypeScript, Tailwind CSS, UI animation, Bento Grid, front-end development',
    author: {
      '@type': 'Person',
      name: studioConfig.founder,
      url: studioConfig.linkedin,
      sameAs: [studioConfig.linkedin, studioConfig.telegram],
      worksFor: {
        '@type': 'Organization',
        name: studioConfig.name,
        url: studioConfig.telegram,
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
