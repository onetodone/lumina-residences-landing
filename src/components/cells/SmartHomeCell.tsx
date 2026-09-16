'use client'

import { useState } from 'react'
import { Blinds, Lightbulb, Thermometer } from 'lucide-react'
import { BentoCard } from '@/components/bento/BentoCard'
import { MediaSlot } from '@/components/media/MediaSlot'
import { media } from '@/content/media'
import { eyebrowClassName } from './cell-styles'

type Scene = 'morning' | 'evening' | 'away'

const scenes: { id: Scene; label: string }[] = [
  { id: 'morning', label: 'Morning' },
  { id: 'evening', label: 'Evening' },
  { id: 'away', label: 'Away' },
]

/**
 * Smart Home cell: a mock resident app inside a phone frame with working
 * climate/lighting/blinds controls (SPEC.md section 4B.6). State is local
 * only. The scene tint and blinds gauge are opacity/transform transitions
 * only, per the project's animation rule.
 */
export function SmartHomeCell() {
  const [temperature, setTemperature] = useState(22)
  const [scene, setScene] = useState<Scene>('evening')
  const [blindsOpen, setBlindsOpen] = useState(40)

  return (
    <BentoCard className="relative flex flex-col p-6">
      <MediaSlot slot={media.smartHomeApp} className="absolute inset-0 opacity-40 blur-sm" sizes="33vw" />
      <div aria-hidden className="bg-obsidian/60 absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col">
        <h2 className={eyebrowClassName}>Smart Home</h2>

        <div className="border-border bg-graphite/90 shadow-elevated relative mx-auto mt-4 flex w-full max-w-[168px] flex-1 flex-col overflow-hidden rounded-[2rem] border p-3">
          <div aria-hidden className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/15" />

          <div aria-hidden className="absolute inset-3 top-6 overflow-hidden rounded-[1.5rem]">
            <div
              className={`absolute inset-0 bg-[color-mix(in_oklch,var(--gold),transparent_78%)] transition-opacity duration-(--duration-base) ${
                scene === 'morning' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              className={`absolute inset-0 bg-[color-mix(in_oklch,var(--gold),transparent_90%)] transition-opacity duration-(--duration-base) ${
                scene === 'evening' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground flex items-center gap-1 text-[10px] tracking-wide uppercase">
                <Thermometer aria-hidden className="size-3" /> Climate
              </span>
              <span className="text-foreground font-serif text-lg">{temperature}°C</span>
              <input
                type="range"
                min={16}
                max={28}
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
                className="accent-gold w-full"
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground flex items-center gap-1 text-[10px] tracking-wide uppercase">
                <Lightbulb aria-hidden className="size-3" /> Lighting
              </span>
              <div className="flex gap-1.5">
                {scenes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={scene === s.id}
                    onClick={() => setScene(s.id)}
                    className={`rounded-control flex-1 py-1.5 text-[10px] transition-colors duration-(--duration-fast) ${
                      scene === s.id
                        ? 'bg-gold text-obsidian'
                        : 'text-muted-foreground hover:text-foreground bg-white/5'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-muted-foreground flex items-center gap-1 text-[10px] tracking-wide uppercase">
                <Blinds aria-hidden className="size-3" /> Blinds — {blindsOpen}% open
              </span>
              <div aria-hidden className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-gold absolute inset-y-0 left-0 w-full origin-left transition-transform duration-(--duration-base)"
                  style={{ transform: `scaleX(${blindsOpen / 100})` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={blindsOpen}
                onChange={(event) => setBlindsOpen(Number(event.target.value))}
                className="accent-gold w-full"
              />
            </label>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
