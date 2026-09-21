export type Track = {
  title: string
  src: string | null
}

/**
 * Smart-home widget playlist (`SmartHomePanel`'s Music row). `src: null`
 * renders the same way a pending `media.ts` image slot does — present in
 * the UI, just not playable yet. See `docs/media.md` for the file format
 * and where to drop the audio files.
 */
export const musicTracks: Track[] = [
  { title: 'Track 1', src: '/media/audio-01.mp3' },
  { title: 'Track 2', src: '/media/audio-02.mp3' },
  { title: 'Track 3', src: '/media/audio-03.mp3' },
]
