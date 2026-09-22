import type { Metadata } from 'next'
import { MotionConfig } from 'motion/react'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { StructuredData } from '@/components/seo/StructuredData'
import { NoiseOverlay } from '@/components/noise/NoiseOverlay'
import { SmartHomeEffects } from '@/components/smart-home/SmartHomeEffects'
import { SmartHomeProvider } from '@/components/smart-home/SmartHomeContext'
import { siteConfig, studioConfig } from '@/content/site'
import { sans, serif } from '@/lib/fonts'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const title = `${siteConfig.name} — Web Developer Portfolio by ${studioConfig.name}`

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js developer',
    'React developer',
    'front-end developer portfolio',
    'UI animation',
    'Bento Grid',
    'TypeScript',
    'Tailwind CSS',
    studioConfig.name,
    studioConfig.founder,
  ],
  authors: [{ name: studioConfig.founder, url: studioConfig.linkedin }],
  creator: studioConfig.founder,
  openGraph: {
    title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} by ${studioConfig.name}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
  },
}

const gaTagId = process.env.NEXT_PUBLIC_GATAG_ID ?? ''

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body id="top" className="min-h-screen">
        <StructuredData />
        <MotionConfig reducedMotion="user">
          <SmartHomeProvider>
            <a
              href="#main-content"
              className="bg-gold text-obsidian rounded-control focus-visible:ring-ring/50 sr-only px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus-visible:ring-3 focus-visible:outline-none"
            >
              Skip to main content
            </a>
            <NoiseOverlay />
            <SmartHomeEffects />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </SmartHomeProvider>
        </MotionConfig>
      </body>
      {gaTagId && <GoogleAnalytics gaId={gaTagId} />}
    </html>
  )
}
