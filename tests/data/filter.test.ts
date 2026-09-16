import { describe, expect, it } from 'vitest'
import { filterResidences } from '@/data/filter'
import type { Residence } from '@/data/types'

const residences: Residence[] = [
  {
    id: 'N-1-A',
    tower: 'North',
    floor: 1,
    unit: 'A',
    type: 'studio',
    bedrooms: 0,
    areaSqm: 48,
    priceUsd: 430_000,
    status: 'available',
  },
  {
    id: 'N-10-B',
    tower: 'North',
    floor: 10,
    unit: 'B',
    type: '2-bed',
    bedrooms: 2,
    areaSqm: 110,
    priceUsd: 1_100_000,
    status: 'reserved',
  },
  {
    id: 'S-5-A',
    tower: 'South',
    floor: 5,
    unit: 'A',
    type: '1-bed',
    bedrooms: 1,
    areaSqm: 70,
    priceUsd: 700_000,
    status: 'sold',
  },
  {
    id: 'S-30-C',
    tower: 'South',
    floor: 30,
    unit: 'C',
    type: 'penthouse',
    bedrooms: 4,
    areaSqm: 280,
    priceUsd: 3_900_000,
    status: 'available',
  },
]

describe('filterResidences', () => {
  it('returns every residence when the filter is empty', () => {
    expect(filterResidences(residences, {})).toHaveLength(4)
    expect(filterResidences(residences)).toHaveLength(4)
  })

  it('filters by tower', () => {
    const result = filterResidences(residences, { tower: 'South' })
    expect(result.map((r) => r.id)).toEqual(['S-5-A', 'S-30-C'])
  })

  it('filters by a set of bedroom counts', () => {
    const result = filterResidences(residences, { bedrooms: [0, 4] })
    expect(result.map((r) => r.id)).toEqual(['N-1-A', 'S-30-C'])
  })

  it('treats an empty bedrooms array as no filter', () => {
    expect(filterResidences(residences, { bedrooms: [] })).toHaveLength(4)
  })

  it('filters by price range (inclusive)', () => {
    const result = filterResidences(residences, { priceMin: 700_000, priceMax: 1_100_000 })
    expect(result.map((r) => r.id)).toEqual(['N-10-B', 'S-5-A'])
  })

  it('filters by floor range (inclusive)', () => {
    const result = filterResidences(residences, { floorMin: 5, floorMax: 10 })
    expect(result.map((r) => r.id)).toEqual(['N-10-B', 'S-5-A'])
  })

  it('combines multiple criteria with AND semantics', () => {
    const result = filterResidences(residences, { tower: 'North', bedrooms: [2] })
    expect(result.map((r) => r.id)).toEqual(['N-10-B'])
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterResidences(residences, { tower: 'North', bedrooms: [4] })).toEqual([])
  })

  it('does not mutate the input array', () => {
    const copy = [...residences]
    filterResidences(residences, { tower: 'North' })
    expect(residences).toEqual(copy)
  })
})
