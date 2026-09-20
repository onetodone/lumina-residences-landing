/**
 * Location cell map data — edit here to change the project pin or the
 * nearby points of interest shown on the interactive map.
 */

export type PointOfInterestCategory = 'restaurant' | 'beach' | 'shopping'

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
    id: 'restaurant-amber-grove',
    name: 'The Amber Grove',
    category: 'restaurant',
    coordinates: [98.2825, 7.9438],
  },
  {
    id: 'restaurant-salt-and-lime',
    name: 'Salt & Lime Kitchen',
    category: 'restaurant',
    coordinates: [98.2779, 7.9491],
  },
  {
    id: 'beach-sirocco',
    name: 'Sirocco Beach',
    category: 'beach',
    coordinates: [98.269, 7.948],
  },
  {
    id: 'mall-bluewater-galleria',
    name: 'Bluewater Galleria',
    category: 'shopping',
    coordinates: [98.284, 7.951],
  },
]

/** Mapbox dark theme — swap for a custom Mapbox Studio style URL if the brand ever gets one. */
export const MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/dark-v11'

export const MAPBOX_PREVIEW_ZOOM = 13.5
export const MAPBOX_INTERACTIVE_ZOOM = 13
