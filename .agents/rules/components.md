# Component Patterns

## Content Data

Site content lives in `src/content/`. Blog posts use Astro's content collection (`blog/*.md` with schema in `content.config.ts`). Structured data — work history, projects, beliefs — are plain TypeScript files (`work.ts`, `projects.ts`, `beliefs.ts`) that export typed arrays.

Keep data out of components. If a component renders a list of items, the data should be imported from `src/content/`, not defined inline in the component.

## Shared Components

`PostCard.astro` — Reusable post card for blog listings. Used by `RecentWriting.astro` and `writing/index.astro`. Props:
- `post` — blog post object with `id` and `data` (title, date, tag, description)
- `showDescription` — boolean (default `false`), toggles description text
- `formatDate` — function to format the date
- `index` — number, used for stagger animation delay and first-item border

When adding new blog listing views, use this component rather than duplicating the card markup.

## Animation Pattern

Page-entry animations follow a stagger sequence using `[animation-delay:*]` arbitrary properties:
- Container fades in first (delay 0)
- Children stagger at 0.2s increments
- Every animated element needs `opacity-0 animate-fade-up motion-reduce:opacity-100`

Scroll-reveal animations use the `m-reveal` utility (CSS transitions, NOT keyframes). The `IntersectionObserver` in `BaseLayout.astro` sets `data-visible` to trigger them.

## Section Labels

Section eyebrow/kicker labels use a consistent pattern:
```html
<span class="font-display text-teal-muted text-label font-semibold tracking-[0.24em] uppercase">
  Label Text
</span>
```

Use `text-label` directly — do not use `text-xs lg:text-label` (the label token is smaller than `text-xs`, causing a shrink at `lg:`).
