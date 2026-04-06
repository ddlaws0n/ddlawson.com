# Relaunch Design Audit

> Automated audit performed 2026-04-06. Covers all routes on ddlawson.com (Anthem theme). Source files read directly; all pages visited live at localhost:4321.

---

## Status

**Last updated: 2026-04-06**

| #   | Issue                                                                | Status                                                              |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | No `prefers-reduced-motion` support                                  | ✅ Fixed                                                            |
| 2   | No skip navigation link                                              | ✅ Fixed                                                            |
| 41  | `--color-text-muted` fails WCAG AA contrast on dark bg               | ✅ Fixed                                                            |
| 42  | Footer section headings/copyright compound opacity fails contrast    | ✅ Fixed                                                            |
| 43  | `PullQuote` uses `<section><p>` instead of `<blockquote>`            | 🔲 Open                                                             |
| 44  | `BeliefCard` uses generic `<div>` instead of `<article>`             | 🔲 Open                                                             |
| 45  | Writing index tag filter buttons lack `aria-label`                   | 🔲 Open                                                             |
| 46  | `ArticleHeader` animations missing `prefers-reduced-motion` override | 🔲 Open                                                             |
| 47  | Homepage has no page-level `<h1>` (component-driven)                 | 🔲 Open                                                             |
| 48  | Mobile menu lacks `role="navigation"` landmark                       | 🔲 Open                                                             |
| 49  | `ProjectCard` `<a>` variant needs visible focus indicator            | 🔲 Open                                                             |
| 50  | `workExperience.ts` contains inline `<strong>` HTML in data strings  | 🔲 Open                                                             |
| 3   | Markdown rendered as raw text in Work page                           | ✅ Fixed                                                            |
| 4   | `<meta name="theme-color">` missing                                  | ✅ Fixed                                                            |
| 5   | `color-scheme: dark` not declared on `<html>`                        | ✅ Fixed                                                            |
| 6   | `transition-all` used in multiple places                             | ✅ Fixed                                                            |
| 7   | Heading hierarchy inconsistency                                      | ⏭️ Skipped — structural/content decision                            |
| 8   | `<main>` landmark missing on multiple pages                          | ✅ Fixed                                                            |
| 9   | Nav active state not indicated to AT                                 | ✅ Fixed                                                            |
| 10  | Asymmetric padding inconsistency                                     | ⏭️ Skipped — intentional design                                     |
| 11  | Footer omits "Work" from navigation                                  | ✅ Fixed                                                            |
| 12  | SectionEyebrow sideways label not semantic                           | ⏭️ Skipped — intentional visual design                              |
| 13  | BeliefCard `opacity-65` non-standard token                           | ⏭️ Skipped — Tailwind v4 generates on demand                        |
| 14  | Form inputs missing `autocomplete` attributes                        | ✅ Fixed                                                            |
| 15  | Email field missing `spellcheck="false"`                             | ✅ Fixed                                                            |
| 16  | Contact form submit button: no loading state                         | ⏭️ Skipped — needs JS enhancement                                   |
| 17  | Form status message lacks `aria-live`                                | ⏭️ Skipped — server-rendered, acceptable                            |
| 18  | Icon buttons and decorative icons missing `aria-hidden`              | ✅ Fixed                                                            |
| 19  | Article images missing explicit `width`/`height`                     | ⏭️ Skipped — uses Astro `<Image>` for hero; content images separate |
| 20  | `<time>` element in ArticleHeader uses fallback                      | ✅ Fixed                                                            |
| 21  | Site description uses emoji and generic tone                         | ✅ Fixed                                                            |
| 22  | Article alt text `"image_tooltip"`                                   | ⏭️ Skipped — content file, author's domain                          |
| 23  | Writing index tag filter with few posts                              | ⏭️ Skipped — scales correctly when more posts added                 |
| 24  | Work page achievement copy is generic                                | ⏭️ Skipped — content decision for user                              |
| 25  | Footer brand opacity too low                                         | ⏭️ Skipped — intentional ghost treatment                            |
| 26  | Contact sticky left panel overflow on short screens                  | ⏭️ Skipped — minor edge case                                        |
| 27  | Contact grid breakpoint off-by-one (899px vs 900px)                  | ✅ Fixed                                                            |
| 28  | `pl-12 max-lg:pl-0` sharp jump at breakpoint                         | ⏭️ Skipped — intentional Anthem design                              |
| 29  | PostListItem tag truncation on mobile                                | ⏭️ Skipped — no overflow observed currently                         |
| 30  | `min-height: 100vh` on mobile iOS                                    | ✅ Fixed                                                            |
| 31  | Nav "Work" link missing from footer                                  | ✅ Fixed (same as #11)                                              |
| 32  | Ellipsis in placeholder text                                         | ⏭️ Skipped — not an active issue                                    |
| 33  | `"..."` vs `"…"` in article content                                  | ⏭️ Skipped — content files, author's domain                         |
| 34  | `font-size`/`line-height` via inline styles                          | ⏭️ Skipped — intentional micro-tuning                               |
| 35  | `anthem.astro` is an unlinked orphan page                            | ✅ Fixed — added noindex/nofollow                                   |
| 36  | `reveal.ts` re-triggering on back navigation                         | ⏭️ Skipped — needs deeper investigation                             |
| 37  | Magnetic `getBoundingClientRect` in mousemove                        | ⏭️ Skipped — micro-optimization                                     |
| 38  | `lang` attribute dead config value                                   | ✅ Fixed — set to `en-gb` in config                                 |
| 39  | Missing `rel="me"` on social links                                   | ✅ Fixed                                                            |
| 40  | FeedbackFish loads unconditionally                                   | ⏭️ Skipped — needs user input                                       |

---

## Critical Issues

### 1. No `prefers-reduced-motion` support anywhere

Every page runs clip-path, fadeUp, and scaleIn animations unconditionally. Users who have reduced-motion enabled in their OS will get the full animation suite — this is a WCAG 2.1 failure (2.3.3 AAA, strongly recommended for 2.1 compliance).

- `src/assets/styles/base.css` — `.reveal` transition block has no `@media (prefers-reduced-motion: reduce)` override.
- `src/components/Hero.astro` (inline `<style>`) — `.line`, `.hero-eyebrow`, `.hero-rule`, `.hero-desc` all animate unconditionally.
- Same pattern repeated in `src/pages/about.astro`, `src/pages/work.astro`, `src/pages/writing/index.astro`, `src/pages/contact.astro`, `src/components/ArticleHeader.astro`.

**Fix:** Add to `base.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    opacity: 1;
    clip-path: none;
  }
  .line,
  .hero-eyebrow,
  .hero-rule,
  .hero-desc,
  .hero-meta {
    animation: none;
    opacity: 1;
    clip-path: none;
    transform: none;
  }
}
```

### 2. No skip navigation link

No `<a href="#main-content">Skip to main content</a>` link exists anywhere. Keyboard-only and screen-reader users must tab through the full header nav on every page load. WCAG 2.4.1 (Level A).

- `src/layouts/BaseLayout.astro` — missing skip link entirely.
- `src/components/Header.astro` — no skip target defined.

### 3. Markdown rendered as raw text in Work page

`src/data/workExperience.ts:76` contains `'Achieved a **2x increase** in community engagement...'` — markdown bold syntax. Work page uses `<span set:html={item} />` which will render HTML, but the data contains markdown syntax (not HTML), so `**2x increase**` appears as literal asterisks in the DOM (visible in the accessibility tree: `"Achieved a **2x increase** in community engagement..."`).

Either strip the markdown syntax from the data or process it with a markdown parser before rendering.

### 4. `<meta name="theme-color">` missing

`src/components/MetaTags.astro` has no `<meta name="theme-color">` tag. On mobile browsers (Chrome Android, Safari iOS) this means the browser chrome will not match the dark `#0e0c10` background — jarring on mobile. Should be `<meta name="theme-color" content="#171520">` (approximate oklch 15.87% 0.0089 307.84).

### 5. `color-scheme: dark` not declared on `<html>`

`src/layouts/BaseLayout.astro` — `<html>` element has no `style="color-scheme: dark"` or equivalent. This means native form controls (inputs, selects, scrollbars) render in light mode on the contact form, breaking the monochromatic dark aesthetic.

---

## Design Consistency

### 6. `transition-all` used in multiple places (guideline violation)

Explicit `transition: all` forces the browser to watch every CSS property for changes — performance anti-pattern and can produce unintended transitions on properties like `clip-path` or `color` accidentally.

- `src/components/ProjectCard.astro:18` — `transition-all duration-300`
- `src/components/Header.astro:51-53` — hamburger `<span>` elements use `transition-all`
- `src/pages/index.astro:109` — `.magnetic-cta` link uses `transition-all duration-300`
- `src/pages/writing/[slug].astro:58` — `.magnetic-cta` back-link uses `transition-all duration-300`

Fix: enumerate specific properties, e.g. `transition-[transform,border-color,background-color,color] duration-300`.

### 7. Heading hierarchy inconsistency across pages

- **Homepage**: No `<h2>` used — belief cards use `<h3>`, project cards use `<h3>`, writing section has no heading. The sections jump from `<h1>` (implicit hero) directly to `<h3>`.
- **About**: `<h3>` used for "AI Obsessive", "Writer", "Moving", "Tinkerer" with no parent `<h2>` for the section — heading hierarchy skips a level.
- **Work**: Individual role headings (`<h3>`) inside company sections (`<h2>`) are fine, but the hero `<h1>` "The Chronicle" has no `<main>` wrapper on the work page — the page landmark structure omits `<main>`.
- **Writing index**: `<h2>` for featured post title is correct; `<h2>` for "Archive" section is implicit in eyebrow but not in actual heading markup.

### 8. `<main>` landmark missing on multiple pages

- `src/pages/index.astro` — no `<main>` element. All sections are direct children of `<body>`.
- `src/pages/about.astro` — no `<main>` element.
- `src/pages/work.astro` — no `<main>` element.
- `src/pages/writing/index.astro` — no `<main>` element.
- Pages with `<main>`: `contact.astro`, `writing/[slug].astro`, `404.astro`.

This is inconsistent and reduces screen-reader landmark navigation quality. Add `<main id="main-content">` wrapping all content between header and footer on every page.

### 9. Nav active state not indicated to assistive technology

`src/components/Header.astro` — the `isActive()` function toggles visual color (`text-text` vs `text-text-muted`) but never sets `aria-current="page"` on the active nav link. Screen readers cannot identify the current page from the nav.

### 10. Asymmetric padding inconsistency: Work hero vs other heroes

All section bodies use `padding-left: 4.5rem; padding-right: 3rem` (the Anthem asymmetric system), but:

- Work hero (`src/pages/work.astro`) uses `padding: 0 3rem 5rem 3rem` — symmetric, not asymmetric.
- Writing hero (`src/pages/writing/index.astro`) uses `padding: 0 3rem 5rem 3rem` — same issue.
- About hero and Homepage hero use `0 4rem 6rem 3rem` in hero-text (right side = 4rem, left = 3rem — the reverse of the section pattern).

The section asymmetry (4.5L / 3R) is not maintained in hero containers. Consider whether this is intentional or should be unified.

### 11. Footer omits "Work" from navigation

`src/components/Footer.astro:6-11` — footer nav includes Home, About, Writing, Contact but **not Work**. The main header nav includes Work. This omission is inconsistent — either the footer is a subset by design (undocumented) or Work should be added.

### 12. SectionEyebrow sideways label not semantic

`src/components/SectionEyebrow.astro` — the desktop sideways `<span>` is a visual label with `opacity-20`, but the mobile inline `<p>` renders the same text at full opacity. On desktop, both elements exist in the DOM simultaneously (the span is `hidden lg:block`, the `<p>` is `lg:hidden`). Screen readers will read neither as a heading — they're just paragraphs/spans. For sections without an actual `<h2>`, this means the section has no heading at all for AT users.

### 13. BeliefCard `opacity-65` not a standard Tailwind utility

`src/components/BeliefCard.astro:23` — `opacity-65` used. Standard Tailwind v3/v4 ships `opacity-60` and `opacity-70` but not `opacity-65`. This likely works if Tailwind generates it on demand, but is a non-standard token not in the design system definition (`base.css` defines `--opacity-*` variables at 0.03, 0.06, 0.15, 0.25, 0.5 — none is 0.65).

---

## Accessibility

### 14. Form inputs missing `autocomplete` attributes

`src/pages/contact.astro` — form has `autocomplete="off"` on the `<form>` element (disabling browser autofill globally), but individual fields should have semantic autocomplete values:

- Name field: should have `autocomplete="name"`
- Email field: should have `autocomplete="email"`
  The blanket `autocomplete="off"` prevents password managers and autofill from helping users.

### 15. Form inputs missing `spellcheck="false"` on email field

`src/pages/contact.astro:159-170` — email input lacks `spellCheck="false"`. Browsers may show spelling indicators on email addresses.

### 16. Contact form submit button: no loading/spinner state

`src/pages/contact.astro:258-264` — submit `<button>` has no disabled state, no aria-busy, no spinner during submission. If the form action is slow, users receive no feedback that submission is in progress and may submit multiple times.

### 17. Form status message lacks `aria-live`

`src/pages/contact.astro:96-109` — success/error status message is rendered server-side (after form POST redirect) not as a dynamic live region. This is acceptable for server-rendered forms, but if any client-side validation is added later, the container needs `aria-live="polite"`.

### 18. Icon buttons and decorative icons

- `src/components/Button.astro` — when rendered with `icon` only (no `title`), the `<Icon>` has no `aria-hidden` and the button has no `aria-label`. The component has a `title` prop but it's optional — callers can omit both, producing an unlabeled icon button.
- `src/components/ProjectCard.astro:42` — the `→` arrow span has no `aria-hidden="true"`. It will be read by screen readers as "right-pointing arrow".
- `src/components/BeliefCard.astro:17` — ghost number `<span>` missing `aria-hidden="true"` (though it's marked `pointer-events-none`, it's still in the a11y tree).

### 19. Article images missing explicit `width`/`height` attributes

`src/pages/work.astro:101-107` — company logo images use `<img>` (not Astro `<Image>`). They have `class="h-7 w-auto"` CSS sizing but no HTML `width`/`height` attributes. This causes CLS (Cumulative Layout Shift) as images load.

`src/pages/writing/export-chats-from-chatgpt.md` — article contains an image with alt text `"image_tooltip"` which is not descriptive. The alt text should describe the actual screenshot content.

### 20. `<time>` element in ArticleHeader uses fallback

`src/components/ArticleHeader.astro:33` — `datetime={date instanceof Date ? date.toISOString() : date}`. The fallback branch (when `date` is not a `Date`) will write a raw string to `datetime`, which may not be a valid ISO 8601 value. The typing should enforce `Date` and the fallback removed.

---

## Copy & Content

### 21. Site description uses emoji and generic tone

`src/site.config.ts:13` — `description: '🚀 Customer Experience professional with a passion for people & tech (among other things). Welcome to my little corner of the internet.'`

This is used as the `<meta name="description">` and OG description. Issues:

- Emoji in meta descriptions renders poorly in some search results
- "passion for people & tech" is generic LinkedIn boilerplate
- "Welcome to my little corner of the internet" undercuts the Anthem voice
- Inconsistent with the site's confident, distinctive tone

The site's actual hero copy ("Building bridges between technology and the humans who need it") is far stronger and should be the description.

### 22. Article alt text `"image_tooltip"` in ChatGPT export post

`src/content/writing/export-chats-from-chatgpt.md` — an image has alt text `image_tooltip`, which appears to be a placeholder left from the original authoring tool. Replace with a real description of the screenshot.

### 23. Writing index has only 2 articles; tag filter renders with one tag

The tag filter UI in `writing/index.astro` appears with just one tag (the featured post is excluded from the filterable list, leaving only 1 post in the filtered section). With 2 total articles, the "Latest" featured post + filter pattern feels over-engineered. Consider simplifying until the archive grows (10+ posts).

### 24. Work page achievement copy is generic

Several achievement bullets across companies read like placeholders:

- `"Achieved 95% customer satisfaction rating across portfolio."` (generic metric)
- `"Completed high-impact, short-term engagement focused on specific customer goals."` (says nothing)
- `"Provided foundational tech strategy enabling company launch."` (vague)
- `"Completed intensive training and onboarding program."` (Veracode Senior SPM role, May–May 2021, 1-month duration — this looks like a data error, not a real role)

These undercut the strong narrative voice elsewhere on the page.

### 25. Footer brand opacity too low

`src/components/Footer.astro:21` — `"David D. Lawson"` text has `opacity-15`, the description has `opacity-50`. At these values the footer is nearly invisible — intentional ghost treatment or overly subdued? The nav column headings ("Navigate", "Elsewhere") have `opacity-35`. These compound opacity values on already-muted text colors (`text-text-muted`) may fail WCAG AA contrast (4.5:1 for small text) against the dark background.

---

## Responsive Design

### 26. Contact page sticky left panel will overflow on short mobile screens

`src/pages/contact.astro:283-288` — `.signal-left` is `position: sticky; height: 100vh` on desktop. The breakpoint switch to `position: static` uses `max-width: 899px`. On iPad (768px wide), the sticky panel is correctly disabled. However the ghost text `"HELLO"` absolutely positioned at `-bottom-8` may clip out of `overflow: hidden` bounds at intermediate sizes.

### 27. Hero responsive breakpoint inconsistency

- Homepage hero breaks to single-column at `max-width: 900px` (custom `--breakpoint-lg` is 900px — correct).
- About hero breaks at 900px too — consistent.
- Work hero breaks at 900px — consistent.
- Contact grid breaks at `max-width: 899px` — uses 899, not 900. Off-by-one from the defined system breakpoint. Minor but inconsistent.

### 28. `pl-12 max-lg:pl-0` pattern shifts content abruptly

All content sections use `pl-12 max-lg:pl-0` to shift right of the sideways eyebrow. At exactly the `lg` (900px) breakpoint this creates a snap from `pl-0` to `pl-12`. Consider a graduated transition (`md:pl-6 lg:pl-12`) to avoid the sharp jump.

### 29. PostListItem tag truncation on mobile

`src/components/PostListItem.astro` — on mobile (`max-width: 900px`) the grid collapses to single column. The tag pill `justify-self: start` is set but there's no `max-width` or `truncate` protection on the title span, which could overflow on very long titles.

### 30. `min-height: 100vh` heroes on mobile iOS

Hero sections use `min-height: 100vh`. On iOS Safari, `100vh` includes the browser chrome, causing content to be hidden behind the address bar. Should use `min-height: 100dvh` (dynamic viewport height) with `100vh` fallback.

```css
min-height: 100vh;
min-height: 100dvh;
```

---

## Minor Polish

### 31. Nav "Work" link missing from footer

See issue #11. Footer navigation is missing the Work page link.

### 32. Ellipsis in placeholder text uses `...` not `…`

`src/pages/contact.astro:139` — `placeholder="Your name"` (fine), but no placeholder uses the proper typographic `…` (U+2026). All placeholders end without ellipsis, so this is not actively wrong but worth noting per guidelines.

### 33. `"..."` vs `"…"` in article content

`src/content/writing/show-your-work.md` and `export-chats-from-chatgpt.md` — older articles likely use straight quotes and `...`. These are content files, so this is low priority, but the typography guideline applies.

### 34. `font-size` and `line-height` via inline styles rather than tokens

Multiple places use inline styles for minor font size tweaks:

- `src/pages/index.astro:99` — `style="font-size: 1.02rem; line-height: 1.8;"`
- `src/pages/about.astro:65, 108, 117` — same
- `src/pages/work.astro:117` — same

The design system defines `--text-body` (1rem) and `--text-body-lg` (1.1rem) but `1.02rem` is a one-off. Using `prose-anthem` classes or a defined token would be cleaner.

### 35. `anthem.astro` is an unlinked orphan page

`src/pages/anthem.astro` is not linked from any nav, footer, or other page. It appears to be a design exploration/reference page. It should either be deleted before launch or marked with `export const prerender = true` + `noindex: true` to keep it off search results.

### 36. `reveal.ts` script does not guard against view transitions re-triggering on already-visible elements

`src/scripts/reveal.ts` — the script listens on `astro:page-load` and selects `.reveal:not(.visible)`. This correctly skips already-revealed elements on forward navigation. However, if ClientRouter's back navigation restores the page from cache, elements that were `.visible` on the forward view may not be `.visible` in the restored DOM snapshot (depending on Astro's snapshot behavior), potentially causing content to flash invisible briefly on back navigation.

### 37. Magnetic script uses `getBoundingClientRect` in mousemove

`src/scripts/magnetic.ts:6` — `el.getBoundingClientRect()` is called inside a `mousemove` handler, which fires at 60fps. This is a layout read on every mouse movement — a minor performance concern. Store the rect on `mouseenter` and invalidate on `scroll`/`resize` instead.

### 38. `lang` attribute set to `"en"` but site is London-based

`src/site.config.ts:14` — `language: 'en'` but `BaseLayout.astro` reads `language = 'en-gb'` as default. The config value `'en'` is never actually applied — the fallback `'en-gb'` always wins. This isn't a bug (en-gb is correct), but the config value is misleading/dead.

### 39. Missing `rel="me"` on social links for identity verification

`src/components/Footer.astro` and `src/pages/contact.astro` — external social links (LinkedIn, Twitter, GitHub) don't have `rel="me"`. Adding `rel="me noopener noreferrer"` enables IndieWeb identity verification and is a minor SEO/trust signal.

### 40. FeedbackFish script loads on every page unconditionally

`src/components/MetaTags.astro:93` — `<script defer is:inline src="https://feedback.fish/ff.js?pid=...">` loads on every page including article pages. If FeedbackFish is only intended for specific pages, load it conditionally. Even if intentional, loading a third-party script synchronously (even with `defer`) on every page adds to total blocking time.

---

## Page-by-Page Notes

### Homepage

- No `<main>` landmark wrapping content sections.
- `<h1>` is inside `.hero` with no semantic wrapper — fine structurally, but the heading hierarchy goes `h1 > h3 > h3 > h3 > h3` (beliefs) with no `h2` anywhere on the page.
- PullQuote section: the quote `<p>` is not marked up as a `<blockquote>` — semantically incorrect for a quoted statement.
- About teaser section duplicates the same pull quote that appears on the About page verbatim. Both pages use identical quote + attribution. Intentional pattern or copy-paste?
- "Read the full story →" CTA uses `&rarr;` entity (fine), but the arrow is part of the link text and not hidden from AT — acceptable.
- ProjectCard: when `project.url` is null the Tag renders as `<div>` with no interactive role. Cards without URLs still show a `→` arrow suggesting interactivity. Either remove the arrow for non-linked cards or add a `role="region"` / `aria-label`.

### About

- Hero section `<section class="about-hero">` has no `aria-label` or heading — the `<h1>` "Behind The Work" is the only landmark.
- "Off the Clock" grid items use `<h3>` with no parent `<h2>` — heading skips from `<h1>` to `<h3>`.
- Same pull quote as homepage — see above.
- "Connect" section has two `<Button>` components ("Get In Touch", "Read My Writing") — both render as `<a>` tags (correct). Icons render without `aria-hidden`, meaning screen readers will announce the icon name alongside the button text.
- Photo has `alt="David D. Lawson"` — same alt text as homepage photo. Both are portraits; this is acceptable but identical to the hero `alt`.

### Work

- No `<main>` landmark.
- Work hero is the only page without a split-column photo — uses a ghost year range `"2017 / Now"` panel instead. This is a deliberate and distinctive departure that works well aesthetically.
- Company logo `<img>` elements lack `width`/`height` HTML attributes (CLS risk).
- Veracode `"Senior Security Program Manager"` role dates: `May 2021 — May 2021` (single month). This looks like a data error — likely the role existed for less than a month during onboarding transition to "Team Lead". Should be clarified or removed.
- `set:html` on achievement bullets: raw markdown syntax visible (`**2x increase**`).
- Nila Expeditions has no logo (no `logoUrl`) so the logo column is empty — the `{company.logoUrl && <img .../>}` conditional handles this gracefully, but the layout shifts slightly.

### Writing (Index)

- No `<main>` landmark.
- With only 2 articles, the "Latest" featured post takes up an entire full-bleed section, and the archive has 1 post. The tag filter renders with 0 tags (the only tag would be on the featured post, which is excluded from the filtered list). Confirm tag filter logic — the featured post's tags are not included in `allTags` since `allTags` is derived from `blogPosts.flatMap(...)` but the featured post IS in `blogPosts`. Check if the filter button for any tag on the featured post would work correctly — it wouldn't, since the featured post link is outside `.post-list`.
- "Every Word" heading: `line-1` has `opacity-watermark` applied directly on the `<span>` — this creates an interesting visual where "Every" fades and "Word" is solid. Distinctive and intentional; works well.

### Writing (Article — show-your-work, export-chats-from-chatgpt)

- Both articles have a `<main>` element — consistent.
- `ArticleHeader` back link `"← Back to Archive"` and the bottom section back link `"← Back to the Archive"` are slightly inconsistent in wording (missing "the" in the header).
- Article content renders without a `<nav aria-label="Breadcrumb">` or breadcrumb — fine for a simple blog, but the back links double as breadcrumbs without semantic markup.
- `export-chats-from-chatgpt` article: image alt text is `"image_tooltip"` — placeholder, not descriptive.
- `export-chats-from-chatgpt` article: the content references ChatGPT lacking export features "as of February 2023" — this is now significantly outdated (ChatGPT has native export). Consider adding a dated disclaimer at the top or an editorial note.
- Article `<article>` element has no `aria-labelledby` pointing to the `<h1>`.

### Contact

- Has `<main>` element — good.
- The Cloudflare Turnstile widget (`#turnstile-widget`) has no `<label>` or `aria-label`. The CAPTCHA itself is managed by Cloudflare but the container should have an accessible description.
- `autocomplete="off"` on the form element prevents browser autofill — reconsider; see issue #14.
- Email input lacks `spellCheck="false"` — see issue #15.
- Submit button (`"Send Message"`) lacks a loading/disabled state for in-flight requests — see issue #16.
- The left panel `HELLO` ghost text is `aria-hidden="true"` — correct.
- Social links in left panel use `aria-label={ariaLabel}` (LinkedIn, Twitter, GitHub) — good. But the visible text and aria-label are the same (both "LinkedIn" etc.) — redundant but not harmful.
- The sticky left panel at desktop viewport behaves correctly; collapses to static at mobile — good layout approach.

---

## Accessibility — Round 2 (2026-04-06)

### 41. `--color-text-muted` fails WCAG AA contrast on dark bg

`src/assets/styles/base.css` — `--color-text-muted` was `oklch(43% 0.014 290)` against `--color-bg` at `oklch(15.87% 0.0089 307.84)`. Estimated contrast ratio ~1.9:1, well below the 4.5:1 WCAG AA minimum for normal text. Used across nav links, footer text, section labels, and card descriptions.

**Fix:** Increased to `oklch(55% 0.014 290)`.

### 42. Footer section headings/copyright compound opacity fails contrast

`src/components/Footer.astro` — "Navigate" and "Elsewhere" headings used `text-text-muted opacity-35`, and copyright used `text-text-muted opacity-25`. These compounding opacity values on an already-muted color reduced contrast well below readable levels.

**Fix:** Removed `opacity-35` from section headings and `opacity-25` from copyright. The `text-text-muted` token (now at 55% lightness) provides sufficient de-emphasis without additional opacity.

### 43. `PullQuote` uses `<section><p>` instead of `<blockquote>`

`src/components/PullQuote.astro` — Wraps quoted text in `<section><p>` instead of the semantic `<blockquote>` element. Attribution uses a plain `<p>` without `<cite>`. Screen readers cannot identify this as a quotation.

### 44. `BeliefCard` uses generic `<div>` instead of `<article>`

`src/components/BeliefCard.astro` — Card wrapper is a generic `<div>`. Should be `<article>` to convey self-contained content semantics. No ARIA role or semantic wrapper.

### 45. Writing index tag filter buttons lack `aria-label`

`src/pages/writing/index.astro` — Tag filter buttons have `data-tag` attributes but no `aria-label`. Screen readers cannot identify the purpose of each filter button beyond the visible text.

### 46. `ArticleHeader` animations missing `prefers-reduced-motion` override

`src/components/ArticleHeader.astro` — Heavy clip-path and transform animations in the component's `<style>` block have no `prefers-reduced-motion: reduce` media query. The global override in `base.css` only covers `.reveal`, `.line`, `.hero-eyebrow`, `.hero-rule`, `.hero-desc`, and `.hero-meta` — ArticleHeader's unique animation classes are not included.

### 47. Homepage has no page-level `<h1>`

`src/pages/index.astro` — The page heading is driven by the Hero component rather than an explicit `<h1>` in the page markup. The heading hierarchy jumps from `<h1>` (implicit in Hero) directly to `<h3>` (belief cards, project cards) with no `<h2>` sections.

### 48. Mobile menu lacks `role="navigation"` landmark

`src/components/Header.astro` — The mobile dropdown menu uses `hidden` attribute toggling but lacks a `role="navigation"` landmark or `aria-hidden` attribute. Screen readers may not properly identify it as a navigation region.

### 49. `ProjectCard` `<a>` variant needs visible focus indicator

`src/components/ProjectCard.astro` — When rendered as an `<a>` element, the card needs a visible focus indicator for keyboard navigation. The global `*:focus-visible` ring may be obscured by the card's border/background styling.

### 50. `workExperience.ts` contains inline `<strong>` HTML in data strings

`src/data/workExperience.ts:76` — Achievement text contains inline `<strong>` HTML tags rendered via `set:html`. Embedding HTML in data strings is fragile for accessibility tooling and makes content harder to audit.
