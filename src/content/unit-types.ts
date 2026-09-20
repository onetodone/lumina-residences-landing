import { media } from './media'

export type UnitCategory = 'studio' | '1-bed' | '2-bed'

export type UnitType = {
  type: UnitCategory
  name: string
  areaSqm: number
  description: string
  media: (typeof media)['gallery01']
}

export const unitTypes: UnitType[] = [
  {
    type: 'studio',
    name: 'The Studio',
    areaSqm: 45,
    description:
      'A masterclass in spatial efficiency. Features a custom room-divider system, a concealed galley kitchen, and a private balcony. Perfect for young professionals or short-term rental investors.',
    media: media.gallery09,
  },
  {
    type: '1-bed',
    name: 'The 1-Bedroom',
    areaSqm: 72,
    description:
      'Designed for flow. Offers an open-plan living and dining area, a walk-in wardrobe, and a dual-access en-suite bathroom.',
    media: media.gallery05,
  },
  {
    type: '2-bed',
    name: 'The 2-Bedroom',
    areaSqm: 105,
    description:
      "The pinnacle of boutique living. Features a sprawling corner-aspect living room, a chef's kitchen with a natural stone island, and a master suite with a freestanding soaking tub.",
    media: media.gallery04,
  },
]
