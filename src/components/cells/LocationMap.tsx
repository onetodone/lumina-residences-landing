'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import {
  MAPBOX_INTERACTIVE_ZOOM,
  MAPBOX_PREVIEW_ZOOM,
  MAPBOX_STYLE_URL,
  pointsOfInterest,
  siteLocation,
  type PointOfInterestCategory,
} from '@/config/mapLocations'
import { cn } from '@/lib/utils'

const MAPBOX_TOKEN = process.env.MAPBOX_PUBLIC_TOKEN ?? ''

/** POI marker dot color per category — edit these to restyle without touching the map logic. */
const poiMarkerClassName: Record<PointOfInterestCategory, string> = {
  restaurant: 'bg-amber-400',
  beach: 'bg-sky-400',
  shopping: 'bg-violet-400',
}

function createSiteMarkerElement() {
  const el = document.createElement('div')
  el.className = 'relative flex h-4 w-4 items-center justify-center'
  el.innerHTML =
    '<span class="map-marker-ping absolute inset-0 rounded-full bg-gold/60"></span>' +
    '<span class="relative h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-obsidian"></span>'
  return el
}

function createPoiMarkerElement(category: PointOfInterestCategory) {
  const el = document.createElement('div')
  // `hover:scale-*` (transform) is deliberately avoided here: it shifts these small (12px) markers'
  // hit-test box between mousedown and mouseup, which makes Mapbox's click gesture recognition miss
  // the marker and register a plain map click instead — killing the popup. Opacity doesn't move
  // anything, so it's safe on a click target this size.
  el.className = cn(
    'h-3 w-3 cursor-pointer rounded-full ring-2 ring-obsidian/80 motion-safe:transition-opacity motion-safe:hover:opacity-75',
    poiMarkerClassName[category],
  )
  return el
}

/**
 * Location cell's map: a non-interactive Mapbox preview always visible in
 * the tile, plus a full interactive Mapbox map (project pin + nearby POIs)
 * that opens in a Fancybox modal. Both instances are created once and kept
 * alive — Fancybox's `inline` slide type physically moves the modal's DOM
 * node in and out of the document instead of destroying it, so the
 * interactive map doesn't need to reinitialize (or refetch tiles) on every
 * open, just a `resize()` once its container is back at full size.
 */
export function LocationMap() {
  const bindContainerRef = useRef<HTMLDivElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const interactiveContainerRef = useRef<HTMLDivElement>(null)
  const interactiveMapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!MAPBOX_TOKEN || !previewContainerRef.current) return
    mapboxgl.accessToken = MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: previewContainerRef.current,
      style: MAPBOX_STYLE_URL,
      center: siteLocation.coordinates,
      zoom: MAPBOX_PREVIEW_ZOOM,
      interactive: false,
    })
    new mapboxgl.Marker({ element: createSiteMarkerElement() }).setLngLat(siteLocation.coordinates).addTo(map)

    return () => map.remove()
  }, [])

  useEffect(() => {
    if (!MAPBOX_TOKEN || !interactiveContainerRef.current) return
    mapboxgl.accessToken = MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: interactiveContainerRef.current,
      style: MAPBOX_STYLE_URL,
      center: siteLocation.coordinates,
      zoom: MAPBOX_INTERACTIVE_ZOOM,
    })
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), 'top-right')

    new mapboxgl.Marker({ element: createSiteMarkerElement() })
      .setLngLat(siteLocation.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 20, className: 'lumina-popup' }).setText(siteLocation.name))
      .addTo(map)

    for (const poi of pointsOfInterest) {
      new mapboxgl.Marker({ element: createPoiMarkerElement(poi.category) })
        .setLngLat(poi.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 14, className: 'lumina-popup' }).setText(poi.name))
        .addTo(map)
    }

    interactiveMapRef.current = map
    return () => {
      map.remove()
      interactiveMapRef.current = null
    }
  }, [])

  useEffect(() => {
    const container = bindContainerRef.current
    if (!container) return

    Fancybox.bind(container, '[data-fancybox="location-map"]', {
      theme: 'dark',
      Hash: false,
      dragToClose: false,
      Carousel: {
        Toolbar: {
          display: { left: [], middle: [], right: ['close'] },
        },
      },
      on: {
        ready: () => interactiveMapRef.current?.resize(),
      },
    })

    return () => Fancybox.unbind(container)
  }, [])

  return (
    <div ref={bindContainerRef} className="contents">
      <div aria-hidden className="absolute inset-0">
        <div className="from-graphite via-obsidian to-graphite absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--gold-soft),transparent_60%)]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay" />
      </div>
      {MAPBOX_TOKEN && (
        <div
          ref={previewContainerRef}
          aria-hidden
          // `mapbox-gl.css`'s `.mapboxgl-map { position: relative }` is unlayered CSS, which always
          // beats Tailwind's `absolute` utility (declared inside `@layer utilities`) regardless of
          // specificity — so it silently wins and collapses this container to 0 height unless we
          // force the position back with an inline style.
          style={{ position: 'absolute', inset: 0 }}
          className="lumina-map"
        />
      )}

      <a
        href="#location-map-modal"
        data-fancybox="location-map"
        data-type="inline"
        aria-label={`Open interactive map of ${siteLocation.name} and nearby places`}
        className="rounded-card focus-visible:ring-ring/50 absolute inset-0 z-10 block outline-none focus-visible:ring-3"
      />

      <div
        id="location-map-modal"
        className="hidden h-[70svh] max-h-[600px] w-[min(90vw,900px)] flex-col overflow-hidden rounded-2xl"
      >
        {MAPBOX_TOKEN ? (
          <div ref={interactiveContainerRef} className="lumina-map h-full w-full" />
        ) : (
          <div className="text-muted-foreground bg-graphite flex h-full w-full items-center justify-center p-6 text-center text-sm">
            Map unavailable — set MAPBOX_PUBLIC_TOKEN to enable it.
          </div>
        )}
      </div>
    </div>
  )
}
