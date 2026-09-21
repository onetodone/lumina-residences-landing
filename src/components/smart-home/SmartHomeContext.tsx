'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { COLD_THRESHOLD, MAX_TEMP, MIN_TEMP, WARM_THRESHOLD, type LightingMode } from './constants'

interface SmartHomeState {
  lighting: LightingMode
  setLighting: (mode: LightingMode) => void
  temperature: number
  setTemperature: (temperature: number) => void
  armed: boolean
  setArmed: (armed: boolean) => void
  coldIntensity: number
  warmIntensity: number
  /** True whenever any ambient overlay is actually visible (non-default lighting, an out-of-band temperature, or armed security). */
  isAmbientActive: boolean
}

const SmartHomeContext = createContext<SmartHomeState | null>(null)

/**
 * Owns the smart-home widget's state above the app tree so the page-wide
 * ambient overlays (`SmartHomeEffects`, mounted once in the root layout) and
 * the control panel (`SmartHomePanel`, embedded inside `TechnologyCell`,
 * deep in the bento grid) can share it despite living in unrelated places in
 * the DOM.
 */
export function SmartHomeProvider({ children }: { children: ReactNode }) {
  const [lighting, setLighting] = useState<LightingMode>('default')
  const [temperature, setTemperature] = useState(22)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = armed ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [armed])

  const coldIntensity = temperature < COLD_THRESHOLD ? (COLD_THRESHOLD - temperature) / (COLD_THRESHOLD - MIN_TEMP) : 0
  const warmIntensity = temperature > WARM_THRESHOLD ? (temperature - WARM_THRESHOLD) / (MAX_TEMP - WARM_THRESHOLD) : 0
  const isAmbientActive = lighting !== 'default' || coldIntensity > 0 || warmIntensity > 0 || armed

  return (
    <SmartHomeContext.Provider
      value={{
        lighting,
        setLighting,
        temperature,
        setTemperature,
        armed,
        setArmed,
        coldIntensity,
        warmIntensity,
        isAmbientActive,
      }}
    >
      {children}
    </SmartHomeContext.Provider>
  )
}

export function useSmartHome() {
  const context = useContext(SmartHomeContext)
  if (!context) throw new Error('useSmartHome must be used within a SmartHomeProvider')
  return context
}
