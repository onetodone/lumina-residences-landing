'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { X } from 'lucide-react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import {
  MAPBOX_INTERACTIVE_ZOOM,
  MAPBOX_PREVIEW_ZOOM,
  MAPBOX_STYLE_URL,
  pointsOfInterest,
  siteLocation,
  type PointOfInterestCategory,
} from '@/config/mapLocations'
import { cn } from '@/lib/utils'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useHydrated } from '@/lib/hooks/useHydrated'
import { duration, easeLuxury } from '@/lib/motion'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

/**
 * The preview map's own container is rendered this many pixels larger than the tile on every
 * side (see `previewContainerRef` below). Mapbox pins its logo to the container's bottom-left and
 * its attribution toggle to the bottom-right, so growing the container symmetrically pushes both
 * past the tile's `overflow-hidden` edge — without shifting the visible map area, since the site
 * marker stays centered in the (now larger) container either way.
 */
const PREVIEW_OVERSCAN_PX = 64

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

type Flip = { x: number; y: number; scaleX: number; scaleY: number }

const FLIP_IDENTITY: Flip = { x: 0, y: 0, scaleX: 1, scaleY: 1 }

/**
 * Pure (module-scope) FLIP transform: the panel's own box is always full-viewport (`position:
 * fixed; inset: 0`), so to make it visually sit exactly over `element` — including through a
 * scroll, since `getBoundingClientRect`/`innerWidth`/`innerHeight` are all viewport-relative —
 * scale it down around its own (viewport) center, then translate that shrunk center onto the
 * element's center.
 */
function getFlipFromElement(element: HTMLElement | null): Flip {
  const rect = element?.getBoundingClientRect()
  if (!rect) return FLIP_IDENTITY

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  return {
    scaleX: rect.width / viewportWidth,
    scaleY: rect.height / viewportHeight,
    x: rect.left + rect.width / 2 - viewportWidth / 2,
    y: rect.top + rect.height / 2 - viewportHeight / 2,
  }
}

/**
 * Location cell's map: a non-interactive Mapbox preview always visible in the tile, plus a full
 * interactive Mapbox map (project pin + nearby POIs) that expands into a fullscreen panel.
 *
 * The expanded panel is portaled to `document.body`, always full-viewport in true layout terms,
 * and visually docked over the tile with a `transform` FLIP (computed by hand — Framer Motion's
 * own `layout` prop mismeasures the origin for a `position: fixed` element once the page has
 * scrolled, since it doesn't fully account for a fixed element being scroll-independent) so it
 * reads as "this card grew to fullscreen" without a real DOM reparent. The panel itself is never
 * unmounted once opened for the first time (only its transform/opacity toggle), so the
 * interactive Mapbox instance is created once and kept alive across opens.
 *
 * The panel can't live inside the tile's own DOM subtree: `.bento-interactive:hover` applies a
 * `transform` to the card, and any transformed ancestor becomes the containing block for
 * `position: fixed` descendants — so nested there, "fixed" would size against the hovered card's
 * box instead of the viewport, right when the user is most likely to be hovering it (they just
 * clicked it).
 */
export function LocationMap() {
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const interactiveContainerRef = useRef<HTMLDivElement>(null)
  const interactiveMapRef = useRef<mapboxgl.Map | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const mounted = useHydrated()
  const [isOpen, setIsOpen] = useState(false)
  // Stays `false` until the first open, so the fullscreen panel's Mapbox container is kept at
  // zero size (no tile fetch) until the user actually asks for it — same laziness the map this
  // replaced got for free from Fancybox's `hidden` class.
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)

  const prefersReducedMotion = useReducedMotion()
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen)
  const titleId = useId()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  const opacity = useMotionValue(0)

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
    if (!MAPBOX_TOKEN || !mounted || !interactiveContainerRef.current) return
    mapboxgl.accessToken = MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: interactiveContainerRef.current,
      style: MAPBOX_STYLE_URL,
      center: siteLocation.coordinates,
      zoom: MAPBOX_INTERACTIVE_ZOOM,
    })
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), 'bottom-right')

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
  }, [mounted])

  const closePanel = useCallback(() => {
    const flip = getFlipFromElement(triggerRef.current)
    const transition = prefersReducedMotion ? { duration: 0 } : { duration: duration.base, ease: easeLuxury }
    animate(x, flip.x, transition)
    animate(y, flip.y, transition)
    animate(scaleX, flip.scaleX, transition)
    animate(scaleY, flip.scaleY, transition)
    animate(opacity, 0, transition)
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [prefersReducedMotion, x, y, scaleX, scaleY, opacity])

  useEffect(() => {
    if (!isOpen) return
    interactiveMapRef.current?.resize()

    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closePanel])

  function openPanel() {
    if (!hasOpenedOnce) {
      // Must commit (and the interactive map must resize into its now-real size) before the snap
      // below, or the panel would still be zero-size when its transform/opacity go live.
      flushSync(() => setHasOpenedOnce(true))
      interactiveMapRef.current?.resize()
    }

    const flip = getFlipFromElement(triggerRef.current)
    // Snap straight to the docked transform (matching the tile's real, current position — no
    // transition), then animate away from it — the reverse of `closePanel`, and why this can't
    // just be a declarative `animate` prop keyed on `isOpen`.
    x.set(flip.x)
    y.set(flip.y)
    scaleX.set(flip.scaleX)
    scaleY.set(flip.scaleY)
    opacity.set(1)
    setIsOpen(true)

    const transition = prefersReducedMotion ? { duration: 0 } : { duration: duration.base, ease: easeLuxury }
    animate(x, 0, transition)
    animate(y, 0, transition)
    animate(scaleX, 1, transition)
    animate(scaleY, 1, transition)
  }

  return (
    <>
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
          // force the position back with an inline style. `inset` is set here too (rather than via
          // Tailwind) so the overscan below stays in the same, guaranteed-to-win inline style.
          style={{ position: 'absolute', inset: `-${PREVIEW_OVERSCAN_PX}px` }}
          className="lumina-map"
        />
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : undefined}
        aria-label={`Open interactive map of ${siteLocation.name} and nearby places`}
        className="rounded-card focus-visible:ring-ring/50 absolute inset-0 z-10 block outline-none focus-visible:ring-3"
      />

      {mounted &&
        createPortal(
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-hidden={!isOpen}
            inert={!isOpen}
            style={{
              position: 'fixed',
              zIndex: 50,
              overflow: 'hidden',
              borderRadius: isOpen ? 0 : 'var(--radius-card)',
              pointerEvents: isOpen ? 'auto' : 'none',
              ...(hasOpenedOnce ? { inset: 0 } : { top: 0, left: 0, width: 0, height: 0 }),
              x,
              y,
              scaleX,
              scaleY,
              opacity,
            }}
          >
            <h2 id={titleId} className="sr-only">
              Interactive map of {siteLocation.name} and nearby places
            </h2>

            {MAPBOX_TOKEN ? (
              <div ref={interactiveContainerRef} className="lumina-map h-full w-full" />
            ) : (
              <div className="text-muted-foreground bg-graphite flex h-full w-full items-center justify-center p-6 text-center text-sm">
                Map unavailable — set NEXT_PUBLIC_MAPBOX_TOKEN to enable it.
              </div>
            )}

            <button
              type="button"
              onClick={closePanel}
              aria-label="Close map"
              className={cn(
                'bg-obsidian/70 text-foreground hover:bg-obsidian/90 shadow-card absolute top-4 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 backdrop-blur-md motion-safe:transition-opacity motion-safe:duration-(--duration-fast)',
                isOpen ? 'opacity-100' : 'opacity-0',
              )}
            >
              <X aria-hidden className="size-5" />
            </button>
          </motion.div>,
          document.body,
        )}
    </>
  )
}
