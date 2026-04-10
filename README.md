# ddlawson.com

[![Deploy](https://github.com/ddlaws0n/ddlawson.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/ddlaws0n/ddlawson.com/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-6-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Built with Claude Code](https://img.shields.io/badge/Built_with-Claude_Code-D97757?logo=claude&logoColor=white)](https://claude.com/claude-code)

My personal site — writing, work, and projects. Live at **[ddlawson.com](https://ddlawson.com)**.

## Quick start

```sh
pnpm install
pnpm dev          # localhost:4321
```

## Scripts

| Command | What it does |
|-|-|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Lint with Biome |
| `pnpm fix` | Auto-fix lint issues |
| `pnpm format` | Format files with Biome |
| `pnpm types` | Run TypeScript in `--noEmit` mode |
| `pnpm generate:og` | Regenerate Open Graph images |

## Stack

- **Framework** — [Astro 6](https://astro.build) (static output)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) via the Vite plugin
- **Linting/formatting** — [Biome](https://biomejs.dev)
- **Hosting** — [Cloudflare Pages](https://pages.cloudflare.com)
- **Analytics** — [Umami](https://umami.is)
- **Fonts** — Bricolage Grotesque (display) + Outfit (body), served via Astro Fonts
- **Icons** — [astro-icon](https://github.com/natemoo-re/astro-icon) + [Tabler](https://tabler.io/icons)
- **Git hooks** — [Lefthook](https://lefthook.dev)

## Deployment

Every push to `main` deploys to Cloudflare Pages via the [`deploy` workflow](.github/workflows/deploy.yml). Pull requests run the [`validate` workflow](.github/workflows/validate.yml) for type-checking and lint.

### Required GitHub secrets

| Secret | Purpose |
|-|-|
| `CF_API_TOKEN` | Cloudflare API token with Pages edit permission |
| `CF_ACCOUNT_ID` | Cloudflare account ID |
| `UMAMI_ID` | Umami analytics website ID (optional) |

### Staging

Staging deploys to `ddlawson-staging.pages.dev` and is gated behind Cloudflare Access — configure allowed identities in the Zero Trust dashboard.

## Project layout

```
src/
├── assets/        # images, svgs, global styles
├── components/    # Astro components
├── content/       # blog posts, projects, work history (content collections)
├── layouts/       # page layouts
├── pages/         # routes
├── utils/         # helpers
├── content.config.ts
└── site.config.ts # site-wide config (name, SEO, analytics)
functions/         # Cloudflare Pages Functions
scripts/           # one-off build scripts (e.g. OG image generation)
```

## License

Content (writing, images) © David D Lawson. Code is available for reference — feel free to take inspiration, but please don't clone the site wholesale.
