import type { Residence, ResidenceStatus, ResidenceType, Tower, TowerName } from './types'

/** Fixed seed keeps the generated dataset identical on every run/build. */
const SEED = 20_270_401

const TOWERS: Tower[] = [
  { name: 'North', floors: 38 },
  { name: 'South', floors: 32 },
]

const RESIDENCE_COUNT = 60

interface TypeSpec {
  type: ResidenceType
  bedrooms: number
  areaSqmRange: [number, number]
  pricePerSqmRange: [number, number]
  /** Only assignable on floors at or above this fraction of the tower's height. */
  minFloorFraction: number
  weight: number
}

const TYPE_SPECS: TypeSpec[] = [
  {
    type: 'studio',
    bedrooms: 0,
    areaSqmRange: [42, 55],
    pricePerSqmRange: [8800, 9600],
    minFloorFraction: 0,
    weight: 15,
  },
  {
    type: '1-bed',
    bedrooms: 1,
    areaSqmRange: [62, 85],
    pricePerSqmRange: [9200, 10200],
    minFloorFraction: 0,
    weight: 30,
  },
  {
    type: '2-bed',
    bedrooms: 2,
    areaSqmRange: [95, 130],
    pricePerSqmRange: [9600, 10800],
    minFloorFraction: 0,
    weight: 30,
  },
  {
    type: '3-bed',
    bedrooms: 3,
    areaSqmRange: [140, 190],
    pricePerSqmRange: [10200, 11600],
    minFloorFraction: 0.3,
    weight: 17,
  },
  {
    type: 'penthouse',
    bedrooms: 4,
    areaSqmRange: [220, 320],
    pricePerSqmRange: [13500, 16000],
    minFloorFraction: 0.9,
    weight: 8,
  },
]

const STATUS_WEIGHTS: [ResidenceStatus, number][] = [
  ['available', 55],
  ['reserved', 20],
  ['sold', 25],
]

/** Mulberry32: small deterministic PRNG so the dataset is stable across runs. */
function createRng(seed: number) {
  let state = seed
  return function next(): number {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickWeighted<T>(rng: () => number, entries: [T, number][]): T {
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0)
  let roll = rng() * total
  for (const [value, weight] of entries) {
    roll -= weight
    if (roll <= 0) return value
  }
  return entries[entries.length - 1][0]
}

function pickTypeForFloor(rng: () => number, floorFraction: number): TypeSpec {
  const eligible = TYPE_SPECS.filter((spec) => floorFraction >= spec.minFloorFraction)
  return pickWeighted(
    rng,
    eligible.map((spec): [TypeSpec, number] => [spec, spec.weight]),
  )
}

function randomInRange(rng: () => number, [min, max]: [number, number]): number {
  return min + rng() * (max - min)
}

function unitLetterForIndex(index: number): string {
  return String.fromCharCode('A'.charCodeAt(0) + (index % 6))
}

/** Exported so tests can verify determinism by calling it more than once. */
export function generateResidences(): Residence[] {
  const rng = createRng(SEED)
  const residences: Residence[] = []
  const unitIndexByTowerFloor = new Map<string, number>()

  for (let i = 0; i < RESIDENCE_COUNT; i += 1) {
    const tower = TOWERS[Math.floor(rng() * TOWERS.length)]
    const floor = 1 + Math.floor(rng() * tower.floors)
    const floorFraction = floor / tower.floors

    const spec = pickTypeForFloor(rng, floorFraction)
    const areaSqm = Math.round(randomInRange(rng, spec.areaSqmRange))
    const pricePerSqm = randomInRange(rng, spec.pricePerSqmRange)
    const priceUsd = Math.round((areaSqm * pricePerSqm) / 1000) * 1000
    const status = pickWeighted(rng, STATUS_WEIGHTS)

    const towerFloorKey = `${tower.name}-${floor}`
    const unitIndex = unitIndexByTowerFloor.get(towerFloorKey) ?? 0
    unitIndexByTowerFloor.set(towerFloorKey, unitIndex + 1)

    const towerInitial = tower.name === 'North' ? 'N' : 'S'
    const unit = `${unitLetterForIndex(unitIndex)}`

    residences.push({
      id: `${towerInitial}-${floor}-${unit}`,
      tower: tower.name as TowerName,
      floor,
      unit,
      type: spec.type,
      bedrooms: spec.bedrooms,
      areaSqm,
      priceUsd,
      status,
    })
  }

  return residences.sort((a, b) => a.tower.localeCompare(b.tower) || a.floor - b.floor || a.unit.localeCompare(b.unit))
}

export const mockResidences: Residence[] = generateResidences()
