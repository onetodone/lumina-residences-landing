import {
  Coffee,
  Dumbbell,
  EyeOff,
  Flower2,
  KeyRound,
  Leaf,
  LineChart,
  Smartphone,
  Sofa,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

/** Shared eyebrow label style — small uppercase gold caption used at the top of bento cells and section headers. */
export const eyebrowClassName = 'text-gold text-xs tracking-[0.2em] uppercase'

/** Maps `FeatureItem.icon` string values (content/amenities.ts, content/investment.ts, content/technology.ts) to their lucide-react component. */
export const featureIcons: Record<string, LucideIcon> = {
  Flower2,
  Dumbbell,
  Sofa,
  Coffee,
  TrendingUp,
  LineChart,
  Wallet,
  KeyRound,
  Smartphone,
  EyeOff,
  Leaf,
}
