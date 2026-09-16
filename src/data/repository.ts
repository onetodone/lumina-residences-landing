import { filterResidences } from './filter'
import { mockResidences } from './mock-residences'
import type { Residence, ResidenceFilter } from './types'

/**
 * Async so a future real API adapter can implement this interface without
 * any UI code changing — components must not depend on the mock being sync.
 */
export interface ResidenceRepository {
  list(filter?: ResidenceFilter): Promise<Residence[]>
  getById(id: string): Promise<Residence | undefined>
}

export class MockResidenceRepository implements ResidenceRepository {
  constructor(private readonly residences: Residence[] = mockResidences) {}

  async list(filter: ResidenceFilter = {}): Promise<Residence[]> {
    return filterResidences(this.residences, filter)
  }

  async getById(id: string): Promise<Residence | undefined> {
    return this.residences.find((residence) => residence.id === id)
  }
}

export const residenceRepository: ResidenceRepository = new MockResidenceRepository()
