/**
 * Location cell map data — edit here to change the project pin or the
 * nearby points of interest shown on the interactive map.
 */

export type PointOfInterestCategory = 'restaurant' | 'beach' | 'shopping' | 'entertainment'

export type PointOfInterest = {
  id: string
  name: string
  category: PointOfInterestCategory
  /** [longitude, latitude] — Mapbox's coordinate order. */
  coordinates: [number, number]
}

export type SiteLocation = {
  name: string
  /** [longitude, latitude] — Mapbox's coordinate order. */
  coordinates: [number, number]
}

/** Fictional Lumina Residences site — Phuket, Thailand. */
export const siteLocation: SiteLocation = {
  name: 'Lumina Residences',
  coordinates: [98.2801714, 7.9463436],
}

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'kamala-beach',
    name: 'Kamala Beach',
    category: 'beach',
    coordinates: [98.2832699504579, 7.958101022647142],
  },
  {
    id: 'surin-beach',
    name: 'Surin Beach',
    category: 'beach',
    coordinates: [98.2783547442865, 7.9757794831630235],
  },
  {
    id: 'villa-market',
    name: 'Villa Market',
    category: 'shopping',
    coordinates: [98.27931457007026, 7.946690359644549],
  },
  {
    id: 'tops-market',
    name: 'Tops Market',
    category: 'shopping',
    coordinates: [98.27975706115899, 7.946654849500348],
  },
  {
    id: 'junge-ceylon',
    name: 'JungeCeylon',
    category: 'shopping',
    coordinates: [98.29987102032442, 7.89038884905537],
  },
  {
    id: 'oasis-spa',
    name: 'Oasis SPA',
    category: 'entertainment',
    coordinates: [98.28915093725118, 7.953577729786943],
  },
  {
    id: 'phuket-fantasy',
    name: 'Phuket Fantasy',
    category: 'entertainment',
    coordinates: [98.28623801001925, 7.956650941361659],
  },
]

/** Mapbox dark theme — swap for a custom Mapbox Studio style URL if the brand ever gets one. */
export const MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/dark-v11'

export const MAPBOX_PREVIEW_ZOOM = 13.5
export const MAPBOX_INTERACTIVE_ZOOM = 13
