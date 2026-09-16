import type { Metadata } from 'next'
import { MotionConfig } from 'motion/react'
import { Header } from '@/components/sections/Header'
import { NoiseOverlay } from '@/components/noise/NoiseOverlay'
import { siteConfig } from '@/content/site'
import { sans, serif } from '@/lib/fonts'
import './globals.css'

const title = `${siteConfig.name} — ${siteConfig.tagline}`

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title,
    description: siteConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body id="top" className="min-h-screen">
        <MotionConfig reducedMotion="user">
          <NoiseOverlay />
          <Header />
          <main>{children}</main>
        </MotionConfig>
      </body>
    </html>
  )
}
