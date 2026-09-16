import {
  BatteryCharging,
  BellRing,
  CarFront,
  Droplets,
  Dumbbell,
  Flower2,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Waves,
  type LucideIcon,
} from 'lucide-react'

/** Shared eyebrow label style — small uppercase gold caption used at the top of every bento cell. */
export const eyebrowClassName = 'text-gold text-xs tracking-[0.2em] uppercase'

/** Maps `Amenity.icon` string values (content/amenities.ts) to their lucide-react component. */
export const amenityIcons: Record<string, LucideIcon> = {
  Waves,
  Dumbbell,
  Snowflake,
  Droplets,
  Flower2,
  BellRing,
  Sparkles,
  CarFront,
  BatteryCharging,
  ShieldCheck,
}
