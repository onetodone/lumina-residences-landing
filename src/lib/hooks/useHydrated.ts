'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * True once the component has mounted on the client. Lets a component defer client-only work —
 * e.g. `createPortal` into `document.body`, which doesn't exist during SSR — past the server-
 * rendered first paint, without the `useState` + `useEffect(() => setState(true), [])` pattern
 * ESLint's `react-hooks/set-state-in-effect` rule (rightly) flags as a cascading-render smell.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
