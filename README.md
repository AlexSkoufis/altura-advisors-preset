# Altura Advisors — M&A Advisory Preset

A confident homepage for a **fictional** M&A advisory firm that sells IT services and software companies. Plum ink and claret with a soft rose accent; a grotesque display face with serif italic accents. No photography: the buyer network, deal tombstones and process are drawn in code.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Headline ending in a serif italic word, a short client quote, and an animated network diagram with "your company" at the centre and four buyer types orbiting it. |
| Transactions | Marquee of deal tombstones ("X acquired by Y"). |
| Scenarios | Three situations owners arrive with (an unsolicited offer, exit planning, growth by acquisition). |
| Services | Sell-side and buy-side as two contrasting cards. |
| Process | Five steps on a pinned, horizontally scrolling track. |
| Why us | Three reasons, each with a "why it matters" pull quote, plus three count-up figures. |
| Focus areas | Infrastructure, applications and software, with the vendor ecosystems each covers. |
| Testimonials | Three founder quotes. |
| Playbook | Links into a resource library. |
| Contact | Validated valuation-request form that opens the visitor's email app. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, contact, footer) and `content/home.json` (every section, including the deal list and testimonials).
- **Logo**: `components/Logo.js` (peak mark and spaced wordmark, drawn in `currentColor`) and `app/icon.svg`.
- **Colour**: tokens at the top of `app/globals.css` (`--brand`, `--brand-2`, `--ink*`, `--sky*`, `--paper*`). The token names are kept from the base design; their values are the Altura palette.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the network animation, marquee, pinned scroll and count-ups. The form validates inline and every control is keyboard-operable.

## Demo content

Altura Advisors, its deals, clients, quotes, figures and address are fictional. The email uses the reserved `.example` domain and the phone number is a placeholder. A real firm must replace them, and check its securities and broker-dealer disclosures, before launch.
