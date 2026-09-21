export type LightingMode = 'off' | 'warm' | 'default'

export const LIGHTING_OPTIONS: { value: LightingMode; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'warm', label: 'Warm' },
  { value: 'off', label: 'Off' },
]

export const MIN_TEMP = 13
export const MAX_TEMP = 30
export const COLD_THRESHOLD = 17
export const WARM_THRESHOLD = 25
