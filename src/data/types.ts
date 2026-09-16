export type TowerName = 'North' | 'South'

export interface Tower {
  name: TowerName
  floors: number
}

export type ResidenceStatus = 'available' | 'reserved' | 'sold'

export type ResidenceType = 'studio' | '1-bed' | '2-bed' | '3-bed' | 'penthouse'

export interface Residence {
  id: string
  tower: TowerName
  floor: number
  unit: string
  type: ResidenceType
  bedrooms: number
  areaSqm: number
  priceUsd: number
  status: ResidenceStatus
}

export interface ResidenceFilter {
  tower?: TowerName
  bedrooms?: number[]
  priceMin?: number
  priceMax?: number
  floorMin?: number
  floorMax?: number
}

export interface Amenity {
  id: string
  name: string
  description: string
  icon: string
}
