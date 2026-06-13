# Tailwind CSS v4 Guidelines

## Type Scale (Design System)

The type scale is defined in `@theme` in `src/assets/styles/base.css`. Prefer these tokens over arbitrary font-size values.

**Static tokens** — small labels, fixed across viewports:
- `text-kicker` (0.64rem) — compact eyebrow/kicker text
- `text-detail` (0.65rem) — tag labels, smallest text
- `text-label` (0.7rem) — section labels, hero subtitle, nav items
- `text-caption` (0.75rem) — captions, attributions, nav links on desktop

**Fluid tokens** — scale smoothly between mobile and desktop via `clamp()`:
- `text-micro` (0.72–0.82rem) — meta text, social links, small CTAs
- `text-prose` (0.84–1.05rem) — paragraph body text, card descriptions, list items
- `text-quote` (1.15–2.1rem) — pull quotes, callouts
- `text-hero` (1.9–5.8rem) — hero/display headings (includes letter-spacing: -0.03em)
- `text-display` (8–16rem) — decorative oversized numerals (e.g., 404 page)

Each token includes a `--line-height` companion (and `--letter-spacing` where needed) so `text-prose` automatically sets `line-height: 1.7`. No need for separate `leading-*` classes when using a type token.

**When to use Tailwind's built-in scale instead:**
- `text-xs` (0.75rem) — for labels that need to be slightly larger than `text-caption`
- `text-sm` (0.875rem) — when you need a fixed size that doesn't fluid-scale
- `text-base` (1rem), `text-lg` (1.125rem) — component headings, card titles

**Rule: Never use arbitrary font-size values** like `text-[0.82rem]` or `text-[1.15rem]`. If a token doesn't exist for your use case, add one to `@theme` rather than scattering arbitrary values.

## Responsive Strategy

**Type: fluid-first.** Use fluid type tokens (`text-prose`, `text-hero`, etc.) instead of breakpoint overrides for font sizing. One `text-prose` replaces `text-[0.82rem] md:text-sm lg:text-[1.05rem]`.

**Layout: breakpoint-driven.** Use `sm:`, `md:`, `lg:`, `xl:` prefixes for structural layout changes (grid columns, flex direction, show/hide). Use `max-*` variants for range targeting (e.g., `md:max-lg:flex`).

**Spacing: breakpoint-driven.** Use Tailwind's spacing scale with responsive prefixes for padding, margin, and gap. The built-in scale is sufficient — don't create fluid spacing tokens.

**Images/sizing: breakpoint-driven.** Photo sizes, container widths, and aspect ratios change at discrete breakpoints.

## Theme Tokens

- All design tokens are defined in `src/assets/styles/base.css` under `@theme`.
- Colors use OKLCH for perceptual uniformity. Never use `rgb()`, `rgba()`, `hex`, or `hsl()` — use `oklch()` for any inline color values.
- Always reference theme tokens (`var(--color-*)`) instead of hardcoding OKLCH values. If a value exists as a token, use the token.
- **Do not create opacity-variant color tokens** (e.g., `--color-teal-ghost`). Use Tailwind's native opacity modifiers instead: `bg-teal/4`, `border-teal/12`. In CSS `var()` contexts, use `color-mix(in oklch, var(--color-teal) <percent>, transparent)`.
- Font tokens use `@theme inline` to reference Astro `<Font>` CSS variables without collision — do not move these into the main `@theme` block.
- The gutter (`--m-gutter`) lives in `:root` because it's used with `var()` in utility contexts, not as a direct `@theme` token.
- `clamp()` values work in `@theme` for `--text-*` tokens — the value is used directly as `font-size`.

## Accessibility

- **Minimum text size**: No `--text-*` token should go below `0.625rem` (~10px). Prefer `0.65rem`+ for any visible text. All sizes use `rem` units so they scale with user zoom.
- **Radius tokens** use `rem` (not `px`) so they scale properly with browser zoom.
- **State management**: Use `data-*` attributes (e.g., `data-visible`) for component state, not `.is-*` classes. This is semantic, CSS-queryable via `[data-visible]`, and avoids class-based specificity concerns.

## Motion Safety

- All animations use compositor-only properties (`opacity`, `transform`) — never animate layout properties.
- **Never combine `m-reveal` (CSS transition) with `animate-*` (keyframes) on the same element.** Mixing transitions and keyframes on the same properties causes jank. Apply `m-reveal` on the container, `animate-*` on children.
- Reduced motion is handled per-element using Tailwind v4 variants (`motion-reduce:opacity-100`, `motion-reduce:transform-none`, `motion-reduce:animate-none`). Custom CSS transition utilities (`m-reveal`, `m-spine-draw`) include their own `@media (prefers-reduced-motion: reduce)` blocks.
- **Every `opacity-0 animate-*` pairing must include `motion-reduce:opacity-100`** so content isn't permanently hidden when animations are disabled.
- For elements using `transform` in their animation initial state (e.g., `transform-[scaleX(0)]`), also add `motion-reduce:transform-none`.
- Animation durations: micro-interactions 150–300ms, complex transitions ≤600ms. Stagger delays should be 50–60ms per item.

## CSS Variable Syntax

- Use the v4 shorthand for CSS variable references: `px-(--m-gutter)` not `px-[var(--m-gutter)]`.
- For theme tokens registered in `@theme`, use the generated utility directly: `max-w-content` not `max-w-[var(--spacing-content)]`.

## Pseudo-Elements

- Prefer Tailwind `before:` and `after:` variants over `<style>` blocks for pseudo-element styling.
- Only fall back to `<style>` when the pseudo-element requires `:global()` selectors or complexity that inline classes can't express cleanly.

## Custom Utilities

- Project utilities are prefixed `m-` (e.g., `m-section`, `m-label`, `m-reveal`).
- Define them with `@utility` in `base.css`.
- If a utility has associated pseudo-element styles (like `m-section-alt::before`), document the coupling with a comment.

## Shadows

- Use `oklch(0% 0 0 / <alpha>)` for utility classes for black shadows, not `rgba(0,0,0,...)`. Using `oklch()` directly in `<style>` blocks is also fine.
- **Colored glow shadows** (teal glow, error state glow, etc.) must be defined as `--shadow-*` tokens in `@theme` using `color-mix()` with theme color tokens — never hardcode `oklch()` values in inline `shadow-[...]` utilities.
  ```css
  /* ✅ Token in @theme */
  --shadow-teal-glow: 0 0 8px color-mix(in oklch, var(--color-teal) 40%, transparent);
  /* ❌ Hardcoded in template */
  shadow-[0_0_8px_oklch(64.8%_0.081_195/0.4)]
  ```
- `--shadow-logo-teal` is defined for the nav logo hover glow — reference it with `drop-shadow-(--shadow-logo-teal)`.

## Animations

- Animation tokens are defined in `@theme` with `--animate-*` names and use a shared easing curve `cubic-bezier(0.23, 1, 0.32, 1)`.
- Use `[animation-delay:*]` arbitrary properties for staggered delays rather than custom delay classes.

## Custom Utilities — Animation

- `m-reveal` and `m-spine-draw` support staggered entry via `--reveal-delay` custom property. Set it per-element with `style="--reveal-delay: 120ms"` — don't create per-delay utility classes.
- The observer script must watch all animated utility selectors (e.g., `.m-reveal, .m-spine-draw`) and set `data-visible` to trigger transitions.

## @theme Organization

- **Single `@theme` block** for all design tokens (colors, type, spacing, shadows, animations). Don't create additional `@theme` blocks — duplicate tokens silently override.
- **Property ordering within `@theme`**: CSS custom properties (`--shadow-*`, `--container-*`) must come before `@keyframes` blocks. Biome's `useSortedProperties` enforces this.
- `@theme inline` is reserved exclusively for font tokens that reference Astro `<Font>` CSS variables — keep it separate.

## Link Styling

Base link styles are defined in `@layer base` in `base.css` — muted secondary color, subtle underline that transitions to teal on hover. Components that need different link styles (nav, social icons, card links, CTAs) override via inline Tailwind classes (`no-underline`, `text-teal`, etc.).

**`m-link-external`** — opt-in utility for inline text links to external sites. Adds:
- A tiny favicon via `::before` (Google favicon API)
- A `↗` indicator via `::after` (visible on hover)

Usage requires a `style` attribute to set the favicon URL (CSS `url()` cannot interpolate custom properties):
```html
<a
  href="https://wiz.io"
  class="m-link-external"
  style="--favicon-src:url('https://www.google.com/s2/favicons?domain=wiz.io&sz=32')"
  rel="external noopener noreferrer"
>Wiz</a>
```

The favicon fades in via `m-favicon-in` keyframe (0.7s delay → opacity 0.7) for graceful loading.

## General

- Keep `<style>` blocks minimal — only for things Tailwind can't express (complex pseudo-selectors, `:global()` in Astro scoped styles).
- When class strings get very long, that's acceptable — don't extract to CSS just for readability. The tradeoff is worth the colocation.
- Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) consistently with mobile-first ordering.
- **Avoid JSX-style comments** (`{/* ... */}`) in Astro template sections — use HTML comments (`<!-- ... -->`) instead. Biome parses Astro templates as HTML, and JSX comments cause parse errors.
