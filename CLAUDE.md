# ForgePrompt.studio — Claude Context
**Last updated:** June 2026
**Version:** 1.0.0

## What This Is
Digital prompt playbook store for professionals. B2B product site selling role-specific, validated AI prompt libraries. Built in React/Vite, deployed to GitHub Pages at mysterwolf.github.io/forgeprompt/.

Sister brand to ProcessMind LLC (mysterwolf.github.io/processmind/). Same owner, different product line.

## Current Status
- **Live:** mysterwolf.github.io/forgeprompt/
- **Deployed from:** gh-pages branch

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
| vite.config.js | base: '/forgeprompt/' for GitHub Pages subdirectory |
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
| Product | Platform | Price | Status | Gumroad URL |
|---------|----------|-------|--------|-------------|
| Field PM Copilot Playbook | M365 | $29 | Live | forgeprompt.gumroad.com/l/field-pm-copilot |
| Data Quality Copilot Playbook | M365 | $19 | Live | forgeprompt.gumroad.com/l/data-quality-copilot |
| Social Worker's Gemini Playbook | Gemini | — | Coming soon | — |
| Admin Assistant Copilot Playbook | M365 | — | Coming soon | — |

To add a product: add an entry to the `products` array at the top of App.jsx. Fields: `id`, `title`, `desc`, `platform` (`"M365"` or `"Gemini"`), `price`, `available` (boolean), `gumroad` (URL or null).

To add a platform: add a color entry to `PlatformBadge`'s `colors` object.

## Architecture Decisions
- Single-page, no router — all sections are scroll-anchored via `id`
- All styles live inside App.jsx `<style>` block — do not move to index.css
- No analytics, no backend, no CMS
- Subtle grid background on hero via CSS `backgroundImage`
- Reveal animations use IntersectionObserver (same pattern as ProcessMind)
- Product cards link directly to Gumroad — no cart, no account required
- Contact email placeholder: hello@forgeprompt.studio

## Invariants — Never Change These
- **vite.config.js base must stay '/forgeprompt/'** until a custom domain is configured (then change to '/' and add CNAME)
- **CSS variables only in :root block in App.jsx** — never hardcode colors
- **Products array is the single source of truth** — never hard-code product details in JSX
- **Available products link to Gumroad** — do not add an internal checkout flow
- **No dark mode** — this is a light-first professional product site
- **Keep the ProcessMind footer attribution** — ForgePrompt is explicitly a ProcessMind product

## Pending Work
1. Create Gumroad account and publish products (replace placeholder URLs)
2. Register ForgePrompt.studio domain
3. Add CNAME when domain is ready, change vite.config.js base to '/', redeploy
4. Update contact/support email when domain email is set up
5. Add Social Worker's Gemini Playbook when ready
6. Add Admin Assistant Copilot Playbook when ready
7. Add email capture for "Notify me" on coming-soon products

## Deployment
```bash
npm run deploy
# Runs: vite build && gh-pages -d dist
```
Always run from ~/forgeprompt. The gh-pages branch is managed automatically.

## Claude Code Session Starter
"I'm working on the ForgePrompt.studio product site at github.com/MysterWolf/forgeprompt. Pull the repo and read CLAUDE.md. This is a single-page React/Vite site deployed to GitHub Pages at mysterwolf.github.io/forgeprompt/. CSS variables only in :root inside App.jsx. All styles in the App.jsx style block — do not move to index.css. Products data in the products array at the top of App.jsx. vite.config.js base is '/forgeprompt/'. Confirm before making any changes."
