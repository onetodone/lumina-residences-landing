import { Inter, Bodoni_Moda } from 'next/font/google'

export const sans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const serif = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})
