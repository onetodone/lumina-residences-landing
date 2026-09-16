import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * True once the client has hydrated. Needed before rendering anything that
 * requires the DOM (e.g. a portal target) — a `typeof document` check would
 * mismatch between server and client, and setting state from an effect
 * would trigger an extra render, so this reads the true/false split via
 * useSyncExternalStore's server/client snapshot pair instead.
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}
