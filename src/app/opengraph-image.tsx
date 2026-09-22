import { ImageResponse } from 'next/og'

export const alt = 'Lumina Residences — Web Developer Portfolio by OneToDone'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const OG_TEXT = 'Lumina Residences'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        background: 'linear-gradient(135deg, #0A0A0B 0%, #141416 100%)',
        color: '#F5F3EF',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 88,
          fontFamily: 'serif',
        }}
      >
        {OG_TEXT}
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'sans-serif',
          fontSize: 28,
          color: '#9A9691',
        }}
      >
        Elevated Living. Defined by Design.
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'sans-serif',
          fontSize: 22,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#C9A96E',
        }}
      >
        Portfolio Case by OneToDone
      </div>
    </div>,
    {
      ...size,
    },
  )
}
