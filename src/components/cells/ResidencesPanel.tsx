'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ExpandableCard } from '@/components/bento/ExpandableCard'
import { residenceRepository } from '@/data/repository'
import { filterToSearchParams, searchParamsToFilter } from '@/data/url-filter'
import type { Residence, ResidenceFilter, ResidenceStatus, ResidenceType, TowerName } from '@/data/types'
import { formatUsd } from '@/lib/format'
import { cn } from '@/lib/utils'
import { eyebrowClassName } from './cell-styles'

const TYPE_LABEL: Record<ResidenceType, string> = {
  studio: 'Studio',
  '1-bed': '1 Bed',
  '2-bed': '2 Bed',
  '3-bed': '3 Bed',
  penthouse: 'Penthouse',
}

const STATUS_LABEL: Record<ResidenceStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
}

const STATUS_CLASS_NAME: Record<ResidenceStatus, string> = {
  available: 'text-status-available',
  reserved: 'text-status-reserved',
  sold: 'text-status-sold',
}

const BEDROOM_OPTIONS = [
  { value: 0, label: 'Studio' },
  { value: 1, label: '1 Bed' },
  { value: 2, label: '2 Bed' },
  { value: 3, label: '3 Bed' },
  { value: 4, label: 'Penthouse' },
] as const

const TOWER_OPTIONS: { value: TowerName | 'any'; label: string }[] = [
  { value: 'any', label: 'Any Tower' },
  { value: 'North', label: 'North' },
  { value: 'South', label: 'South' },
]

// Slider bounds derived from the generator's realistic per-type ranges (see src/data/mock-residences.ts).
const PRICE_MIN = 350_000
const PRICE_MAX = 5_200_000
const PRICE_STEP = 50_000
const FLOOR_MIN = 1
const FLOOR_MAX = 38

function toggleClassName(selected: boolean) {
  return cn(
    'rounded-control border px-3 py-1.5 text-sm transition-colors duration-(--duration-fast)',
    selected ? 'border-gold bg-gold-soft text-foreground' : 'border-border text-muted-foreground hover:text-foreground',
  )
}

/**
 * Expandable filter panel wired to the URL via the Sprint 3 codec
 * (`filterToSearchParams`/`searchParamsToFilter`) — the URL is the single
 * source of truth for the active filter, so results stay shareable/back-
 * button-friendly. Reads `useSearchParams`, so the parent `ResidencesCell`
 * wraps this in `<Suspense>` (SPEC.md section 5).
 */
export function ResidencesPanel() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filter = useMemo(() => searchParamsToFilter(searchParams), [searchParams])

  const [results, setResults] = useState<Residence[]>([])
  const [availableCount, setAvailableCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    residenceRepository.list(filter).then((residences) => {
      if (!cancelled) setResults(residences)
    })
    return () => {
      cancelled = true
    }
  }, [filter])

  useEffect(() => {
    let cancelled = false
    residenceRepository.list().then((residences) => {
      if (!cancelled) setAvailableCount(residences.filter((residence) => residence.status === 'available').length)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const updateFilter = useCallback(
    (next: ResidenceFilter) => {
      const query = filterToSearchParams(next).toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router],
  )

  const toggleBedroom = (value: number) => {
    const current = filter.bedrooms ?? []
    const next = current.includes(value) ? current.filter((bedroom) => bedroom !== value) : [...current, value]
    updateFilter({ ...filter, bedrooms: next.length > 0 ? next : undefined })
  }

  const setTower = (value: TowerName | 'any') => {
    updateFilter({ ...filter, tower: value === 'any' ? undefined : value })
  }

  const hasActiveFilters = Boolean(
    filter.tower ||
    filter.bedrooms?.length ||
    filter.priceMin !== undefined ||
    filter.priceMax !== undefined ||
    filter.floorMin !== undefined ||
    filter.floorMax !== undefined,
  )

  return (
    <ExpandableCard
      layoutId="residences-card"
      label="Residences & Availability"
      className="p-6 text-left"
      trigger={
        <div className="flex h-full flex-col justify-between">
          <span className={eyebrowClassName}>Residences</span>
          <div>
            <p className="text-foreground font-serif text-3xl md:text-4xl">
              {availableCount ?? '—'} <span className="text-muted-foreground text-lg">available</span>
            </p>
            <p className="text-muted-foreground mt-1 text-sm">Tap to filter by bedrooms, price & tower</p>
          </div>
        </div>
      }
    >
      <span className={eyebrowClassName}>Residences</span>
      <h3 className="text-foreground mt-2 font-serif text-3xl">Availability</h3>

      <div className="mt-8 flex flex-col gap-6">
        <fieldset>
          <legend className="text-muted-foreground text-xs tracking-wide uppercase">Tower</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TOWER_OPTIONS.map((option) => {
              const selected = option.value === 'any' ? !filter.tower : filter.tower === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTower(option.value)}
                  className={toggleClassName(selected)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-muted-foreground text-xs tracking-wide uppercase">Bedrooms</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {BEDROOM_OPTIONS.map((option) => {
              const selected = filter.bedrooms?.includes(option.value) ?? false
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleBedroom(option.value)}
                  className={toggleClassName(selected)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <fieldset>
            <legend className="text-muted-foreground text-xs tracking-wide uppercase">Price range</legend>
            <div className="mt-3 flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Min · {formatUsd(filter.priceMin ?? PRICE_MIN)}</span>
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={filter.priceMin ?? PRICE_MIN}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    updateFilter({ ...filter, priceMin: value === PRICE_MIN ? undefined : value })
                  }}
                  className="accent-gold"
                  aria-label="Minimum price"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Max · {formatUsd(filter.priceMax ?? PRICE_MAX)}</span>
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={filter.priceMax ?? PRICE_MAX}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    updateFilter({ ...filter, priceMax: value === PRICE_MAX ? undefined : value })
                  }}
                  className="accent-gold"
                  aria-label="Maximum price"
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-muted-foreground text-xs tracking-wide uppercase">Floor range</legend>
            <div className="mt-3 flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Min · Floor {filter.floorMin ?? FLOOR_MIN}</span>
                <input
                  type="range"
                  min={FLOOR_MIN}
                  max={FLOOR_MAX}
                  value={filter.floorMin ?? FLOOR_MIN}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    updateFilter({ ...filter, floorMin: value === FLOOR_MIN ? undefined : value })
                  }}
                  className="accent-gold"
                  aria-label="Minimum floor"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Max · Floor {filter.floorMax ?? FLOOR_MAX}</span>
                <input
                  type="range"
                  min={FLOOR_MIN}
                  max={FLOOR_MAX}
                  value={filter.floorMax ?? FLOOR_MAX}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    updateFilter({ ...filter, floorMax: value === FLOOR_MAX ? undefined : value })
                  }}
                  className="accent-gold"
                  aria-label="Maximum floor"
                />
              </label>
            </div>
          </fieldset>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {results.length} match{results.length === 1 ? '' : 'es'}
          </p>
          {hasActiveFilters && (
            <button type="button" onClick={() => updateFilter({})} className="text-gold text-sm">
              Reset filters
            </button>
          )}
        </div>
      </div>

      <ul className="divide-border mt-6 flex flex-col divide-y">
        {results.map((residence) => (
          <li key={residence.id} className="flex items-center justify-between gap-4 py-3 text-sm">
            <div>
              <p className="text-foreground">
                {residence.tower}-{residence.floor}
                {residence.unit} · {TYPE_LABEL[residence.type]}
              </p>
              <p className="text-muted-foreground text-xs">
                {residence.areaSqm} m² · {formatUsd(residence.priceUsd)}
              </p>
            </div>
            <span className={cn('shrink-0 text-xs font-medium', STATUS_CLASS_NAME[residence.status])}>
              {STATUS_LABEL[residence.status]}
            </span>
          </li>
        ))}
        {results.length === 0 && (
          <li className="text-muted-foreground py-6 text-center text-sm">No residences match these filters.</li>
        )}
      </ul>
    </ExpandableCard>
  )
}
