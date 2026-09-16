import { Inter, Instrument_Serif } from 'next/font/google'

export const sans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const serif = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})
