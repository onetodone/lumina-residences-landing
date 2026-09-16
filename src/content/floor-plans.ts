import type { ResidenceType } from '@/data/types'

export type FloorPlan = {
  type: ResidenceType
  name: string
  bedrooms: number
  areaSqm: number
  priceFromUsd: number
  description: string
}

// Area/price figures use the low end of each type's range in src/data/mock-residences.ts, so the
// "from" prices shown here line up with the cheapest unit the generator can actually produce.
export const floorPlans: FloorPlan[] = [
  {
    type: 'studio',
    name: 'Studio',
    bedrooms: 0,
    areaSqm: 46,
    priceFromUsd: 370_000,
    description: 'An efficient open-plan layout with a full-height window wall and a compact kitchenette.',
  },
  {
    type: '1-bed',
    name: '1 Bedroom',
    bedrooms: 1,
    areaSqm: 70,
    priceFromUsd: 570_000,
    description: 'A separate bedroom suite and a living area that opens onto a private balcony.',
  },
  {
    type: '2-bed',
    name: '2 Bedroom',
    bedrooms: 2,
    areaSqm: 108,
    priceFromUsd: 910_000,
    description: 'Two bedrooms flank a dual-aspect living and dining space with a second bathroom.',
  },
  {
    type: '3-bed',
    name: '3 Bedroom',
    bedrooms: 3,
    areaSqm: 155,
    priceFromUsd: 1_430_000,
    description: 'A family layout with a corner living room, a study nook, and a wraparound terrace.',
  },
  {
    type: 'penthouse',
    name: 'Penthouse',
    bedrooms: 4,
    areaSqm: 260,
    priceFromUsd: 2_970_000,
    description: 'Full-floor living with a private rooftop terrace and panoramic harbor views.',
  },
]
