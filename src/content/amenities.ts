import type { Amenity } from '@/data/types'

/** Wellness cell — revealed line by line (SPEC.md section 4B.5). Icon values are lucide-react export names. */
export const wellnessAmenities: Amenity[] = [
  { id: 'pool', name: 'Infinity Pool', description: 'Heated, harbor-facing, open until midnight', icon: 'Waves' },
  {
    id: 'gym',
    name: 'Fitness Studio',
    description: 'Free weights, cardio floor, and a Pilates room',
    icon: 'Dumbbell',
  },
  { id: 'cryo', name: 'Cryo-Sauna', description: 'Whole-body cryotherapy and a Finnish sauna', icon: 'Snowflake' },
  { id: 'hammam', name: 'Hammam', description: 'Steam room and hammam ritual suite', icon: 'Droplets' },
  { id: 'yoga', name: 'Yoga Deck', description: 'Open-air studio overlooking the courtyard', icon: 'Flower2' },
]

/** Concierge & Parking cell — two nested sub-tiles (SPEC.md section 4B.9). */
export const conciergeAndParking: Amenity[] = [
  {
    id: 'concierge',
    name: 'Concierge',
    description: '24/7 front desk, housekeeping on request, valet on arrival',
    icon: 'BellRing',
  },
  {
    id: 'parking',
    name: 'Parking',
    description: 'EV charging in every bay, two secure levels below grade',
    icon: 'CarFront',
  },
]
