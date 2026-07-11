# RG Prado Appliance Service — Client Website

A lead-generating website designed and built for [RG Prado Appliance Service](https://YOUR_USERNAME.github.io/rgprado-appliance-site/), an owner-operated appliance repair business serving Winnipeg to West St. Paul since 2010.

**[View live site →](https://YOUR_USERNAME.github.io/rgprado-appliance-site/)**

![Screenshot of the RG Prado homepage](docs/screenshot-hero.png)

## The brief

The client relied on word of mouth and directory listings (Yelp, Yellow Pages, BBB) with a basic template website that buried his phone number and looked like every competitor's. The goal: a distinctive site that converts "appliance repair Winnipeg" panic-searches into phone calls and captured leads.

## Design concept: the appliance nameplate

The visual language is borrowed from the machines the client repairs:

- **Porcelain-enamel palette** — cool porcelain white, deep enamel teal (the classic vintage appliance finish), brushed-steel hairline seams, and a single "heating coil" orange reserved for the dial pointer and call-to-action buttons
- **Rating-plate typography** — Zilla Slab for nameplate-style display lettering, Karla for body text, IBM Plex Mono for model-number-style labels
- **Panel details** — corner screws, seam rules, and control-panel framing throughout

## Features

- **Interactive diagnostic dial** — a working SVG stove knob in the hero. Visitors select their appliance type; the knob rotates and surfaces common faults, dramatizing the client's real differentiator: he troubleshoots by phone before charging anyone
- **Auto-advancing photo slideshow** — 19 real job photos with crossfade transitions, dot navigation, hover-pause, and a blur-fill backdrop so portrait phone photos display uncropped in a widescreen band
- **Lead capture pipeline** — service request form wired to Formspree with dynamic email subjects ("Service request: Dryer — Sarah M."), a honeypot spam trap, async submission with loading state, and a phone-number fallback if delivery fails
- **Click-to-call everywhere** — the phone number is one tap away from every section, because appliance repair is an emergency purchase
- **Fully responsive** — designed desktop-first for the sales demo, tested down to small phones
- **Accessibility & performance** — visible keyboard focus, `aria` states on all interactive controls, `prefers-reduced-motion` respected across all animation, lazy-loaded slideshow images

## Tech decisions

Built with **vanilla HTML, CSS, and JavaScript** — zero frameworks, zero build step, zero dependencies.

This was deliberate: a lead-generation site for a local service business needs to load instantly on mobile data for a stressed customer with a broken fridge. The entire site (excluding photos) is under 40 KB. It also keeps the client's monthly maintenance simple — any host serves it, nothing to update or break.

- CSS custom properties for a token-based design system
- `IntersectionObserver` for scroll-triggered reveals
- Data-driven UI: the dial settings and slideshow are generated from small config arrays, so adding a new appliance type or photo is a one-line change
- Progressive enhancement: the site is fully usable with JavaScript disabled (the form and phone links still work)

## Project structure

```
├── index.html      # Page structure and content
├── styles.css      # Design tokens, layout, responsive breakpoints
├── script.js       # Dial, slideshow, form handler, scroll reveals
└── images/         # Client job photos (compressed)
```

## Client outcomes

- Pitched and closed with a working MVP at the first meeting
- Delivered on a build fee + monthly care plan (hosting, updates, form monitoring)
- Two revision rounds incorporated: rebranded copy, expanded services (air conditioning, installation), photo slideshow, Facebook integration

## Running locally

No build step — clone and open:

```bash
git clone https://github.com/YOUR_USERNAME/rgprado-appliance-site.git
cd rgprado-appliance-site
# open index.html in a browser, or:
npx serve
```

> **Note:** form submissions are wired to the production Formspree endpoint. For local testing, swap the form `action` for your own test endpoint.

## Roadmap

- [ ] Point client's production domain at the site
- [ ] Google Business Profile integration and review schema markup
- [ ] Per-service landing pages for local SEO ("dryer repair Winnipeg")
- [ ] Online booking with time-slot selection

---

Designed & built by Olamilekan Ajose 