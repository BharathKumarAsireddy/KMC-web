# KMC Groups PVT LTD — Website Project

## Project Overview

**Client:** KMC Groups PVT LTD
**Project Type:** Multi-business corporate website
**Runtime:** Local only (no server, no deployment) — pure HTML/CSS/JavaScript
**Goal:** A professional, attractive, and modern website that covers all KMC business verticals under one brand umbrella.

---

## Business Verticals

1. **Real Estate** — Properties for sale/rent, residential & commercial projects
2. **Restaurant** — Dining experiences, menus, locations, reservations
3. **Construction** — Projects portfolio, services, expertise

> Additional verticals may be added. Design must accommodate extensibility.

---

## Tech Stack (Frontend Only — No Server)

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks (or optionally lightweight like Alpine.js if needed)
- **No build tools** — Open `index.html` directly in browser (file:// protocol safe)
- **No backend, no Node.js, no API calls to external servers**
- **Fonts:** Google Fonts (loaded via CDN link tag)
- **Icons:** Font Awesome or Heroicons (CDN)
- **Images:** Placeholder images via `https://picsum.photos` or local `/assets/images/`

---

## File Structure

```
KMC web/
├── claude.md                  ← This file (project spec)
├── index.html                 ← Homepage (main entry point)
├── css/
│   ├── styles.css             ← Global styles, variables, reset
│   ├── components.css         ← Reusable components (cards, buttons, nav)
│   └── animations.css         ← Scroll animations, transitions
├── js/
│   ├── main.js                ← Navigation, scroll effects, shared logic
│   ├── home.js                ← Homepage-specific interactions
│   └── [page].js              ← Per-page scripts if needed
├── pages/
│   ├── real-estate.html       ← Real Estate division page
│   ├── restaurant.html        ← Restaurant division page
│   └── construction.html      ← Construction division page
├── assets/
│   ├── images/                ← Local images (logo, team, projects)
│   └── icons/                 ← Any custom SVG icons
└── components/                ← (Optional) HTML snippet reference files
```

---

## Design System

### Brand Identity
- **Primary Color:** `#1A2E4A` (Deep Navy Blue — trust, professionalism)
- **Accent Color:** `#C9A84C` (Warm Gold — luxury, premium)
- **Secondary Accent:** `#E8F4F8` (Light Blue-Grey — clean backgrounds)
- **Text Dark:** `#1C1C1E`
- **Text Muted:** `#6B7280`
- **White:** `#FFFFFF`
- **Success/CTA:** `#2D6A4F` (Deep Green for CTAs)

### Typography
- **Heading Font:** `Playfair Display` (serif — prestigious, real estate feel)
- **Body Font:** `Inter` (sans-serif — clean, modern, readable)
- **Base font size:** 16px
- **Scale:** 12 / 14 / 16 / 18 / 24 / 32 / 40 / 56 / 72px

### Spacing System
- Use `8px` base unit: `8, 16, 24, 32, 48, 64, 80, 96px`

### Border Radius
- Small: `4px`, Medium: `8px`, Large: `16px`, Full: `9999px`

### Shadows
```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 4px 16px rgba(0,0,0,0.10);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.14);
--shadow-gold: 0 4px 20px rgba(201,168,76,0.25);
```

---

## Pages & Sections

### 1. `index.html` — Homepage

- **Navbar** — Logo + navigation links + CTA button ("Contact Us"), sticky on scroll, mobile hamburger menu
- **Hero Section** — Full-screen, animated headline, subtitle, dual CTA buttons, background video/image with overlay
- **About KMC Section** — Brand story, vision, mission, founding values with a clean 2-col layout
- **Business Divisions** — 3 clickable cards (Real Estate / Restaurant / Construction) with hover effects
- **Stats Counter** — Animated counters: Years in Business, Projects Completed, Happy Clients, Cities Present
- **Featured Projects** — Grid of 6 showcase projects with category filter tabs
- **Testimonials** — Sliding carousel with client quotes and star ratings
- **Team Section** — Leadership team cards with name, title, photo
- **Contact Section** — Contact form (client-side only), map embed placeholder, contact details
- **Footer** — Logo, quick links, social icons, copyright

### 2. `pages/real-estate.html` — Real Estate

- Hero with tagline "Find Your Perfect Space"
- Property search/filter bar (UI only, JS-powered filter)
- Property listing cards (image, price, location, beds/baths, area)
- Featured developments (large showcase cards)
- Why Choose KMC Real Estate — icon + text feature list
- Current Projects (Under Construction / Ready to Move / Upcoming)
- Enquiry form

### 3. `pages/restaurant.html` — Restaurant

- Hero with food/ambiance photography
- About the restaurant — story, ambiance, philosophy
- Menu preview — tabbed categories (Appetizers / Mains / Desserts / Beverages)
- Gallery — masonry photo grid
- Reservation form (client-side)
- Location & Hours
- Chef's Special / Featured Dish highlight section

### 4. `pages/construction.html` — Construction

- Hero with project imagery
- Services offered — icon cards (Residential, Commercial, Interior, Renovation, etc.)
- Project portfolio — filterable gallery by category
- Process / How We Work — numbered step timeline
- Certifications & Partnerships section
- Project inquiry form

---

## UI/UX Requirements

### Navigation
- Sticky navbar that changes background on scroll (transparent → white/dark)
- Smooth scroll for anchor links
- Active link highlighting
- Mobile: full-screen slide-in hamburger menu

### Animations & Interactions
- Scroll-triggered fade-in / slide-up for sections (Intersection Observer API)
- Counter animation for stats
- Hover effects: cards lift with shadow, images zoom subtly
- Smooth page transitions
- Parallax effect on hero sections
- Cursor: pointer on all clickable elements

### Responsiveness
- Mobile-first approach
- Breakpoints: `480px / 768px / 1024px / 1280px / 1440px`
- All grids collapse gracefully on mobile
- Touch-friendly tap targets (min 44px)
- No horizontal scroll on any viewport

### Performance (local)
- Lazy loading for images (`loading="lazy"`)
- Minimal external dependencies
- CSS animations using `transform` and `opacity` only (GPU-accelerated)

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` on icon-only buttons
- Color contrast ratio ≥ 4.5:1
- Focus styles visible
- Alt text on all images

---

## Component Standards

### Cards
- White background, `border-radius: 16px`, `box-shadow: var(--shadow-md)`
- Hover: `translateY(-6px)` + `var(--shadow-lg)`
- Consistent padding: `24px`

### Buttons
- **Primary:** Gold background `#C9A84C`, dark text, `border-radius: 8px`, `padding: 12px 28px`
- **Secondary:** Transparent with gold border, gold text
- **Ghost:** Dark navy background, white text
- All buttons: hover scale `1.02`, transition `0.2s ease`

### Section Layout
- Max width container: `1280px`, centered, `padding: 0 24px`
- Section vertical padding: `80px` desktop / `48px` mobile
- Section headings: centered with decorative gold underline accent

### Forms
- Input fields: `border: 1.5px solid #E5E7EB`, `border-radius: 8px`, `padding: 12px 16px`
- Focus: gold border color `#C9A84C`
- Submit button: Primary style
- All forms are display-only (no actual submission logic needed initially)

---

## Content Placeholders

Where real content is unavailable, use:
- **Images:** `https://picsum.photos/800/500?random=[n]` (numbered for consistency)
- **Text:** Realistic-sounding placeholder copy (not Lorem Ipsum) relevant to each business
- **Logo:** Text-based logo using brand fonts until actual logo is provided
- **Address:** "KMC Tower, Business District, Mumbai - 400001"
- **Phone:** "+91 98765 43210"
- **Email:** "info@kmcgroups.com"

---

## Development Notes

1. **Always link CSS and JS files relatively** — works on `file://` protocol
2. **No `fetch()` or `XMLHttpRequest`** to external APIs (CORS issues on file://)
3. Use `localStorage` if any state persistence is needed
4. Test in Chrome/Edge locally before finalizing
5. Each page must be self-contained but share the same `css/styles.css`
6. Inline critical CSS in `<head>` if needed for above-the-fold paint
7. All JS at bottom of `<body>` before `</body>` tag

---

## Deliverables Checklist

- [ ] `index.html` — Complete homepage
- [ ] `pages/real-estate.html` — Real Estate page
- [ ] `pages/restaurant.html` — Restaurant page
- [ ] `pages/construction.html` — Construction page
- [ ] `css/styles.css` — Full design system & global styles
- [ ] `css/components.css` — Component styles
- [ ] `css/animations.css` — All animations
- [ ] `js/main.js` — Shared JS (nav, scroll, counters)
- [ ] Responsive on all breakpoints
- [ ] Works by opening `index.html` in browser

---

## Quality Bar

The final website should feel like it was built by a **top-tier design agency**. Think:
- Clean whitespace, intentional typography hierarchy
- Gold accents used sparingly for premium feel
- Smooth micro-interactions throughout
- Photography-forward layouts in restaurant/real estate sections
- Trust signals: awards, certifications, client count, years in business
- Professional without being sterile — warm and inviting tone

---

*Last updated: 2026-02-24 | Project: KMC Groups PVT LTD Website*
