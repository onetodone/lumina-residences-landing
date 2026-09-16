import { describe, expect, it } from 'vitest'
import { generateResidences, mockResidences } from '@/data/mock-residences'

describe('mockResidences', () => {
  it('generates 60 residences', () => {
    expect(mockResidences).toHaveLength(60)
  })

  it('gives every residence a unique id', () => {
    const ids = new Set(mockResidences.map((r) => r.id))
    expect(ids.size).toBe(mockResidences.length)
  })

  it("keeps floors within each tower's real range", () => {
    for (const residence of mockResidences) {
      const maxFloor = residence.tower === 'North' ? 38 : 32
      expect(residence.floor).toBeGreaterThanOrEqual(1)
      expect(residence.floor).toBeLessThanOrEqual(maxFloor)
    }
  })

  it('only places penthouses near the top of their tower', () => {
    for (const residence of mockResidences.filter((r) => r.type === 'penthouse')) {
      const maxFloor = residence.tower === 'North' ? 38 : 32
      expect(residence.floor).toBeGreaterThanOrEqual(Math.floor(maxFloor * 0.9))
    }
  })

  it('gives every residence a positive area and price', () => {
    for (const residence of mockResidences) {
      expect(residence.areaSqm).toBeGreaterThan(0)
      expect(residence.priceUsd).toBeGreaterThan(0)
    }
  })

  it('is deterministic — repeated generator runs produce identical output', () => {
    expect(generateResidences()).toEqual(mockResidences)
  })
})
