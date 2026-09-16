/** Stylized SVG map for the Location cell (SPEC.md section 4B.8) — coordinates are percentages within a 350×100 viewBox, not real geography. */
export type LocationMarker = {
  id: string
  label: string
  travelTime: string
  x: number
  y: number
}

export const siteMarker = { label: 'Lumina Residences', x: 132, y: 58 }

export const locationMarkers: LocationMarker[] = [
  { id: 'beach', label: 'Beach', travelTime: '6 min walk', x: 248, y: 34 },
  { id: 'business', label: 'Business Center', travelTime: '12 min drive', x: 80, y: 22 },
  { id: 'airport', label: 'Airport', travelTime: '25 min drive', x: 58, y: 82 },
]
