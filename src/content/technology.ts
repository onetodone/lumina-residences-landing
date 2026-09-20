import type { FeatureItem } from './types'

/** Technology & Construction cell (NEW_STRUCTURE.md "Technology & Construction") — merges the former Smart Home and Architecture cells into one content section. */
export const technologyIntro = {
  eyebrow: 'Technology & Construction',
  heading: 'Built for the Future. Designed for Today.',
  description:
    'True luxury is seamless. Lumina Residences incorporates cutting-edge technology behind clean, architectural lines.',
}

export const technologyHighlights: FeatureItem[] = [
  {
    id: 'smart-home',
    name: 'Integrated Smart Home',
    description:
      'Control lighting, climate, automated blinds, and biometric security through a single, intuitive proprietary app.',
    icon: 'Smartphone',
  },
  {
    id: 'sustainable',
    name: 'Sustainable Architecture',
    description:
      'Constructed with eco-conscious, LEED-compliant materials that naturally regulate temperature and minimize acoustic footprint.',
    icon: 'Leaf',
  },
  {
    id: 'infrastructure',
    name: 'Invisible Infrastructure',
    description:
      'Underfloor heating, concealed HVAC systems, and built-in circadian lighting ensure zero visual clutter.',
    icon: 'EyeOff',
  },
]
