/** Stylized SVG map for the Location cell — coordinates are percentages within a 350×100 viewBox, not real geography. */
export type LocationMarker = {
  id: string
  label: string
  travelTime: string
  x: number
  y: number
}

export const siteMarker = { label: 'Lumina Residences', x: 132, y: 58 }

export const locationMarkers: LocationMarker[] = [
  { id: 'cbd', label: 'Central Business District', travelTime: '5 min', x: 80, y: 22 },
  { id: 'retail', label: 'Retail & Dining', travelTime: '10 min', x: 248, y: 34 },
  { id: 'airport', label: 'International Airport', travelTime: '15 min', x: 58, y: 82 },
]

export const locationCaption = "An oasis of calm, just steps away from the city's pulse."
