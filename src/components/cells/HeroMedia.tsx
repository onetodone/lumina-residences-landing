'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { media } from '@/content/media'
import { MediaSlot } from '@/components/media/MediaSlot'

const PLAYBACK_RATE = 0.6

/**
 * Background video when `heroVideo.src` is set, falling back to the poster
 * image, falling back further to the gradient + noise slot — SPEC.md section
 * 4B.1 / section 6. Plays once at `PLAYBACK_RATE` and stops on the final
 * frame instead of looping. Reduced motion pauses the video rather than
 * never starting it, so a poster frame is still shown.
 *
 * Playback is triggered imperatively instead of via the `autoPlay` attribute:
 * React's server-rendered markup omits the `muted` attribute even though the
 * `muted` prop is set (a long-standing React SSR gap), so a native
 * `autoPlay` start would see an unmuted video at parse time and mobile
 * browsers — iOS Safari in particular — block it outright, leaving only the
 * poster frame. Setting `.muted` on the element ourselves before calling
 * `.play()` sidesteps that gap. `.play()` itself is deferred until the
 * element has at least the current frame decoded (`loadeddata`) rather than
 * fired the instant the ref attaches — some mobile browsers behave
 * inconsistently when the play request lands before any data has arrived.
 */
export function HeroMedia() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.playbackRate = PLAYBACK_RATE
    if (prefersReducedMotion) {
      video.pause()
      return
    }

    const tryPlay = () => video.play().catch(() => {})
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) tryPlay()
    else video.addEventListener('loadeddata', tryPlay, { once: true })

    return () => video.removeEventListener('loadeddata', tryPlay)
  }, [prefersReducedMotion])

  if (media.heroVideo.src) {
    return (
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        preload="auto"
        poster={media.heroPoster.src ?? undefined}
        className="hero-media absolute inset-0 h-full w-full object-cover"
      >
        <source src={media.heroVideo.src} type="video/mp4" />
      </video>
    )
  }

  return <MediaSlot slot={media.heroPoster} priority className="hero-media absolute inset-0" />
}
