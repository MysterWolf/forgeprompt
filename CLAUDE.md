# PromptSmith — Claude Context
**Last updated:** June 2026
**Version:** 1.3.0

## What This Is
Digital prompt playbook store for professionals. Sells role-specific playbooks, starter packs, and everyday AI guides. Built in React/Vite, deployed to GitHub Pages with custom domain www.promptsmith.store.

Sister brand to ProcessMind LLC (www.theprocessmind.com). Same owner, different product line.

## Current Status
- **Live:** https://www.promptsmith.store (HTTPS enforced)
- **Deployed from:** gh-pages branch
- **Custom domain:** www.promptsmith.store (CNAME in public/)
- **Apex redirect:** promptsmith.store → www.promptsmith.store (via GitHub Pages)

## Tech Stack
| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React/Vite | Single-page, no router needed |
| Hosting | GitHub Pages | gh-pages branch |
| Styling | Inline styles + `<style>` block | CSS variables in `:root` inside App.jsx |
| Fonts | Inter, JetBrains Mono | Google Fonts via @import |

## Brand Palette (CSS Variables)
```css
--fp-accent:      #1B3A5C   /* PromptSmith navy */
--fp-accent-dark: #142D47   /* hover state */
--fp-gold:        #C9A84C   /* brand gold — used for Start Here divider */
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
| public/CNAME | Custom domain: www.promptsmith.store |
| public/favicon.svg | Blue square icon with lines |
| index.html | Title, meta description, favicon ref |

## Site Structure (src/App.jsx)
1. **Nav** — Fixed, scrolled blur effect, logo mark + links + CTA button
2. **Hero** — Grid bg pattern, headline, subhead, dual CTAs, trust bar
3. **Products** — Two grouped sections (Start Here / Role-Specific Playbooks / Beyond Work), platform badges, Gumroad links
4. **How it works** — 3-step process (Download → Open tool → Paste and go)
5. **About** — Two-column: narrative left, spec table right
6. **CTA banner** — Navy background strip with Browse Playbooks button
7. **Footer** — Logo, nav links, ProcessMind attribution, copyright

## Components (in App.jsx)
- **`PlatformBadge`** — renders platform chip; colors keyed by platform string
- **`ProductCard`** — renders one product; handles 3 button states (see below)
- **`CatalogDivider`** — section divider with label + horizontal rule; `gold` prop for Start Here
- **`Reveal`** — IntersectionObserver fade-up wrapper

## Products Data (in App.jsx)
Products array at top of file. Each entry:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | kebab-case, unique |
| `title` | string | Display name |
| `subtitle` | string \| omit | Edition label shown in mono below title |
| `desc` | string | One or two sentences |
| `platform` | `"M365"` \| `"Gemini"` \| `"Any AI"` \| `"Claude · ChatGPT · Gemini"` | Controls badge color |
| `price` | string | Data only — not shown on card; lives on Gumroad |
| `category` | `"starter"` \| `"role"` \| `"everyday"` | Controls which section it appears in |
| `available` | boolean | false = "Notify me" state |
| `gumroad` | string \| null | null = "Available soon" state |

### Button states on ProductCard
| `available` | `gumroad` | Button shown |
|---|---|---|
| `true` | URL string | "Get it now" → links to Gumroad |
| `true` | `null` | "Available soon" (muted, no link) |
| `false` | any | "Notify me" (muted, no link) |

### Current catalog
| Product | Category | Platform | Price | Gumroad |
|---------|----------|----------|-------|---------|
| Your First 30 Prompts (Non-Technical) | starter | Any AI | $9 | mysterwolf.gumroad.com/l/nontechai ✓ |
| Your First 30 Prompts + 25 More (Semi-Technical) | starter | Any AI | $14 | — pending |
| Field PM Copilot Playbook | role | M365 | $29 | mysterwolf.gumroad.com/l/PMAIPlaybook ✓ |
| Data Quality Copilot Playbook | role | M365 | $24 | forgeprompt.gumroad.com/l/data-quality-copilot (old URL) |
| People Manager Prompt Pack | role | M365 | $29 | mysterwolf.gumroad.com/l/peoplepack ✓ |
| Developer Prompt Pack | role | Claude · ChatGPT · Gemini | $19 | mysterwolf.gumroad.com/l/developai ✓ |
| Analyst Prompt Pack | role | Any AI | $19 | mysterwolf.gumroad.com/l/analystai ✓ |
| Social Worker's Gemini Playbook | role | Gemini | — | coming soon |
| Admin Assistant Copilot Playbook | role | M365 | — | coming soon |
| AI for Everyday Life | everyday | Any AI | $9 | — pending |

To add a product: add an entry to the `products` array. To add a platform: add a color entry to `PlatformBadge`'s `colors` object.

## Architecture Decisions
- Single-page, no router — all sections are scroll-anchored via `id`
- All styles live inside App.jsx `<style>` block — do not move to index.css
- No analytics, no backend, no CMS
- Product sections grouped by `category` — rendered via filtered arrays (`starters`, `roleItems`, `everyday`) at the top of the App component
- Reveal animations use IntersectionObserver
- Product cards link directly to Gumroad — no cart, no account required
- Contact email: hello@promptsmith.store

## Invariants — Never Change These
- **vite.config.js base must stay '/'** — custom domain is configured via CNAME
- **public/CNAME must stay `www.promptsmith.store`** — do not change back to apex; apex cert provisioning was permanently stalled on GitHub Pages; www CNAME path works correctly
- **CSS variables only in :root block in App.jsx** — never hardcode colors
- **Products array is the single source of truth** — never hard-code product details in JSX
- **Available products link to Gumroad** — do not add an internal checkout flow
- **No price on product cards** — price lives on Gumroad only
- **No dark mode** — this is a light-first professional product site
- **Keep the ProcessMind footer attribution** — PromptSmith is explicitly a ProcessMind product
- **category field is required on every product** — drives section grouping
- **Confirm all design decisions before implementing** — do not infer layout, grouping, badge style, or copy from context

## Pending Work
1. Wire Gumroad URLs: Your First 30 Prompts + 25 More, AI for Everyday Life
2. Replace Data Quality Gumroad URL (still on forgeprompt.gumroad.com — needs mysterwolf.gumroad.com equivalent)
3. Update contact/support email when domain email is set up
4. Add email capture for "Notify me" on coming-soon products

## Deployment
```bash
npm run deploy
# Runs: vite build && gh-pages -d dist
```
Always run from ~/forgeprompt. The gh-pages branch is managed automatically.

## Claude Code Session Starter
"I'm working on the PromptSmith product site at github.com/MysterWolf/forgeprompt. Pull the repo and read CLAUDE.md. This is a single-page React/Vite site deployed to GitHub Pages at www.promptsmith.store (HTTPS enforced). CSS variables only in :root inside App.jsx. All styles in the App.jsx style block — do not move to index.css. Products data in the products array at the top of App.jsx — each product needs id, title, desc, platform, price, category, available, gumroad fields. vite.config.js base is '/'. Custom domain is www.promptsmith.store set via public/CNAME — do not change to apex domain. No prices on product cards. Confirm all design decisions before implementing."
