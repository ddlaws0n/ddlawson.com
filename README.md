# ddlawson.com

Personal portfolio site — built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

## Development

```sh
pnpm install
pnpm dev          # localhost:4321
pnpm build        # type-check + static build
pnpm preview      # preview production build
```

## Deployment

Deploys to **Cloudflare Pages** via GitHub Actions on push to `main`.

| Environment | URL | Auth |
|-|-|-|
| Staging | `ddlawson-staging.pages.dev` | Cloudflare Access (required) |

### GitHub Secrets

| Secret | Purpose |
|-|-|
| `CF_API_TOKEN` | Cloudflare API token with Pages edit permission |
| `CF_ACCOUNT_ID` | Cloudflare account ID |
| `UMAMI_ID` | Umami analytics website ID (optional) |

### Cloudflare Access Setup

Auth on the staging deployment is managed via Cloudflare Access in the dashboard:

1. Pages project → Settings → General → Access Policy → Enable
2. Configure allowed emails/identity providers in Zero Trust dashboard

### Custom Domain

To point `staging.ddlawson.com` at the Pages deployment, add a CNAME record:

```
staging  CNAME  ddlawson-staging.pages.dev
```

Then add `staging.ddlawson.com` as a custom domain in the Pages project settings.

## Stack

- **Framework:** Astro 6 (static output)
- **Styling:** Tailwind CSS v4 via Vite plugin
- **Hosting:** Cloudflare Pages
- **Linting:** Biome
- **Fonts:** Bricolage Grotesque (display) + Outfit (body) via Astro Fonts
- **Icons:** astro-icon + @iconify-json/tabler
