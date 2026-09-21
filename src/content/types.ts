/** A single icon-led bullet used by the Facilities, Investment Model, and Technology & Construction cells. `icon` is a lucide-react export name, resolved via `featureIcons` in `components/cells/cell-styles.ts`. */
export type FeatureItem = {
  id: string
  name: string
  description: string
  icon: string
}

/** Looks up a content item by `id` — throws if the id doesn't exist, since every call site names a known, fixed id. */
export function findById<T extends { id: string }>(items: readonly T[], id: string): T {
  const item = items.find((entry) => entry.id === id)
  if (!item) throw new Error(`Item not found: ${id}`)
  return item
}
