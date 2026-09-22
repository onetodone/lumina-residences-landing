'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Lock, Lightbulb, Music, Pause, Play, SkipBack, SkipForward, Thermometer } from 'lucide-react'
import { cn } from '@/lib/utils'
import { musicTracks } from '@/content/music'
import { LIGHTING_OPTIONS, MAX_TEMP, MIN_TEMP, type LightingMode } from './constants'
import { useSmartHome } from './SmartHomeContext'

function SegmentedLightingControl({
  value,
  onChange,
}: {
  value: LightingMode
  onChange: (mode: LightingMode) => void
}) {
  return (
    <fieldset>
      <legend className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
        <Lightbulb aria-hidden className="text-gold size-3.5" />
        Lighting
      </legend>
      <div className="rounded-control grid grid-cols-3 gap-1 bg-white/[0.04] p-1">
        {LIGHTING_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-[10px] px-2 py-1.5 text-[11px] font-medium transition-colors duration-(--duration-fast)',
              value === option.value ? 'bg-gold text-obsidian' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function ClimateSlider({ value, onChange }: { value: number; onChange: (temperature: number) => void }) {
  const inputId = useId()
  const percent = ((value - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-muted-foreground flex items-center gap-2 text-xs">
          <Thermometer aria-hidden className="text-gold size-3.5" />
          Climate
        </label>
        <span className="text-gold text-sm font-medium tabular-nums">{value}°C</span>
      </div>
      <input
        id={inputId}
        type="range"
        min={MIN_TEMP}
        max={MAX_TEMP}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={`${value}°C`}
        className="smart-home-slider mt-2.5"
        style={{ background: `linear-gradient(to right, var(--gold) ${percent}%, var(--graphite) ${percent}%)` }}
      />
      <div className="text-muted-foreground mt-1 flex justify-between text-[10px]">
        <span>{MIN_TEMP}°C</span>
        <span>{MAX_TEMP}°C</span>
      </div>
    </div>
  )
}

function SecurityToggle({ armed, onChange }: { armed: boolean; onChange: (armed: boolean) => void }) {
  return (
    <div className="mt-auto flex items-center justify-between">
      <span className="text-muted-foreground flex items-center gap-2 text-xs">
        <Lock aria-hidden className="text-gold size-3.5" />
        Lock
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={armed}
        onClick={() => onChange(!armed)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-(--duration-fast)',
          armed ? 'bg-gold' : 'bg-white/10',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'bg-obsidian shadow-card ease-luxury inline-block size-3.5 rounded-full transition-transform duration-(--duration-fast)',
            armed ? 'translate-x-[18px]' : 'translate-x-1',
          )}
        />
        <span className="sr-only">{armed ? 'Security armed' : 'Security disarmed'}</span>
      </button>
    </div>
  )
}

function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = musicTracks[currentIndex]
  const hasAudio = currentTrack?.src != null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying && hasAudio) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentIndex, hasAudio])

  const goToTrack = (delta: number) => {
    setCurrentIndex((index) => (index + delta + musicTracks.length) % musicTracks.length)
  }

  const handleEnded = () => {
    setCurrentIndex((index) => (index + 1) % musicTracks.length)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground flex items-center gap-2 text-xs">
          <Music aria-hidden className="text-gold size-3.5" />
          Music
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous track"
            onClick={() => goToTrack(-1)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-(--duration-fast)"
          >
            <SkipBack aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={!hasAudio}
            onClick={() => setIsPlaying((playing) => !playing)}
            className="bg-gold text-obsidian inline-flex size-8 items-center justify-center rounded-full transition-colors duration-(--duration-fast) disabled:opacity-40"
          >
            {isPlaying ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={() => goToTrack(1)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-(--duration-fast)"
          >
            <SkipForward aria-hidden className="size-4" />
          </button>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack?.src ?? undefined} preload="none" onEnded={handleEnded} />
    </div>
  )
}

export function SmartHomePanel() {
  const { lighting, setLighting, temperature, setTemperature, armed, setArmed, isAmbientActive } = useSmartHome()

  return (
    <div
      role="region"
      aria-label="Interactive smart home preview"
      className={cn(
        'border-border rounded-control bg-graphite flex w-full shrink-0 flex-col gap-10 border p-4 md:w-56 md:gap-6',
        isAmbientActive ? 'smart-home-panel-active' : 'smart-home-panel-inactive',
      )}
    >
      <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">Lumina App</p>
      <SegmentedLightingControl value={lighting} onChange={setLighting} />
      <ClimateSlider value={temperature} onChange={setTemperature} />
      <MusicPlayer />
      <SecurityToggle armed={armed} onChange={setArmed} />
    </div>
  )
}
