import { ImageResponse } from 'next/og'

export const alt = 'Lumina Residences — Elevated Living'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const OG_TEXT = 'Lumina Residences'

async function loadInstrumentSerif() {
  try {
    const cssResponse = await fetch(
      `https://fonts.googleapis.com/css2?family=Instrument+Serif&text=${encodeURIComponent(OG_TEXT)}`,
    )
    const css = await cssResponse.text()
    const fontUrl = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
    if (!fontUrl) return null

    const fontResponse = await fetch(fontUrl)
    if (!fontResponse.ok) return null
    return await fontResponse.arrayBuffer()
  } catch {
    return null
  }
}

export default async function Image() {
  const instrumentSerif = await loadInstrumentSerif()

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
          fontFamily: 'sans-serif',
          fontSize: 20,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: '#C9A96E',
        }}
      >
        Harbor Quarter · Aveline
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 88,
          fontFamily: instrumentSerif ? 'Instrument Serif' : 'serif',
        }}
      >
        {OG_TEXT}
      </div>
      <div style={{ display: 'flex', fontFamily: 'sans-serif', fontSize: 28, color: '#9A9691' }}>Elevated Living</div>
    </div>,
    {
      ...size,
      fonts: instrumentSerif ? [{ name: 'Instrument Serif', data: instrumentSerif, style: 'normal', weight: 400 }] : [],
    },
  )
}
