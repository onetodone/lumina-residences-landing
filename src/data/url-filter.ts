import type { ResidenceFilter, TowerName } from './types'

const TOWER_VALUES: TowerName[] = ['North', 'South']

/** Pure encode/decode between ResidenceFilter and URL search params — no Next.js navigation APIs here, so it's unit-testable in isolation. Sprint 4 wires a `useSearchParams`-based hook (wrapped in `<Suspense>`) around these functions for the Residences cell. */
export function filterToSearchParams(filter: ResidenceFilter): URLSearchParams {
  const params = new URLSearchParams()

  if (filter.tower) params.set('tower', filter.tower)
  if (filter.bedrooms && filter.bedrooms.length > 0) params.set('bedrooms', filter.bedrooms.join(','))
  if (filter.priceMin !== undefined) params.set('priceMin', String(filter.priceMin))
  if (filter.priceMax !== undefined) params.set('priceMax', String(filter.priceMax))
  if (filter.floorMin !== undefined) params.set('floorMin', String(filter.floorMin))
  if (filter.floorMax !== undefined) params.set('floorMax', String(filter.floorMax))

  return params
}

function parseIntParam(params: URLSearchParams, key: string): number | undefined {
  const raw = params.get(key)
  if (raw === null) return undefined
  const value = Number.parseInt(raw, 10)
  return Number.isFinite(value) ? value : undefined
}

export function searchParamsToFilter(params: URLSearchParams): ResidenceFilter {
  const filter: ResidenceFilter = {}

  const tower = params.get('tower')
  if (tower && TOWER_VALUES.includes(tower as TowerName)) {
    filter.tower = tower as TowerName
  }

  const bedroomsRaw = params.get('bedrooms')
  if (bedroomsRaw) {
    const bedrooms = bedroomsRaw
      .split(',')
      .map((value) => Number.parseInt(value, 10))
      .filter((value) => Number.isFinite(value))
    if (bedrooms.length > 0) filter.bedrooms = bedrooms
  }

  const priceMin = parseIntParam(params, 'priceMin')
  if (priceMin !== undefined) filter.priceMin = priceMin

  const priceMax = parseIntParam(params, 'priceMax')
  if (priceMax !== undefined) filter.priceMax = priceMax

  const floorMin = parseIntParam(params, 'floorMin')
  if (floorMin !== undefined) filter.floorMin = floorMin

  const floorMax = parseIntParam(params, 'floorMax')
  if (floorMax !== undefined) filter.floorMax = floorMax

  return filter
}
