# Accessibility Rules

## Skip Navigation

`BaseLayout.astro` includes a skip link targeting `#main-content`. Every page's `<main>` element must have `id="main-content"`.

## Motion Safety

Every `opacity-0 animate-*` pairing requires `motion-reduce:opacity-100`. For transform-based initial states, also add `motion-reduce:transform-none`. For infinite animations (e.g. `animate-pulse-dot`), add `motion-reduce:animate-none`. Custom CSS transition utilities (`m-reveal`, `m-spine-draw`) handle reduced motion internally.

## Touch Targets

Interactive elements (links, buttons) must have a minimum 44x44px touch area. Use padding (`p-2.5`), min dimensions (`min-h-11 min-w-11`), or a combination. The icon can be smaller — the clickable area is what matters.

## Color Contrast

- `--color-text-muted` is set to `oklch(55%)` to meet 4.5:1 against `--color-background`. Don't lower the lightness.
- Functional text (descriptions, dates, locations) must use `text-text-muted` or brighter — never a token below 4.5:1.
- Decorative text (background numbers at 2-4% opacity) is exempt from contrast requirements.

## External Links

Links with `target="_blank"` must include:
- `rel="external noopener noreferrer"`
- `<span class="sr-only">(opens in new tab)</span>` inside the `<a>` tag

## Nav Landmarks

The `<nav>` element must have `aria-label="Main navigation"`. Active nav items must have both `aria-current="page"` and a visual indicator beyond color alone (the teal underline via `after:w-full`).
