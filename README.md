# Lumen Studio — Business Website 

A fully responsive, multi-page business website built with vanilla HTML5, CSS3, and JavaScript.

## Folder structure

```
lumen-studio/
├── index.html            Home page
├── about.html            About page
├── services.html         Services page
├── portfolio.html        Portfolio page
├── contact.html          Contact page
├── css/
│   └── style.css         All styling (design tokens, layout, dark mode)
├── js/
│   └── script.js         All interactivity
├── assets/
│   └── images/           Placeholder brand & project images (SVG)
│       ├── favicon.svg
│       ├── logo-mark.svg
│       ├── hero-visual.svg
│       ├── slide-1.svg / slide-2.svg / slide-3.svg      (Home slider)
│       └── portfolio-1.svg ... portfolio-6.svg          (Portfolio grid)
└── README.md
```

## Interactive features implemented (8 total)

1. **Responsive navigation menu** — hamburger toggle on mobile (all pages)
2. **Image slider** — autoplay carousel with arrows + dots (Home page)
3. **FAQ accordion** — expand/collapse, single-open behavior (Services page)
4. **Form validation** — live + on-submit validation with inline error messages (Contact page)
5. **Scroll-to-top button** — appears after scrolling, smooth scroll back up (all pages)
6. **Dark mode** — toggle in the nav bar, preference saved via `localStorage`
7. **Animated counters** — numbers count up when scrolled into view (Home & About pages)
8. **Typing animation** — rotating typed phrases in the hero (Home page)

Bonus: a working **portfolio filter** (All / Branding / Web Design / Strategy) on the Portfolio page.

## About the images

The images in `assets/images/` are generated placeholder graphics (SVG), styled on-brand so the layout looks finished without needing licensed stock photography. Swap them for real project photos any time by replacing the file with the same filename (or updating the `src` in the HTML), e.g. `portfolio-1.svg` → `portfolio-1.jpg`.

## How to run locally

No build step needed — it's a static site.

1. Open `index.html` directly in a browser, **or**
2. Right-click `index.html` in VS Code → "Open with Live Server" for auto-reload.

## Deployment (bonus requirement)

**GitHub Pages**
1. Push this folder to a GitHub repository.
2. Go to repo Settings → Pages → set source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Netlify**
1. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Deploy manually".
2. Drag and drop the `lumen-studio` folder onto the upload area.
3. Netlify gives you a live URL immediately.
