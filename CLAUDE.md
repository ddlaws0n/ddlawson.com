# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for David D Lawson (ddlawson.com) — a static Astro 6 site with Tailwind CSS v4, deployed as pre-rendered HTML. The site has pages for home, work history, writing/blog, and a 404.

## Commands

| Command | Purpose |
|-|-|
| `pnpm dev` | Start dev server (localhost:4321) |
| `pnpm build` | Type-check (`astro check`) then build static site |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Lint with Biome |
| `pnpm fix` | Auto-fix lint issues |
| `pnpm format` | Format with Biome |
| `pnpm types` | Type-check with `tsc --noEmit` |

## Architecture

**Static-output Astro site.** No SSR, no API routes — everything pre-renders at build time.

**Routing:** File-based in `src/pages/`. The blog uses a dynamic route (`src/pages/writing/[slug].astro`) that generates pages from markdown content.

**Content:** Blog posts live in `src/content/blog/*.md` with frontmatter (title, description, date, tag, draft). Schema defined in `src/content.config.ts` using Astro's content layer with `glob` loader. Work history and projects are TypeScript data files (`src/content/work.ts`, `src/content/projects.ts`), not content collections.

**Layout:** Single layout (`src/layouts/BaseLayout.astro`) wraps all pages. It handles SEO meta, font loading (Bricolage Grotesque display + Outfit body via Astro Fonts), View Transitions (`ClientRouter`), and the scroll-reveal observer script.

**Config:** `src/site.config.ts` is the central config — site metadata, nav items, social links, blog settings. Referenced as `conf` throughout. Types in `src/types/index.ts`.

**Path alias:** `@/*` maps to `./src/*` (tsconfig paths).

**Styling:** Tailwind v4 via Vite plugin (not PostCSS). Design tokens, custom utilities (`m-` prefix), and base styles all defined in `src/assets/styles/base.css`. See `.claude/rules/tailwindcss.md` for the full design system rules.

**Icons:** `astro-icon` with `@iconify-json/tabler` set + local SVGs in `src/assets/svg/`.

**Integrations:** `astro-favicons` (generates favicons from `src/assets/svg/dl_dot.svg`), `astro-icon`.

## Linting & Formatting

Biome handles both linting and formatting. Key settings:
- Indent style: **tabs**
- JS quote style: **double quotes**
- HTML experimental full support enabled
- Tailwind CSS directives parsing enabled
- `useSortedClasses` is **off** (Tailwind class ordering not enforced)
- `useSortedProperties` assist action is **on**

## Git Hooks

Lefthook runs on pre-commit (format + lint staged files) and pre-push (type-check changed files against `origin/main`).

## Environment Variables

Defined in `astro.config.ts` env schema:
- `UMAMI_ID` — public, optional (analytics)
- `UMAMI_URL` — public, defaults to Umami cloud
- `API_SECRET` — server, secret, required for build

## Key Conventions

- View Transitions are enabled globally — animations must handle `astro:after-swap` re-initialization (see `BaseLayout.astro`).
- Scroll-reveal uses `data-visible` attribute set by IntersectionObserver, not CSS classes.
- Component state uses `data-*` attributes, not `.is-*` classes.
- All animations use compositor-only properties (`opacity`, `transform`).
- Every element with `opacity-0 animate-*` must also have `motion-reduce:opacity-100` so content is visible when animations are disabled.
- External links with `target="_blank"` must use `rel="external noopener noreferrer"` and include `<span class="sr-only">(opens in new tab)</span>`.
- The skip link in `BaseLayout.astro` targets `id="main-content"` — every page's `<main>` must have this id.
- Touch targets for interactive elements must be at least 44x44px (use padding, `min-h-11 min-w-11`, or similar).
