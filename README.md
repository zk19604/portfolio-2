# Pixel Pet Portfolio

A scrollable developer portfolio with a pixel-art cat that walks down a winding
road as you scroll, a playable GameBoy mini-game, and recursive ASCII art.
Built with React + Vite, styled with Tailwind v4 + custom CSS, animated with
Framer Motion.

Inspired by the clean, large-type restraint of [gazijarin.com](https://gazijarin.com)
blended with a retro pixel-game personality layer.

## Stack

- **Vite + React 18**
- **Tailwind CSS v4** (via `@tailwindcss/vite`) alongside custom CSS variables
- **Framer Motion** — entrance + interaction animations
- **react-intersection-observer** — scroll-triggered reveals & count-ups
- **@fontsource/press-start-2p** + Inter (Google Fonts)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    Header.jsx        nav with scroll-aware active states + mobile menu
    Hero.jsx          large-type hero + typewriter + GameBoy
    GameBoy.jsx       CSS device frame, ASCII screen, canvas endless-runner
    PetCharacter.jsx  16x16 pixel cat, happiness, scroll tracking, interactions
    Road.jsx          winding SVG road + pixel decorations + milestone badges
    About / Experience / Education / Projects / Skills / Contact / Footer
    Reveal.jsx        shared scroll-reveal wrapper
    SectionHead.jsx   shared milestone + heading
  hooks/
    useScrollProgress.js   scroll progress, isScrolling, active section
    usePetHappiness.js     pet happiness state machine
  styles/
    globals.css       design tokens, layout, components
    pixel.css         pixel keyframe animations
```

## Interactions

- **Scroll** — the cat descends and sways along the road; switches to a walk
  animation while scrolling.
- **GameBoy** — press **PLAY ▶** (or A / START) to launch the endless runner;
  **SPACE** or the **A** button jumps, **B** restarts after game over.
- **Pet panel** — **PET** (+happiness, sparkles) and **FEED** (+happiness, food
  drop). Happiness decays slowly; the cat looks sad below 20.

## Customizing content

All copy and data lives inline in the section components — search for the
`STATS`, `JOBS`, `FEATURED`, `PROJECTS`, `CATEGORIES`, and `DIRECT` constants
and the placeholder text, then swap in your own. Update the name in
`Header.jsx` / `Footer.jsx` and the social links in `Hero.jsx` / `Contact.jsx`.

## Deploy

### Vercel
```bash
npm i -g vercel
vercel --prod
```
`vercel.json` is included for SPA routing.

### Netlify
Build command `npm run build`, publish directory `dist` — or drag the `dist/`
folder into the Netlify dashboard.
