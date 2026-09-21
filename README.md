# eramusic website

Build V1 of the ERA Music website. Radically minimal. No header, no footer, no navigation menu, no social icons, no cookie banner.

STACK: React + Vite + Tailwind + react-router. No animation libraries — plain CSS/JS only. Fonts and logo are uploaded in the project assets: use them, do not substitute Google Fonts.

ROUTES

- "/" → Home

- "/manifesto" → Manifesto

- any other route → minimal 404 (logo + link back to "/")

HOME ("/")

- Full viewport (use 100dvh), content vertically and horizontally centered.

- Stack, top to bottom: ERA Music logo → tagline "Music for Motion" → typewriter line → single button "Manifesto".

- Typewriter line: cycles through this array of phrases: [PHRASES_TO_CONFIRM]. Types character by character (~60ms/char), holds 2s, deletes (~30ms/char), moves to the next, loops. Thin blinking caret. Fixed-height container so the layout never shifts while typing.

- If prefers-reduced-motion: show the first phrase statically, no caret.

- "Manifesto" button: the only interactive element on the page, links to "/manifesto". Understated style (outline or text-only), not a filled CTA.

- Nothing else on the page.

MANIFESTO ("/manifesto")

- Single typographic column, max-width ~640px, generous line-height, large top/bottom spacing.

- Placeholder content for now: a title "Manifesto" and 5 lorem paragraphs — text will be replaced later.

- ERA logo small, top-left, clickable back to "/". No other navigation.

DESIGN TOKENS (CSS variables in :root, easy to change later)

- --bg, --fg, --muted. Default: near-black background, off-white text. No gradients, no shadows, no rounded cards.

- Typography: uploaded display font for logo/tagline, uploaded text font for body.

TECH

- Mobile-first; test at 375px width.

- <title> "ERA Music", meta description placeholder, Open Graph tags with placeholder image, favicon from logo.

- Lighthouse performance target 95+: no heavy dependencies, fonts preloaded with font-display: swap.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9e5146b6-3fb3-4f79-91b0-a02b39c74e92).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
