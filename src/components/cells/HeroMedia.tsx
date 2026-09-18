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
 */
export function HeroMedia() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = PLAYBACK_RATE
    if (prefersReducedMotion) video.pause()
    else video.play().catch(() => {})
  }, [prefersReducedMotion])

  if (media.heroVideo.src) {
    return (
      <video
        ref={videoRef}
        aria-hidden
        muted
        playsInline
        autoPlay
        poster={media.heroPoster.src ?? undefined}
        className="hero-media absolute inset-0 h-full w-full object-cover"
      >
        <source src={media.heroVideo.src} type="video/mp4" />
      </video>
    )
  }

  return <MediaSlot slot={media.heroPoster} priority className="hero-media absolute inset-0" />
}
