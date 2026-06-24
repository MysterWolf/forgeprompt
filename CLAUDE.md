# PromptSmith — Claude Context
**Last updated:** June 2026
**Version:** 1.1.0

## What This Is
Digital prompt playbook store for professionals. B2B product site selling role-specific, validated AI prompt libraries. Built in React/Vite, deployed to GitHub Pages with custom domain promptsmith.store.

Sister brand to ProcessMind LLC (mysterwolf.github.io/processmind/). Same owner, different product line.

## Current Status
- **Live:** promptsmith.store
- **Deployed from:** gh-pages branch
- **Custom domain:** promptsmith.store (CNAME in public/)

## Tech Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React/Vite | Single-page, no router needed |
| Hosting | GitHub Pages | gh-pages branch |
| Styling | Inline styles + `<style>` block | CSS variables in `:root` inside App.jsx |
| Fonts | Inter, JetBrains Mono | Google Fonts via @import |

## Brand Palette (CSS Variables)
```css
--fp-accent:      #2D4A8A   /* deep professional blue */
--fp-accent-dark: #243D73   /* hover state */
--fp-bg:          #FAFAFA   /* page background */
--fp-white:       #FFFFFF   /* card / section backgrounds */
--fp-text:        #1A1A1A   /* primary text */
--fp-muted:       #6B7280   /* secondary text */
--fp-border:      #E5E7EB   /* borders and dividers */
```
To retheme: update only the `:root` block inside App.jsx. Do not hardcode colors.

## Key Files
| File | Purpose |
|------|---------|
| src/App.jsx | Entire site — all sections, components, styles, and data |
| src/index.css | Minimal reset only — do not add shared styles here |
| src/main.jsx | Entry point — mounts App |
| vite.config.js | base: '/' (custom domain configured) |
| public/CNAME | Custom domain: promptsmith.store |
| public/favicon.svg | Blue square icon with lines |
| index.html | Title, meta description, favicon ref |

## Site Structure (src/App.jsx)
1. **Nav** — Fixed, scrolled blur effect, logo mark + links + CTA button
2. **Hero** — Grid bg pattern, headline, subhead, dual CTAs, trust bar
3. **Products** — 2×2 card grid, platform badges, Gumroad links for available items
4. **How it works** — 3-step process (Download → Open tool → Paste and go)
5. **About** — Two-column: narrative left, spec table right
6. **CTA banner** — Blue background strip with Browse Playbooks button
7. **Footer** — Logo, nav links, ProcessMind attribution, copyright

## Products Data (in App.jsx)
| Product | Platform | Status | Gumroad URL |
|---------|----------|--------|-------------|
| Field PM Copilot Playbook | M365 | Live | forgeprompt.gumroad.com/l/field-pm-copilot |
| Data Quality Copilot Playbook | M365 | Live | forgeprompt.gumroad.com/l/data-quality-copilot |
| Social Worker's Gemini Playbook | Gemini | Coming soon | — |
| Admin Assistant Copilot Playbook | M365 | Coming soon | — |

Product cards show: name, one-line description, platform badge, and "Get it now" button. **No price on cards** — price lives on Gumroad.

To add a product: add an entry to the `products` array at the top of App.jsx. Fields: `id`, `title`, `desc`, `platform` (`"M365"` or `"Gemini"`), `price`, `available` (boolean), `gumroad` (URL or null).

To add a platform: add a color entry to `PlatformBadge`'s `colors` object.

## Architecture Decisions
- Single-page, no router — all sections are scroll-anchored via `id`
- All styles live inside App.jsx `<style>` block — do not move to index.css
- No analytics, no backend, no CMS
- Subtle grid background on hero via CSS `backgroundImage`
- Reveal animations use IntersectionObserver (same pattern as ProcessMind)
- Product cards link directly to Gumroad — no cart, no account required
- Contact email: hello@promptsmith.store

## Invariants — Never Change These
- **vite.config.js base must stay '/'** — custom domain is configured via CNAME
- **public/CNAME must stay `promptsmith.store`** — do not remove or alter
- **CSS variables only in :root block in App.jsx** — never hardcode colors
- **Products array is the single source of truth** — never hard-code product details in JSX
- **Available products link to Gumroad** — do not add an internal checkout flow
- **No dark mode** — this is a light-first professional product site
- **Keep the ProcessMind footer attribution** — PromptSmith is explicitly a ProcessMind product
- **No price on product cards** — price lives on Gumroad only

## Pending Work
1. Update Gumroad account/URLs to promptsmith branding (replace forgeprompt.gumroad.com URLs)
2. Update contact/support email when domain email is set up
3. Add Social Worker's Gemini Playbook when ready
4. Add Admin Assistant Copilot Playbook when ready
5. Add email capture for "Notify me" on coming-soon products

## Deployment
```bash
npm run deploy
# Runs: vite build && gh-pages -d dist
```
Always run from ~/forgeprompt. The gh-pages branch is managed automatically.

## Claude Code Session Starter
"I'm working on the PromptSmith product site at github.com/MysterWolf/forgeprompt. Pull the repo and read CLAUDE.md. This is a single-page React/Vite site deployed to GitHub Pages at promptsmith.store. CSS variables only in :root inside App.jsx. All styles in the App.jsx style block — do not move to index.css. Products data in the products array at the top of App.jsx. vite.config.js base is '/'. Custom domain set via public/CNAME. No prices on product cards. Confirm before making any changes."
