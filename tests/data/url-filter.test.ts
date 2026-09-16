import { describe, expect, it } from 'vitest'
import { filterToSearchParams, searchParamsToFilter } from '@/data/url-filter'
import type { ResidenceFilter } from '@/data/types'

describe('filterToSearchParams', () => {
  it('produces no params for an empty filter', () => {
    expect(filterToSearchParams({}).toString()).toBe('')
  })

  it('serializes every field', () => {
    const params = filterToSearchParams({
      tower: 'North',
      bedrooms: [1, 2],
      priceMin: 500_000,
      priceMax: 1_500_000,
      floorMin: 3,
      floorMax: 20,
    })
    expect(params.get('tower')).toBe('North')
    expect(params.get('bedrooms')).toBe('1,2')
    expect(params.get('priceMin')).toBe('500000')
    expect(params.get('priceMax')).toBe('1500000')
    expect(params.get('floorMin')).toBe('3')
    expect(params.get('floorMax')).toBe('20')
  })

  it('omits an empty bedrooms array', () => {
    expect(filterToSearchParams({ bedrooms: [] }).has('bedrooms')).toBe(false)
  })
})

describe('searchParamsToFilter', () => {
  it('returns an empty filter for empty params', () => {
    expect(searchParamsToFilter(new URLSearchParams())).toEqual({})
  })

  it('ignores an invalid tower value', () => {
    const filter = searchParamsToFilter(new URLSearchParams('tower=West'))
    expect(filter.tower).toBeUndefined()
  })

  it('parses bedrooms as a numeric array', () => {
    const filter = searchParamsToFilter(new URLSearchParams('bedrooms=0,2,4'))
    expect(filter.bedrooms).toEqual([0, 2, 4])
  })

  it('drops non-numeric bedroom entries', () => {
    const filter = searchParamsToFilter(new URLSearchParams('bedrooms=1,x,3'))
    expect(filter.bedrooms).toEqual([1, 3])
  })

  it('parses numeric range fields', () => {
    const filter = searchParamsToFilter(new URLSearchParams('priceMin=400000&priceMax=900000&floorMin=2&floorMax=15'))
    expect(filter).toEqual({ priceMin: 400_000, priceMax: 900_000, floorMin: 2, floorMax: 15 })
  })

  it('round-trips through filterToSearchParams', () => {
    const original: ResidenceFilter = { tower: 'South', bedrooms: [1, 3], priceMin: 600_000, floorMax: 25 }
    const roundTripped = searchParamsToFilter(filterToSearchParams(original))
    expect(roundTripped).toEqual(original)
  })
})
