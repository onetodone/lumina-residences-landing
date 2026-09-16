import type { Residence, ResidenceFilter } from './types'

/** Pure filter predicate — no I/O, unit-tested directly in tests/data/filter.test.ts. */
export function filterResidences(residences: Residence[], filter: ResidenceFilter = {}): Residence[] {
  return residences.filter((residence) => {
    if (filter.tower && residence.tower !== filter.tower) return false
    if (filter.bedrooms && filter.bedrooms.length > 0 && !filter.bedrooms.includes(residence.bedrooms)) {
      return false
    }
    if (filter.priceMin !== undefined && residence.priceUsd < filter.priceMin) return false
    if (filter.priceMax !== undefined && residence.priceUsd > filter.priceMax) return false
    if (filter.floorMin !== undefined && residence.floor < filter.floorMin) return false
    if (filter.floorMax !== undefined && residence.floor > filter.floorMax) return false
    return true
  })
}
