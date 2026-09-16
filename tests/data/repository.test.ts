import { describe, expect, it } from 'vitest'
import { MockResidenceRepository } from '@/data/repository'
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
]

describe('MockResidenceRepository', () => {
  it('lists every residence when called with no filter', async () => {
    const repo = new MockResidenceRepository(residences)
    await expect(repo.list()).resolves.toEqual(residences)
  })

  it('applies a filter when listing', async () => {
    const repo = new MockResidenceRepository(residences)
    await expect(repo.list({ tower: 'South' })).resolves.toEqual([residences[1]])
  })

  it('finds a residence by id', async () => {
    const repo = new MockResidenceRepository(residences)
    await expect(repo.getById('N-1-A')).resolves.toEqual(residences[0])
  })

  it('returns undefined for an unknown id', async () => {
    const repo = new MockResidenceRepository(residences)
    await expect(repo.getById('does-not-exist')).resolves.toBeUndefined()
  })
})
