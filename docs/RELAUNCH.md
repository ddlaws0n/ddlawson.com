# ddlawson.com Relaunch Plan

Based on the **Anthem** concept — a monochromatic dark editorial design with Bricolage Grotesque + Outfit typography, blue accent system, and tactile grain texture.

Incorporates consolidated feedback from dark-mode, color-system, responsive, typography, and spacing expert reviews. Also covers the Astro 5 → 6 upgrade, infrastructure cleanup, and deployment hardening.

---

## 0. Platform Upgrade (Astro 6.x)

Do this **before** any design work. The upgrade touches config, content collections, env vars, and dependencies — all foundational. Doing design work on Astro 5 and then upgrading means fixing breakage twice.

### 0.1 Upgrade Steps

1. **Run the upgrade CLI**: `npx @astrojs/upgrade` — updates `astro`, all `@astrojs/*` integrations, and peer deps.
2. **Rename config**: `astro.config.mjs` → `astro.config.ts` (Astro 6 supports `.ts` natively; aligns with the rest of the codebase).
3. **Upgrade Zod**: `pnpm add zod@4` — Zod 4 is required by Astro 6. Review content schema for any breaking changes (`.transform()` chains, string validators). Current schema is simple enough that breakage is unlikely, but verify.
4. **Migrate content collections** (see §0.2).
5. **Migrate server-side env vars** (see §0.3).
6. **Fix Vercel adapter config** (see §0.4).
7. **Stabilize fonts config** (see §0.5).
8. **Switch syntax highlighting**: Change `syntaxHighlight: 'prism'` → `syntaxHighlight: 'shiki'` (or remove — Shiki is the Astro 6 default). Shiki 4 ships built-in.
9. **Verify build**: `pnpm build && pnpm preview` — confirm nothing is broken before starting design work.

### 0.2 Content Collection Migration

Astro 6 removes legacy content collections. Required changes:

- **Move config**: `src/content/config.ts` → `src/content.config.ts` (project root of `src/`)
- **Add loader**: Each collection needs a `loader` property (Content Layer API):
  ```ts
  import { defineCollection, z } from 'astro:content';
  import { glob } from 'astro/loaders';

  const writingCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
    schema: z.object({ /* existing schema */ }),
  });
  ```
- **Update render calls**: `entry.render()` is removed. Import `render()` from `astro:content`:
  ```ts
  import { getEntry, render } from 'astro:content';
  const entry = await getEntry('writing', slug);
  const { Content } = await render(entry);
  ```
- **Replace `getEntryBySlug()`** with `getEntry()` if used anywhere.

### 0.3 Environment Variable Migration

In Astro 6, `import.meta.env` values are inlined at build time. Server-side secrets (`CAPTCHA_SECRET_KEY`, `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) must switch to `process.env`:

**File**: `src/actions/index.ts` — replace:
```ts
const { CAPTCHA_SECRET_KEY, ... } = import.meta.env;
```
with:
```ts
const { CAPTCHA_SECRET_KEY, ... } = process.env;
```

`PUBLIC_*` vars (like `PUBLIC_CAPTCHA_SITE_KEY`) can stay on `import.meta.env` — those are intentionally inlined.

### 0.4 Vercel Adapter Cleanup

Current config has stale options. Update to:

```ts
adapter: vercel({
  imageService: true,
}),
```

Remove: `webAnalytics` block (analytics is handled by `@vercel/analytics` package, not the adapter), `devImageService: 'squoosh'` (squoosh was removed in Astro 4).

### 0.5 Fonts Config (Experimental → Stable)

Astro 6 stabilizes the `fonts` API. Move from `experimental.fonts` to top-level `fonts`:

```ts
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Bricolage Grotesque',
      display: 'swap',
      weights: ['200', '600', '800'],
      cssVariable: '--font-display',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Outfit',
      display: 'swap',
      weights: ['300', '400', '500'],
      cssVariable: '--font-body',
    },
  ],
  // ...
});
```

This replaces the Google Fonts `@import url(...)` in the Anthem concept's inline styles. Self-hosted, subsetted, automatic `font-display: swap`.

### 0.6 Removed/Changed APIs Checklist

| API | Status | Action needed |
|-|-|-|
| `Astro.glob()` | Removed | Use `import.meta.glob()` — check all `.astro` files |
| `<ViewTransitions />` | Removed | Use `<ClientRouter />` — check layouts |
| `entry.render()` | Removed | Import `render()` from `astro:content` |
| `getEntryBySlug()` | Removed | Use `getEntry()` |
| `.cjs`/`.cts` config | Removed | Already using `.mjs`, no action |
| `experimental.fonts` | Stable | Move to top-level `fonts` |

---

## 1. Design System

### 1.1 Color Tokens (Tailwind v4 `@theme`, OKLCH)

The Anthem palette achieves visual richness with minimal colors. All tokens are semantic — named by purpose, not hue. Uses **OKLCH** color space for perceptually uniform lightness steps across the surface hierarchy, and `color-mix()` for alpha variants.

**Surfaces** (dark depth hierarchy via perceptually uniform luminosity steps):

| Token | OKLCH | Hex ref | Usage |
|-|-|-|-|
| `--color-bg` | `oklch(10.5% 0.012 290)` | `#0e0c10` | Page canvas, primary sections |
| `--color-surface` | `oklch(14% 0.014 290)` | `#16131a` | Elevated sections (projects, about, pull quote) |
| `--color-surface-hover` | `oklch(16.5% 0.013 290)` | `#1c1820` | Card/row hover states |
| `--color-elevated` | `oklch(19% 0.015 290)` | `#201c26` | Featured cards, modals, popovers |

**Text** (3-tier hierarchy via lightness):

| Token | OKLCH | Hex ref | Usage |
|-|-|-|-|
| `--color-text` | `oklch(93% 0.008 290)` | `#e8e6ec` | Headings, primary content |
| `--color-text-secondary` | `oklch(70% 0.015 290)` | `#9e98a5` | Body copy, descriptions |
| `--color-text-muted` | `oklch(50% 0.014 290)` | `#6b6571` | Labels, captions, dates. Raised from `#625d68` per review — ensures WCAG AA on all surfaces |

**Accent** (single blue family, used sparingly):

| Token | OKLCH | Hex ref | Usage |
|-|-|-|-|
| `--color-accent` | `oklch(58% 0.14 255)` | `#4a7fd4` | Interactive elements, hero rule, belief accent text |
| `--color-accent-bright` | `oklch(65% 0.14 255)` | `#6090e8` | Hover glow, scan line, active states |
| `--color-accent-muted` | `oklch(47% 0.12 255)` | `#365ea0` | Pull quote bg gradient, de-emphasized accents |
| `--color-accent-subtle` | `color-mix(in oklab, var(--color-accent) 8%, transparent)` | — | Hover backgrounds, faint tints |

**Borders** (white alpha via `color-mix()`, not `rgba()`):

| Token | Value | Usage |
|-|-|-|
| `--color-border` | `color-mix(in oklab, white 10%, transparent)` | Default dividers, card borders. Raised from 6% per review |
| `--color-border-hover` | `color-mix(in oklab, white 16%, transparent)` | Hover border states |

**Focus** (accessibility — visible focus rings on dark canvas):

| Token | Value | Usage |
|-|-|-|
| `--color-ring` | `var(--color-accent)` | Focus ring color (matches accent blue) |
| `--color-ring-offset` | `var(--color-bg)` | Ring offset background (matches canvas) |

**Radius** (consistent corner rounding):

| Token | Value | Usage |
|-|-|-|
| `--radius-sm` | `0.25rem` | Tag pills, small elements |
| `--radius-md` | `0.5rem` | Buttons, inputs, nav items |
| `--radius-lg` | `0.75rem` | Cards, containers, modals |

**Design rule**: Blue only appears on interaction (hovers, CTAs, active states) and in sparse accent text (belief `.accent` spans). Everything else is monochromatic. This is the key to the Clarence-inspired restraint.

### 1.2 Typography

**Font stack**:
- **Display**: `Bricolage Grotesque` (variable, optical size 12-96, weights 200-800) — headlines, monogram, labels
- **Body**: `Outfit` (weights 300, 400, 500 only — drop 200/600 from import per review) — body text, nav, descriptions

**Consolidated type scale** (reduced from 20+ sizes to 8 core steps per review):

| Token | Size | Usage |
|-|-|-|
| `--text-hero` | `clamp(3.8rem, 9vw, 9rem)` | Hero name only |
| `--text-display` | `clamp(3rem, 6vw, 7rem)` | Section display type (about "The Story") |
| `--text-ghost` | `clamp(8rem, 14vw, 14rem)` | Background ghost numbers (beliefs) |
| `--text-heading` | `clamp(1.3rem, 2.2vw, 1.8rem)` | Section headings (belief titles, project titles) |
| `--text-subheading` | `1.25rem` | Featured project title, pull quote |
| `--text-body` | `1rem` | Primary body text. Raised from 0.82-1.02rem per review |
| `--text-small` | `0.82rem` | Secondary body, descriptions, footer links |
| `--text-caption` | `0.65rem` | Eyebrows, tags, labels, dates |

**Weight mapping**:
- 800: Hero name, monogram, ghost numbers (Bricolage)
- 600: Section eyebrows, titles, tags (Bricolage)
- 500: Emphasis/strong text (Outfit)
- 400: Nav links, post titles (Outfit)
- 300: Body copy, descriptions (Outfit)
- 200: Ghost numbers only (Bricolage ultra-light)

**Letter-spacing guideline**: Reduce eyebrow/label tracking from 0.22-0.3em to **0.15-0.2em** per review. Keep hero negative tracking at -0.025em.

**Line-height mapping**:
- Display (>3rem): 0.88-0.92
- Headings (1.3-2rem): 1.25-1.35
- Body: 1.7-1.75
- Small text: 1.5-1.6

### 1.3 Spacing Scale

Adopt a consistent **4px (0.25rem) base** with defined steps. Registered under Tailwind v4's `--spacing-*` namespace so native utilities (`p-4`, `gap-8`, `m-12`, etc.) work automatically — no arbitrary value syntax needed.

| Token | Value | Usage |
|-|-|-|
| `--spacing-1` | `0.25rem` (4px) | Tight inline gaps |
| `--spacing-2` | `0.5rem` (8px) | Tag padding, small gaps |
| `--spacing-3` | `0.75rem` (12px) | Footer link gaps, compact spacing |
| `--spacing-4` | `1rem` (16px) | Element margins, title-to-body gap |
| `--spacing-6` | `1.5rem` (24px) | Card internal padding (mobile), section sub-gaps |
| `--spacing-8` | `2rem` (32px) | Grid row gaps, post padding |
| `--spacing-10` | `2.5rem` (40px) | Card padding, hero rule margin |
| `--spacing-12` | `3rem` (48px) | Section horizontal padding, footer padding |
| `--spacing-16` | `4rem` (64px) | Section vertical padding (mobile) |
| `--spacing-20` | `5rem` (80px) | Pull quote vertical padding |
| `--spacing-24` | `6rem` (96px) | Section vertical padding (desktop) |

### 1.4 Layout Constraints

**Max content width**: `1400px` with `margin: 0 auto` — resolves ultra-wide screen issue flagged by spacing review.

**Breakpoints** (expanded from single 900px per responsive review):

| Breakpoint | Target |
|-|-|
| `640px` | Small mobile: collapse nav to hamburger, tighten spacing |
| `768px` | Tablet: intermediate grid columns, adjusted type scale |
| `900px` | Desktop: full layout with sideways labels, 2-column grids |

**Touch targets**: Minimum 44px on all interactive elements at mobile breakpoints.

### 1.5 Effects

- **Grain overlay**: SVG `feTurbulence` at 3% opacity, fixed position, covers viewport
- **Scroll reveals**: `clip-path: inset(0 0 15% 0)` -> `inset(0)` with 0.7s cubic-bezier transition, staggered 0.08s per sibling
- **Hero name**: clip-path reveal animation (0.9s cubic-bezier)
- **Magnetic CTA**: JS mousemove tracking, 30% strength, smooth snap-back
- **Scan line** (hero photo): Horizontal blue glow sweeping vertically on 4.5s loop — optional, can toggle
- **Nav pulse**: Blue dot with breathing animation — optional, can toggle

---

## 2. Routes & Pages

### 2.1 Route Map

| Route | Page | Content Source |
|-|-|-|
| `/` | Home | Static + dynamic (latest writing) |
| `/about` | About | Static content + work experience data |
| `/work` | Work/Experience | `src/data/workExperience.ts` |
| `/writing` | Blog index | Content collection listing |
| `/writing/[slug]` | Blog post | MDX content collection |
| `/contact` | Contact form | Server action (Turnstile + n8n webhook) |
| `/rss.xml` | RSS feed | Generated from writing collection |
| `/robots.txt` | Robots | Static generation |
| `/manifest.json` | PWA manifest | Static generation |

**Removed from current site**: `/icons` page (development utility, not public).

**Not adding**: Projects as a separate route for now. Projects live on the homepage as a section. Can extract to `/projects` later if the list grows.

### 2.2 Page Compositions

**Home** (`/`):
- Hero (name + photo + tagline)
- Beliefs section (2x2 grid)
- Projects section (asymmetric grid)
- Pull quote
- Recent writing (editorial list, latest 4)
- About teaser
- Footer

**About** (`/about`):
- Hero (name + extended bio)
- Work timeline (from `workExperience.ts`)
- Skills/interests section
- Contact CTA
- Footer

**Work** (`/work`):
- Company-by-company timeline with role expansion
- Reuses `RoleTabs`/`RoleContent` pattern but restyled for Anthem

**Writing index** (`/writing`):
- Page header
- Post list (editorial style — date, title, tag, description)
- Filter by tag (client-side)
- Footer

**Writing post** (`/writing/[slug]`):
- Article header (title, date, author, reading time, tags)
- MDX body with Anthem-styled prose
- Author card
- Related posts
- Footer

**Contact** (`/contact`):
- Form (name, email, message)
- Cloudflare Turnstile CAPTCHA
- Rate limiting via Upstash Redis
- n8n webhook submission
- Footer

---

## 3. Layouts

### 3.1 Layout Hierarchy

```
BaseLayout
  -> MetaTags (SEO, OG)
  -> GrainOverlay (SVG noise filter, fixed)
  -> Header (sticky nav)
  -> <slot /> (page content)
  -> Footer
```

**BaseLayout** handles: HTML shell, font loading, Vercel analytics, client router, grain overlay. All pages use this single layout.

**`PageLayout.astro` is removed** — it was a wrapper around BaseLayout that added a page title/description header. In the Anthem design, each page handles its own header composition (hero variants, display text), so the intermediate layout adds no value.

### 3.2 Why a single layout

The current site already uses one BaseLayout. The Anthem design is visually consistent across all pages — same nav, same footer, same dark canvas, same grain. Page-specific structure (hero variations, content widths, sidebar presence) is handled by page-level composition, not layout variants.

---

## 4. Components

### 4.1 Shared / Global

| Component | Purpose | Notes |
|-|-|-|
| `Header` | Sticky nav with monogram, links, optional status indicator, location | Mobile: hamburger menu below 640px |
| `Footer` | 3-column grid: brand, nav, social links | Simplify from current; remove ghost text |
| `GrainOverlay` | SVG noise filter + fixed overlay div | Extracted from inline anthem code |
| `Container` | Max-width wrapper (1400px) with horizontal padding | Used inside every section |
| `SectionEyebrow` | Small uppercase label with optional sideways variant | Props: `text`, `sideways?: boolean` |
| `Divider` | 1px border-based horizontal rule | Simple `<hr>` with border token |
| `Button` | Keep existing polymorphic button (link/button) | Restyle variants for Anthem palette |

### 4.2 Home Page

| Component | Purpose | Notes |
|-|-|-|
| `Hero` | Split grid: text left + photo right with glow/fade overlays | Includes clip-path name animation |
| `BeliefCard` | Single belief tile with ghost number, title, body | Used 4x in a 2x2 grid on the page |
| `ProjectCard` | Card with tag, title, description, arrow | Variants: `featured` (larger) and default |
| `PullQuote` | Centered quote with attribution | Surface background, display font |
| `PostListItem` | Editorial row: date, title, tag pill | Reused on home and `/writing` |

### 4.3 About / Work

| Component | Purpose | Notes |
|-|-|-|
| `WorkTimeline` | Company groups with expandable roles | Restyled from existing `TimelineItem` + `RoleTabs`/`RoleContent` |
| `CompanyCard` | Company header (logo, name, location, date range) | Uses `getLogoPlaceholder()` util |

### 4.4 Writing

| Component | Purpose | Notes |
|-|-|-|
| `ArticleHeader` | Post title, date, reading time, tags | Lives in `[slug].astro`, not extracted |
| `Prose` | Tailwind typography wrapper styled for Anthem | Dark prose with accent link colors |
| `TagPill` | Small bordered pill for post tags | Reused on home list and post pages |

### 4.5 Contact

| Component | Purpose | Notes |
|-|-|-|
| `ContactForm` | Name/email/message with Turnstile | Keep existing server action, restyle inputs |

### 4.6 Design principles for components

- **Astro components by default** — no client JS unless interactivity requires it (theme toggle, mobile menu, contact form, magnetic CTA)
- **Props over variants** — a `ProjectCard` with a `featured` boolean is cleaner than `ProjectCard` + `FeaturedProjectCard`
- **No wrapper divitis** — sections are composed in the page file, not wrapped in section components. A "section" is just a `<section>` with a class, not a component.
- **Native Tailwind utilities** — because all tokens are registered in `@theme`, components use direct utility classes (`bg-surface`, `text-text-secondary`, `rounded-lg`, `animate-fade-up`). No arbitrary value `[--var]` syntax, no scoped `<style>` blocks needed for most components.

---

## 5. Tailwind v4 Integration

### 5.1 Token Registration

All design tokens from §1 are registered in `src/assets/styles/base.css` using Tailwind v4's `@theme` directive. This is the single source of truth — no `tailwind.config.ts` needed.

```css
@import 'tailwindcss';

@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";

@theme {
  /* ——— Colors (OKLCH) ——— */
  --color-bg: oklch(10.5% 0.012 290);
  --color-surface: oklch(14% 0.014 290);
  --color-surface-hover: oklch(16.5% 0.013 290);
  --color-elevated: oklch(19% 0.015 290);

  --color-text: oklch(93% 0.008 290);
  --color-text-secondary: oklch(70% 0.015 290);
  --color-text-muted: oklch(50% 0.014 290);

  --color-accent: oklch(58% 0.14 255);
  --color-accent-bright: oklch(65% 0.14 255);
  --color-accent-muted: oklch(47% 0.12 255);
  --color-accent-subtle: color-mix(in oklab, var(--color-accent) 8%, transparent);

  --color-border: color-mix(in oklab, white 10%, transparent);
  --color-border-hover: color-mix(in oklab, white 16%, transparent);

  --color-ring: var(--color-accent);
  --color-ring-offset: var(--color-bg);

  /* ——— Typography ——— */
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --font-sans: var(--font-body);  /* Tailwind default sans → body font */

  --text-hero: clamp(3.8rem, 9vw, 9rem);
  --text-display: clamp(3rem, 6vw, 7rem);
  --text-ghost: clamp(8rem, 14vw, 14rem);
  --text-heading: clamp(1.3rem, 2.2vw, 1.8rem);
  --text-subheading: 1.25rem;
  --text-body: 1rem;
  --text-small: 0.82rem;
  --text-caption: 0.65rem;

  /* ——— Radius ——— */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* ——— Animations ——— */
  --animate-clip-reveal: clipReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  --animate-fade-up: fadeUp 0.7s ease forwards;
  --animate-scale-in: scaleIn 0.5s ease forwards;
  --animate-pulse-dot: pulse 2.5s ease-in-out infinite;
  --animate-scan-sweep: scanSweep 4.5s 1.5s ease-in-out infinite;

  @keyframes clipReveal {
    from { clip-path: inset(100% 0 0 0); }
    to   { clip-path: inset(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(0.5rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0; transform: scale(1); }
    50%      { opacity: 0.6; transform: scale(2.2); }
  }
  @keyframes scanSweep {
    0%, 100% { top: -2%; opacity: 0; }
    10%      { opacity: 0.6; }
    90%      { opacity: 0.6; }
    50%      { top: 102%; }
  }
}

@layer base {
  body {
    @apply bg-bg text-text antialiased;
  }
  *:focus-visible {
    @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-ring-offset;
  }
}
```

This makes tokens available as **native Tailwind utilities** — `bg-surface`, `text-text-secondary`, `font-display`, `text-heading`, `rounded-lg`, `animate-clip-reveal`, etc. No arbitrary value `[--var]` syntax needed anywhere.

**Key decisions**:
- `--font-sans` maps to `var(--font-body)` so Tailwind's default `font-sans` uses Outfit; `font-display` is opt-in for headings
- Type scale tokens registered in `@theme` so `text-hero`, `text-caption` etc. work as utilities
- Animations registered via `--animate-*` + `@keyframes` inside `@theme` — the v4-native approach (not `@layer utilities`)
- Focus ring strategy in `@layer base` ensures all interactive elements have visible focus on the dark canvas

### 5.2 What changes from current setup

- **Remove** `@custom-variant dark` — dark-only design, no dark/light variants needed
- **Remove** Switzer font references (`--font-sans: var(--font-switzer)`)
- **Remove** commented-out sky color palette
- **Remove** `background-move` animation and `.animate-background-move` / `.animate-header-background-move` utilities
- **Keep** Tailwind typography and forms plugins (used for prose and contact form)
- **Keep** Vite plugin integration (`@tailwindcss/vite`)
- **Add** `@theme` block with all Anthem tokens (OKLCH colors, spacing, radius, type scale, animations)
- **Add** Anthem animations via `--animate-*` + `@keyframes` inside `@theme` (v4-native, not `@layer utilities`)
- **Add** focus ring base rule (`ring-2 ring-ring ring-offset-2`) for a11y on dark canvas
- **Add** grain overlay SVG filter as a reusable component

### 5.3 Dark mode strategy

The site is **dark-only**. No light/dark toggle needed for the redesign. This simplifies the entire CSS — no `dark:` variants, no theme switching logic, no `ToggleTheme` component, no `theme-handler.ts` utility.

If light mode is desired later, all tokens can be wrapped in `@media (prefers-color-scheme: light)` overrides. The semantic token names make this straightforward.

---

## 6. Content & Data

### 6.1 Content Collections (updated for Astro 6)

The existing writing collection schema is sound:
- `title`, `description`, `author`, `publishDate`, `tags`, `image`, `draft`
- MDX rendering with syntax highlighting (Shiki 4 in Astro 6)

Schema stays the same. The **config file location and loader** change per §0.2.

### 6.2 Work Experience Data (minor updates)

The existing `workExperience.ts` structure works. Potential additions:
- `skills: string[]` per role (for about page skills section)
- `highlight?: boolean` on select roles to feature on the homepage

### 6.3 Projects Data (new)

Currently hardcoded in the Anthem concept HTML. Extract to a data file:

```typescript
// src/data/projects.ts
export interface Project {
  title: string;
  tag: string;
  description: string;
  url?: string;
  featured?: boolean;
}
```

### 6.4 Beliefs Data (new)

Extract from HTML to data:

```typescript
// src/data/beliefs.ts
export interface Belief {
  number: string;
  title: string;     // with accent markup
  body: string;
}
```

---

## 7. Migration Strategy

### 7.1 Phased Approach

**Phase 0 — Platform upgrade** (do first, before any design work):
1. Run `npx @astrojs/upgrade` to get Astro 6 + all integrations
2. Upgrade Zod to v4
3. Migrate content collections to Content Layer API (§0.2)
4. Migrate `import.meta.env` → `process.env` for server secrets (§0.3)
5. Fix Vercel adapter config (§0.4)
6. Move `experimental.fonts` to stable `fonts` (§0.5)
7. Rename `astro.config.mjs` → `astro.config.ts`
8. Switch syntax highlighting to Shiki
9. Verify: `pnpm build && pnpm preview` — everything works on the current design before touching visuals

**Phase 1 — Design system + global components**:
1. Replace `base.css` with Anthem tokens in `@theme` (§5)
2. Remove dark mode variant, Switzer refs, old animations
3. Build `GrainOverlay`, `Container`, `SectionEyebrow`, `Divider`
4. Restyle `Header` (monogram, status indicator, nav links, mobile hamburger)
5. Restyle `Footer` (3-column, simplified)
6. Restyle `Button` variants for Anthem palette
7. Set up Anthem fonts via Astro 6 `fonts` config (Bricolage Grotesque + Outfit)

**Phase 2 — Home page** (the flagship):
1. Build `Hero` (split grid, photo, clip-path animations, scan line)
2. Build `BeliefCard` (ghost numbers, accent text)
3. Build `ProjectCard` (featured + default variants)
4. Build `PullQuote`
5. Build `PostListItem` (reused on writing page)
6. Compose home page with all sections
7. Add scroll reveal observer + magnetic CTA script

**Phase 3 — Writing pages**:
1. Restyle writing index (editorial list, tag filter)
2. Style Anthem prose (dark typography, accent links, code blocks with Shiki)
3. Build `ArticleHeader`, `TagPill`, author card
4. Related posts section

**Phase 4 — About + Work**:
1. Restyle `WorkTimeline` / `CompanyCard`
2. About page hero + bio section
3. Skills/interests section

**Phase 5 — Contact + cleanup**:
1. Restyle contact form inputs for Anthem palette
2. Remove dead components (§7.3)
3. Remove concept files (`src/pages/concepts/`)
4. Final responsive pass across all breakpoints (640, 768, 900)
5. Lighthouse audit (performance, a11y, SEO)

### 7.2 What to keep from current codebase

- `BaseLayout.astro` structure (modify, don't rewrite)
- `site.config.ts` (add new tokens, keep existing config)
- `Button.astro` (restyle variants, keep polymorphic pattern)
- `MetaTags.astro` (no changes needed)
- Content collection schema and MDX pipeline (updated for Astro 6 Content Layer API)
- Server action for contact form (Turnstile + rate limiting + n8n) — with `process.env` migration
- All utility functions (`getFormattedDate`, `getReadingTime`, `formatDateRange`, `parseDate`)
- Vercel adapter (updated config), analytics, speed insights
- RSS, sitemap, robots generation

### 7.3 What to remove

- `BackgroundBlur.astro` (replaced by grain overlay)
- `BentoCard.astro` (replaced by BeliefCard + ProjectCard)
- `ToggleTheme.astro` (dark-only design)
- `PageLayout.astro` (unnecessary wrapper — see §3.1)
- `theme-handler.ts` (no theme switching)
- Switzer font import and `--font-switzer` variable
- Current color palette and custom properties
- `@custom-variant dark` from `base.css`
- `background-move` animation and related utilities
- `custom-scroll` and `tooltip-scroll` utilities (restyle or drop)

### 7.4 What to add

- Bricolage Grotesque + Outfit via Astro 6 stable `fonts` config
- All Anthem design tokens in `@theme`
- GrainOverlay component
- Hero component (with photo, clip-path animations)
- BeliefCard, ProjectCard, PostListItem, PullQuote components
- Magnetic CTA script (extracted to a shared util)
- Scroll reveal observer (extracted to a shared script)
- `src/data/projects.ts` and `src/data/beliefs.ts` data files
- Mobile hamburger menu (current Header has one, but may need restyling)
- Anthem keyframe animations (clipReveal, fadeUp, scaleIn, pulse, scanSweep)

---

## 8. Deployment

### 8.1 Adapter Decision: Vercel (staying)

The project is already deeply integrated with Vercel:
- `@astrojs/vercel` adapter
- `@vercel/analytics` + `@vercel/speed-insights`
- `@upstash/redis` for rate limiting (Vercel Marketplace integration)
- Environment variables managed via `vercel env`

Switching to Cloudflare would require replacing all three integrations for marginal benefit. **Stay on Vercel.**

### 8.2 Vercel Configuration

Current `output: 'server'` is correct — the contact form server action and rate limiting require SSR.

After Astro 6 upgrade, verify the adapter version is compatible. The `@astrojs/upgrade` CLI should handle this, but confirm `@astrojs/vercel` is at the Astro 6-compatible major version.

### 8.3 Pre-launch Checklist

- [ ] `pnpm build` succeeds with zero warnings
- [ ] `pnpm check` passes (astro check + eslint + prettier)
- [ ] All routes render correctly in `pnpm preview`
- [ ] Contact form submits successfully (Turnstile + rate limiting + n8n)
- [ ] RSS feed generates valid XML
- [ ] Sitemap generates correctly
- [ ] OG images / meta tags render in social previews
- [ ] Lighthouse scores: Performance >90, Accessibility >95, SEO 100
- [ ] Responsive testing at 375px, 640px, 768px, 900px, 1440px, 1920px+
- [ ] Vercel preview deployment reviewed before promoting to production

---

## 9. Open Questions

1. **Projects page**: Keep as homepage section only, or extract to `/projects` route? Depends on how many projects grow over time.
2. **Blog tag filtering**: Client-side filter on `/writing`, or generate `/writing/tag/[tag]` static routes?
3. **Hero photo**: Use `2.png` (current Anthem choice) or create a more polished version? The black background works perfectly with the dark theme.
4. **Scan line + pulse dot**: Keep these micro-interactions or drop them? They add personality but also complexity.
5. **RSS/newsletter**: Add email capture for a newsletter? The current site has RSS but no email subscription.
