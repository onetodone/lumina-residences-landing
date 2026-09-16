# Lumina Residences

A portfolio marketing site for **Lumina Residences**, a fictional waterfront
development in the Harbor Quarter of Aveline — two towers, 214 residences,
designed around light and water. The development, its developer, and every
person referenced are invented; this project exists to demonstrate a modern
Next.js build, not to market a real property.

Built as a single-page "bento grid" layout: a hero, a set of interactive
cells (availability filter, smart-home mock, wellness amenities, location
map, and more), a floor-plan carousel, an image gallery with a lightbox, and
a tour-request form — all client-side, with no backend.

## Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack) + TypeScript (strict)
- Tailwind CSS v4 (design tokens via an `@theme` block, no `tailwind.config.ts`)
- [shadcn/ui](https://ui.shadcn.com) on Base UI (`@base-ui/react`)
- [Motion](https://motion.dev) (`motion/react`) for animation
- [lucide-react](https://lucide.dev) for icons
- `zod` + `react-hook-form` for the tour-request form
- [Vitest](https://vitest.dev) for unit tests

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script           | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the dev server (Turbopack)          |
| `pnpm build`     | Production build                          |
| `pnpm start`     | Serve the production build                |
| `pnpm format`    | Format the repo with Prettier             |
| `pnpm lint`      | Lint with ESLint (auto-fix)               |
| `pnpm lint:ci`   | Lint with ESLint (check only, no fixes)   |
| `pnpm typecheck` | Generate route types, then `tsc --noEmit` |
| `pnpm test`      | Run the Vitest unit test suite            |

Before shipping a change, run `pnpm format && pnpm lint && pnpm build` and
make sure all three are clean.

### Environment

`NEXT_PUBLIC_SITE_URL` (see `.env.example`) sets `metadataBase` for resolving
Open Graph/Twitter images. No real domain exists for this project, so it's
left unset by default — Next.js falls back to `http://localhost:3000` with an
informational build warning.

## Project structure

```
src/
  app/          # layout, page, global styles, favicon, OG image
  components/
    bento/      # BentoGrid, BentoCard, ExpandableCard primitives
    cells/      # the 9 bento-grid cells (Hero, Stats, Residences, ...)
    sections/   # Header, FloorPlans, Gallery, TourForm, Footer
    floor-plans/# inline-SVG apartment floor plans
    motion/     # Reveal, Counter, MagneticButton, KineticText
    media/      # MediaSlot (image-or-gradient+noise fallback)
    ui/         # shadcn/ui primitives
  content/      # typed copy: site info, stats, amenities, location, media manifest
  data/         # domain types, seeded mock dataset, repository, filters
  lib/          # utils, fonts, motion constants, hooks
tests/          # Vitest unit tests for the data layer
```

Data is only ever accessed through `ResidenceRepository`
(`src/data/repository.ts`), backed today by a seeded mock dataset of 60
residences (`src/data/mock-residences.ts`) — swapping in a real API later
means writing a new repository implementation, not touching any component.

## Media assets

No binary media ships in this repo. Every image/video slot is declared in
`src/content/media.ts` with `src: null`, and renders an elegant gradient +
noise fallback until a real asset is dropped in — no slot ever shows a broken
image. See [`docs/media.md`](docs/media.md) for the full list of slots, their
recommended file names/sizes, and an AI-render prompt for each.

## Accessibility & performance

- Semantic landmarks (header/main/footer), a skip-to-content link, one `h1`
  per page, and a real heading for every bento cell.
- Every interactive control (filters, sliders, carousel, lightbox, form) is
  fully keyboard-operable with visible focus states; dialogs trap focus and
  return it to their trigger on close.
- All animation is transform/opacity only and respects
  `prefers-reduced-motion` (the app is wrapped in `<MotionConfig
reducedMotion="user">`).
- Verified against Lighthouse (desktop preset): Performance, Accessibility,
  Best Practices, and SEO all score 100.

## Testing

Unit tests cover the data layer — the residence filter, the URL
filter-state codec, the seeded generator's invariants, and the mock
repository:

```bash
pnpm test
```

UI behavior (keyboard navigation, reduced motion, responsive layout,
dialog focus management) is verified manually in a real browser rather than
with component/e2e tests, which are out of scope for this portfolio project.

## License

Private portfolio project — not licensed for reuse.
